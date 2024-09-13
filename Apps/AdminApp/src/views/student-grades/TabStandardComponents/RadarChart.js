import React from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import { useState } from 'react'

import DotsVertical from 'mdi-material-ui/DotsVertical'

// Dynamically import Chart with no SSR
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const RadarChart = () => {
  const theme = useTheme()

  // State to manage which series are visible
  const [seriesVisibility, setSeriesVisibility] = useState({
    年级平均: true,
    一班平均: false,
    二班平均: false,
    三班平均: true, 
  })

  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleCheckboxChange = (event) => {
    setSeriesVisibility((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked
    }))
  }

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
      categories: ['语文', '数学', '英文'],
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
    colors: [theme.palette.primary.main, theme.palette.error.main, theme.palette.secondary.main, theme.palette.warning.main]
  }

  const seriesData = [
    {
      name: '年级平均',
      data: [43, 83, 97]
    },
    {
      name: '一班平均',
      data: [50, 70, 80]
    },
    {
      name: '二班平均',
      data: [55, 75, 85]
    },
    {
      name: '三班平均',
      data: [62, 79, 86]
    },
  ]

  const filteredSeries = seriesData.filter((s) => seriesVisibility[s.name])

  return (
    <Card sx={{ position: 'relative', p: 0 }}>
      <CardHeader
        title='雷达图'
        titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
        action={
          <>
            <IconButton
              size='small'
              aria-label='settings'
              className='card-more-options'
              sx={{ color: 'text.secondary' }}
              onClick={handleMenuClick}
            >
              <DotsVertical />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {Object.keys(seriesVisibility).map((key) => (
                <MenuItem key={key}>
                  <Checkbox
                    checked={seriesVisibility[key]}
                    onChange={handleCheckboxChange}
                    name={key}
                  />
                  {key}
                </MenuItem>
              ))}
            </Menu>
          </>
        }
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Chart options={options} series={filteredSeries} type='radar' height={300} />
      </CardContent>
    </Card>
  )
}

export default RadarChart