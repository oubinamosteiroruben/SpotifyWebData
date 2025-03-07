import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import Profile from './pages/profile/profile';
import Artists from './pages/artists/artists';
import Tracks from './pages/tracks/tracks';

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/artists" element={<Artists/>} />
            <Route path="/tracks" element={<Tracks/>} />
        </Routes>
    </Router>
);

export default AppRoutes;