import React, {useContext, useEffect, useState} from "react";
import './tracks.css';
import { getTracks } from "../../services/spotifyutils";
import SpotifyContext from "../../context/spotifyContext";
import Track from "./components/track";
import Header from "../../components/header/header";
import SelectorTime from "../../components/selectorTime/selectorTime";
import {ProgressSpinner} from 'primereact/progressspinner';
import NavigateTopButton from "../../components/navigateTopButton/navigateTopButton";

function Tracks() {    

    const {token} = useContext(SpotifyContext);

    const [tracks, setTracks] = useState(null);

    const [time, setTime] = useState('short');

    useEffect(()=>{
        if (token) {
            setTracks(null);
            getTracks(token, time).then((response) => {
                setTracks(response);
            });
        }
    }, [token, time])

    return (
        <div className="tracks-page">
            <Header title="Tracks"/>
            <SelectorTime time={time} setTime={setTime}/>
            {
                tracks ? (
                    <>
                        <div className="tracks-grid">
                            {tracks.items.map((track, index) => (
                                <Track index={index} trackData={track} key={track.id}/>
                            ))}
                        </div>
                        <NavigateTopButton />
                    </>
                ) :
                (
                    <div className="spinner-container"><ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" /></div>
                )
            }
        </div>
    );
}
export default Tracks;