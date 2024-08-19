import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import AssignmentIcon from '@mui/icons-material/Assignment';
import DotsVertical from 'mdi-material-ui/DotsVertical'

const data = [
  {
    course: 'Math 101',
    assignment: 'Homework 1',
    grade: '2/2',
    comments: 'Well done!',
    color: 'primary'
  },
  {
    course: 'History 201',
    assignment: 'Essay',
    grade: '1.5/2',
    comments: 'Good effort, but needs more details.',
    color: 'info'
  },
  {
    course: 'Science 301',
    assignment: 'Lab Report',
    grade: '1/2',
    comments: 'Incomplete work.',
    color: 'secondary'
  }
]

const RecentFeedback = () => {
  return (
    <Card>
      <CardHeader
        title='近期反馈'
        titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
        {data.map((item, index) => {
          return (
            <Box
              key={item.course + item.assignment}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== data.length - 1 ? { mb: 8.5 } : {})
              }}
            >
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 40,
                  height: 40,
                  backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.04)`
                }}
              >
                <AssignmentIcon />
              </Avatar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    {item.course}
                  </Typography>
                  <Typography variant='caption'>{item.assignment}</Typography>
                  <Typography variant='caption'>Grade: {item.grade}</Typography>
                  <Typography variant='caption'>Comments: {item.comments}</Typography>
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default RecentFeedback