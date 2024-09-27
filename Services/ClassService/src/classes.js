const db = require('./classes_db');

// Function to retrive classes by grade
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
