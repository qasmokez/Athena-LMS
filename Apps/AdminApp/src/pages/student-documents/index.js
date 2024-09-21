// pages/student-document/index.js

import React, { useState } from 'react'
import { useRouter } from 'next/router'
import StudentTable from 'src/views/student-documents/studentTable'

const StudentDocumentPage = () => {
  const router = useRouter();
  
  return (
    
    <div>
      <StudentTable />
    </div>
  )
}

export default StudentDocumentPage
