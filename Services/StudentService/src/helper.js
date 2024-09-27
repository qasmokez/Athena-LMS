// Function to check for duplicates within the file
module.exports.checkDuplicateStudentIdInFile = (studentDataList) => {
    const studentIdMap = {};
    let duplicateIds = [];
  
    // Check for duplicate student_id in the file
    studentDataList.forEach((student) => {
      if (student.student_id) {
        if (studentIdMap[student.student_id]) {
          duplicateIds.push(student.student_id);
        } else {
          studentIdMap[student.student_id] = true;
        }
      }
    });
  
    return duplicateIds;
  };