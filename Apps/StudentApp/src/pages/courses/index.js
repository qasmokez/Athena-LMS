
import CardImgTop from 'src/views/cards/CardImgTop'
import React from 'react';
import { Grid, Typography } from '@mui/material';

const courses = [
  { title: "语文", body: "床前明月光，疑是地上霜。举头望明月，低头思故乡", color: "lightblue" },
  { title: "数学", body: "两人轮流做工程的问题...", color: "lightgreen" },
  { title: "体育", body: "樊振东全满贯！", color: "lightyellow" },
  { title: "艺术", body: "艺术是人类精神文明的重要组成部分...", color: "violet" },
  { title: "历史", body: "历史是人类社会发展的过程...", color: "lightPink" }
];

const truncateTextStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  height: '50px'  // Adjust this height as needed
};

export default function CoursePage() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>课堂</Typography>
      </Grid>
      {courses.map((course, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <CardImgTop
            title={course.title}
            body={course.body}
            color={course.color}
            bodyStyle={truncateTextStyle}
          />
        </Grid>
      ))}
    </Grid>
  );
}