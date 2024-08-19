import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box, Typography, List, ListItemText } from '@mui/material';

const CourseNav = () => {
  const router = useRouter();
  const courseName = decodeURIComponent(router.query.course || '');

  const navigationItems = [
    {
      title: 'Home',
      path: `/courses/${encodeURIComponent(courseName)}/home`
    },
    {
      title: 'Syllabus',
      path: `/courses/${encodeURIComponent(courseName)}/syllabus`
    },
    {
      title: 'Modules',
      path: `/courses/${encodeURIComponent(courseName)}/modules`
    },
    {
      title: 'Grades',
      path: `/courses/${encodeURIComponent(courseName)}/grades`
    }
  ];

  return (
    <Box sx={{ width: '250px', padding: '20px', borderRight: '1px solid #ddd' }}>
      <Typography variant="h6" sx={{ marginBottom: '20px' }}>
        {courseName || 'Course Name'}
      </Typography>
      <List component="nav">
        {navigationItems.map((item, index) => (
          <Link href={item.path} passHref key={index}>
            <a 
              style={{ 
                textDecoration: 'none', color: 'inherit'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              <ListItemText primary={item.title} />
            </a>
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default CourseNav;
