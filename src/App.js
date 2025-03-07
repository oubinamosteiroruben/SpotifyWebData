import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AppRoutes from './routes';
import SpotifyContext from './context/spotifyContext';
import { handleSpotifyCallback } from './services/spotifyutils';



function App() {

  
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token && window.location.pathname !== '/') {
      handleSpotifyCallback().then((token) => {
        setToken(token);
      }).catch(() => {
        window.location = '/';
      });
    }else{
      localStorage.removeItem('access_token')
    }
  }, [token]);

  return (
    <div className="App">
      <SpotifyContext.Provider value={{ token: token, setToken: setToken }}>
        <AppRoutes />
      </SpotifyContext.Provider>
    </div>
  );
}

export default App;
