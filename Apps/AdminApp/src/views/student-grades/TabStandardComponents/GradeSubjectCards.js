import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

// Sample data for 三年级
const gradeData = {
  classes: [
    {
      className: '一班',
      subjects: {
        英文: { 最高分: 93, 平均分: 83 },
        数学: { 最高分: 92, 平均分: 81 },
        语文: { 最高分: 88, 平均分: 76 },
      },
      人数: 40
    },
    {
      className: '二班',
      subjects: {
        英文: { 最高分: 95, 平均分: 80 },
        数学: { 最高分: 90, 平均分: 78 },
        语文: { 最高分: 85, 平均分: 72 },
      },
      人数: 35
    },
    {
      className: '三班',
      subjects: {
        英文: { 最高分: 96, 平均分: 82 },
        数学: { 最高分: 95, 平均分: 82 },
        语文: { 最高分: 90, 平均分: 75 },
      },
      人数: 45
    }
  ]
};

const calculateTotal = (subject) => {
  const highestScores = gradeData.classes.map((c) => c.subjects[subject].最高分);
  const averageScores = gradeData.classes.map((c) => c.subjects[subject].平均分);
  const totalHighest = Math.max(...highestScores);
  const totalAverage = (
    averageScores.reduce((total, score) => total + score, 0) / averageScores.length
  ).toFixed(1);

  return { totalHighest, totalAverage };
};

const calculateTotalStudents = () => {
  const totalStudents = gradeData.classes.reduce((total, c) => total + c.人数, 0);
  return totalStudents;
};

const GradeSubjectCards = () => {
  const subjects = ['英文', '数学', '语文'];
  const totalStudents = calculateTotalStudents();

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {/* Cards for each subject */}
        {subjects.map((subject) => {
          const { totalHighest, totalAverage } = calculateTotal(subject);

          return (
            <Grid item xs={12} sm={4} key={subject}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    三年级 {subject}
                  </Typography>
                  <Typography variant="body1">最高分: {totalHighest}</Typography>
                  <Typography variant="body1">平均分: {totalAverage}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
        {/* Card for total students */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                三年级 班级人数
              </Typography>
              {gradeData.classes.map((c) => (
                <Typography key={c.className} variant="body1">
                  {c.className} 人数: {c.人数}
                </Typography>
              ))}
              <Typography variant="body1" sx={{ mt: 2 }}>
                总人数: {totalStudents}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GradeSubjectCards;
