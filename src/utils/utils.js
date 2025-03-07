export function getHost() {

    if(window.location.hostname === 'localhost') {
        return 'http://localhost:3000';
    }else{
        return 'https://spotify-web-data.vercel.app'
    }
}