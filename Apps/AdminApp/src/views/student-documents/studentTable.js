import React from 'react';
import {useState, useEffect} from 'react';
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

// 登陆后 向后端请求学生信息
// 如果按照【手机号，父母名，小组id】查询则从新向后端请求
// 目前包含基础查询 除了 【姓】- 还未确定后端输出中文名还是英文名


export default function EnhancedTable() {
  const [students,setStudents] = useState([
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
      },
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
      },
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
      },
    },
  ]);

  // 排序
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');

  // 分页
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // 选择的行 -> 用于删除
  const [selected, setSelected] = React.useState([]);

  // 筛选条件 
  const [filters, setFilters] = React.useState([]);
  
  // 右侧panel
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    fetchFilteredData(filters);
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
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

   // Fetch filtered data function
  const fetchFilteredData = (filters) => {
    console.log(`Order: ${order}, OrderBy: ${orderBy}, Filters:`, filters); // Replace this with api backend call
  };

  const visibleRows = React.useMemo(() => {
    let filteredStudents = [...students];

    // Apply filters if any...
    // For now, this is just a placeholder for any filtering logic.
    return filteredStudents
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [order, orderBy, page, rowsPerPage, filters, students]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - visibleRows.length) : 0;


  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDeleteSelected={handleDeleteSelected}
          filters={filters}
          setFilters={setFilters}
          fetchFilteredData={fetchFilteredData} // Pass the fetch function
          data = {[students,setStudents]} // temp data to test addStudent
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
              filters={filters}  // Pass the filters
            />
            <TableBody>
              {visibleRows.map((row) => {
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
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* Side Panel (Drawer) */}
      <StudentDetailDrawer student={selectedStudent} open={drawerOpen} onClose={handleDrawerClose} />
    </Box>
  );
}
