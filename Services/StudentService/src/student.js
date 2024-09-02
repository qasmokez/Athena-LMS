const db = require('./student_db');

exports.list = async (req, res) => {
  // TODO: make sure these are retrievable from user server calls
  // eg) print them out
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const class_id = req.body.class_id;
  const grade_id = req.body.grade_id;
  // const userId = req.user.userId; // may not be needed
  const output = await db.getList(class_id, grade_id, page, limit);
  res.status(200).json(output);
};
