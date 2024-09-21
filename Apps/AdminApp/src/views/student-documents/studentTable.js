import React from 'react';
import { useState, useEffect, useMemo } from 'react';
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
    // Sample data for students
    {
      id: '001',
      姓名: '张伟',
      性别: '男',
      班级: '1班',
      年级: '三年级',
      出生日期: '2010-05-12',
      民族: '汉族',
      年龄: 14,
      入学时间: '2017-09-01',

      /*
      拓展信息: {
        身份证号: '110101200001011234',
        父亲姓名: '张三',
        父亲联系手机号: '13800138000',
        母亲姓名: '李四',
        母亲联系手机号: '13900139000',
        紧急联系人姓名: '王五',
        紧急联系人手机号: '13600136000',
        家庭住址: '北京市海淀区中关村大街1号',
        个人照片: '/images/avatars/1.png',
        体检报告: '暂无',
      },*/
    },
    {
      id: '002',
      姓名: '李芳',
      性别: '女',
      班级: '2班',
      年级: '二年级',
      出生日期: '2012-08-25',
      民族: '满族',
      年龄: 12,
      入学时间: '2018-09-01',

      /*
      拓展信息: {
        身份证号: '110102200002022345',
        父亲姓名: '李五',
        父亲联系手机号: '13800238000',
        母亲姓名: '张六',
        母亲联系手机号: '13900239000',
        紧急联系人姓名: '陈七',
        紧急联系人手机号: '13600236000',
        家庭住址: '上海市浦东新区陆家嘴路2号',
        个人照片: '/images/avatars/1.png',
        体检报告: '暂无', 
      }, */
    },
    {
      id: '003',
      姓名: '王大卫',
      性别: '男',
      班级: '6班',
      年级: '五年级',
      出生日期: '2012-05-12',
      民族: '汉族',
      年龄: 14,
      入学时间: '2019-09-01',

      /*
      拓展信息: {
        身份证号: '110101200001011234',
        父亲姓名: '张三',
        父亲联系手机号: '13800138000',
        母亲姓名: '李四',
        母亲联系手机号: '13900139000',
        紧急联系人姓名: '王五',
        紧急联系人手机号: '13600136000',
        家庭住址: '北京市海淀区中关村大街1号',
        个人照片: '/images/avatars/1.png',
        体检报告: '暂无',
      }, */
    },
  ]);
  const [totalStudents, setTotalStudents] = useState(0);  // Total student count from backend

  // Sorting
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Selected rows (for deletion)
  const [selected, setSelected] = useState([]);

  // Filtering
  const [filters, setFilters] = useState([]);

  // const [filters, setFilters] = useState({});

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
    
    console.log('Query params:', queryParams);

    try {
      const response = await fetch(`http://localhost:3010/v0/student/info?${queryParams}`);
      const data = await response.json();
      setStudents(data.students);  // Assuming the response includes a `students` array
      // setTotalStudents(data.total);  // Assuming the response includes the total student count
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } 
  };

  // Fetch data when sorting, filtering, pagination changes
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
      const newSelecteds = students.map((n) => n.id);
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

  const handleDeleteSelected = () => {
    console.log('Selected students to delete:', selected);
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
          handleDeleteSelected={handleDeleteSelected}
          filters={filters}
          setFilters={setFilters}
          fetchFilteredData={fetchFilteredData}  // Pass the fetch function
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={students?.length || 0}
              filters={filters}
            />
            <TableBody>
              {students.map((row) => {
                const isItemSelected = isSelected(row.id);
                return (
                  <StudentTableRow
                    key={row.id}
                    row={row}
                    isItemSelected={isItemSelected}
                    handleRowClick={handleRowClick}
                    handleCheckboxClick={handleCheckboxClick}
                  />
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={11} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count= {10000} // Use the total from backend
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
