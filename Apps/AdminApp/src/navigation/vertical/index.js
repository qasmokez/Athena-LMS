// ** Icon imports
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import Icon from '@mdi/react';
import { mdiSealVariant } from '@mdi/js';
import MenuBookIcon from '@mui/icons-material/MenuBook'
import SchoolIcon from '@mui/icons-material/School'

const navigation = () => {
  return [
    {
      title: '学生档案',
      icon: SchoolIcon,
      path: '/student-documents'
    },
    {
      title: '学生成绩',
      icon:  MenuBookIcon,
      path: '/student-grades'
    },
    {
      title: '个人设置/Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      title: '我的荣誉/Honors',
      icon:  () => <Icon path={mdiSealVariant} size={1} />,
      path: '/honors'
    },
  ]
}

export default navigation
