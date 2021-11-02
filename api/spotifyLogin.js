import { getBaseURL } from '../configuration';
import { URLSearchParams } from 'url';

const API = (req, res) =>
{
    const redirectURI = getBaseURL() + 'api/spotifyCallback';
    const queryString = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.SPOTIFY_QR_DOCENT_ID,
        scope: 'user-read-private user-read-email ugc-image-upload playlist-modify-public playlist-modify-private',
        redirectURI
    });

    res.redirect('https://accounts.spotify.com/authorize?' + queryString);
};

export default API;