import React from 'react';
import { Box, Card, CardContent, CardHeader, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

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

const StyledHeaderBox = styled(Box)(({ bgcolor }) => ({
  backgroundColor: bgcolor,
  height: '35px', 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontWeight: 'bold',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
}));

// Function to determine the background color based on the subject
const getColorForSubject = (subject) => {
  switch (subject) {
    case '英文':
      return 'lightblue';
    case '数学':
      return 'lightblue';
    case '语文':
      return 'lightblue';
    default:
      return 'lightblue';
  }
};

const GradeSubjectCards = () => {
  const subjects = ['英文', '数学', '语文'];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {/* Cards for each subject */}
        {subjects.map((subject) => {
          const { totalHighest, totalAverage } = calculateTotal(subject);
          const color = getColorForSubject(subject);

          return (
            <Grid item xs={12} sm={4} key={subject}>
              <Card sx={{mr:5, ml:-3}}>
                {/* Header with color */}
                <StyledHeaderBox bgcolor={color}>
                </StyledHeaderBox>
                {/* Content */}
                <CardContent sx={{ textAlign: 'center', mt:-3}}>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                      年级{subject}最高分
                    </Typography>
                    <Typography variant="h5">{totalHighest}</Typography>
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                      {subject}平均分
                    </Typography>
                    <Typography variant="h5">{totalAverage}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default GradeSubjectCards;
