import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';

import Menu from './components/Menu';
import RoomPage from './pages/RoomPage';
import RoomsPage from './pages/RoomsPage';
import JournalPage from './pages/JournalPage';
import DevicesPage from './pages/DevicesPage';
import LoginPage from './pages/LoginPage';
import DevicePage from './pages/DevicePage';

import background from './assets/background.jpg';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import MobileAppPrompt from './components/MobileAppPrompt';

export default function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const BREAKPOINT = 1200;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (windowWidth < BREAKPOINT) {
    return <MobileAppPrompt breakpoint={BREAKPOINT} />;
  }

  return (
    <Router>
      <div style={{
        background: `url(${background})`,
        height: '100vh'
      }}>
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<Menu />}> 
              <Route path="/" element={<RoomsPage/>} />
              <Route path="/room/:roomId" element={<RoomPage/>} />
              <Route path="/device/:deviceId" element={<DevicePage/>} />
              <Route path="/devices" element={<DevicesPage/>} />
              <Route path="/journal" element={<JournalPage/>} />
            </Route>
          </Route>

          <Route path="/*" element={<NotFound/>} /> 
        </Routes>
      </div>
    </Router>
  );
}