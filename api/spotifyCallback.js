import axios from 'axios';
import { failure } from '../api/utility/responseObject';
import { getBaseURL } from '../configuration';

const API = async(req, res) =>
{
    const redirectURI = getBaseURL() + 'api/spotifyCallback';
    const code = req.query.code;
    const configOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        params: {
            code: code,
            redirect_uri: redirectURI,
            grant_type: 'authorization_code'
        },
        headers: {
            Authorization: 'Basic ' +
                Buffer.from(process.env.SPOTIFY_QR_DOCENT_ID + ':' + process.env.SPOTIFY_QR_DOCENT_SECRET)
                    .toString('base64')
        }
    };

    try
    {
        const response = await axios(configOptions);
        const accessToken = response.body.access_token;
        const refreshToken = response.body.refresh_token;

        console.log(response.body);
        res.redirect(process.env.FRONTEND_URI + '?access_token=' + accessToken + '&refresh_token=' + refreshToken);
    }
    catch (error)
    {
        console.log(error);
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(failure(error.message)));
    }
};

export default API;