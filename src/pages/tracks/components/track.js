import React, { useEffect } from "react";
import "./track.css";

function Track({ trackData }) {
    useEffect(() => {
        console.log(trackData);
    }, [trackData]);

    return (
        <a target="_blank" rel="noopener noreferrer" href={trackData.external_urls.spotify} key={trackData.id} className="track">
            <img src={trackData.album.images[0]?.url} alt={trackData.name} />
            <div className="track-info">
                <div className="track-name">{trackData.name}</div>
                <div className="track-artist">{trackData.artists.map(artist => artist.name).join(', ')}</div>
            </div>
        </a>
    );
}

export default Track;
