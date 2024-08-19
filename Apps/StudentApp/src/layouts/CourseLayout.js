import React from 'react';
import { Box } from '@mui/material';
import CourseNav from '/src/courseComponents/CourseNav';

export default function CourseLayout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CourseNav />
      <Box sx={{ flexGrow: 1, padding: '20px' }}>
        {children}
      </Box>
    </Box>
  );
}
