const db = require('./student_db');

exports.getBasicStudentInfo = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const order = JSON.parse(req.query.order || '{}');
    const filter = JSON.parse(req.query.filter || '{}');

    const result = await db.getBasicStudentInfo(page, limit, order, filter);
    if (result.total_student != 0) {
      const response = {
        status: {
          code: 200,
          msg: "Success"
        },
        data: result.data,
        total_student: result.total_student
      };
      res.status(200).json(response);
    } else {
      const response = {
        status: {
          code: 404,
          msg: "No Student Match!"
        }
      };
      res.status(404).json(response);
    }
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
    if (err.message.includes('deactivated')) {
      res.status(403).json({ message: err.message });
    } else {
      next(err);
    }
  }
};

exports.addBasicStudentInfo = async (req, res, next) => {
  try {
    const studentData = req.body;

    // Ensure that student_id is not duplicated
    const isDuplicate = await db.checkStudentIdDuplicate(studentData.student_id);
    if (isDuplicate) {
      const response = {
        status: {
          code: 409,
          msg: "Duplicate student_id!"
        }
      };
      res.status(409).json(response);
    } else {
      const result = await db.addBasicStudentInfo(studentData);
      const response = {
        status: {
          code: 201,
          msg: "Success Added"
        },
        data: result.data
      };
      res.status(201).json(response);
    }
  } catch (err) {
    next(err);
  }
};

exports.addExpandStudentInfo = async (req, res, next) => {
  try {
    const studentExpandData = req.body;
    const output = await db.addExpandStudentInfo({
      student_uuid: studentExpandData.student_uuid,
      data: {
        family_address: studentExpandData.family_address,
        father: studentExpandData.father,
        father_tel: studentExpandData.father_tel,
        mother: studentExpandData.mother,
        mother_tel: studentExpandData.mother_tel,
        photo: studentExpandData.photo,
        id_number: studentExpandData.id_number,
        emergency: studentExpandData.emergency,
        emergency_tel: studentExpandData.emergency_tel,
        created_at: studentExpandData.created_at || new Date(),
        updated_at: studentExpandData.updated_at || new Date(),
        ...studentExpandData.custom_data
      }
    });
    res.status(201).json({ message: "Student expand info added successfully", student_uuid: output.student_uuid });
  } catch (err) {
    if (err.message.includes('Student with UUID')) {
      return res.status(404).json({ message: err.message });
    }
    next(err);
  }
};

exports.deactivateStudent = async (req, res, next) => {
  try {
    const studentUUId = req.params.uuid;
    const output = await db.deactivateStudent(studentUUId);

    if (output) {
      res.status(200).json({ message: "Student deactivated successfully", student_uuid: studentUUId });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    next(err);
  }
};


