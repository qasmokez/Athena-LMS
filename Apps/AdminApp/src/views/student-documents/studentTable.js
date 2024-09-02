import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import EnhancedTableHead from './enhancedTableHead';
import EnhancedTableToolbar from './enhancedTableTool';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';

// 登陆后 向后端请求学生信息
// 如果按照【手机号，父母名，小组id】查询则从新向后端请求
// 目前包含基础查询 除了 【姓】- 还未确定后端输出中文名还是英文名
const students = [
  // Sample data for students
  {
    id: '001',
    姓: '张',
    名: '伟',
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
    姓: '李',
    名: '芳',
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
    姓: '王',
    名: '大卫',
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
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function EnhancedTable() {
  // 排序
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  // 分页
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // 选择的行 -> 用于删除
  const [selected, setSelected] = React.useState([]);
  // 筛选条件 -> 班级、年级 后续添加....
  const [selectedClasses, setSelectedClasses] = React.useState([]);
  const [selectedGrades, setSelectedGrades] = React.useState([]);
  // 右侧panel
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState(null);

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
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const visibleRows = React.useMemo(() => {
    let filteredStudents = [...students];

    if (selectedClasses.length > 0) {
      filteredStudents = filteredStudents.filter((student) =>
        selectedClasses.includes(student.班级)
      );
    }

    if (selectedGrades.length > 0) {
      filteredStudents = filteredStudents.filter((student) =>
        selectedGrades.includes(student.年级)
      );
    }

    return filteredStudents
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [order, orderBy, page, rowsPerPage, selectedClasses, selectedGrades]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - visibleRows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selectedClasses={selectedClasses}
          setSelectedClasses={setSelectedClasses}
          selectedGrades={selectedGrades}
          setSelectedGrades={setSelectedGrades}
          handleDeleteSelected={handleDeleteSelected}
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
            />
            <TableBody>
              {visibleRows.map((row) => {
                const isItemSelected = isSelected(row.id);
                return (
                  <TableRow
                    hover 
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    onClick={() => handleRowClick(row)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onClick={(event) => handleCheckboxClick(event, row.id)}
                        inputProps={{ 'aria-labelledby': `enhanced-table-checkbox-${row.id}` }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">{row.姓}</TableCell>
                    <TableCell>{row.名}</TableCell>
                    <TableCell>{row.性别}</TableCell>
                    <TableCell>{row.班级}</TableCell>
                    <TableCell>{row.年级}</TableCell>
                    <TableCell>{row.出生日期}</TableCell>
                    <TableCell>{row.民族}</TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell align="right">{row.年龄}</TableCell>
                    <TableCell>{row.入学时间}</TableCell>
                  </TableRow>
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
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{ width: 300, flexShrink: 0, '& .MuiDrawer-paper': { width: 300 } }}
      >
        {selectedStudent && (
          <Box sx={{ p: 2 }}>
            {/* User Profile Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                alt="学生照片"
                src={selectedStudent.拓展信息.个人照片}
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <Box>
                <Typography variant="h6">{selectedStudent.姓}{selectedStudent.名}</Typography>
                <Typography variant="body2">{selectedStudent.id}</Typography>
              </Box>
            </Box>
            {/* Expanded Information with Icons and Bold Titles */}
            <List>
              <ListItem>
                <ListItemIcon><BadgeIcon /></ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        身份证号:
                      </Typography>
                      {selectedStudent.拓展信息.身份证号}
                    </>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        父亲姓名:
                      </Typography>
                      {selectedStudent.拓展信息.父亲姓名}
                    </>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><PhoneIcon /></ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        父亲联系手机号:
                      </Typography>
                      {selectedStudent.拓展信息.父亲联系手机号}
                    </>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        母亲姓名:
                      </Typography>
                      {selectedStudent.拓展信息.母亲姓名}
                    </>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><PhoneIcon /></ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        母亲联系手机号:
                      </Typography>
                      {selectedStudent.拓展信息.母亲联系手机号}
                    </>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        紧急联系人姓名:
                      </Typography>
                      {selectedStudent.拓展信息.紧急联系人姓名}
                    </>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><PhoneIcon /></ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        紧急联系人手机号:
                      </Typography>
                      {selectedStudent.拓展信息.紧急联系人手机号}
                    </>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><LocationOnIcon /></ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        家庭住址:
                      </Typography>
                      {selectedStudent.拓展信息.家庭住址}
                    </>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><AssignmentIcon /></ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        体检报告:
                      </Typography>
                      {selectedStudent.拓展信息.体检报告}
                    </>
                  }
                />
              </ListItem>
            </List>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}
