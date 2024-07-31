const {Pool} = require('pg');

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.selectUserByEmail = async (userEmail) => {
  let select = 'SELECT user_id, user_data FROM "user*"';
  select += ` WHERE user_data ->> 'user_email' = $1`;
  const query = {
    text: select,
    values: [userEmail],
  };
  const dbOutput = await pool.query(query);
  // console.log('==========');
  // console.log(dbOutput.rows);
  if (dbOutput.rows.length > 0) {
    return [dbOutput.rows[0].user_id, dbOutput.rows[0].user_data];
  } else {
    return [null];
  }
};