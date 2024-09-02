const {Pool} = require('pg');

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.getList = async (class_id, grade_id, page, limit) => {
  // TODO: write the sql query here, skeleton code provided below
  // hint: refer to /StudentService/sql/schema to see how our database is structured
  // look at 'student' table in particular
  let select = `SELECT data FROM student WHERE $1 AND $2`;
  const query = {
    text: select,
    values: [arg1, arg2],
  };
  const dbOutput = await pool.query(query);
  const output = dbOutput.rows[0];
  return output;
};