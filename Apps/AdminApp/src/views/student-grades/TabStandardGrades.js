// ** React Imports
import React from 'react'
import { useState } from 'react'

import RadarChart from './TabStandardComponents/RadarChart.js' 
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'
import SelectionSection from './TabStandardComponents/SelectionSection.js'
import StudentScore from './TabStandardComponents/StudentScoreTable.js'

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
          <Grid item xs={12} md={8} lg={8} sx={{ m:4 }}>
              <StudentScore />
          </Grid>
          <Grid item xs={12} md={4} lg={3} sx={{ m:3 }}>
              <RadarChart /> 
          </Grid>
        </Grid>
      )}
    </ApexChartWrapper>
  )
}

export default TabStandardGrades