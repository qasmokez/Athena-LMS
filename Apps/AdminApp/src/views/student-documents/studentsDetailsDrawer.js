import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function StudentDetailDrawer({ student, open, onClose }) {
  if (!student) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ width: 300, flexShrink: 0, '& .MuiDrawer-paper': { width: 300 } }}
    >
      <Box sx={{ p: 2 }}>
        {/* User Profile Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, ml: 2 }}>
          <Avatar
            alt="学生照片"
            src={student.拓展信息.个人照片}
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Box>
            <Typography variant="h6">
              {student.姓名}
            </Typography>
            <Typography variant="body2">{student.id}</Typography>
          </Box>
        </Box>
        {/* Expanded Information with Icons and Bold Titles */}
        <List>
          <ListItem>
            <ListItemIcon><BadgeIcon /></ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2" sx={{ fontWeight: 'bold' }}>身份证号:</Typography>}
              secondary={student.拓展信息.身份证号}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2" sx={{ fontWeight: 'bold' }}>父亲姓名:</Typography>}
              secondary={student.拓展信息.父亲姓名}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon><PhoneIcon /></ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2" sx={{ fontWeight: 'bold' }}>父亲联系手机号:</Typography>}
              secondary={student.拓展信息.父亲联系手机号}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2" sx={{ fontWeight: 'bold' }}>母亲姓名:</Typography>}
              secondary={student.拓展信息.母亲姓名}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon><PhoneIcon /></ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2" sx={{ fontWeight: 'bold' }}>母亲联系手机号:</Typography>}
              secondary={student.拓展信息.母亲联系手机号}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2" sx={{ fontWeight: 'bold' }}>紧急联系人姓名:</Typography>}
              secondary={student.拓展信息.紧急联系人姓名}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon><PhoneIcon /></ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2" sx={{ fontWeight: 'bold' }}>紧急联系人手机号:</Typography>}
              secondary={student.拓展信息.紧急联系人手机号}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon><LocationOnIcon /></ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2" sx={{ fontWeight: 'bold' }}>家庭住址:</Typography>}
              secondary={student.拓展信息.家庭住址}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon><AssignmentIcon /></ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2" sx={{ fontWeight: 'bold' }}>体检报告:</Typography>}
              secondary={student.拓展信息.体检报告}
            />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
