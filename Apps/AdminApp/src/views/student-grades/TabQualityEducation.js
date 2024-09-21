// ** React Imports
import React from 'react'
import Grid from '@mui/material/Grid'

import dynamic from 'next/dynamic'

const RadarChart = dynamic(() => import('./TabQualityComponents/RadarChart.js'), { ssr: false })
const StudentScore = dynamic(() => import('./TabQualityComponents/StudentScoreTable.js'), { ssr: false })
const ApexChartWrapper = dynamic(() => import('src/@core/styles/libs/react-apexcharts'), { ssr: false })

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