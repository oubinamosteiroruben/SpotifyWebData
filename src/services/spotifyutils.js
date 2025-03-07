import axios from 'axios';
import qs from 'qs';
import { Buffer } from 'buffer'; // Importa el polyfill de Buffer

function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export function getSpotifyToken() {
    const client_id = 'dea769c434c64c8e93d3d34b1d2d36b0';
    const redirect_url = 'http://localhost:3000/profile'; // Asegúrate de que esta URI coincida con la registrada en Spotify
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email user-top-read playlist-read-private playlist-modify-public user-follow-modify'; // Añadir los scopes necesarios

    window.location = 'https://accounts.spotify.com/authorize?' +
        qs.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_url,
            state: state
        });
}

export async function handleSpotifyCallback() {
    return new Promise(async (resolve, reject) => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const state = params.get('state');

        if (!state && !localStorage.getItem('access_token')) {
            reject();
        }

        const client_id = 'dea769c434c64c8e93d3d34b1d2d36b0';
        const client_secret = '018b436cfe734d128d68044bb980b5a6';
        const redirect_url = 'http://localhost:3000/profile';

        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            data: qs.stringify({
                code: code,
                redirect_uri: redirect_url,
                grant_type: 'authorization_code'
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
            }
        };

        try {
            const response = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers });
            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;

            // Almacenar los tokens en localStorage
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            resolve(access_token);
        } catch (error) {
            // Si hay un error, intenta refrescar el token
            try {
                const newAccessToken = await refreshAccessToken();
                resolve(newAccessToken);
            } catch (refreshError) {
                reject(refreshError);
            }
        }
    });
}

export async function getProfile(accessToken) {
    try {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });

        if (response.status === 401) {
            // Token expirado, intenta refrescar el token
            const newAccessToken = await refreshAccessToken();
            return getProfile(newAccessToken);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
}

export async function getArtists(accessToken, time) {
    try {
        const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${time}_term&limit=50`, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });

        if (response.status === 401) {
            // Token expirado, intenta refrescar el token
            const newAccessToken = await refreshAccessToken();
            return getArtists(newAccessToken, time);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching artists:', error);
        throw error;
    }
}

export async function getTracks(accessToken, time) {
    try {
        const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${time}_term&limit=50`, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });

        if (response.status === 401) {
            // Token expirado, intenta refrescar el token
            const newAccessToken = await refreshAccessToken();
            return getTracks(newAccessToken, time);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching artists:', error);
        throw error;
    }
}

export async function refreshAccessToken() {
    const client_id = 'dea769c434c64c8e93d3d34b1d2d36b0';
    const client_secret = '018b436cfe734d128d68044bb980b5a6';
    const refresh_token = localStorage.getItem('refresh_token');

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        data: qs.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
        }
    };

    try {
        const response = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers });
        const access_token = response.data.access_token;

        // Almacenar el nuevo access_token en localStorage
        localStorage.setItem('access_token', access_token);
        return access_token;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
}

export async function followArtist(accessToken, artistId) {
    try {
        const response = await fetch(`https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401) {
            // Token expirado, intenta refrescar el token
            const newAccessToken = await refreshAccessToken();
            return followArtist(newAccessToken, artistId);
        }

        if (!response.ok) {
            throw new Error('Error following artist');
        }

        console.log('Artist followed successfully');
    } catch (error) {
        console.error('Error following artist:', error);
        throw error;
    }
}
