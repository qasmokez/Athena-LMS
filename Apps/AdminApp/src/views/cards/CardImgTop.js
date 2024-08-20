// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState } from 'react'

import { useRouter } from 'next/router';

// Predefined light colors
const lightColors = [
  'lightblue',
  'lightgreen',
  'lightcoral',
  'lightgoldenrodyellow',
  'lightpink',
  'lightsalmon',
  'lightseagreen'
]

const CardImgTop = ({ title, body, color, bodyStyle }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [bgColor, setBgColor] = useState(color)

  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleColorChange = (newColor) => {
    setBgColor(newColor)
    handleClose()
  }

  const handleCardClick = () => {
    const encodedTitle = encodeURIComponent(title.toLowerCase());
    router.push(`/courses/${encodedTitle}/home`);
  }
  

  return (
    <Card >
      <div style={{ position: 'relative' }}>
        <CardMedia 
          // avoid warning of no image
          component="div" // Use a div as a placeholder
          sx={{ height: '12rem', backgroundColor: bgColor }} 
        />
        <IconButton 
          aria-label="settings" 
          onClick={handleClick} 
          sx={{ position: 'absolute', top: 0, right: 0 }}
        >
          <MoreVertIcon />
        </IconButton>
      </div>
      <CardContent onClick={handleCardClick} sx={{ cursor: 'pointer' }}>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          {title}
        </Typography>
        <Typography variant='body2' style={bodyStyle}>
          {body}
        </Typography>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
       {lightColors.map((color, index) => (
          <MenuItem key={index} onClick={() => handleColorChange(color)}>
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </MenuItem>
       ))}
      </Menu>
    </Card>
  )
}

export default CardImgTop
