// StudentTableRow.js
import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';

function StudentTableRow({ row, isItemSelected, handleRowClick, handleCheckboxClick }) {
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
      <TableCell component="th" scope="row" padding="none">{row.姓名}</TableCell>
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
}

export default StudentTableRow;