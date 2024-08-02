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

const CardImgTop = ({ title, body, color }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [bgColor, setBgColor] = useState(color)

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

  return (
    <Card>
      <div style={{ position: 'relative' }}>
        <CardMedia 
          // avoid warning of no image
          component="div" // Use a div as a placeholder
          sx={{ height: '14.5625rem', backgroundColor: bgColor }} 
        />
        <IconButton 
          aria-label="settings" 
          onClick={handleClick} 
          sx={{ position: 'absolute', top: 0, right: 0 }}
        >
          <MoreVertIcon />
        </IconButton>
      </div>
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          {title}
        </Typography>
        <Typography variant='body2'>
          {body}
        </Typography>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleColorChange('red')}>Red</MenuItem>
        <MenuItem onClick={() => handleColorChange('blue')}>Blue</MenuItem>
        <MenuItem onClick={() => handleColorChange('green')}>Green</MenuItem>
      </Menu>
    </Card>
  )
}

export default CardImgTop
