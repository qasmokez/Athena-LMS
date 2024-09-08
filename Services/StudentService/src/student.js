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

exports.addBasicStudentInfo = async (req, res, next) => {
  try {
    const studentData = req.body;
    const output = await db.addBasicStudentInfo(studentData);
    res.status(201).json({ message: "Student added successfully", student_uuid: output.student_uuid });
  } catch (err) {
    next(err);
  }
};

exports.addExpandStudentInfo = async (req, res, next) => {
  try {
    const studentExpandData = req.body;
    const output = await db.addExpandStudentInfo(studentExpandData);
    res.status(201).json({ message: "Student expand info added successfully", student_uuid: output.student_uuid });
  } catch (err) {
    if (err.message.includes('Student with UUID')) {
      return res.status(404).json({ message: err.message });
    }
    next(err);
  }
};

