const db = require('./student_db');

exports.getBasicStudentInfo = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const order = JSON.parse(req.query.order || '{}');
    const filter = JSON.parse(req.query.filter || '{}');

    const output = await db.getBasicStudentInfo(page, limit, order, filter);
    res.status(200).json(output);
  } catch (err) {
    next(err);
  }
};

exports.getExpandStudentInfo = async (req, res, next) => {
  try {
    const studentUUId = req.params.uuid;
    const output = await db.getExpandStudentInfo(studentUUId);
    if (output) {
      res.status(200).json(output);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    next(err);
  }
};