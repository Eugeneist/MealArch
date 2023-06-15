import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
} from '@mui/icons-material';
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined';
import HeightOutlinedIcon from '@mui/icons-material/HeightOutlined';
import { Box, Typography, Divider, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserProfile.module.scss';
import avatar from '../../assets/avatar.png';

type Gender = 'Female' | 'Male' | '-';

interface User {
  _id: number;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  age?: number;
  weight?: number;
  height?: number;
  gender?: Gender;
  friends?: number[];
  picturePath?: string;
  location?: string;
}

interface UserProfileProps {
  userId: string;
  // picturePath: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.token);
  // const dark = palette.neutral.dark;
  // const medium = palette.neutral.medium;
  // const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const { firstName, lastName, location, age, weight, height, picturePath } =
    user;

  return (
    <Box className={styles.profile__wrapper}>
      {/* FIRST ROW */}
      <Box
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <Box className={styles.profile__namebox} gap="1rem">
          {/* <UserImage image={picturePath} /> */}
          <Avatar alt="Remy Sharp" src={picturePath || avatar} />
          <Box>
            <Typography
              variant="h6"
              fontWeight="500"
              sx={{
                '&:hover': {
                  color: palette.primary.light,
                  cursor: 'pointer',
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography>{age} years old</Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="0.3rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" />
          <Typography>{location}</Typography>
        </Box>
      </Box>

      <Divider />

      <Box className={styles.profile__paramsbox} p="1rem 0">
        <MonitorWeightOutlinedIcon fontSize="large" />
        <Typography>{weight} kg</Typography>
        <HeightOutlinedIcon fontSize="large" />
        <Typography>{height} sm</Typography>
      </Box>

      <Divider />
    </Box>
  );
};

export default UserProfile;
