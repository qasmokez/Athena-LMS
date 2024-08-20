import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Icon from '@mdi/react'
import { mdiStar, mdiMedal } from '@mdi/js'

const LevelingCard = () => {
  const levelingUp = [
    { id: 1, name: '数学之星', currentLevel: 4, nextLevel: 5, experience: 75, icon: mdiStar },
    { id: 2, name: 'Science Genius', currentLevel: 2, nextLevel: 3, experience: 50, icon: mdiMedal }
  ]

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 2 }}>
          升级
        </Typography>
        {levelingUp.map(level => (
          <Box key={level.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Icon path={level.icon} size={1} color="gold" />
            <Box sx={{ ml: 2, flexGrow: 1 }}>
              <Typography variant='h6'>{level.name} - Level {level.currentLevel} to {level.nextLevel}</Typography>
              <LinearProgress variant="determinate" value={level.experience} sx={{ height: 10, borderRadius: 5, marginTop: 1 }} />
              <Typography variant='body2' sx={{ marginTop: 1 }}>经验条: {level.experience}%</Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  )
}

export default LevelingCard
