import React from "react";


const SpotifyContext = React.createContext({
    token: null,
    setToken: null
});

export default SpotifyContext;