import React, { useState } from 'react';
import PropTypes from 'prop-types';
/* import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box'; */
import {Toolbar, Typography,IconButton,Tooltip, Popover,Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,styled,} from '@mui/material/';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as XLSX from 'xlsx';

export default function EnhancedTableToolbar({
  numSelected,
  handleDeleteSelected,
  filters,
  setFilters,
  fetchFilteredData, // Function to fetch data from backend
  data, //temp data used to test addStudent
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

  // 添加学生
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const handleAddStudent = () => {
    setAddStudentOpen(true);
  };
  const handleClose = () => {
    // reset form content to default student info
    setFormContent(defaultForm);
    setAddStudentOpen(false);
  };
  const handleAdd = () =>{
    //console.log(formContent)
    data[1]([...data[0], formContent]);
    setAddStudentOpen(false);
    setFormContent(defaultForm);
  }
  const addStudentFields = ['id','姓名','性别','班级','年级','出生日期','民族','年龄','入学时间',];
  const addStudentFieldsEng = ['name','sex','class','grade','birthday','race','student id','age','enrollment date',];
  const defaultForm = {
    id: '',
    姓名: '',
    性别: '',
    班级: '',
    年级: '',
    出生日期: '',
    民族: '',
    年龄: 0,
    入学时间: '',
    拓展信息: {
      身份证号: '',
      父亲姓名: '',
      父亲联系手机号: '',
      母亲姓名: '',
      母亲联系手机号: '',
      紧急联系人姓名: '',
      紧急联系人手机号: '',
      家庭住址: '',
      个人照片: '/images/avatars/1.png',
      体检报告: '',
    },
  }
  const [formContent, setFormContent] = useState(defaultForm);
  
  const handleChangeForm = (field) => (event) => {
    setFormContent((prevContent) => ({
      ...prevContent,
      [field]: event.target.value, // Updates the field's value in the state object
    }));
  };
  // for file upload and processing for addStudent
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleFileUpload = (event)=> {
    const file = event.target.files[0]; // Get the file from the input
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = new Uint8Array(e.target.result);
      const workbook = XLSX.read(fileData, { type: 'array' });
  
      // Assuming fileData is in the first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
  
      // Convert sheet fileData to JSON
      const dataArray = XLSX.utils.sheet_to_json(sheet);
  
      console.log(dataArray); // Array of objects

      //update current data part
      //console.log(data[0].concat(parseStudentInfo(dataArray)))
      data[1](data[0].concat(parseStudentInfo(dataArray)));
      setAddStudentOpen(false);
      setFormContent(defaultForm);
    };
  
    reader.readAsArrayBuffer(file); // Read the file as array buffer
  }

  const parseStudentInfo = (studentExcel)=> {
      const toAdd = [];
      for(let index=0; index<studentExcel.length; index++){
        let tempStudentInfo = defaultForm;
        tempStudentInfo['id'] = studentExcel[index]['学生号'];
        tempStudentInfo['姓名'] = studentExcel[index]['姓'] + studentExcel[index]['名'];
        tempStudentInfo['性别'] = studentExcel[index]['性别'];
        tempStudentInfo['班级'] = studentExcel[index]['班级'];
        tempStudentInfo['年级'] = studentExcel[index]['年级'];
        tempStudentInfo['出生日期'] = studentExcel[index]['出生日期'];
        tempStudentInfo['民族'] = studentExcel[index]['民族'];
        tempStudentInfo['年龄'] = studentExcel[index]['年龄'];
        tempStudentInfo['入学日期'] = studentExcel[index]['入学时间'];
        tempStudentInfo['拓展信息']['身份证号'] = studentExcel[index]['身份证号'];
        tempStudentInfo['拓展信息']['父亲姓名'] = studentExcel[index]['父亲姓名'];
        tempStudentInfo['拓展信息']['父亲联系手机号'] = studentExcel[index]['父亲手机号'];
        tempStudentInfo['拓展信息']['母亲姓名'] = studentExcel[index]['母亲姓名'];
        tempStudentInfo['拓展信息']['母亲联系手机号'] = studentExcel[index]['母亲手机号'];
        tempStudentInfo['拓展信息']['家庭住址'] = studentExcel[index]['家庭住址'];
        /* tempStudentInfo['拓展信息']['紧急联系人姓名'] = studentExcel[index][''];
        tempStudentInfo['拓展信息']['紧急联系人手机号'] = studentExcel[index][''];
        tempStudentInfo['拓展信息']['个人照片'] = studentExcel[index][''];
        tempStudentInfo['拓展信息']['体检报告'] = studentExcel[index]['']; */
        toAdd.push(tempStudentInfo);
      }
      return toAdd;
  }

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
      <Button variant="contained" style={{whiteSpace: 'nowrap'}} onClick = {()=>{handleAddStudent()}}>添加学生</Button>
      <Dialog open={addStudentOpen} onClose={handleClose}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Excel File
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => handleFileUpload(event)}
                multiple
                accept=".xlsx, .xls" 
              />
            </Button>
          {addStudentFields.map((field)=>(
            <TextField margin="dense" label={field} key={field} onChange={handleChangeForm(field)} fullWidth />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose()} color="primary">
            Cancel
          </Button>
          <Button onClick={(e)=>handleAdd(e)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
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