import React from 'react';
import { getSpotifyToken } from '../../services/spotifyutils';
import './login.css';

function Login() {
    return (
        <div className='login-page'>
            <div className='login-card'>
                <h1>Spotify Profile</h1>
                <p>Connect with your Spotify account to see your profile and top tracks.</p>
                <button onClick={getSpotifyToken}>Login</button>
            </div>
        </div>
    );
}

export default Login;