// filtering and deletion functionality.

import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';

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
        学生信息
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
  numSelected: PropTypes.number.isRequired,
  selectedClasses: PropTypes.array.isRequired,
  setSelectedClasses: PropTypes.func.isRequired,
  selectedGrades: PropTypes.array.isRequired,
  setSelectedGrades: PropTypes.func.isRequired,
  handleDeleteSelected: PropTypes.func.isRequired,
};

export default EnhancedTableToolbar;
