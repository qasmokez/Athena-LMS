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
