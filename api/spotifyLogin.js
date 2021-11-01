import { failure, success } from './utility/responseObject';
import { getBaseURL } from '../configuration';
import authentication from './middleware/authentication';
import query from '../database/databaseConnection';
import querystring from 'querystring';

const API = async(req, res) =>
{
    // TODO: Fix naming, depracations, and make calls async/await!
    const redirect_uri = getBaseURL() + 'api/spotifyCallback';
    
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.SPOTIFY_QR_DOCENT_ID,
            scope: 'user-read-private user-read-email ugc-image-upload playlist-modify-public playlist-modify-private',
            redirect_uri
        }))
};

export default authentication(API);



