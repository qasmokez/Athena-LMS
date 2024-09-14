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
import Checkbox from '@mui/material/Checkbox';
import Popover from '@mui/material/Popover';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

const students = [
  {
    学生姓名: '张伟',
    学生学号: '001',
    年级: '三年级',
    班级: '1班',
    德: { 分数: 95, 特等生: true },
    智: { 分数: 88, 特等生: true },
    体: { 分数: 90, 特等生: true },
    美: { 分数: 85, 特等生: false },
    劳: { 分数: 92, 特等生: true }
  },
  {
    学生姓名: '李芳',
    学生学号: '002',
    年级: '二年级',
    班级: '2班',
    德: { 分数: 85, 特等生: false },
    智: { 分数: 78, 特等生: false },
    体: { 分数: 80, 特等生: false },
    美: { 分数: 92, 特等生: true },
    劳: { 分数: 88, 特等生: false }
  },
  {
    学生姓名: '王大卫',
    学生学号: '003',
    年级: '五年级',
    班级: '6班',
    德: { 分数: 90, 特等生: true },
    智: { 分数: 82, 特等生: false },
    体: { 分数: 85, 特等生: true },
    美: { 分数: 75, 特等生: false },
    劳: { 分数: 80, 特等生: false }
  }
];

const headCells = [
  { id: '学生姓名', numeric: false, disablePadding: true, label: '学生姓名' },
  { id: '学生学号', numeric: false, disablePadding: false, label: '学生学号' },
  { id: '年级', numeric: false, disablePadding: false, label: '年级' },
  { id: '班级', numeric: false, disablePadding: false, label: '班级' },
  { id: '德', numeric: false, disablePadding: false, label: '德' },
  { id: '智', numeric: true, disablePadding: false, label: '智' },
  { id: '体', numeric: true, disablePadding: false, label: '体' },
  { id: '美', numeric: true, disablePadding: false, label: '美' },
  { id: '劳', numeric: true, disablePadding: false, label: '劳' }
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, onSelectAllClick, numSelected, rowCount } = props;
  const createSortHandler = (property) => (event) => {
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
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
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

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('学生学号');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState(null);

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

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
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
    return students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [page, rowsPerPage]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar>
          <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
            学生成绩
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
                <FormControlLabel control={<Checkbox />} label="1班" />
                <FormControlLabel control={<Checkbox />} label="2班" />
                <FormControlLabel control={<Checkbox />} label="6班" />
              </FormGroup>
            </Box>
          </Popover>
        </Toolbar>
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
                    {['德', '智', '体', '美', '劳'].map((key) => (
                      <TableCell align="center" key={key}>
                        {row[key].分数}
                        {row[key].特等生 ? (
                          <Tooltip title="年级前十">
                            <StarIcon sx={{ fontSize: 12, color: 'gold', mb: 1.5 }} />
                          </Tooltip>
                        ) : (
                          <StarBorderIcon sx={{ fontSize: 12, color: 'transparent', mb: 1.5  }} />
                        )}
                      </TableCell>
                    ))}
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
