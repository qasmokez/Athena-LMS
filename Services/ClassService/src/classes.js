const db = require('./classes_db');

// Endpoint to retrive classes by grade
exports.getClassesByGrade = async (req, res, next) => {
  try {
    const gradesWithClasses = await db.getClassesGroupedByGrade();
    
    const formattedResponse = {
      status: {
        code: 200,
        msg: 'Success',
      },
      data: {
        grades: gradesWithClasses,
      },
    };

    res.status(200).json(formattedResponse);
  } catch (err) {
    next(err);
  }
};

// Endpoint to retrieve class names by classes_id
exports.getClassText = async (req, res, next) => {
  try {
    const { classes_ids } = req.body;
    if (!Array.isArray(classes_ids)) {
      return res.status(400).json({ status: { code: 400, msg: "classes_ids must be an array" } });
    }

    const classNames = await db.getClassNames(classes_ids);
    res.status(200).json({
      status: { code: 200, msg: 'Success' },
      data: classNames
    });
  } catch (err) {
    next(err);
  }
};

// Endpoint to retrieve grade names by grade_id
exports.getGradeText = async (req, res, next) => {
  try {
    const { grade_ids } = req.body;
    if (!Array.isArray(grade_ids)) {
      return res.status(400).json({ status: { code: 400, msg: "grade_ids must be an array" } });
    }

    const gradeNames = await db.getGradeNames(grade_ids);
    res.status(200).json({
      status: { code: 200, msg: 'Success' },
      data: gradeNames
    });
  } catch (err) {
    next(err);
  }
};