import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: '学生姓名' },
  { id: 'sex', numeric: false, disablePadding: false, label: '性别' },
  { id: 'classes_id', numeric: false, disablePadding: false, label: '班级' },
  { id: 'grade_id', numeric: false, disablePadding: false, label: '年级' },
  { id: 'birth_date', numeric: false, disablePadding: false, label: '出生日期' },
  { id: 'ethnic', numeric: false, disablePadding: false, label: '民族' },
  { id: 'student_id', numeric: false, disablePadding: false, label: '学生ID' },
  { id: '年龄', numeric: true, disablePadding: false, label: '年龄' }, 
  { id: 'enroll_date', numeric: false, disablePadding: false, label: '入学时间' },
  { id: 'actions', numeric: false, disablePadding: false, label: '操作' }, 
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, onSelectAllClick, numSelected, rowCount } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{backgroundColor:'#F6F7FB'}}>
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
            {headCell.id !== 'name' && headCell.id !== 'enroll_date' && headCell.id !== '年龄' && headCell.id !== 'student_id' && headCell.id !== 'ethnic' && headCell.id !== 'actions' ? (
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
              headCell.label
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
  filters: PropTypes.array.isRequired, // Pass filters as a prop
};

export default EnhancedTableHead;
