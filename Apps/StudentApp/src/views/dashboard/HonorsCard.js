// ## Next import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Icon from '@mdi/react'
import LinearProgress from '@mui/material/LinearProgress'
import { mdiStar } from '@mdi/js'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'


const levelingUp = [
  { id: 1, name: '数学之星', currentLevel: 4, nextLevel: 5, experience: 75, icon: mdiStar },
]

const HonorsCard = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/honors'); 
  };

  return (
    <Card>
      <CardHeader
        title='荣誉进度'
        action={
          <IconButton 
            onClick={handleRedirect}
            size='small' 
            aria-label='settings' 
            className='card-more-options' 
            sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <Card>
        <CardContent>
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
    </Card>
  )
}

export default HonorsCard