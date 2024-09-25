const db = require('./test_db');

exports.testFunc = async (req, res, next) => {
  try {
    const output = await db.testDbFunc();
    res.status(200).json(output);
  } catch (err) {
    next(err);
  }
};