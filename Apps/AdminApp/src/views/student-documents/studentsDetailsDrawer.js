import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {Divider, IconButton,MenuItem ,InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import { toast } from 'react-toastify';
//date picker
// calendar imports
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'; 
import zhCN from 'date-fns/locale/zh-CN';

export default function StudentDetailDrawer({ student, open, onClose, gradeMapping }) {
  const [expandInfo, setExpandInfo] = useState({});
  const [isEditingAll, setIsEditingAll] = useState(false);
  const [editedFields, setEditedFields] = useState({}); // for expand info
  const [basicInfoField, setBasicInfoField] = useState({}); // for basic info
  const [file, setFile] = useState(null); // For the 体检报告 file
  const [formErrors, setFormErrors] = useState({}); // for required fields check

  // for 头像上传
  const avatarPlaceholder = '/images/avatars/avatar_place_holder.png';
  const [avatar, setAvatar] = useState(avatarPlaceholder);

  useEffect(() => {
    const fetchExpandInfo = async () => {
      if (!student || !open) return;

      // Log the student UUID to the console
      console.log(`Fetching expandInfo for student UUID: ${student.uuid}`);

      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:3011/v0/student/expandInfo/${student.uuid}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch expand info');
        }

        const data = await response.json();
        setExpandInfo(data || {});
        setEditedFields(data || {}); // Initialize fields with expanded data
      } catch (error) {
        console.error('Error fetching expanded info:', error);
      }
    };

    // Simulate mock data for expandInfo
    const mockExpandInfo = {
      '身份证号': '123456789012345678',
      '父亲姓名': '王大明',
      '父亲联系手机号': '13812345678',
      '母亲姓名': '李小红',
      '母亲联系手机号': '13987654321',
      '紧急联系人姓名': '张三',
      '紧急联系人手机号': '13712345678',
      '家庭住址': '北京市朝阳区某某街道'
    };

    // Set the mock data
    setExpandInfo(mockExpandInfo);
    setEditedFields(mockExpandInfo);

    const initBasicInfo = () =>{
      if (student) {
        // When student is available, set basicInfoField to student data
        const name = student['name'];
        setBasicInfoField({...student,['last_name']:name[0], ['first_name']:name.slice(1)});
        console.log('passed in')
        //console.log(student)
        //console.log(basicInfoField)
      }
    }

    initBasicInfo();
    fetchExpandInfo();
  }, [student, open]);

  if (!student) return null;

  const handleEditAll = () => {
    setIsEditingAll(true);
    setEditedFields({ ...expandInfo });
  };


  const handleSaveAll = () => {
    const errors = {};
    // Check if required fields are empty
    if (!basicInfoField.last_name?.trim()) errors.last_name = '学生姓不能为空';
    if (!basicInfoField.first_name?.trim()) errors.first_name = '学生名不能为空';
    if (!basicInfoField.gender) errors.gender = '性别不能为空';
    if (!basicInfoField.birth_date?.trim()) errors.birth_date = '出生日期不能为空';
    if (!basicInfoField.ethnic?.trim()) errors.ethnic = '民族不能为空';
    if (!basicInfoField.enroll_date?.trim()) errors.enroll_date = '入学日期不能为空';
    if (!editedFields['身份证号']?.trim()) {
      errors.id_number = '身份证号不能为空';
    }else if(editedFields['身份证号']?.trim().length != 18){
      errors.id_number = '身份证号格式输入不正确（需要18位）';
    }
    if (!editedFields['家庭住址']?.trim()) errors.address = '家庭住址不能为空';
    if (Object.keys(errors).length > 0) {
      //console.log(errors)
      setFormErrors(errors);
      return;
    }else{
      setFormErrors({})
    }
    
    setIsEditingAll(false);
    Object.keys(editedFields).forEach(field => {
      expandInfo[field] = editedFields[field];
    });

    // Combine both basic info and expanded info into one object
    const combinedData = {
      ...basicInfoField,  // Basic information fields
      ...editedFields,    // Expanded information fields
    };

    // Log the combined data
    console.log('Saved Student Data:', combinedData);
    toast.success('修改成功!');
  };

  const handleResetAll = () => {
    setEditedFields({ ...expandInfo });
    setBasicInfoField({...student})
    setIsEditingAll(false);
  };

  const handleChange = (field, value,isAdditionalInfo = false) => {
    if(isAdditionalInfo){
      setEditedFields((prev) => ({
        ...prev,
        [field]: value
      }));
    }else{
      setBasicInfoField((prev)=>({
        ...prev,
        [field]: value
      }))
    }
    //check last name or first name update
    if(field == 'last_name' || field == 'first_name'){
      setBasicInfoField((prev)=>({
        ...prev,
        ['name']: basicInfoField['last_name'] + basicInfoField['first_name'] 
      }))
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const renderFileUpload = () => (
    <ListItem>
      <ListItemIcon><AssignmentIcon /></ListItemIcon>
      <ListItemText
        primary={<Typography variant="body2" sx={{ fontWeight: 'bold' }} component="span">体检报告:</Typography>}
        secondary={
          <Button
            variant="outlined"
            component="label"
            fullWidth
          >
            上传文件
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        }
      />
      {file && <Typography variant="body2" component="span">{file.name}</Typography>}
    </ListItem>
  );

  const handleDelete = ()=>{
    //待添加：后端提交删除
    //
    //
  } 

  // 中华民族列表
  const chineseEthnicGroups = [
    "汉族", "壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族",
    "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族", "哈萨克族", "黎族", "傣族", "畲族",
    "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族",
    "仫佬族", "锡伯族", "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族",
    "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族", "俄罗斯族", "裕固族",
    "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "赫哲族", "塔塔尔族", "珞巴族"
  ];
  
  const handleDateChange = (dateType,newDate) =>{
    const parsedDate = newDate ? newDate.toLocaleDateString('en-CA').substring(0, 10) : '';
    if(dateType == 'birth_date'){
      setBasicInfoField((prev)=>({...prev, ['birth_date']: parsedDate}));
    }else if(dateType == 'enroll_date'){
      setBasicInfoField((prev)=>({...prev, ['enroll_date']: parsedDate}));
    }
  }

  // managing user uploaded avatar
  
  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Convert the file to a temporary URL
      setAvatar(imageUrl); // Set the uploaded image as avatar
    }
  };


  return (
    <Drawer
      anchor="right"
      transitionDuration={{ enter: 500, exit: 500 }}
      open={open}
      onClose={onClose}
      sx={{ width: 370, flexShrink: 0, '& .MuiDrawer-paper': { width: 400 } }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{display:'flex', justifyContent:"space-between"}}>
          <Typography variant="h6" sx={{paddingLeft:'20px'}}>
            详情
          </Typography>
          <IconButton onClick={onClose}> 
            <CloseIcon/>
          </IconButton>
        </Box>
        <Divider />

        {basicInfoField && basicInfoField['name'] !== undefined &&(
          <>
          <Box>
            <Typography variant="subtitle1" sx={{paddingLeft:'20px'}}>
              基本信息
            </Typography>
            <List sx={{ '& .MuiListItem-root': { height: '40px',marginBottom:'10px' }, 
                        '& .MuiInputBase-input': { fontSize: '15px',padding:'8px 16px' },
                        '& .MuiFormLabel-asterisk': {
                            color: 'red',  // Set asterisk color to red 
                            },
            }}>
              <ListItem>
                <Grid container alignItems="center" spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                        label={'姓'}
                        value={basicInfoField['last_name']}
                        inputProps={isEditingAll?{}:{readOnly:true}}
                        onChange={(e) => handleChange('last_name', e.target.value)}
                        required
                        error={!!formErrors.last_name}
                        helperText={formErrors.last_name}
                      />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                        label={'名'}
                        value={basicInfoField['first_name']}
                        inputProps={isEditingAll?{}:{readOnly:true}}
                        onChange={(e) => handleChange('first_name', e.target.value)}
                        required
                        error={!!formErrors.first_name}
                        helperText={formErrors.first_name}
                      />
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid container alignItems="center" spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                        label={'性别'}
                        value={basicInfoField['gender']}
                        inputProps={isEditingAll?{}:{readOnly:true}}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        required
                        select
                        fullWidth
                      >
                        <MenuItem key={'male'} value={'男'}>
                          男
                        </MenuItem>
                        <MenuItem key={'female'} value={'女'}>
                          女
                        </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label={'年级'}
                      value={basicInfoField['grade_id']}
                      inputProps={isEditingAll ? {} : { readOnly: true }}
                      onChange={(e) => {
                        const selectedGrade = e.target.value;
                        handleChange('grade_id', selectedGrade);
                        setBasicInfoField((prev) => ({
                          ...prev,
                          // Clear the classes_id when grade_id changes
                          classes_id: '',
                        }));
                      }}
                      select
                      fullWidth
                    >
                      {/* Dynamically populate the grade options */}
                      {Object.keys(gradeMapping).map((gradeKey) => (
                        <MenuItem key={gradeKey} value={gradeKey}>
                          {gradeMapping[gradeKey].name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </ListItem>

              {/* date picker for birthdate */}
              <ListItem>
              <Grid container alignItems="center" spacing={3}>
                <Grid item xs={6}>
                    <TextField
                      label={'班级'}
                      value={basicInfoField['classes_id']}
                      inputProps={isEditingAll ? {} : { readOnly: true }}
                      onChange={(e) => handleChange('classes_id', e.target.value)}
                      select
                      disabled={!basicInfoField['grade_id']} // Disable class selection if no grade is selected
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        请选择班级 {/* Placeholder text */}
                      </MenuItem>
                      {/* Dynamically populate the class options based on the selected grade */}
                      {basicInfoField['grade_id'] &&
                        Object.keys(gradeMapping[basicInfoField['grade_id']].classes).map((classKey) => (
                          <MenuItem key={classKey} value={classKey}>
                            {gradeMapping[basicInfoField['grade_id']].classes[classKey]}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <DatePickerWrapper>
                      <DatePicker
                        selected={new Date(`${basicInfoField['birth_date']}T00:00:00`)}
                        onChange={(newDate)=>handleDateChange('birth_date',newDate)}
                        dateFormat="yyyy-MM-dd"
                        locale={zhCN}
                        customInput={
                          <TextField
                            sx={{pointerEvents: !isEditingAll ? 'none' : 'auto'}}
                            label={
                              <>
                                出生日期<span style={{ color: 'red' }}> *</span>
                              </>
                            }
                            /* value={basicInfoField['birth_date']} */
                            onChange={() => {}}
                            fullWidth
                            margin="dense"
                            required
                            /* error={!!formErrors.birth_date} */
                            /* helperText={formErrors.birth_date} */
                            InputProps={{
                              readOnly: true,
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
                </Grid>
                
              </ListItem>
              

              <ListItem>
                <Grid container alignItems="center" spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                        label={'民族'}
                        value={basicInfoField['ethnic']}
                        inputProps={isEditingAll?{}:{readOnly:true}}
                        onChange={(e) => handleChange('ethnic', e.target.value)}
                        select
                        required
                        fullWidth
                        error={!!formErrors.ethnic}
                        helperText={formErrors.ethnic}
                      >
                        {chineseEthnicGroups.map((group) => (
                          <MenuItem key={group} value={group}>
                            {group}
                          </MenuItem>
                        ))}
                      </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                        label={'学生id'}
                        value={basicInfoField['student_id']}
                        inputProps={isEditingAll?{}:{readOnly:true}}
                        onChange={(e) => handleChange('student_id', e.target.value)}
                      />
                  </Grid>
                </Grid>
              </ListItem>
              
              <ListItem>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <DatePickerWrapper>
                      <DatePicker
                        selected={new Date(`${basicInfoField['enroll_date']}T00:00:00`)}
                        onChange={(newDate)=>handleDateChange('enroll_date',newDate)}
                        dateFormat="yyyy-MM-dd"
                        locale={zhCN}
                        customInput={
                            <TextField
                              sx={{pointerEvents: !isEditingAll ? 'none' : 'auto'}}
                              label={
                                <>
                                  入学日期<span style={{ color: 'red' }}> *</span>
                                </>
                              }
                              /* value={basicInfoField['birth_date']} */
                              onChange={() => {}}
                              margin="dense"
                              required
                              fullWidth
                              /* error={!!formErrors.birth_date} */
                              /* helperText={formErrors.birth_date} */
                              InputProps={{
                                readOnly: true,
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
                  
                </Grid>
                
              </ListItem>
            </List>

          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{paddingLeft:'20px'}}>
              拓展信息
            </Typography>

            <List sx={{ '& .MuiListItem-root': { height: '40px',marginBottom:'10px' }, 
                        '& .MuiInputBase-input': { fontSize: '15px',padding:'8px 16px' },
                        '& .MuiFormLabel-asterisk': {
                            color: 'red',  // Set asterisk color to red 
                            },
            }}>
              <ListItem>
                <Grid container alignItems="center" spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                        label={'身份证号'}
                        value={editedFields['身份证号']}
                        inputProps={isEditingAll?{}:{readOnly:true}}
                        onChange={(e) => handleChange('身份证号', e.target.value,true)}
                        error={!!formErrors.id_number}
                        helperText={formErrors.id_number}
                        required
                        fullWidth
                      />
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid container alignItems="center" spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                        label={'父亲姓名'}
                        value={editedFields['父亲姓名']}
                        inputProps={isEditingAll?{}:{readOnly:true}}
                        onChange={(e) => handleChange('父亲姓名', e.target.value,true)}
                      />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                        label={'手机号'}
                        value={editedFields['父亲联系手机号']}
                        inputProps={isEditingAll?{}:{readOnly:true}}
                        onChange={(e) => handleChange('父亲联系手机号', e.target.value,true)}
                      />
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid container alignItems="center" spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                        label={'母亲姓名'}
                        value={editedFields['母亲姓名']}
                        inputProps={isEditingAll?{}:{readOnly:true}}
                        onChange={(e) => handleChange('母亲姓名', e.target.value,true)}
                      />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                        label={'手机号'}
                        value={editedFields['母亲联系手机号']}
                        inputProps={isEditingAll?{}:{readOnly:true}}
                        onChange={(e) => handleChange('母亲联系手机号', e.target.value,true)}
                      />
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid container alignItems="center" spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                        label={'紧急联系人'}
                        value={editedFields['紧急联系人姓名']}
                        inputProps={isEditingAll?{}:{readOnly:true}}
                        onChange={(e) => handleChange('紧急联系人姓名', e.target.value,true)}
                      />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                        label={'手机号'}
                        value={editedFields['紧急联系人手机号']}
                        inputProps={isEditingAll?{}:{readOnly:true}}
                        onChange={(e) => handleChange('紧急联系人手机号', e.target.value,true)}
                      />
                  </Grid>
                </Grid>
              </ListItem>
              
              <ListItem>
                <Grid container alignItems="center" spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                        label={'家庭住址'}
                        value={editedFields['家庭住址']}
                        inputProps={isEditingAll?{}:{readOnly:true}}
                        required
                        fullWidth
                        error={!!formErrors.address}
                        helperText={formErrors.address}
                        onChange={(e) => handleChange('家庭住址', e.target.value,true)}
                      />
                  </Grid>
                </Grid>
              </ListItem>
            </List>
            
          </Box>
          </>
        )}

        {isEditingAll && (
          <Box
            sx={{
              position: 'relative',
              width: 400,
              height: 200,
              borderRadius: 3,
              overflow: 'hidden',
              backgroundImage: `url(${avatar})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.9,
              },
            }}
            >
              <Typography variant="subtitle1" sx={{paddingLeft:'20px'}}>
                  个人照片
                </Typography>
              {/* Hidden input for file selection */}
              <input
                accept="image/*"  // Accept only image files
                type="file"
                onChange={handleAvatarUpload}
                style={{ display: 'none' }}  // Hide the input field
                id="upload-button"
              />

              {/* Clickable upload button */}
              <Box
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: 2,
                  borderRadius: 2,
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                <UploadIcon fontSize="large" />
                <Typography>将照片拖放至此处更换照片</Typography>
                <label htmlFor="upload-button">
                  <Button variant="outlined" sx={{ mt: 1, color: 'white', borderColor: 'white' }} component="span">
                    点击上传
                  </Button>
                </label>
              </Box>
            </Box>
        )}
        {!isEditingAll && (
          <>
          <Typography variant="subtitle1" sx={{paddingLeft:'20px'}}>
                  个人照片
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',  // Center horizontally
              alignItems: 'center',      // Center vertically
              height: 300,               // Height of the block
              width: 300,                // Width of the block
              border: '2px solid #ccc',  // Optional border for clarity
              overflow: 'hidden',        // Ensure the image doesn’t overflow the box
            }}
          >
            
            <img
              src={avatar}
              alt="Avatar Placeholder"
              style={{
                width: '100%',           // Ensure the image covers the block size
                height: '100%',          // Ensure the image covers the block size
                objectFit: 'cover',      // Maintain the aspect ratio of the image and cover the block
              }}
            />
          </Box>
          </>
        )}

        

        {renderFileUpload()}

        {/* User Profile Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', mb: 2, ml: 2 }}>

          {/* Top-right buttons */}
          {!isEditingAll ? (
            <Button onClick={handleEditAll} variant="contained" size="small" sx={{ mr: 1 }}>
              编辑
            </Button>
          ) : (
            <Button onClick={handleSaveAll} variant="contained" size="small" color='success' sx={{ mr: 1 }}>
              保存
            </Button>
          )}
          <Button onClick={handleResetAll} variant="outlined" size="small" sx={{ mr: 1 }}>
            重置
          </Button>
          <Button onClick={handleDelete} variant="outlined" size="small" color="error">
            删除
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
