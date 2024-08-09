// ** Icon imports
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import GradeIcon from '@mui/icons-material/Grade';
import BookOpenOutline from 'mdi-material-ui/BookOpenOutline'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const navigation = () => {
  return [
    {
      title: '主页/Dashboard',
      icon: HomeOutline,
      path: '/dashboard'
    },
    {
      title: '我/Profile',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      title: '我的课堂/Courses',
      icon: BookOpenOutline,
      path: '/courses'
    },
    {
      title: '我的分数/Grades',
      icon:  GradeIcon,
      path: '/grades'
    },
    {
      title: '我的荣誉/Honors',
      icon:  EmojiEventsIcon,
      path: '/honors'
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }
  ]
}

export default navigation
