// ** React Imports
import React from 'react'

import RadarChart from './SharedComponents/RadarChart.js' 
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'

const TabQualityEducation = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>

        <Grid item xs={12} md={6} lg={4}>
          <RadarChart /> 
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RadarChart /> 
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RadarChart /> 
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RadarChart /> 
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RadarChart /> 
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RadarChart /> 
        </Grid>
      
      </Grid>
    </ApexChartWrapper>
  )
}

export default TabQualityEducation