import './app.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './scenes/HomePage/HomePage';
import LoginPage from './scenes/LoginPage/LoginPage';
import ProfilePage from './scenes/ProfilePage/ProfilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';

function App() {

  const mode = useSelector((state) => state.mode); // We use 'useSelector' to grab the state
  const theme = useMemo(() => createTheme(themeSettings((mode)), [mode]))
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={isAuth ? <HomePage /> : <LoginPage />}/>
            <Route path='/home' element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            <Route path='/profile/:userId' element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
