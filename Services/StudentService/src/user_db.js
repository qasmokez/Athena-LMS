const {Pool} = require('pg');

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.getProfile = async (userId) => {
  let select = `SELECT data FROM student`;
  select += ` WHERE studentid = $1`;
  const query = {
    text: select,
    values: [userId],
  };
  const dbOutput = await pool.query(query);
  const output = dbOutput.rows[0];
  return output;
};

exports.getHonors = async (userId) => {
  let select = `SELECT data FROM honors`;
  select += ` WHERE studentid = $1`;
  const query = {
    text: select,
    values: [userId],
  };
  const dbOutput = await pool.query(query);
  const output = dbOutput.rows[0];
  return output;
};

exports.getParents = async (userId) => {
  let select = `SELECT data FROM parents`;
  select += ` WHERE studentid = $1`;
  const query = {
    text: select,
    values: [userId],
  };
  const dbOutput = await pool.query(query);
  const output = dbOutput.rows[0];
  return output;
};
