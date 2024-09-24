const db = require('./student_db');
const ExcelJS = require('exceljs');

// Endpoint to get basic info of a student
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

// Endpoint to get expand info of a student
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

// Endpoint to add a basic info of a student
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

// Endpoint to add an expand info of a student
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
        emergency: studentExpandData.emergency,
        emergency_tel: studentExpandData.emergency_tel,
        id_number: studentExpandData.id_number,
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

// Endpoint to deactivate a student by student_uuid
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

// Endpoint to handle xlsx upload
exports.uploadStudentXlsx = async (req, res, next) => {
  try {
    const file = req.files;
    if (!file || file.length === 0) {
      const response = {
        status: {
          code: 400,
          msg: "File Missing!"
        }, 
      };
      return res.status(400).json(response);
    } else {
      const uploadedFile = file[0];
      const filePath = uploadedFile.path;

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);
      const worksheet = workbook.worksheets[0];  // Initializing and reading the workbook

      let studentDataList = [];
      let errors = [];

      // Map column indices to field names and display names
      const requiredFields = {
        1: { field: 'last_name', displayName: '姓' },
        2: { field: 'first_name', displayName: '名' },
        3: { field: 'sex', displayName: '性别' },
        4: { field: 'ethnic', displayName: '民族' },
        5: { field: 'birth_date', displayName: '出生日期' },
        6: { field: 'id_number', displayName: '身份证号' },
        9: { field: 'enroll_date', displayName: '入学时间' },
        15: { field: 'family_address', displayName: '家庭住址' }
      };

      // Iterate over rows starting from the second row
      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber === 1) return;  // Skip header row
        let missingFields = [];
        // Check required fields

        for (let col in requiredFields) {
          const cellValue = row.getCell(parseInt(col)).value;
          if (cellValue === null || cellValue === undefined || cellValue === '') {
            missingFields.push(requiredFields[col].displayName);
          }
        }

        if (missingFields.length > 0) {
          errors.push({
            row: rowNumber,
            missingFields: missingFields
          });
          return; // Skip processing this row
        }

        const studentData = {
          last_name: row.getCell(1).value,
          first_name: row.getCell(2).value,
          sex: row.getCell(3).value,
          ethnic: row.getCell(4).value,
          birth_date: row.getCell(5).value,
          grade_id: row.getCell(7).value,
          classes_id: row.getCell(8).value,
          enroll_date: row.getCell(9).value,
          student_id: row.getCell(10).value,
          active: true,
          expand_data: {
            data: {
              father: row.getCell(11).value,
              father_tel: row.getCell(12).value,
              mother: row.getCell(13).value,
              mother_tel: row.getCell(14).value,
              family_address: row.getCell(15).value,
              id_number: row.getCell(6).value,
            }
          }
        };

        studentDataList.push(studentData);
      });

      // If there are any errors, return them
      if (errors.length > 0) {
        const response = {
          status: {
            code: 400,
            msg: "Validation errors in uploaded file (required fields not filled!)",
          },
          errors: errors
        };
        return res.status(400).json(response);
      }

      // Array to store list of uuids being added
      let added_uuid = [];
      // Store the data into the database
      for (const student of studentDataList) {
        const basicInfo = await db.addBasicStudentInfo(student); // Store in student table
        student.expand_data.student_uuid = basicInfo.data.student_uuid;
        added_uuid.push(student.expand_data.student_uuid)
        await db.addExpandStudentInfo(student.expand_data); // Store in student_expand table
      }

      const response = {
        status: {
          code: 201,
          msg: "Students Success Added"
        },
        added_uuids: {
          data: added_uuid
        },
        total_added: added_uuid.length
      };
      res.status(201).json(response);
    }
  } catch (err) {
    next(err);
  }
};