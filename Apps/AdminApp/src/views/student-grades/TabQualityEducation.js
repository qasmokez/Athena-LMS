// ** React Imports
import React from 'react'

import RadarChart from './TabQualityComponents/RadarChart.js' 
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'
import StudentScore from './TabQualityComponents/StudentScoreTable.js'

const TabQualityEducation = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={1}>

        <Grid item xs={12} md={8} lg={8.35} sx={{ ml:5 , mt:4, mb: 3 }}>
              <StudentScore />
          </Grid>
          <Grid item xs={12} md={4} lg={3} sx={{ ml:5 , mt:4, mb: 3}}>
              <RadarChart /> 
          </Grid>
    
      </Grid>
    </ApexChartWrapper>
  )
}

export default TabQualityEducation