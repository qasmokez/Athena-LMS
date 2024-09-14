const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.getBasicStudentInfo = async (page, limit, order, filter) => {
  const offset = (page - 1) * limit;

  // Base query
  let select = `
    SELECT 
      student_uuid AS uuid,
      sex,
      CONCAT(first_name, ' ', last_name) AS name,
      classes_id,
      grade_id,
      birth_date,
      enroll_date,
      student_id,
      ethnic
    FROM student
  `;

  // Filter construction
  let whereConditions = [`active = true`];
  let queryParams = [];

  if (filter.classes_id) {
    whereConditions.push(`classes_id = ANY($${queryParams.length + 1})`);
    queryParams.push(filter.classes_id);
  }

  if (filter.grade_id) {
    whereConditions.push(`grade_id = ANY($${queryParams.length + 1})`);
    queryParams.push(filter.grade_id);
  }

  if (filter.sex) {
    whereConditions.push(`sex = ANY($${queryParams.length + 1})`);
    queryParams.push(filter.sex);
  }

  if (filter.first_name && filter.first_name.length > 0) {
    let firstNameConditions = filter.first_name.map((name, index) => {
      return `first_name ILIKE $${queryParams.length + index + 1}`;
    });
    whereConditions.push(`(${firstNameConditions.join(' OR ')})`);
    queryParams = queryParams.concat(filter.first_name.map(name => `%${name}%`));
  }

  if (filter.last_name && filter.last_name.length > 0) {
    let lastNameConditions = filter.last_name.map((name, index) => {
      return `last_name ILIKE $${queryParams.length + index + 1}`;
    });
    whereConditions.push(`(${lastNameConditions.join(' OR ')})`);
    queryParams = queryParams.concat(filter.last_name.map(name => `%${name}%`));
  }

  if (whereConditions.length > 0) {
    select += ` WHERE ` + whereConditions.join(' AND ');
  }

  // Safety measure
  const validOrderColumns = ['sex', 'classes_id', 'grade_id', 'birth_date']; // allowed fields to order by
  const validOrderDirections = ['ASC', 'DESC'];

  // Order construction
  let orderByClause = [];
  for (let key in order) {
    if (validOrderColumns.includes(key) && validOrderDirections.includes(order[key].toUpperCase())) {
      orderByClause.push(`${key} ${order[key].toUpperCase()}`);
    }
  }

  if (orderByClause.length > 0) {
    select += ` ORDER BY ` + orderByClause.join(', ');
  }

  // Adding pagination
  select += ` LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
  queryParams.push(limit, offset);

  const query = {
    text: select,
    values: queryParams,
  };

  const dbOutput = await pool.query(query);
  return dbOutput.rows;
};

exports.getExpandStudentInfo = async (student_uuid) => {
  // Check if the student is active
  const checkQuery = {
    text: `
      SELECT active 
      FROM student 
      WHERE student_uuid = $1;
    `,
    values: [student_uuid],
  };

  const checkResult = await pool.query(checkQuery);

  if (checkResult.rowCount === 0) {
    return null;
  } else if (!checkResult.rows[0].active) {
    throw new Error(`Student with UUID ${student_uuid} is deactivated and cannot access expanded info.`);
  }

  // Active, continue the query
  const query = {
    text: `
      SELECT 
        student_uuid,
        family_address,
        father,
        father_tel,
        mother,
        mother_tel,
        photo,
        id_number,
        emergency,
        emergency_tel
      FROM student_expand
      WHERE student_uuid = $1;
    `,
    values: [student_uuid],
  };

  const dbOutput = await pool.query(query);
  if (dbOutput.rows.length > 0) {
    return dbOutput.rows;
  } else {
    return null;
  }
};

exports.addBasicStudentInfo = async (studentData) => {
  const query = {
    text: `
      INSERT INTO student (student_uuid, classes_id, grade_id, last_name, first_name, birth_date, sex, ethnic, student_id, active, enroll_date, data)
      VALUES (
        gen_random_uuid(), 
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
        jsonb_build_object(
          'created_at', COALESCE($11::timestamp, NOW()), 
          'updated_at', COALESCE($12::timestamp, NOW())
        )
      )
      RETURNING student_uuid;
    `,
    values: [
      studentData.classes_id,
      studentData.grade_id,
      studentData.last_name,
      studentData.first_name,
      studentData.birth_date,
      studentData.sex,
      studentData.ethnic,
      studentData.student_id,
      studentData.active,
      studentData.enroll_date,
      studentData.created_at || null,
      studentData.updated_at || null
    ]
  };

  const dbOutput = await pool.query(query);
  return dbOutput.rows[0];
};

exports.addExpandStudentInfo = async (studentExpandData) => {
  // Check if the student_uuid exists in the student table
  const checkQuery = {
    text: 'SELECT 1 FROM student WHERE student_uuid = $1',
    values: [studentExpandData.student_uuid],
  };
  const checkResult = await pool.query(checkQuery);

  if (checkResult.rowCount === 0) {
    // If the student_uuid does not exist, throw an error
    throw new Error(`Student with UUID ${studentExpandData.student_uuid} does not exist.`);
  }

  const query = {
    text: `
      INSERT INTO student_expand 
      (student_uuid, family_address, father, father_tel, mother, mother_tel, photo, id_number, emergency, emergency_tel, created_at, updated_at)
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
        COALESCE($11::timestamp, NOW()), COALESCE($12::timestamp, NOW())
      )
      RETURNING student_uuid;
    `,
    values: [
      studentExpandData.student_uuid,
      studentExpandData.family_address,
      studentExpandData.father,
      studentExpandData.father_tel,
      studentExpandData.mother,
      studentExpandData.mother_tel,
      studentExpandData.photo,
      studentExpandData.id_number,
      studentExpandData.emergency,
      studentExpandData.emergency_tel,
      studentExpandData.created_at || null,
      studentExpandData.updated_at || null
    ]
  };

  const dbOutput = await pool.query(query);
  return dbOutput.rows[0];
};

exports.deactivateStudent = async (student_uuid) => {
  const checkQuery = {
    text: 'SELECT 1 FROM student WHERE student_uuid = $1',
    values: [student_uuid],
  };
  const checkResult = await pool.query(checkQuery);

  if (checkResult.rowCount === 0) {
    return null;
  }

  const query = {
    text: `
      UPDATE student 
      SET active = false, 
          data = jsonb_set(data, '{updated_at}', to_jsonb(NOW())::jsonb)
      WHERE student_uuid = $1
      RETURNING student_uuid;
    `,
    values: [student_uuid],
  };

  const dbOutput = await pool.query(query);
  return dbOutput.rows[0];
};

