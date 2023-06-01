import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state';
import Dropzone from 'react-dropzone';

type Gender = 'Female' | 'Male' | 'other';

interface RegisterValues {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  age?: number;
  weight?: number;
  height?: number;
  gender?: Gender;
  friends?: number[];
  // picture?: File;
  location?: string;
}

interface LoginValues {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  age?: number;
  weight?: number;
  height?: number;
  gender?: Gender;
  friends?: number[];
  // picture?: File;
  location?: string;
}

const registerSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().optional(),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
  location: yup.string().optional(),
  age: yup.number().optional(),
  weight: yup.number().optional(),
  height: yup.number().optional(),
  gender: yup.mixed().optional(),
  // picture: yup.mixed().optional(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
});

const initialValuesRegister: RegisterValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  age: 0,
  weight: 0,
  height: 0,
  gender: 'other',
  // picture: undefined,
};

const initialValuesLogin: LoginValues = {
  email: '',
  password: '',
};

const Form = () => {
  const [pageType, setPageType] = useState<'login' | 'register'>('login');
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register';

  const register = async (
    values: RegisterValues,
    onSubmitProps: FormikHelpers<RegisterValues | LoginValues>,
  ) => {
    const formData = new FormData();
    for (const value in values) {
      formData.append(value, (values as any)[value]);
    }
    // formData.append('picturePath', values.picture ? values.picture.name : '');

    const savedUserResponse = await fetch(
      'http://localhost:3001/auth/register',
      {
        method: 'POST',
        body: formData,
      },
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType('login');
    }
  };

  const login = async (
    values: LoginValues,
    onSubmitProps: FormikHelpers<RegisterValues | LoginValues>,
  ) => {
    const loggedInResponse = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        }),
      );
      navigate('/profile');
    }
  };

  const handleFormSubmit = async (
    values: RegisterValues | LoginValues,
    onSubmitProps: FormikHelpers<RegisterValues | LoginValues>,
  ) => {
    if (isLogin) await login(values as LoginValues, onSubmitProps);
    if (isRegister) await register(values as RegisterValues, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
            }}
          >
            {isRegister && (
              <div>
                <h1>Register Page</h1>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label="Age"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.age}
                  type="number"
                  name="age"
                  error={Boolean(touched.age) && Boolean(errors.age)}
                  helperText={touched.age && errors.age}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label="Weight"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.weight}
                  type="number"
                  name="weight"
                  error={Boolean(touched.weight) && Boolean(errors.weight)}
                  helperText={touched.weight && errors.weight}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Height"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.height}
                  type="number"
                  name="height"
                  error={Boolean(touched.height) && Boolean(errors.height)}
                  helperText={touched.height && errors.height}
                  sx={{ gridColumn: 'span 2' }}
                />
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  value={values.gender}
                  label="Gender"
                  onChange={handleChange}
                >
                  <MenuItem key={0} value={'Female'}>
                    Female
                  </MenuItem>
                  <MenuItem key={1} value={'Male'}>
                    Male
                  </MenuItem>
                  <MenuItem key={2} value={'other'}>
                    other
                  </MenuItem>
                </Select>
                {/* <Box gridColumn="span 4" borderRadius="5px" p="1rem">
                  <Dropzone
                    // acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue('picture', acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <Box>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </Box>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box> */}
              </div>
            )}

            {isLogin && (
              <div>
                <h1>Login Page</h1>
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: 'span 4' }}
                />
              </div>
            )}
          </Box>
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                '&:hover': { color: palette.primary.main },
              }}
            >
              {isLogin ? 'LOGIN' : 'REGISTER'}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? 'register' : 'login');
                resetForm();
              }}
              sx={{
                textDecoration: 'underline',
                color: palette.primary.main,
                '&:hover': {
                  cursor: 'pointer',
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : 'Already have an account? Login here.'}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
