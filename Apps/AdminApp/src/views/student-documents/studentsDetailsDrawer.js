import React, { useState } from 'react';
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

export default function StudentDetailDrawer({ student, open, onClose }) {
  const [isEditingAll, setIsEditingAll] = useState(false);
  const [isEditingReport, setIsEditingReport] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [file, setFile] = useState(null); // For the 体检报告 file

  if (!student) return null;

  const handleEditAll = () => {
    setIsEditingAll(true);
    setEditedFields({ ...student.拓展信息 });
  };

  const handleSaveAll = () => {
    setIsEditingAll(false);
    Object.keys(editedFields).forEach(field => {
      student.拓展信息[field] = editedFields[field];
    });
  };

  const handleResetAll = () => {
    setEditedFields({ ...student.拓展信息 });
    setIsEditingAll(false);
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
            primary={<Typography variant="body2" sx={{ fontWeight: 'bold' }}>{label}:</Typography>}
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
                student.拓展信息[field]
              )
            }
          />
        </Grid>
      </Grid>
    </ListItem>
  );

  const renderFileUpload = () => (
    <ListItem>
      <ListItemIcon><AssignmentIcon /></ListItemIcon>
      <ListItemText
        primary={<Typography variant="body2" sx={{ fontWeight: 'bold' }}>体检报告:</Typography>}
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
      {file && <Typography variant="body2">{file.name}</Typography>}
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
        {/* User Profile Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, ml: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt="学生照片"
              src={student.拓展信息.个人照片}
              sx={{ width: 56, height: 56, mr: 2 }}
            />
            <Box>
              <Typography variant="h6">{student.姓名}</Typography>
              <Typography variant="body2">{student.id}</Typography>
            </Box>
          </Box>
          {/* Top-right buttons */}
          <Box>
            {!isEditingAll ? (
              <Button onClick={handleEditAll} variant="contained" size="small" sx={{ mr: 1 }}>
                修改
              </Button>
            ) : (
              <Button onClick={handleSaveAll} variant="contained" size="small" color="primary" sx={{ mr: 1 }}>
                保存
              </Button>
            )}
            <Button onClick={handleResetAll} variant="outlined" size="small">
              重置
            </Button>
          </Box>
        </Box>

        {/* Expanded Information with Icons and Bold Titles */}
        <List>
          {renderListItem(<BadgeIcon />, '身份证号', '身份证号')}
          {renderListItem(<PersonIcon />, '父亲姓名', '父亲姓名')}
          {renderListItem(<PhoneIcon />, '父亲联系手机号', '父亲联系手机号')}
          {renderListItem(<PersonIcon />, '母亲姓名', '母亲姓名')}
          {renderListItem(<PhoneIcon />, '母亲联系手机号', '母亲联系手机号')}
          {renderListItem(<PersonIcon />, '紧急联系人姓名', '紧急联系人姓名')}
          {renderListItem(<PhoneIcon />, '紧急联系人手机号', '紧急联系人手机号')}
          {renderListItem(<LocationOnIcon />, '家庭住址', '家庭住址', true)}
          {renderFileUpload()} {/* File upload for 体检报告 */}
        </List>
      </Box>
    </Drawer>
  );
}
