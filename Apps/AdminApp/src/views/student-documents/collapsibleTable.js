// views/student-document/collapsibleTable.js

import React, { useState } from 'react'
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Typography,
  TablePagination
} from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

// ** Data Structure
// Replace this with API call
const students = [
  {
    name: 'John Doe',
    sex: 'Male',
    class: 'A1',
    grade: '10',
    birthDate: '2008-04-12',
    familyAddress: '123 Main St, Springfield',
    parentInfo: 'Mr. & Mrs. Doe',
    picture: '/path-to-picture',
    timeOfJoin: '2019-09-01'
  },
  {
    name: 'Jane Smith',
    sex: 'Female',
    class: 'B2',
    grade: '11',
    birthDate: '2007-08-22',
    familyAddress: '456 Maple Ave, Springfield',
    parentInfo: 'Mr. & Mrs. Smith',
    picture: '/path-to-picture',
    timeOfJoin: '2018-09-01'
  },
  {
    name: 'Michael Johnson',
    sex: 'Male',
    class: 'C3',
    grade: '12',
    birthDate: '2006-05-15',
    familyAddress: '789 Oak St, Springfield',
    parentInfo: 'Mr. & Mrs. Johnson',
    picture: '/path-to-picture',
    timeOfJoin: '2017-09-01'
  },
  {
    name: 'Emily Davis',
    sex: 'Female',
    class: 'A1',
    grade: '10',
    birthDate: '2008-09-03',
    familyAddress: '321 Pine St, Springfield',
    parentInfo: 'Mr. & Mrs. Davis',
    picture: '/path-to-picture',
    timeOfJoin: '2019-09-01'
  },
  {
    name: 'David Wilson',
    sex: 'Male',
    class: 'B2',
    grade: '11',
    birthDate: '2007-11-23',
    familyAddress: '654 Cedar Ave, Springfield',
    parentInfo: 'Mr. & Mrs. Wilson',
    picture: '/path-to-picture',
    timeOfJoin: '2018-09-01'
  },
  {
    name: 'Sophia Martinez',
    sex: 'Female',
    class: 'C3',
    grade: '12',
    birthDate: '2006-03-14',
    familyAddress: '987 Birch Rd, Springfield',
    parentInfo: 'Mr. & Mrs. Martinez',
    picture: '/path-to-picture',
    timeOfJoin: '2017-09-01'
  },
  {
    name: 'Chris Brown',
    sex: 'Male',
    class: 'A1',
    grade: '10',
    birthDate: '2008-07-21',
    familyAddress: '111 Elm St, Springfield',
    parentInfo: 'Mr. & Mrs. Brown',
    picture: '/path-to-picture',
    timeOfJoin: '2019-09-01'
  },
  {
    name: 'Olivia Garcia',
    sex: 'Female',
    class: 'B2',
    grade: '11',
    birthDate: '2007-12-19',
    familyAddress: '222 Maple Ave, Springfield',
    parentInfo: 'Mr. & Mrs. Garcia',
    picture: '/path-to-picture',
    timeOfJoin: '2018-09-01'
  },
  {
    name: 'James Rodriguez',
    sex: 'Male',
    class: 'C3',
    grade: '12',
    birthDate: '2006-01-09',
    familyAddress: '333 Oak St, Springfield',
    parentInfo: 'Mr. & Mrs. Rodriguez',
    picture: '/path-to-picture',
    timeOfJoin: '2017-09-01'
  },
  {
    name: 'Isabella Hernandez',
    sex: 'Female',
    class: 'A1',
    grade: '10',
    birthDate: '2008-02-28',
    familyAddress: '444 Maple Ave, Springfield',
    parentInfo: 'Mr. & Mrs. Hernandez',
    picture: '/path-to-picture',
    timeOfJoin: '2019-09-01'
  }
]

const CollapsibleTable = ({ selectedClass, selectedGrade }) => {
  const [open, setOpen] = useState({})
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(8)

  const handleClick = (name) => {
    setOpen(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const filteredStudents = students.filter(student => {
    return (
      (selectedClass === '' || student.class === selectedClass) &&
      (selectedGrade === '' || student.grade === selectedGrade)
    )
  })

  const paginatedStudents = filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Card>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>学生档案</TableCell>
              <TableCell>姓名</TableCell>
              <TableCell>性别</TableCell>
              <TableCell>班级</TableCell>
              <TableCell>年级</TableCell>
              <TableCell>出生日期</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStudents.map(student => (
              <React.Fragment key={student.name}>
                <TableRow>
                  <TableCell style={{ padding: '6px' }}>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleClick(student.name)}
                    >
                      {open[student.name] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.sex}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.birthDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open[student.name]} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          扩展信息
                        </Typography>
                        <Typography variant="body2">
                          <strong>家庭住址:</strong> {student.familyAddress}
                        </Typography>
                        <Typography variant="body2">
                          <strong>父母信息:</strong> {student.parentInfo}
                        </Typography>
                        <Typography variant="body2">
                          <strong>入学时间:</strong> {student.timeOfJoin}
                        </Typography>
                        {/* Add image or other custom content here */}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredStudents.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[8, 16, 24]}
        labelRowsPerPage="每页显示行数"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} 总计 ${count}`}
      />
    </Card>
  )
}

export default CollapsibleTable
