import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton, Menu, MenuItem, Checkbox, ListItemText } from '@mui/material';
import Chart from 'react-apexcharts';
import DotsVertical from 'mdi-material-ui/DotsVertical';

// Sample data
const statisticsData = [
  {
    grade: '',
    className: '三年级',
    subjects: {
      数学: { 最高分: 98, 最低分: 60, 平均分: 79 },
      语文: { 最高分: 95, 最低分: 55, 平均分: 80 },
      英语: { 最高分: 100, 最低分: 65, 平均分: 85 }
    },
    人数: 120
  },
  {
    grade: '三年级',
    className: '一班',
    subjects: {
      数学: { 最高分: 92, 最低分: 70, 平均分: 81 },
      语文: { 最高分: 88, 最低分: 60, 平均分: 76 },
      英语: { 最高分: 93, 最低分: 68, 平均分: 83 }
    },
    人数: 40
  },
  {
    grade: '三年级',
    className: '二班',
    subjects: {
      数学: { 最高分: 90, 最低分: 65, 平均分: 78 },
      语文: { 最高分: 85, 最低分: 58, 平均分: 72 },
      英语: { 最高分: 95, 最低分: 70, 平均分: 80 }
    },
    人数: 35
  },
  {
    grade: '三年级',
    className: '三班',
    subjects: {
      数学: { 最高分: 95, 最低分: 66, 平均分: 82 },
      语文: { 最高分: 90, 最低分: 57, 平均分: 75 },
      英语: { 最高分: 96, 最低分: 62, 平均分: 82 }
    },
    人数: 45
  }
];

const GradeClassBarChart = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(['最高分', '最低分', '平均分']);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSeriesChange = (event) => {
    const { value } = event.target;
    setSelectedSeries((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const chartOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%'
      }
    },
    xaxis: {
      categories: statisticsData.map(item => [`${item.grade} ${item.className} - 数学`, `${item.grade} ${item.className} - 语文`, `${item.grade} ${item.className} - 英语`]).flat(),
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      title: { text: '分数' }
    },
    dataLabels: { enabled: false },
  };

  const chartSeries = selectedSeries.map(series => ({
    name: series,
    data: statisticsData.flatMap(item => [
      item.subjects.数学[series],
      item.subjects.语文[series],
      item.subjects.英语[series]
    ])
  }));

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">班级成绩柱状图</Typography>
          <IconButton onClick={handleMenuClick}>
            <DotsVertical />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {['最高分', '最低分', '平均分'].map((option) => (
              <MenuItem key={option} onClick={handleMenuClose}>
                <Checkbox
                  checked={selectedSeries.includes(option)}
                  onChange={handleSeriesChange}
                  value={option}
                />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
      </CardContent>
    </Card>
  );
};

export default GradeClassBarChart;
