// ** React Imports
import React from 'react'
import { useState } from 'react'

import RadarChart from './TabStandardComponents/RadarChart.js' 
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'
import SelectionSection from './TabStandardComponents/SelectionSection.js'
import StudentScore from './TabStandardComponents/StudentScoreTable.js'
import GradeClassBarChart from './TabStandardComponents/GradeClassBarChart.js';
import GradeSubjectCards from './TabStandardComponents/GradeSubjectCards.js'
import PeopleIcon from '@mui/icons-material/People'; 
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

const TabStandardGrades = () => {
  // ** State for selections
  const [examSession, setExamSession] = useState('')
  const [grade, setGrade] = useState('')

  // Handlers to update state
  const handleExamSessionChange = (value) => {
    setExamSession(value)
  }

  const handleGradeChange = (value) => {
    setGrade(value)
  }

  return (
    <ApexChartWrapper>
      {/* Pass state and handlers to SelectionSection */}
      <SelectionSection 
        examSession={examSession}
        grade={grade}
        onExamSessionChange={handleExamSessionChange}
        onGradeChange={handleGradeChange}
      />

      {/* Render the radar chart only if both examSession and grade are selected */}
      {examSession && grade && (
        <Grid container spacing={1}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: -6, ml:217, mt: -20}}>
            <PeopleIcon sx={{ mr: 1 }} /> {/* Icon with margin */}
            <Typography variant="h6">年级总人数：120</Typography>
          </Box>
          <Grid item xs={12} md={8} lg={11.5} sx={{ ml:5 , mt:4, mb: 3 }}>
            <GradeSubjectCards/>
          </Grid>
          <Grid item xs={12} md={8} lg={11.5} sx={{ ml:5 , mt:4, mb: 3 }}>
            <GradeClassBarChart/>
          </Grid>
          <Grid item xs={12} md={8} lg={8.25} sx={{ ml:5 , mt:4, mb: 3 }}>
              <StudentScore />
          </Grid>
          <Grid item xs={12} md={4} lg={3} sx={{ ml:5 , mt:4, mb: 3}}>
              <RadarChart /> 
          </Grid>
        </Grid>
      )}
    </ApexChartWrapper>
  )
}

export default TabStandardGrades