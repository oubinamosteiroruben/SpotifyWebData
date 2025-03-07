import React, { useEffect, useState, useContext } from 'react';
import { getProfile } from '../../services/spotifyutils';
import SpotifyContext from '../../context/spotifyContext';
import ProfileCard from './components/profileCard/profileCard';
import Menu from './components/menu/menu';
import './profile.css';
import { ProgressSpinner } from 'primereact/progressspinner';

function Profile() {
    const [profileData, setProfileData] = useState(null);
    const { token } = useContext(SpotifyContext);

    useEffect(() => {
        if (token) {
            getProfile(token).then((data) => {
                setProfileData(data);
            });
        }
    }, [token]);

    return (
        <div className='profile-page'>
            {profileData ? (
                <>
                    <ProfileCard profileData={profileData} />
                    <Menu />
                </>
            ) : (
                <div className="spinner-container"><ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" /></div>
            )}
        </div>
    );
}

export default Profile;