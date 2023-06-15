import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { UserProfile, Workdesk } from '../../components';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { _id } = useSelector((state: any) => state.user);

  return (
    <div className={styles.wrapper}>
      <UserProfile userId={_id} />
      <Workdesk />
    </div>
  );
};

export default ProfilePage;
