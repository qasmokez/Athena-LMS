import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import EnhancedTableHead from './enhancedTableHead';
import EnhancedTableToolbar from './enhancedTableTool';
import StudentDetailDrawer from './studentsDetailsDrawer';
import StudentTableRow from './studentTableRow';

export default function EnhancedTable() {
  const [students, setStudents] = useState([
    {
      name: 'zhang wei',
      sex: 'male',
      classes_id: 1,
      grade_id: 3,
      birth_date: '2010-05-12', // YYYY-MM-DD format
      enroll_date: '2017-09-01',
      student_id: 'S001',
      ethnic: 'han',
      uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa1'
    },
    {
      name: 'li fang',
      sex: 'female',
      classes_id: 2,
      grade_id: 2,
      birth_date: '2012-08-25',
      enroll_date: '2018-09-01',
      student_id: 'S002',
      ethnic: 'man',
      uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa2'
    },
    {
      name: 'wang dawei',
      sex: 'male',
      classes_id: 6,
      grade_id: 5,
      birth_date: '2012-05-12',
      enroll_date: '2019-09-01',
      student_id: 'S003',
      ethnic: 'han',
      uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa3'
    }
  ]);  // Empty array initially
  const [totalStudents, setTotalStudents] = useState(0);  // Total student count from backend

  // Sorting
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('student_id');

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Selected rows (for deletion)
  const [selected, setSelected] = useState([]);

  // Filtering
  const [filters, setFilters] = useState([]);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch filtered and sorted data from backend
  const fetchFilteredData = async () => {
    // Log the parameters before making the backend call
    console.log('Order:', JSON.stringify({ [orderBy]: order }));
    console.log('Filter:', JSON.stringify(filters));
    console.log('Page:', page + 1);  // Backend typically uses 1-based page numbers
    console.log('Limit:', rowsPerPage);

    const queryParams = new URLSearchParams({
      order: JSON.stringify({ [orderBy]: order }),
      filter: JSON.stringify(filters),
      page: page + 1,  // Backend typically uses 1-based page numbers
      limit: rowsPerPage,
    }).toString();
    
    try {
      const response = await fetch(`http://localhost:3010/v0/student/info?${queryParams}`);
      const data = await response.json();
      setStudents(data.students);  // Assuming the response includes a `students` array
      setTotalStudents(data.total);  // Assuming the response includes the total student count
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } 
  };

  useEffect(() => {
    fetchFilteredData();
  }, [order, orderBy, page, rowsPerPage, filters]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = students.map((n) => n.student_id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (event, id) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedStudent(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);  // Reset to first page when rows per page changes
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          filters={filters}
          setFilters={setFilters}
          fetchFilteredData={fetchFilteredData}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={students.length}
              filters={filters}
            />
            <TableBody>
              {students.map((row) => {
                const isItemSelected = isSelected(row.student_id);
                return (
                  <StudentTableRow
                    key={row.student_id}
                    row={row}
                    isItemSelected={isItemSelected}
                    handleRowClick={handleRowClick}
                    handleCheckboxClick={handleCheckboxClick}
                  />
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={11} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={3} // Use the total count from backend
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <StudentDetailDrawer student={selectedStudent} open={drawerOpen} onClose={handleDrawerClose} />
    </Box>
  );
}
