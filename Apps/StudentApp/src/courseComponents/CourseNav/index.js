import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box, Typography, List, ListItemButton, ListItemText } from '@mui/material';

export default function CourseNav() {
  const router = useRouter();
  const courseName = decodeURIComponent(router.query.course || '');

  return (
    <Box sx={{ width: '250px', padding: '20px', borderRight: '1px solid #ddd' }}>
      <Typography variant="h6" sx={{ marginBottom: '20px' }}>
        {courseName || 'Course Name'}
      </Typography>
      <List component="nav">
        <ListItemButton>
        <Link href={`/courses/${encodeURIComponent(courseName)}/home`} passHref>
            <a style={{ textDecoration: 'none', color: 'inherit' }}> {/* Ensuring styling and color are maintained */}
            <ListItemText primary="Home" />
            </a>
        </Link>
        </ListItemButton>

        <ListItemButton>
        <Link href={`/courses/${encodeURIComponent(courseName)}/syllabus`} passHref>
            <a style={{ textDecoration: 'none', color: 'inherit' }}> {/* Ensuring styling and color are maintained */}
            <ListItemText primary="Syllabus" />
            </a>
        </Link>
        </ListItemButton>        

        <ListItemButton>
        <Link href={`/courses/${encodeURIComponent(courseName)}/modules`} passHref>
            <a style={{ textDecoration: 'none', color: 'inherit' }}> {/* Ensuring styling and color are maintained */}
            <ListItemText primary="Modules" />
            </a>
        </Link>
        </ListItemButton>

        <ListItemButton>
        <Link href={`/courses/${encodeURIComponent(courseName)}/grades`} passHref>
            <a style={{ textDecoration: 'none', color: 'inherit' }}> {/* Ensuring styling and color are maintained */}
            <ListItemText primary="Grades" />
            </a>
        </Link>
        </ListItemButton> 
    
      </List>
    </Box>
  );
}
