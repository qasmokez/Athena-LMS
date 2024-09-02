import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EnhancedTableToolbar({
  numSelected,
  handleDeleteSelected,
  filters,
  setFilters,
  fetchFilteredData, // Function to fetch data from backend
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [newFilterField, setNewFilterField] = useState('');
  const [newFilterValue, setNewFilterValue] = useState('');

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleAddFilter = () => {
    if (newFilterField && newFilterValue) {
      setFilters((prev) => [...prev, { field: newFilterField, value: newFilterValue }]);
      setNewFilterField('');
      setNewFilterValue('');
      handleFilterClose();
      fetchFilteredData(); // Simulate backend call
    }
  };

  const handleDeleteFilter = (index) => {
    setFilters((prev) => {
      const newFilters = prev.filter((_, i) => i !== index);
      fetchFilteredData(); // Update backend call when a filter is removed
      return newFilters;
    });
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
      {filters.map((filter, index) => (
        <Chip
          key={index}
          label={`${filter.field}: ${filter.value}`}
          onDelete={() => handleDeleteFilter(index)}
          sx={{ m: 1 }}
        />
      ))}
      <Tooltip title="Add filter">
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
        <Box sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="subtitle1" gutterBottom>
            添加筛选条件
          </Typography>
          <Select
            value={newFilterField}
            onChange={(e) => setNewFilterField(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="" disabled>
              筛选条件...
            </MenuItem>
            <MenuItem value="性别">性别</MenuItem>
            <MenuItem value="班级">班级</MenuItem>
            <MenuItem value="年级">年级</MenuItem>
            <MenuItem value="民族">民族 </MenuItem>
            <MenuItem value="出生日期">出生日期</MenuItem>
            <MenuItem value="年龄">年龄</MenuItem>
            <MenuItem value="入学时间">入学时间 </MenuItem>
            {/* Add more filter options as needed */}
          </Select>
          <TextField
            label="输入筛选值"
            value={newFilterValue}
            onChange={(e) => setNewFilterValue(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <IconButton onClick={handleAddFilter} color="primary">
            <AddIcon />
          </IconButton>
        </Box>
      </Popover>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleDeleteSelected: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
  fetchFilteredData: PropTypes.func.isRequired,
};