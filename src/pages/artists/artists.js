import React, {useEffect, useContext, useState} from "react";
import './artists.css';
import { getArtists } from "../../services/spotifyutils";
import SpotifyContext from "../../context/spotifyContext";
import Artist from "./components/artist";
import Header from "../../components/header/header";
import SelectorTime from "../../components/selectorTime/selectorTime";
import {ProgressSpinner} from 'primereact/progressspinner';
import NavigateTopButton from "../../components/navigateTopButton/navigateTopButton";


function Artists() {

    const {token} = useContext(SpotifyContext);

    const [artists, setArtists] = useState(null);

    const [time, setTime] = useState('short');

    useEffect(()=>{
        if (token && time) {
            setArtists(null);
            getArtists(token, time).then((response) => {
                console.log(response)
                setArtists(response);
            });
        }
    }, [token, time])


    return (
        <div className="artists-page">
            <Header title="Artists"/>
            <SelectorTime time={time} setTime={setTime}/>
            {
                artists ? (
                    <>
                        <div className="artists-grid">
                            {artists.items.map((artist) => (
                                <Artist artistData={artist} key={artist.id}/>
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

export default Artists;