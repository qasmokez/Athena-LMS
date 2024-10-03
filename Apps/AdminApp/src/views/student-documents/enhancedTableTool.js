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
import zhCN from 'date-fns/locale/zh-CN';

export default function EnhancedTableToolbar({
  handleDeleteSelected,
  filters,
  setFilters,
  gradeMapping,
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
        setFilters((prevFilters) => {
          const newFilters = [...prevFilters, { field: searchBy, value: searchQuery }];
          return newFilters;
        });
        
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
  
      // Handle special case for grade_id and class_id
      if (newFilterField === 'grade_id' && selectedGrade && selectedClasses.length > 0) {
        // First, add the grade_id filter
        setFilters((prevFilters) => [
          ...prevFilters,
          { field: 'grade_id', value: selectedGrade }   // Add grade_id as a single value
        ]);

        // Then, add each class_id one by one
        selectedClasses.forEach((className) => {
          const classId = Object.keys(gradeMapping[selectedGrade].classes).find(
            (key) => gradeMapping[selectedGrade].classes[key] === className
          );
          if (classId) {
            setFilters((prevFilters) => [
              ...prevFilters,
              { field: 'class_id', value: classId }      // Add each class_id as an individual filter
            ]);
          }
        });
      }
  
      // Handle date ranges for 出生日期 (birth_date) and 入学时间 (enroll_date)
      else if (newFilterField === 'birth_date' && birthStartDate && birthEndDate) {
        newFilterValueFormatted = [
          birthStartDate.toISOString().substring(0, 10),
          birthEndDate.toISOString().substring(0, 10)
        ];
  
        setFilters((prevFilters) => [
          ...prevFilters,
          { field: 'birth_date', value: newFilterValueFormatted } // Date ranges as an array
        ]);
      } else if (newFilterField === 'enroll_date' && enrollStartDate && enrollEndDate) {
        newFilterValueFormatted = [
          enrollStartDate.toISOString().substring(0, 10),
          enrollEndDate.toISOString().substring(0, 10)
        ];
  
        setFilters((prevFilters) => [
          ...prevFilters,
          { field: 'enroll_date', value: newFilterValueFormatted } // Date ranges as an array
        ]);
      }
  
      // Use the formatted value for other filters without nested arrays
      else {
        setFilters((prev) => [
          ...prev,
          { field: newFilterField, value: newFilterValueFormatted } // Single values or arrays directly
        ]);
      }
  
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
  
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [birthStartDate, setBirthStartDate] = useState(null);
  const [birthEndDate, setBirthEndDate] = useState(null);
  const [enrollStartDate, setEnrollStartDate] = useState(null);
  const [enrollEndDate, setEnrollEndDate] = useState(null);

  const handleFilterDateChange = (field, dateType) => (date) => {
    if (field === 'birth_date') {
      if (dateType === 'start') {
        setBirthStartDate(date);
      } else {
        setBirthEndDate(date);
      }
    } else if (field === 'enroll_date') {
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
    if (!formContent.firstname?.trim()) errors.firstname = '名不能为空';
    if (!formContent.lastname?.trim()) errors.lastname = '姓不能为空';
    if (!formContent.gender) errors.gender = '性别不能为空';
    if (!formContent.birth_date?.trim()) errors.birth_date = '出生日期不能为空';
    if (!formContent.ethnic?.trim()) errors.ethnic = '民族不能为空';
    if (!formContent.enroll_date?.trim()) errors.enroll_date = '入学日期不能为空';
    if (!formContent.id_number?.trim()) {
      errors.id_number = '身份证号不能为空';
    } else if (formContent.id_number.trim().length !== 18) {
        errors.id_number = '身份证号格式输入不正确（需要18位';
    }
    if (!formContent.address?.trim()) errors.address = '家庭住址不能为空';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    // add the student to the database
    // Log the specified fields
    console.log({
      firstname: formContent.firstname,
      lastname: formContent.lastname,
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
    firstname: '',
    lastname: '',
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
      // take parsedData and send it to the backend
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
          firstname: student['名'],  // Assume that '名' is in a separate column
          lastname: student['姓'],    // Assume that '姓' is in a separate column
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
          !parsedStudent.firstname ||
          !parsedStudent.lastname ||
          !parsedStudent.gender ||
          !parsedStudent.birth_date ||
          !parsedStudent.ethnic ||
          !parsedStudent.enroll_date ||
          !parsedStudent.id_number ||
          !parsedStudent.address
        ) {
          console.warn("Skipping invalid student: ", parsedStudent);
          return null;  // Return null for invalid students
        }
  
        return parsedStudent;  // Return valid student data
      })
      .filter(Boolean);  // Filter out null entries (invalid students)
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

  const ethnicGroups = [
    '汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '土家族', '彝族', '蒙古族', 
    '藏族', '布依族', '侗族', '瑶族', '朝鲜族', '白族', '哈尼族', '哈萨克族', '黎族', 
    '傣族', '畲族', '傈僳族', '仡佬族', '东乡族', '高山族', '拉祜族', '水族', '佤族', 
    '纳西族', '羌族', '土族', '仫佬族', '锡伯族', '柯尔克孜族', '达斡尔族', '景颇族', 
    '毛南族', '撒拉族', '布朗族', '塔吉克族', '阿昌族', '普米族', '鄂温克族', '怒族', 
    '京族', '基诺族', '德昂族', '保安族', '俄罗斯族', '裕固族', '乌孜别克族', '门巴族', 
    '鄂伦春族', '独龙族', '赫哲族', '珞巴族'
  ];
  
  // for displaying filters in chinese
  const fieldMapping = {
    grade_id: '年级',
    class_id: '班级',
    birth_date: '出生日期',
    enroll_date: '入学时间',
    gender: '性别',
    ethnic: '民族'
  };

  const valueMapping = (field, value) => {
    if (field === 'grade_id') {
      // Map grade ID to grade name
      return gradeMapping[value]?.name || value;
    } else if (field === 'class_id') {
      // Handle class mapping based on selected grade
      const selectedGrade = filters.find((f) => f.field === 'grade_id')?.value;
      
      if (selectedGrade && gradeMapping[selectedGrade]) {
        return gradeMapping[selectedGrade]?.classes[value] || value;
      }
    }
    return value;  // Default case for other fields
  };

  return (
    <Toolbar>
      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <Typography variant="h6" id="tableTitle" component="div" sx={{ ml: 3, mr: 6 }}>
          学生信息
        </Typography>
        <SearchBar />
      </Box>

      {/* Container for filters */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mt: 1 }}>
        {filters.map((filter, index) => (
        <Chip
          key={index}
          label={`${fieldMapping[filter.field] || filter.field}: ${valueMapping(filter.field, filter.value)}`}
          onDelete={() => handleDeleteFilter(index)}
          sx={{ m: 0.5 }}
        />
        ))}
      </Box>
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
            <MenuItem value="gender">性别</MenuItem>
            <MenuItem value="ethnic">民族 </MenuItem>
            <MenuItem value="birth_date">出生日期</MenuItem>
            <MenuItem value="enroll_date">入学时间 </MenuItem>
            <MenuItem value="grade_id">年级和班级</MenuItem>
           
            {/* Add more filter options as needed */}
          </Select>
          {newFilterField === 'grade_id' && (
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
                {/* Dynamically populate grade options from gradeMapping */}
                {Object.keys(gradeMapping).map((gradeKey) => (
                  <MenuItem key={gradeKey} value={gradeKey}>
                    {gradeMapping[gradeKey].name}
                  </MenuItem>
                ))}
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

                  {/* Dynamically populate classes based on selected grade */}
                  {Object.keys(gradeMapping[selectedGrade].classes).map((classKey) => (
                    <MenuItem key={classKey} value={gradeMapping[selectedGrade].classes[classKey]}>
                      <Checkbox checked={selectedClasses.indexOf(gradeMapping[selectedGrade].classes[classKey]) > -1} />
                      <ListItemText primary={gradeMapping[selectedGrade].classes[classKey]} />
                    </MenuItem>
                  ))}
                </Select>
              )}
            </>
          )}

         {newFilterField === 'gender' && (
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

          {newFilterField === 'ethnic' && (
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
              {ethnicGroups.map((ethnicGroup, index) => (
                <MenuItem key={index} value={ethnicGroup}>
                  {ethnicGroup}
                </MenuItem>
              ))}
            </Select>
          )}

          {newFilterField === 'birth_date' && (
            <>
              <DatePickerWrapper>
                <DatePicker
                  selected={birthStartDate}
                  onChange={handleFilterDateChange('birth_date', 'start')}
                  dateFormat="yyyy-MM-dd"
                  locale={zhCN}
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
                  onChange={handleFilterDateChange('birth_date', 'end')}
                  dateFormat="yyyy-MM-dd"
                  locale={zhCN}
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

          {newFilterField === 'enroll_date' && (
            <>
              <DatePickerWrapper>
                <DatePicker
                  selected={enrollStartDate}
                  onChange={handleFilterDateChange('enroll_date', 'start')}
                  dateFormat="yyyy-MM-dd"
                  locale={zhCN}
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
                  onChange={handleFilterDateChange('enroll_date', 'end')}
                  dateFormat="yyyy-MM-dd"
                  locale={zhCN}
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
                label="姓"
                value={formContent.lastname}
                onChange={handleChangeForm('lastname')}
                fullWidth
                margin="dense"
                required
                error={!!formErrors.lastname}
                helperText={formErrors.lastname}
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
                label="名"
                value={formContent.firstname}
                onChange={handleChangeForm('firstname')}
                fullWidth
                margin="dense"
                required
                error={!!formErrors.firstname}
                helperText={formErrors.firstname}
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
                {formErrors.gender && <span style={{ color: 'red', fontSize: '11.5px', marginTop:5,  marginLeft:15 }}>{formErrors.gender}</span>}
              </FormControl>
            </Grid>

            {/* Grade Selection */}
            <Grid item xs={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>年级</InputLabel>
                <Select
                  value={formContent.grade_id}
                  onChange={handleChangeForm('grade_id')}
                  label="年级"
                >
                  <MenuItem value="" disabled>
                    请选择年级 {/* Placeholder text */}
                  </MenuItem>
                  {Object.keys(gradeMapping).map((gradeKey) => (
                    <MenuItem key={gradeKey} value={gradeKey}>
                      {gradeMapping[gradeKey].name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Class Selection */}
            <Grid item xs={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>班级</InputLabel>
                <Select
                  value={formContent.classes_id}
                  onChange={handleChangeForm('classes_id')}
                  label="班级"
                  disabled={!formContent.grade_id} // Disable if no grade is selected
                >
                  <MenuItem value="" disabled>
                    请选择班级 {/* Placeholder text */}
                  </MenuItem>
                  {formContent.grade_id &&
                    Object.keys(gradeMapping[formContent.grade_id].classes).map((classKey) => (
                      <MenuItem key={classKey} value={classKey}>
                        {gradeMapping[formContent.grade_id].classes[classKey]}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Other fields */}
            <Grid item xs={6}>
              <DatePickerWrapper>
                <DatePicker
                  selected={formContent.birth_date ? new Date(formContent.birth_date) : null}
                  onChange={handleDateChange('birth_date')}
                  dateFormat="yyyy-MM-dd"
                  locale={zhCN}
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
              <FormControl fullWidth margin="dense" required error={!!formErrors.ethnic}>
                <InputLabel 
                  sx={{
                    '& .MuiInputLabel-asterisk': {
                      color: 'red',
                    },
                  }}
                >
                  民族
                </InputLabel>
                <Select
                  value={formContent.ethnic}
                  onChange={handleChangeForm('ethnic')}
                  label="民族"
                >
                  {ethnicGroups.map((ethnicGroup, index) => (
                    <MenuItem key={index} value={ethnicGroup}>
                      {ethnicGroup}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.ethnic && <span style={{ color: 'red', fontSize: '11.5px', marginTop:5, marginLeft:15 }}>{formErrors.ethnic}</span>}
              </FormControl>
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
                  locale={zhCN}
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
  gradeMapping: PropTypes.object.isRequired,
};
