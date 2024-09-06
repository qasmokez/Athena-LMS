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
  let whereConditions = [];
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

