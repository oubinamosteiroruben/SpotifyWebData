import React from "react";
import './profileCard.css';


function ProfileCard({profileData}) {

    return (
        <>
        {
            profileData && (
                <div className="profile-card">
                    <div className="title-profile">
                        <h1>Hello&nbsp;{profileData.display_name}</h1>
                        <img height="200" src={profileData.images[0].url} alt='profile' />
                    </div>
                </div>
            )
        }        
        </>
        
    );
}

export default ProfileCard;