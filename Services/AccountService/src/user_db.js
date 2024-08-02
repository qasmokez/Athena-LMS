const {Pool} = require('pg');

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});
exports.getProfile = async (userId) => {
  console.log('dbfunc called')
  let select = `SELECT data FROM account`;
  select += ` WHERE id = $1`;
  const query = {
    text: select,
    values: [userId],
  };
  const dbOutput = await pool.query(query);
  const output = dbOutput.rows[0];
  return output;
};

// exports.selectStatus = async (studentid) => {
//   let select = `SELECT data FROM account`;
//   select += ` WHERE studentid = $1`;
//   // console.log(select);
//   const query = {
//     text: select,
//     values: [userId],
//   };
//   const dbOutput = await pool.query(query);
//   const output = dbOutput.rows[0];
//   // console.log(output);
//   return output;
// };