// pages/student-document/index.js

import React, { useState } from 'react'
import CollapsibleTable from 'src/views/student-documents/collapsibleTable'
import FilterOptions from 'src/views/student-documents/filterOptions'

const StudentDocumentPage = () => {
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('')

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value)
  }

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value)
  }

  return (
    <div>
      <FilterOptions
        selectedClass={selectedClass}
        handleClassChange={handleClassChange}
        selectedGrade={selectedGrade}
        handleGradeChange={handleGradeChange}
      />
      <CollapsibleTable selectedClass={selectedClass} selectedGrade={selectedGrade} />
    </div>
  )
}

export default StudentDocumentPage
