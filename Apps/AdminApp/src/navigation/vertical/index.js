// ** Icon imports
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import Icon from '@mdi/react';
import { mdiSealVariant } from '@mdi/js';
import SchoolIcon from '@mui/icons-material/School'
import { mdiStarOutline } from '@mdi/js';

const navigation = () => {
  return [
    {
      title: '学生档案',
      icon: SchoolIcon,
      path: '/student-documents'
    },
    {
      title: '个人设置/Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
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
  ]
}

export default navigation
