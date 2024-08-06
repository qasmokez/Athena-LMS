import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icons Imports
import AssignmentIcon from '@mui/icons-material/Assignment';
import DotsVertical from 'mdi-material-ui/DotsVertical'

const data = [
  {
    progress: 75,
    title: 'Math 101',
    assignment: 'Homework 1',
    dueDate: '2023-10-10',
    color: 'primary'
  },
  {
    progress: 50,
    title: 'History 201',
    assignment: 'Essay',
    dueDate: '2023-10-12',
    color: 'info'
  },
  {
    progress: 20,
    title: 'Science 301',
    assignment: 'Lab Report',
    dueDate: '2023-10-15',
    color: 'secondary'
  }
]

const ToDoList = () => {
  return (
    <Card>
      <CardHeader
        title='今日任务'
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
              key={item.title + item.assignment}
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
                    {item.title}
                  </Typography>
                  <Typography variant='caption'>{item.assignment}</Typography>
                  <Typography variant='caption'>Due: {item.dueDate}</Typography>
                </Box>

                <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                  <LinearProgress color={item.color} value={item.progress} variant='determinate' />
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default ToDoList