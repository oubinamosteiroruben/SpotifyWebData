import React, { useEffect } from "react";
import "./track.css";

function Track({ trackData, index }) {
    
    return (
        <a target="_blank" rel="noopener noreferrer" href={trackData.external_urls.spotify} key={trackData.id} className="track">
            <img src={trackData.album.images[0]?.url} alt={trackData.name} />
            <div className="track-info">
                <div className="track-name">{trackData.name}</div>
                <div className="track-artist">{trackData.artists.map(artist => artist.name).join(', ')}</div>
            </div>
            <div title='Position' className="index">{index+1}</div>
        </a>
    );
}

export default Track;
