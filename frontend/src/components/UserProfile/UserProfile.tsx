import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import { Box, Typography, Divider, useTheme } from '@mui/material';
import UserImage from 'components/UserImage';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  console.log(userId);

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

  const { firstName, lastName, location, age } = user;

  return (
    <Box>
      {/* FIRST ROW */}
      <Box
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <Box gap="1rem">
          {/* <UserImage image={picturePath} /> */}
          <Box>
            <Typography
              variant="h4"
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
        <ManageAccountsOutlined />
      </Box>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" />
          <Typography>{location}</Typography>
        </Box>
      </Box>

      <Divider />
    </Box>
  );
};

export default UserProfile;
