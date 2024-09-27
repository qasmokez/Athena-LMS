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
  Grid,  
  Popover,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as XLSX from 'xlsx';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';

// calendar imports
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'; 

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
    if (newFilterField) {
      let newFilterValueFormatted = newFilterValue;
  
      // Special case for 年级和班级
      if (newFilterField === '年级和班级' && selectedGrade && selectedClasses.length > 0) {
        // Combine selected grade and class into the format 一年级2班
        newFilterValueFormatted = selectedClasses.map((className) => `${selectedGrade}${className}`);
      }
      // Handle date ranges for 出生日期 and 入学时间
      if (newFilterField === '出生日期' && birthStartDate && birthEndDate) {
        newFilterValueFormatted = [
          birthStartDate.toISOString().substring(0, 10),
          birthEndDate.toISOString().substring(0, 10),
        ];
      } else if (newFilterField === '入学时间' && enrollStartDate && enrollEndDate) {
        newFilterValueFormatted = [
          enrollStartDate.toISOString().substring(0, 10),
          enrollEndDate.toISOString().substring(0, 10),
        ];
      }
  
      // Use the formatted value 
      setFilters((prev) => {
        const newFilters = [...prev, { field: newFilterField, value: newFilterValueFormatted }];
        return newFilters;
      });
  
      // Reset the fields after adding the filter
      setNewFilterField('');
      setNewFilterValue('');
      setSelectedClasses([]);
      setSelectedGrade('');
      setSelectedGender('');
      setBirthStartDate(null);
      setBirthEndDate(null);
      setEnrollStartDate(null);
      setEnrollEndDate(null);
      handleFilterClose();
    }
  };

  // Mapping from Chinese values to English values
  const ethnicMapping = {
    "汉": "han",
    "满": "man",
  };
  
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [birthStartDate, setBirthStartDate] = useState(null);
  const [birthEndDate, setBirthEndDate] = useState(null);
  const [enrollStartDate, setEnrollStartDate] = useState(null);
  const [enrollEndDate, setEnrollEndDate] = useState(null);

  const handleFilterDateChange = (field, dateType) => (date) => {
    if (field === '出生日期') {
      if (dateType === 'start') {
        setBirthStartDate(date);
      } else {
        setBirthEndDate(date);
      }
    } else if (field === '入学时间') {
      if (dateType === 'start') {
        setEnrollStartDate(date);
      } else {
        setEnrollEndDate(date);
      }
    }
  };

  const handleClassChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedClasses(typeof value === 'string' ? value.split(',') : value);
    setNewFilterValue(value); // Ensure that the selected value is used for filtering
  };

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    setNewFilterValue(event.target.value);
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
    const errors = {};

    // Check if required fields are empty
    if (!formContent.name.trim()) errors.name = '学生姓名不能为空';
    if (!formContent.gender) errors.gender = '性别不能为空';
    if (!formContent.birth_date.trim()) errors.birth_date = '出生日期不能为空';
    if (!formContent.ethnic.trim()) errors.ethnic = '民族不能为空';
    if (!formContent.enroll_date.trim()) errors.enroll_date = '入学日期不能为空';
    if (!formContent.id_number.trim()) errors.id_number = '身份证号不能为空';
    if (!formContent.address.trim()) errors.address = '家庭住址不能为空';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

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
    setFormErrors({});
    setAddStudentOpen(false);
  };
  
  const [formErrors, setFormErrors] = useState({});

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
  
      // Parse and log the data from the Excel file
      const parsedData = parseStudentInfo(dataArray);
      console.log("Parsed Excel Data: ", parsedData); // Log the parsed data
  
      // Reset form and close dialog
      setAddStudentOpen(false);
      setFormContent(defaultForm);
    };
  
    reader.readAsArrayBuffer(file);
  };
  
  const parseStudentInfo = (studentExcel) => {
    return studentExcel
      .map((student) => {
        const parsedStudent = {
          id: student['学生号'],
          name: student['姓'] + student['名'],
          gender: student['性别'],
          classes_id: student['班级'],
          grade_id: student['年级'],
          birth_date: student['出生日期'],
          ethnic: student['民族'],
          student_id: student['学生号'],
          enroll_date: student['入学时间'],
          id_number: student['身份证号'],
          address: student['家庭住址'],
        };
    
        // Validate the parsed student data to ensure all required fields are present
        if (
          !parsedStudent.name ||
          !parsedStudent.gender ||
          !parsedStudent.birth_date ||
          !parsedStudent.ethnic ||
          !parsedStudent.enroll_date ||
          !parsedStudent.id_number ||
          !parsedStudent.address
        ) {
          console.warn("Skipping invalid student: ", parsedStudent); // Log the invalid entry
          return null;  // Return null for invalid students
        }
        // Log the parsed student data for each student
        console.log("Student Data from Excel: ", parsedStudent);
        return parsedStudent; // Return valid student data
      })
      .filter(Boolean); // Filter out null entries (invalid students)
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

  const handleDateChange = (field) => (date) => {
    const formattedDate = date ? date.toISOString().substring(0, 10) : ''; // Format date to yyyy-MM-dd
    setFormContent((prevContent) => ({
      ...prevContent,
      [field]: formattedDate,
    }));
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
          label={
            filter.field === '年级和班级'
              ? `${filter.value.join(', ')}`
              : `${filter.field}: ${filter.value}`
          }
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
        slotProps={{
          paper: {
            sx: {
              width: '300px',  // Constrain the width
              maxHeight: '300px',  // Constrain the height
              overflow: 'visible',   // Ensure content can scroll if too long
            },
          },
        }}
      >
        <Box sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="subtitle1" gutterBottom>
            添加筛选条件
          </Typography>
          <IconButton
            onClick={handleAddFilter}
            color="primary"
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <AddIcon />
          </IconButton>
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
            <MenuItem value="民族">民族 </MenuItem>
            <MenuItem value="出生日期">出生日期</MenuItem>
            <MenuItem value="入学时间">入学时间 </MenuItem>
            <MenuItem value="年级和班级">年级和班级</MenuItem>
           
            {/* Add more filter options as needed */}
          </Select>
          {newFilterField === '年级和班级' && (
            <>
              {/* Select 年级 */}
              <Select
                value={selectedGrade}
                onChange={handleGradeChange}
                displayEmpty
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              >
                <MenuItem value="" disabled>
                  选择年级 {/* Placeholder for 年级 */}
                </MenuItem>
                <MenuItem value="一年级">一年级</MenuItem>
                <MenuItem value="二年级">二年级</MenuItem>
                <MenuItem value="三年级">三年级</MenuItem>
                <MenuItem value="四年级">四年级</MenuItem>
                <MenuItem value="五年级">五年级</MenuItem>
              </Select>

              {/* Only show 班级 select if 年级 is selected */}
              {selectedGrade && (
                <Select
                  multiple
                  value={selectedClasses}
                  onChange={handleClassChange}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return '请选择班级';  // Placeholder text when nothing is selected
                    }
                    return selected.join(', ');  // Show selected classes when values are selected
                  }}
                  fullWidth
                  displayEmpty  
                  variant="outlined"
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="" disabled>
                    请选择班级 {/* Placeholder text */}
                  </MenuItem>
                  {/* these values should be received after user select a grade and calls backend */}
                  {['1班', '2班', '3班', '4班', '5班'].map((className) => (
                    <MenuItem key={className} value={className}>
                      <Checkbox checked={selectedClasses.indexOf(className) > -1} />
                      <ListItemText primary={className} />
                    </MenuItem>
                  ))}
                </Select>
              )}
            </>
          )}
         {newFilterField === '性别' && (
            <Select
              value={selectedGender}
              onChange={handleGenderChange}
              fullWidth
              variant="outlined"
              displayEmpty  
              sx={{ mb: 2 }}
            >
              <MenuItem value="" disabled>
                请选择性别 {/* Placeholder text */}
              </MenuItem>
              <MenuItem value="男">男</MenuItem>
              <MenuItem value="女">女</MenuItem>
            </Select>
          )}

          {newFilterField === '民族' && (
            <Select
              value={selectedGender}
              onChange={handleGenderChange}
              fullWidth
              variant="outlined"
              displayEmpty  
              sx={{ mb: 2 }}
            >
              <MenuItem value="" disabled>
                请选择民族 {/* Placeholder text */}
              </MenuItem>
              <MenuItem value="汉">汉</MenuItem>
              <MenuItem value="满">满</MenuItem>
            </Select>
          )}

          {newFilterField === '出生日期' && (
            <>
              <DatePickerWrapper>
                <DatePicker
                  selected={birthStartDate}
                  onChange={handleFilterDateChange('出生日期', 'start')}
                  dateFormat="yyyy-MM-dd"
                  customInput={
                    <TextField
                      label="开始日期"
                      value={birthStartDate ? birthStartDate.toISOString().substring(0, 10) : ''}
                      fullWidth
                      margin="dense"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <CalendarTodayIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  }
                />
              </DatePickerWrapper>

              <DatePickerWrapper>
                <DatePicker
                  selected={birthEndDate}
                  onChange={handleFilterDateChange('出生日期', 'end')}
                  dateFormat="yyyy-MM-dd"
                  customInput={
                    <TextField
                      label="结束日期"
                      value={birthEndDate ? birthEndDate.toISOString().substring(0, 10) : ''}
                      fullWidth
                      margin="dense"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <CalendarTodayIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  }
                />
              </DatePickerWrapper>
            </>
          )}

          {newFilterField === '入学时间' && (
            <>
              <DatePickerWrapper>
                <DatePicker
                  selected={enrollStartDate}
                  onChange={handleFilterDateChange('入学时间', 'start')}
                  dateFormat="yyyy-MM-dd"
                  customInput={
                    <TextField
                      label="开始日期"
                      value={enrollStartDate ? enrollStartDate.toISOString().substring(0, 10) : ''}
                      fullWidth
                      margin="dense"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <CalendarTodayIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  }
                />
              </DatePickerWrapper>

              <DatePickerWrapper>
                <DatePicker
                  selected={enrollEndDate}
                  onChange={handleFilterDateChange('入学时间', 'end')}
                  dateFormat="yyyy-MM-dd"
                  customInput={
                    <TextField
                      label="结束日期"
                      value={enrollEndDate ? enrollEndDate.toISOString().substring(0, 10) : ''}
                      fullWidth
                      margin="dense"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <CalendarTodayIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  }
                />
              </DatePickerWrapper>
            </>
          )}
            
          
        </Box>
      </Popover>

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
                error={!!formErrors.name}
                helperText={formErrors.name}
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
              <FormControl fullWidth margin="dense" required error={!!formErrors.gender}>
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
                  value={formContent.gender}
                  onChange={handleChangeForm('gender')}
                  label="性别"
                >
                  <MenuItem key={'male'} value={'男'}>
                    男
                  </MenuItem>
                  <MenuItem key={'female'} value={'女'}>
                    女
                  </MenuItem>
                </Select>
                {formErrors.gender && <span style={{ color: 'red', fontSize: '11.5px', marginTop:5 }}>{formErrors.gender}</span>}
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
              <DatePickerWrapper>
                <DatePicker
                  selected={formContent.birth_date ? new Date(formContent.birth_date) : null}
                  onChange={handleDateChange('birth_date')}
                  dateFormat="yyyy-MM-dd"
                  customInput={
                    <TextField
                      label={
                        <>
                          出生日期<span style={{ color: 'red' }}> *</span>
                        </>
                      }
                      value={formContent.birth_date}
                      onChange={() => {}}
                      fullWidth
                      margin="dense"
                      required
                      error={!!formErrors.birth_date}
                      helperText={formErrors.birth_date}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <CalendarTodayIcon />
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        sx: {
                          '& .MuiInputLabel-asterisk': {
                            color: 'red',
                          },
                        },
                      }}
                    />
                  }
                />
              </DatePickerWrapper>
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
              <DatePickerWrapper>
                <DatePicker
                  selected={formContent.enroll_date ? new Date(formContent.enroll_date) : null}
                  onChange={handleDateChange('enroll_date')}
                  dateFormat="yyyy-MM-dd"
                  customInput={
                    <TextField
                      label={
                        <>
                          入学日期<span style={{ color: 'red' }}> *</span>
                        </>
                      }
                      value={formContent.enroll_date}
                      onChange={() => {}}
                      fullWidth
                      margin="dense"
                      required
                      error={!!formErrors.enroll_date}
                      helperText={formErrors.enroll_date}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <CalendarTodayIcon />
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        sx: {
                          '& .MuiInputLabel-asterisk': {
                            color: 'red',
                          },
                        },
                      }}
                    />
                  }
                />
              </DatePickerWrapper>
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
                error={!!formErrors.id_number}
                helperText={formErrors.id_number}
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
                error={!!formErrors.address}
                helperText={formErrors.address}
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
