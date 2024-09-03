const db = require('./student_db');

exports.list = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const class_id = parseInt(req.query.class_id);
    const grade_id = parseInt(req.query.grade_id);
    const output = await db.getList(class_id, grade_id, page, limit);
    res.status(200).json(output);
  } catch (err) {
    next(err);
  }
};
