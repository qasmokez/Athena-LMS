const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.getClassesGroupedByGrade = async () => {
  const query = `
    SELECT grade_id, ARRAY_AGG(name) AS classes
    FROM classes
    GROUP BY grade_id
    ORDER BY grade_id
  `;

  const result = await pool.query(query);
  const gradesWithClasses = {};

  // Map each grade to the classes available in that grade
  result.rows.forEach(row => {
    gradesWithClasses[row.grade_id] = { classes: row.classes };
  });

  return gradesWithClasses;
};

// Function to retrieve class names by their IDs
exports.getClassNames = async (classes_ids) => {
  // Remove duplicates to minimize the number of database queries
  const uniqueClassIds = [...new Set(classes_ids)];

  const query = `
    SELECT id, name 
    FROM classes
    WHERE id = ANY($1::int[])
  `;
  const result = await pool.query(query, [uniqueClassIds]);

  // Build a map from id to name
  const idToNameMap = {};
  result.rows.forEach(row => {
    idToNameMap[row.id] = row.name;
  });

  // Map over the original classes_ids array to maintain order and duplicates
  const classNames = classes_ids.map(id => idToNameMap[id] || null);

  return classNames;
};

// Function to retrieve grade names by their IDs
exports.getGradeNames = async (grade_ids) => {
  // Remove duplicates
  const uniqueGradeIds = [...new Set(grade_ids)];

  const query = `
    SELECT id, name 
    FROM grade
    WHERE id = ANY($1::int[])
  `;
  const result = await pool.query(query, [uniqueGradeIds]);

  // Build a map from id to name
  const idToNameMap = {};
  result.rows.forEach(row => {
    idToNameMap[row.id] = row.name;
  });

  // Map over the original grade_ids array
  const gradeNames = grade_ids.map(id => idToNameMap[id] || null);

  return gradeNames;
};