import React from "react";
import './profileCard.css';


function ProfileCard({profileData}) {

    const img = profileData.images && profileData.images[0]?.url;

    return (
        <>
        {
            profileData && (
                <div className="profile-card">
                    <div className="title-profile">
                        <h1>Hello&nbsp;{profileData.display_name}</h1>
                        { img && (<img height="200" src={img} alt='profile' />)}
                    </div>
                </div>
            )
        }        
        </>
        
    );
}

export default ProfileCard;