import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Select,
  MenuItem,
  InputAdornment,
  Grid,  // Added Grid for layout
  InputLabel,
  FormControl
} from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as XLSX from 'xlsx';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';

export default function EnhancedTableToolbar({
  numSelected,
  handleDeleteSelected,
  filters,
  setFilters,
  data,
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

  const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchBy, setSearchBy] = useState('student_id');

    const handleSearch = () => {
      if (searchQuery.trim() !== '') {
        const result = { [searchBy]: searchQuery };
        console.log(JSON.stringify(result));
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
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
            width: '270px',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ padding: 0, margin: 0 }}>
                <Select
                  value={searchBy}
                  onChange={(event) => setSearchBy(event.target.value)}
                  size="small"
                  sx={{
                    fontSize: '0.875rem',
                    color: '#000',
                    width: '80px',
                    ml: '-9px',
                    boxSizing: 'border-box',
                    '& .MuiSelect-select': {
                      display: 'flex',
                      alignItems: 'center',
                    },
                    '& .MuiSelect-icon': {
                      right: '8px',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
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
                <SearchIcon sx={{ cursor: 'pointer' }} fontSize="small" onClick={handleSearch} />
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

  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const handleAddStudent = () => {
    setAddStudentOpen(true);
  };

  const handleClose = () => {
    setFormContent(defaultForm);
    setAddStudentOpen(false);
  };

  const handleAdd = () => {
    // Log the specified fields
    console.log({
      name: formContent.name,
      gender: formContent.gender,
      classes_id: formContent.classes_id,
      grade_id: formContent.grade_id,
      birth_date: formContent.birth_date,
      ethnic: formContent.ethnic,
      student_id: formContent.student_id,
      enroll_date: formContent.enroll_date,
      id_number: formContent.id_number,
      address: formContent.address,
    });
  
    // Reset the form and close the dialog
    setFormContent(defaultForm);
    setAddStudentOpen(false);
  };
  

  const defaultForm = {
    name: '',
    gender: '',
    classes_id: '',
    grade_id: '',
    birth_date: '',
    ethnic: '',
    student_id: '',
    enroll_date: '',
    id_number: '',
    address: '',
  };
  const [formContent, setFormContent] = useState(defaultForm);

  const handleChangeForm = (field) => (event) => {
    setFormContent((prevContent) => ({
      ...prevContent,
      [field]: event.target.value,
    }));
  };

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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = new Uint8Array(e.target.result);
      const workbook = XLSX.read(fileData, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const dataArray = XLSX.utils.sheet_to_json(sheet);
      data[1](data[0].concat(parseStudentInfo(dataArray)));
      setAddStudentOpen(false);
      setFormContent(defaultForm);
    };
    reader.readAsArrayBuffer(file);
  };

  const parseStudentInfo = (studentExcel) => {
    return studentExcel.map((student) => ({
      ...defaultForm,
      id: student['学生号'],
      name: student['姓'] + student['名'],
      sex: student['性别'],
      classes_id: student['班级'],
      grade_id: student['年级'],
      birth_date: student['出生日期'],
      ethnic: student['民族'],
      enroll_date: student['入学时间'],
      id_number: student['身份证号'],
      address: student['家庭住址'],
    }));
  };

  const handleDownloadTemplate = () => {
    // Replace 'template-url' with the actual path where your template is stored.
    const templateUrl = '/images/学生信息录入模板.xlsx'; 
  
    // Create an invisible link element, simulate a click to trigger the download
    const link = document.createElement('a');
    link.href = templateUrl;
    link.setAttribute('download', 'student_upload_template.xlsx'); // Set the desired file name for the download
  
    // Append the link to the document body and trigger the click
    document.body.appendChild(link);
    link.click();
  
    // Clean up by removing the link from the DOM
    document.body.removeChild(link);
  };

  return (
    <Toolbar>
      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <Typography variant="h6" id="tableTitle" component="div" sx={{ ml: 3, mr: 6 }}>
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
      
      <Button variant="contained" sx={{ m: 3 }} onClick={handleAddStudent}>
        添加学生
      </Button>
      
      <Dialog open={addStudentOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <Box sx={{display:'flex', justifyContent:"space-between", mt:3 }}>
            <Typography variant="h6" sx={{paddingLeft:'20px'}}>
              添加学生
            </Typography>
            <IconButton onClick={handleClose}> 
              <CloseIcon sx={{mr:2}}/>
            </IconButton>
        </Box>
        <Divider />
        <DialogContent>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ mb: 2, mt:-2 }}
          >
            上传Excel文件
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileUpload}
              multiple
              accept=".xlsx, .xls"
            />
          </Button>
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="学生姓名"
                value={formContent.name}
                onChange={handleChangeForm('name')}
                fullWidth
                margin="dense"
                required
                InputLabelProps={{
                  sx: {
                    '& .MuiInputLabel-asterisk': {
                      color: 'red',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="dense" required>
                <InputLabel 
                  sx={{
                    '& .MuiInputLabel-asterisk': {
                      color: 'red',
                    },
                  }}
                >
                  性别
                </InputLabel>
                <Select
                  value={formContent.sex}
                  onChange={handleChangeForm('sex')}
                  label="性别"
                >
                  <MenuItem key={'male'} value={'男'}>
                    男
                  </MenuItem>
                  <MenuItem key={'female'} value={'女'}>
                    女
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Add more fields in a similar way */}
            {/* Grade and Class */}
            <Grid item xs={6}>
              <TextField
                label="年级"
                value={formContent.grade_id}
                onChange={handleChangeForm('grade_id')}
                fullWidth
                margin="dense"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="班级"
                value={formContent.classes_id}
                onChange={handleChangeForm('classes_id')}
                fullWidth
                margin="dense"
              />
            </Grid>

            {/* Other fields */}
            <Grid item xs={12}>
              <TextField
                label="出生日期"
                value={formContent.birth_date}
                onChange={handleChangeForm('birth_date')}
                fullWidth
                margin="dense"
                required
                InputLabelProps={{
                  sx: {
                    '& .MuiInputLabel-asterisk': {
                      color: 'red',
                    },
                  },
                }}
              />
            </Grid>
    
            <Grid item xs={6}>
              <TextField
                label="民族"
                value={formContent.ethnic}
                onChange={handleChangeForm('ethnic')}
                fullWidth
                margin="dense"
                required
                InputLabelProps={{
                  sx: {
                    '& .MuiInputLabel-asterisk': {
                      color: 'red',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="学生id"
                value={formContent.id}
                onChange={handleChangeForm('id')}
                fullWidth
                margin="dense"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="入学日期"
                value={formContent.enroll_date}
                onChange={handleChangeForm('enroll_date')}
                fullWidth
                margin="dense"
                required
                InputLabelProps={{
                  sx: {
                    '& .MuiInputLabel-asterisk': {
                      color: 'red',
                    },
                  },
                }}
              />
            </Grid>

            {/* ID, Address */}
            <Grid item xs={12}>
              <TextField
                label="身份证号"
                value={formContent.id_number}
                onChange={handleChangeForm('id_number')}
                fullWidth
                margin="dense"
                required
                InputLabelProps={{
                  sx: {
                    '& .MuiInputLabel-asterisk': {
                      color: 'red',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="家庭住址"
                value={formContent.address}
                onChange={handleChangeForm('address')}
                fullWidth
                margin="dense"
                required
                InputLabelProps={{
                  sx: {
                    '& .MuiInputLabel-asterisk': {
                      color: 'red',
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{mt:-2}}>
          {/* Outline button for downloading the template */}
          <Button onClick={handleDownloadTemplate} variant="outlined" color="primary">
            下载上传模版
          </Button>
          
          {/* Outline button for cancel */}
          <Button onClick={handleClose} variant="outlined" color="primary">
            取消
          </Button>
          
          {/* Default button for adding */}
          <Button onClick={handleAdd} variant="contained" color="primary">
            添加
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
