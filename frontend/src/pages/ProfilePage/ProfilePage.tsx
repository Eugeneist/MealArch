import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { UserProfile } from '../../components';

const ProfilePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { _id } = useSelector((state: any) => state.user);

  return (
    <div>
      <h1>Your page, user!</h1>
      <UserProfile userId={_id} />
    </div>
  );
};

export default ProfilePage;
