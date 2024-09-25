import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

// Helper function to calculate age from birth_date
const calculateAge = (birthDate) => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  
  return age;
};

// Ethnic and gender mapping
const ethnicMap = {
  man: '满族',
  han: '汉族'
};

const genderMap = {
  male: '男',
  female: '女'
};

function StudentTableRow({ row, isItemSelected, handleIconClick, handleCheckboxClick }) {
  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.uuid} // Use uuid as the key
      selected={isItemSelected}
      onClick={() => handleCheckboxClick(event, row.uuid)}
      sx={{ cursor: 'pointer' }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={isItemSelected}
          onClick={(event) => handleCheckboxClick(event, row.uuid)}
          inputProps={{ 'aria-labelledby': `enhanced-table-checkbox-${row.uuid}` }}
        />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">{row.name}</TableCell>
      <TableCell>{genderMap[row.sex] || row.sex}</TableCell> {/* Map gender */}
      <TableCell>{row.classes_id}</TableCell>
      <TableCell>{row.grade_id}</TableCell>
      <TableCell>{row.birth_date}</TableCell>
      <TableCell>{ethnicMap[row.ethnic] || row.ethnic}</TableCell>
      <TableCell>{row.student_id}</TableCell>
      <TableCell align="right">{calculateAge(row.birth_date)}</TableCell>
      <TableCell>{row.enroll_date}</TableCell>
      <TableCell align='left'>
        <IconButton onClick={() => handleIconClick(row)} >
          <MenuIcon sx={{marginRight:'60%'}}/>
        </IconButton>
      </TableCell>

    </TableRow>
  );
}

export default StudentTableRow;
