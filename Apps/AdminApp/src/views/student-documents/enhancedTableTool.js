import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Popover,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material/';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as XLSX from 'xlsx';
import SearchIcon from '@mui/icons-material/Search';

export default function EnhancedTableToolbar({
  numSelected,
  handleDeleteSelected,
  filters,
  setFilters,
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

  const SearchBar = ({  }) => {
      const [searchQuery, setSearchQuery] = useState('');
      const [searchBy, setSearchBy] = useState('student_id'); // Default search by student ID
    
      // Handle search click or pressing Enter
      const handleSearch = () => {
        if (searchQuery.trim() !== '') {
          const result = { [searchBy]: [searchQuery] };
          console.log(JSON.stringify(result));  // Logs the search query in the required format
        }
      };
    
      // Handle Enter key press
      const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();  // Prevents form submission or other default behavior
          handleSearch();
        }
      };


      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            size="small"
            placeholder="搜索"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px',
                backgroundColor: '#F4F5FA',
                padding: '0px 8px',
              },
              width: '270px',  // Adjusted to fit both dropdown and input
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ padding: 0, margin: 0 }}>
                  {/* Embedded Dropdown */}
                  <Select
                    value={searchBy}
                    onChange={(event) => setSearchBy(event.target.value)}
                    size="small"
                    sx={{
                      fontSize: '0.875rem',
                      color: '#000',
                      width: '80px',  // Adjust width for select component
                      ml: '-9px',     // Adjust margin to avoid too much space
                      boxSizing: 'border-box',
                      '& .MuiSelect-select': {
                        display: 'flex',
                        alignItems: 'center',  // Ensure the content is vertically centered
                      },
                      '& .MuiSelect-icon': {
                        right: '8px',  // Adjust the position of the dropdown arrow
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',  // Remove the border
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: 'none',  // No border on hover
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: 'none',  // No border on focus
                      },
                    }}
                  
                  >
                    <MenuItem value="student_id">学号</MenuItem>
                    <MenuItem value="student_name">姓名</MenuItem>
                  </Select>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{cursor:'pointer'}}fontSize="small" onClick={handleSearch}/>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      );
    };
    

  const handleAddFilter = () => {
    if (newFilterField && newFilterValue) {
      setFilters((prev) => {
        const newFilters = [...prev, { field: newFilterField, value: newFilterValue }];
        return newFilters;
      });
      setNewFilterField('');
      setNewFilterValue('');
      handleFilterClose();
    }
  };
  
  const handleDeleteFilter = (index) => {
    setFilters((prev) => {
      const newFilters = prev.filter((_, i) => i !== index);
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
        let tempStudentInfo = { ...defaultForm }
        tempStudentInfo['id'] = studentExcel[index]['学生号'];
        tempStudentInfo['姓名'] = studentExcel[index]['姓'] + studentExcel[index]['名'];
        tempStudentInfo['性别'] = studentExcel[index]['性别'];
        tempStudentInfo['班级'] = studentExcel[index]['班级'];
        tempStudentInfo['年级'] = studentExcel[index]['年级'];
        tempStudentInfo['出生日期'] = studentExcel[index]['出生日期'];
        tempStudentInfo['民族'] = studentExcel[index]['民族'];
        tempStudentInfo['年龄'] = studentExcel[index]['年龄'];
        tempStudentInfo['入学日期'] = studentExcel[index]['入学时间'];
        tempStudentInfo['身份证号'] = studentExcel[index]['身份证号'];
        tempStudentInfo['父亲姓名'] = studentExcel[index]['父亲姓名'];
        tempStudentInfo['父亲联系手机号'] = studentExcel[index]['父亲手机号'];
        tempStudentInfo['母亲姓名'] = studentExcel[index]['母亲姓名'];
        tempStudentInfo['母亲联系手机号'] = studentExcel[index]['母亲手机号'];
        tempStudentInfo['家庭住址'] = studentExcel[index]['家庭住址'];

        /* tempStudentInfo['紧急联系人姓名'] = studentExcel[index][''];
        tempStudentInfo['紧急联系人手机号'] = studentExcel[index][''];
        tempStudentInfo['个人照片'] = studentExcel[index][''];
        tempStudentInfo['体检报告'] = studentExcel[index]['']; */
        toAdd.push(tempStudentInfo);
      } 
      
      return toAdd;
  }

  return (
    <Toolbar>
      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <Typography variant="h6" id="tableTitle" component="div" sx={{ ml:3, mr: 6}}>
          学生信息
        </Typography>
        <SearchBar />
      </Box>

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

      <Tooltip title="Delete">
        <IconButton onClick={handleDeleteSelected}>
          <DeleteIcon />
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
        <Box sx={{ p: 2, minWidth: 200}}>
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
            <MenuItem value="sex">性别</MenuItem>
            <MenuItem value="class_id">班级</MenuItem>
            <MenuItem value="grade_id">年级</MenuItem>
            <MenuItem value="ethnic">民族 </MenuItem>
            <MenuItem value="birth_date">出生日期</MenuItem>
            <MenuItem value="age">年龄</MenuItem>
            <MenuItem value="enroll_date">入学时间 </MenuItem>
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
      <Button variant="contained" style={{whiteSpace: 'nowrap'}} sx={{m:3}} onClick = {()=>{handleAddStudent()}}>添加学生</Button>
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
  filters: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
  fetchFilteredData: PropTypes.func.isRequired,
};