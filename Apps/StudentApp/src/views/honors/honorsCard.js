import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Icon from '@mdi/react'
import { mdiStar, mdiMedal } from '@mdi/js'

const HonorsCard = () => {
  const [showAllHonors, setShowAllHonors] = useState(false)

  const handleToggleHonors = () => {
    setShowAllHonors(!showAllHonors)
  }

  const honors = [
    { id: 1, name: '数学之星', date: '2023-07-12', level: 4, icon: mdiStar },
    { id: 2, name: 'Science Genius', date: '2023-08-01', level: 2, icon: mdiMedal }
  ]

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 2 }}>
          已解锁荣誉
        </Typography>
        {honors.slice(0, showAllHonors ? honors.length : 1).map(honor => (
          <Box key={honor.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Icon path={honor.icon} size={1} color="gold" />
            <Box sx={{ ml: 2 }}>
              <Typography variant='h6'>{honor.name} - Level {honor.level}</Typography>
              <Typography variant='body2'>获得时间: {honor.date}</Typography>
            </Box>
          </Box>
        ))}
        <Button variant='text' onClick={handleToggleHonors}>
          {showAllHonors ? 'Show Less' : 'Show All'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default HonorsCard
