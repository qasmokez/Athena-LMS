// ** Icon imports
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import BookOpenOutline from 'mdi-material-ui/BookOpenOutline'
import Icon from '@mdi/react';
import { mdiSealVariant } from '@mdi/js';
import { mdiStarOutline } from '@mdi/js';

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
      icon:  () => <Icon path={mdiStarOutline} size={1} />,
      path: '/grades'
    },
    {
      title: '我的荣誉/Honors',
      icon:  () => <Icon path={mdiSealVariant} size={1} />,
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
