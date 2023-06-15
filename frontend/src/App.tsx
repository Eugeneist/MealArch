import './App.css';
import { useMemo } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Navbar } from './components';
import { LoginPage, ProfilePage } from './pages';

const App = () => {
  const isAuth = Boolean(useSelector((state: any) => state.token));

  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/profile"
          element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:userId"
          element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
