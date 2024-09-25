const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.testDbFunc = async () => {
  const query = {
    text: `
      SELECT * 
      FROM grade 
    `,
    values: [],
  };

  const dbOutput = await pool.query(query);
  return dbOutput.rows[0];
}