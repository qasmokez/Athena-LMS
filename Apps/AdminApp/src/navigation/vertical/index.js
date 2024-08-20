// ** Icon imports
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import Icon from '@mdi/react';
import { mdiSealVariant } from '@mdi/js';
import { mdiStarOutline } from '@mdi/js';

const navigation = () => {
  return [
    {
      title: '我/Profile',
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
