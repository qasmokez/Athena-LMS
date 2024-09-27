const {Pool} = require('pg');

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.selectUserByStudentId = async (studentid) => {
  let select = 'SELECT id, data FROM account';
  select += ` WHERE studentid = $1`;
  const query = {
    text: select,
    values: [studentid],
  };
  const dbOutput = await pool.query(query);
  // console.log('==========');
  // console.log(dbOutput.rows);
  if (dbOutput.rows.length > 0) {
    return [dbOutput.rows[0].id, dbOutput.rows[0].data];
  } else {
    return [null];
  }
};