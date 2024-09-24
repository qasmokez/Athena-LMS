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
import {toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function EnhancedTable() {
  const [students, setStudents] = useState([
    {
      name: '张伟',
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
      name: '李芳',
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
      name: '王大伟',
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
  const [orderBy, setOrderBy] = useState('enroll_date');

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Selected rows (for deletion)
  const [selected, setSelected] = useState([]);

  // Find the names of selected students based on their UUIDs
  const selectedStudentNames = students
    .filter((student) => selected.includes(student.uuid))
    .map((student) => `“${student.name}”`) 
    .join(', ');

  // States for deletion confirmation
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Filtering
  const [filters, setFilters] = useState([]);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch filtered and sorted data from backend
  const fetchFilteredData = async () => {

    // Transform filters array into an object
    const filterObj = filters.reduce((acc, filter) => {
      if (!acc[filter.field]) {
        acc[filter.field] = [];
      }
      acc[filter.field].push(filter.value);

      return acc;
    }, {});

    // Log the parameters before making the backend call
    console.log('Order:', JSON.stringify({ [orderBy]: order }));
    console.log('Filter:', JSON.stringify(filterObj));
    console.log('Page:', page + 1);  // Backend typically uses 1-based page numbers
    console.log('Limit:', rowsPerPage);

    const queryParams = new URLSearchParams({
      order: JSON.stringify({ [orderBy]: order }),
      page: page + 1,  // Backend typically uses 1-based page numbers
      limit: rowsPerPage,
      filter: JSON.stringify(filters),
    }).toString();
    
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:3011/v0/student/basicInfo?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStudents(data || []); // Assuming the response includes a `students` array
      // setTotalStudents(data.total); // Assuming the response includes the total student count
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  useEffect(() => {
    fetchFilteredData();
  }, [order, orderBy, page, rowsPerPage, filters]);

  // Function to open confirmation dialog
  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  // Function to close confirmation dialog
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  // Function to show toast
  const showToast = () => {
    toast.success('删除成功！', {
      position: toast.POSITION.TOP_CENTER,
    });
  };


  // Handle deletion after confirmation
  const handleConfirmDelete = async () => {
    setOpenConfirmDialog(false);
    console.log('Selected UUIDs for deletion:', selected);
    showToast();  // success message

    const token = localStorage.getItem('token');
    try {
      const promises = selected.map(async (uuid) => {
        const response = await fetch(`http://localhost:3011/v0/student/deactivate/${uuid}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to deactivate student with UUID: ${uuid}`);
        }
        return response;
      });

      await Promise.all(promises);
      setStudents((prev) => prev.filter((student) => !selected.includes(student.uuid)));
      setSelected([]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteSelected = () => {
    // Open the dialog instead of directly deleting
    handleOpenConfirmDialog();
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = students.map((n) => n.uuid); // Use uuid instead of student_id
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  

  const handleCheckboxClick = (event, uuid) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(uuid);
    let newSelected = [];
  
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, uuid);
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
  

  const handleIconClick = (student) => {
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

  const isSelected = (uuid) => selected.indexOf(uuid) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDeleteSelected={handleDeleteSelected}
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
                const isItemSelected = isSelected(row.uuid);
                return (
                  <StudentTableRow
                    key={row.uuid}
                    row={row}
                    isItemSelected={isItemSelected}
                    handleIconClick={handleIconClick}
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
          count={3} // Total count from backend
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="每页行数"  // Chinese for "Rows per page"
          labelDisplayedRows={({ from, to, count}) =>
            `第 ${from}-${to} 条，共 ${count !== -1 ? count : `更多`} 条 `
          }
        />
      </Paper>
      {/* Deletion confirmation dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">删除</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            确认删除 {selectedStudentNames} 的信息？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} variant="outlined" color="primary">
            取消
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="primary" autoFocus>
            删除
          </Button>
        </DialogActions>
      </Dialog>

      <StudentDetailDrawer student={selectedStudent} open={drawerOpen} onClose={handleDrawerClose} />
    </Box>
  );
}
