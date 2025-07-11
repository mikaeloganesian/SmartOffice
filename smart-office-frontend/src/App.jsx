import './App.css'
import './index.css';

import Menu from './components/Menu'
import RoomPage from './pages/RoomPage';
import RoomsPage from './pages/RoomsPage';
import JournalPage from './pages/JournalPage';
import DevicesPage from './pages/DevicesPage';
import LoginPage from './pages/LoginPage';

import background from './assets/background.jpg'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <div style={{
        background: `url(${background})`,
      }}>
        <Menu />
        <Routes>
          <Route path="/" element={<RoomsPage/>} />
          <Route path="/room/:roomId" element={<RoomPage/>} />
          <Route path="/devices" element={<DevicesPage/>} />
          <Route path="/journal" element={<JournalPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/*" element={<NotFound/>} />
        </Routes>
      </div>
    </Router>
  )
}