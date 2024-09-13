import React from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'

import DotsVertical from 'mdi-material-ui/DotsVertical'

// Dynamically import Chart with no SSR
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const RadarChart = () => {
  const theme = useTheme()

  const options = {
    chart: {
      type: 'radar',
      toolbar: {
        show: false
      },
    },
    markers: {
        size: 0 // Remove dots on the edges of each polygon
    },
    xaxis: {
      categories: ['品德发展', '社会实践', '学业发展', '审美素质', '身心健康'],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '10px'
        }
      }
    },
    yaxis: {
      show: false, // Hide y-axis labels
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '12px'
        }
      }
    },
    colors: [theme.palette.primary.main, theme.palette.error.main]
  }

  const series = [{
    name: '班级平均',
    data: [24, 34, 43, 83, 97]
  }, {
    name: '年级平均',
    data: [53, 62, 79, 86, 92]
  }]

  return (
    <Card sx={{ position: 'relative', p: 0 }}>
      <CardHeader
        title='雷达图'
        titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Chart options={options} series={series} type='radar' height={300} />
      </CardContent>
    </Card>
  )
}

export default RadarChart