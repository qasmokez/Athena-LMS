import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Icon from '@mdi/react'
import { mdiTrophy } from '@mdi/js'

const AwardCard = () => {
  const [showAllAwards, setShowAllAwards] = useState(false)

  const handleToggleAwards = () => {
    setShowAllAwards(!showAllAwards)
  }

  const awards = [
    { id: 1, name: 'Top Student', awardedBy: 'Principal', date: '2023-07-25', comment: 'Outstanding performance in all subjects.', icon: mdiTrophy },
    { id: 2, name: '黑奴奖', awardedBy: 'Principal', date: '2023-08-29', comment: '加班加点跟傻逼一样', icon: mdiTrophy }
  ]

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 2 }}>
          获得的奖章
        </Typography>
        {awards.slice(0, showAllAwards ? awards.length : 1).map(award => (
          <Box key={award.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Icon path={award.icon} size={1} color="silver" />
            <Box sx={{ ml: 2 }}>
              <Typography variant='h6'>{award.name}</Typography>
              <Typography variant='body2'>授予人: {award.awardedBy}</Typography>
              <Typography variant='body2'>给予日期: {award.date}</Typography>
              <Typography variant='body2'>评语: {award.comment}</Typography>
            </Box>
          </Box>
        ))}
        <Button variant='text' onClick={handleToggleAwards}>
          {showAllAwards ? 'Show Less' : 'Show All'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default AwardCard
