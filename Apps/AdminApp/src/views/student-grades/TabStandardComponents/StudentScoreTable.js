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
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

const students = [
    {
      学生姓名: '张伟',
      学生学号: '001',
      年级: '三年级',
      班级: '1班',
      考试时间: '2024-09-01',
      考试场次: '2024 秋',
      语文分数: 85,
      数学分数: 90,
      英语分数: 88
    },
    {
      学生姓名: '李芳',
      学生学号: '002',
      年级: '二年级',
      班级: '2班',
      考试时间: '2024-09-02',
      考试场次: '2024 春',
      语文分数: 92,
      数学分数: 78,
      英语分数: 95
    },
    {
      学生姓名: '王大卫',
      学生学号: '003',
      年级: '五年级',
      班级: '6班',
      考试时间: '2024-09-03',
      考试场次: '2024 秋',
      语文分数: 75,
      数学分数: 82,
      英语分数: 80
    }
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
    { id: '学生姓名', numeric: false, disablePadding: true, label: '学生姓名' },
    { id: '学生学号', numeric: false, disablePadding: false, label: '学生学号' },
    { id: '年级', numeric: false, disablePadding: false, label: '年级' },
    { id: '班级', numeric: false, disablePadding: false, label: '班级' },
    { id: '考试时间', numeric: false, disablePadding: false, label: '考试时间' },
    { id: '考试场次', numeric: false, disablePadding: false, label: '考试场次' },
    { id: '语文分数', numeric: true, disablePadding: false, label: '语文分数' },
    { id: '数学分数', numeric: true, disablePadding: false, label: '数学分数' },
    { id: '英语分数', numeric: true, disablePadding: false, label: '英语分数' }
];
  

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, onSelectAllClick, numSelected, rowCount} = props;
  const createSortHandler = (property) => (event) => {
    // Prevent sorting for '名', '年级', '班级', and '姓' columns
    if (property === '名' || property === '年级' || property === '班级' || property === '姓') return;
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all students' }}
          />
        </TableCell>
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
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar({
  numSelected,
  selectedClasses,
  setSelectedClasses,
  selectedGrades,
  setSelectedGrades,
  handleDeleteSelected,
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
        学生成绩
      </Typography>
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteSelected}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
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
        </Box>
      </Popover>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selectedClasses: PropTypes.array.isRequired,
  setSelectedClasses: PropTypes.func.isRequired,
  selectedGrades: PropTypes.array.isRequired,
  setSelectedGrades: PropTypes.func.isRequired,
  handleDeleteSelected: PropTypes.func.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [selected, setSelected] = React.useState([]);

  const [selectedClasses, setSelectedClasses] = React.useState([]);
  const [selectedGrades, setSelectedGrades] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = students.map((n) => n.学生学号); 
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (event, id) => {
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

  // request the selected students to be deleted from the backend
  const handleDeleteSelected = () => {
    // Implement the delete functionality here
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
                const isItemSelected = isSelected(row.学生学号);
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleCheckboxClick(event, row.学生学号)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.学生学号}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onClick={(event) => handleCheckboxClick(event, row.学生学号)}
                        inputProps={{ 'aria-labelledby': `enhanced-table-checkbox-${row.学生学号}` }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">{row.学生姓名}</TableCell>
                    <TableCell>{row.学生学号}</TableCell>
                    <TableCell>{row.年级}</TableCell>
                    <TableCell>{row.班级}</TableCell>
                    <TableCell>{row.考试时间}</TableCell>
                    <TableCell>{row.考试场次}</TableCell>
                    <TableCell align="right">{row.语文分数}</TableCell>
                    <TableCell align="right">{row.数学分数}</TableCell>
                    <TableCell align="right">{row.英语分数}</TableCell>
                  </TableRow>
                );
              })}
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