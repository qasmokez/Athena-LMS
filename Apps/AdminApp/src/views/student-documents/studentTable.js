import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

// 登陆后 向后端请求学生信息
// 如果按照【手机号，父母名，小组id】查询则从新向后端请求
// 目前包含基础查询 除了 【姓】- 还未确定后端输出中文名还是英文名
const students = [
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
  },
  {
    id: '003',
    姓: '王',
    名: '伟',
    性别: '男',
    班级: '6班',
    年级: '五年级',
    出生日期: '2012-05-12',
    民族: '汉族',
    年龄: 14,
    入学时间: '2019-09-01',
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

const headCells = [
  { id: '姓', numeric: false, disablePadding: true, label: '姓' },
  { id: '名', numeric: false, disablePadding: false, label: '名' },
  { id: '性别', numeric: false, disablePadding: false, label: '性别' },
  { id: '班级', numeric: false, disablePadding: false, label: '班级' },
  { id: '年级', numeric: false, disablePadding: false, label: '年级' },
  { id: '出生日期', numeric: false, disablePadding: false, label: '出生日期' },
  { id: '民族', numeric: false, disablePadding: false, label: '民族' },
  { id: 'id', numeric: false, disablePadding: false, label: '学生ID' },
  { id: '年龄', numeric: true, disablePadding: false, label: '年龄' },
  { id: '入学时间', numeric: false, disablePadding: false, label: '入学时间' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    // Prevent sorting for '名', '年级', '班级', and '姓' columns
    if (property === '名' || property === '年级' || property === '班级' || property === '姓') return;
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id !== '名' && headCell.id !== '年级' && headCell.id !== '班级' && headCell.id !== '姓' ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label // Just show the label without the sort icon
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar({
  selectedClasses,
  setSelectedClasses,
  selectedGrades,
  setSelectedGrades,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleClassChange = (event) => {
    const value = event.target.value;
    setSelectedClasses((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleGradeChange = (event) => {
    const value = event.target.value;
    setSelectedGrades((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <Toolbar>
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        学生信息
      </Typography>
      <Tooltip title="Filter list">
        <IconButton onClick={handleFilterClick}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1">按班级过滤</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedClasses.includes('1班')}
                  onChange={handleClassChange}
                  value="1班"
                />
              }
              label="1班"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedClasses.includes('2班')}
                  onChange={handleClassChange}
                  value="2班"
                />
              }
              label="2班"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedClasses.includes('6班')}
                  onChange={handleClassChange}
                  value="6班"
                />
              }
              label="6班"
            />
          </FormGroup>
          <Typography variant="subtitle1">按年级过滤</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedGrades.includes('三年级')}
                  onChange={handleGradeChange}
                  value="三年级"
                />
              }
              label="三年级"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedGrades.includes('二年级')}
                  onChange={handleGradeChange}
                  value="二年级"
                />
              }
              label="二年级"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedGrades.includes('五年级')}
                  onChange={handleGradeChange}
                  value="五年级"
                />
              }
              label="五年级"
            />
          </FormGroup>
        </Box>
      </Popover>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  selectedClasses: PropTypes.array.isRequired,
  setSelectedClasses: PropTypes.func.isRequired,
  selectedGrades: PropTypes.array.isRequired,
  setSelectedGrades: PropTypes.func.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [selectedClasses, setSelectedClasses] = React.useState([]);
  const [selectedGrades, setSelectedGrades] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          selectedClasses={selectedClasses}
          setSelectedClasses={setSelectedClasses}
          selectedGrades={selectedGrades}
          setSelectedGrades={setSelectedGrades}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow hover key={row.id} sx={{ cursor: 'pointer' }}>
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
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={10} />
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
    </Box>
  );
}