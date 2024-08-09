// ## Next import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import Star from '@mui/icons-material/Star';
import MilitaryTech from '@mui/icons-material/MilitaryTech';
import DotsVertical from 'mdi-material-ui/DotsVertical'

const honorsData = [
  {
    title: '数学之星 lv4',
    description: 'Awarded for exceptional performance',
    color: 'primary',
    icon: <EmojiEvents sx={{ fontSize: '1.75rem' }} />
  },
  {
    title: '三好学生',
    description: 'Recognized for outstanding leadership',
    color: 'success',
    icon: <Star sx={{ fontSize: '1.75rem' }} />
  },
  {
    title: '科技创新奖',
    description: 'For innovative project contributions',
    color: 'warning',
    icon: <MilitaryTech sx={{ fontSize: '1.75rem' }} />
  },
  {
    title: '优秀班干部',  
    description: 'Recognized for outstanding leadership',
    // ** picke a color for medal
    color: 'info',
    icon: <Star sx={{ fontSize: '1.75rem' }} />
  },
]

const renderHonors = () => {
  return honorsData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box 
        key={index} 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',  // Ensures alignment of the icon and text
          textAlign: 'center',  // Ensures the text is centered horizontally within the text box
        }}
      >
        <Avatar
          variant='rounded'
          sx={{
            mr: 2,  // Reduced margin to ensure closer alignment with text
            width: 40,
            height: 40,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
            {item.title}
          </Typography>
          <Typography variant='caption' sx={{ color: 'text.secondary' }}>
            {item.description}
          </Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const HonorsCard = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/Honors'); 
  };

  return (
    <Card>
      <CardHeader
        title='部分荣誉'
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
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderHonors()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default HonorsCard