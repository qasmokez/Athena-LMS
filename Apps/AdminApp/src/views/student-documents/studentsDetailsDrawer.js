import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { toast } from 'react-toastify';

export default function StudentDetailDrawer({ student, open, onClose }) {
  const [expandInfo, setExpandInfo] = useState({});
  const [isEditingAll, setIsEditingAll] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [file, setFile] = useState(null); // For the 体检报告 file

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

    fetchExpandInfo();
  }, [student, open]);

  if (!student) return null;

  const handleEditAll = () => {
    setIsEditingAll(true);
    setEditedFields({ ...expandInfo });
  };

  const handleSaveAll = () => {
    setIsEditingAll(false);
    Object.keys(editedFields).forEach(field => {
      expandInfo[field] = editedFields[field];
    });
    toast.success('修改成功!');
  };

  const handleResetAll = () => {
    setEditedFields({ ...expandInfo });
    setIsEditingAll(false);
  };

  const handleChange = (field, value) => {
    setEditedFields((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const renderListItem = (icon, label, field, isLongText = false) => (
    <ListItem>
      <ListItemIcon>{icon}</ListItemIcon>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <ListItemText
            primary={
              <Typography variant="body2" sx={{ fontWeight: 'bold' }} component="span">
                {label}:
              </Typography>
            }
            secondary={
              isEditingAll ? (
                isLongText ? (
                  <TextField
                    value={editedFields[field] || ''}
                    onChange={(e) => handleChange(field, e.target.value)}
                    multiline
                    minRows={3}
                    fullWidth
                  />
                ) : (
                  <TextField
                    value={editedFields[field] || ''}
                    onChange={(e) => handleChange(field, e.target.value)}
                    variant="standard"
                    fullWidth
                  />
                )
              ) : (
                <Typography component="span" sx={{ display: 'block' }}>{expandInfo[field]}</Typography>
              )
            }
            primaryTypographyProps={{ component: 'span' }} // Ensure primary is a <span>
            secondaryTypographyProps={{ component: 'span' }} // Ensure secondary is a <span>
          />
        </Grid>
      </Grid>
    </ListItem>
  );

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

  return (
    <Drawer
      anchor="right"
      transitionDuration={{ enter: 500, exit: 500 }}
      open={open}
      onClose={onClose}
      sx={{ width: 300, flexShrink: 0, '& .MuiDrawer-paper': { width: 300 } }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, ml: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt="学生照片"
              src={expandInfo.个人照片}
              sx={{ width: 56, height: 56, mr: 2 }}
            />
            <Box>
              <Typography variant="h6" component="div">{student.name}</Typography>
              <Typography variant="body2" component="div">{student.student_id}</Typography>
            </Box>
          </Box>
          <Box>
            {!isEditingAll ? (
              <Button onClick={handleEditAll} variant="contained" size="small" sx={{ mr: 1 }}>
                修改
              </Button>
            ) : (
              <Button onClick={handleSaveAll} variant="contained" size="small" color='success' sx={{ mr: 1 }}>
                保存
              </Button>
            )}
            <Button onClick={handleResetAll} variant="outlined" size="small">
              重置
            </Button>
          </Box>
        </Box>

        <List>
          {renderListItem(<BadgeIcon />, '身份证号', '身份证号')}
          {renderListItem(<PersonIcon />, '父亲姓名', '父亲姓名')}
          {renderListItem(<PhoneIcon />, '父亲联系手机号', '父亲联系手机号')}
          {renderListItem(<PersonIcon />, '母亲姓名', '母亲姓名')}
          {renderListItem(<PhoneIcon />, '母亲联系手机号', '母亲联系手机号')}
          {renderListItem(<PersonIcon />, '紧急联系人姓名', '紧急联系人姓名')}
          {renderListItem(<PhoneIcon />, '紧急联系人手机号', '紧急联系人手机号')}
          {renderListItem(<LocationOnIcon />, '家庭住址', '家庭住址', true)}
          {renderFileUpload()}
        </List>
      </Box>
    </Drawer>
  );
}
