import React , {useContext} from "react";
import "./artist.css";
import {followArtist} from "../../../services/spotifyutils";
import SpotifyContext from "../../../context/spotifyContext";

function Artist({ artistData, index }) {

    const {token} = useContext(SpotifyContext);

    const followArtistButton = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await followArtist(token, artistData.id);
    };

    return (
        <a target="_blank" rel="noopener noreferrer" href={artistData.external_urls.spotify} key={artistData.id} className="artist">
            <img src={artistData.images[0]?.url} alt={artistData.name} />
            <div className="artist-info">
                <div className="artist-name">{artistData.name}</div>
                <div className="artist-genre" title={artistData.genres.join(', ')}>{artistData.genres.join(', ')}</div>
            </div>
            <div title='Position' className="index">{index+1}</div>
            {/* <button onClick={followArtistButton} className="following-button">Follow</button> */}
        </a>
    );
}

export default Artist;
