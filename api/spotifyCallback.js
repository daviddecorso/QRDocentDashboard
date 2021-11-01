import { failure, success } from './utility/responseObject';
import { getBaseURL } from '../configuration';
import authentication from './middleware/authentication';
import request from 'request';
import querystring from 'querystring';

const API = async(req, res) =>
{
    // TODO: Fix naming, depracations, and make calls async/await!
    const redirect_uri = getBaseURL() + 'api/spotifyCallback';
    let code = req.query.code || null;
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(
                process.env.SPOTIFY_QR_DOCENT_ID + ':' + process.env.SPOTIFY_QR_DOCENT_SECRET
            ).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        var access_token = body.access_token
        var refresh_token = body.refresh_token
        console.log(body)
        let uri = process.env.FRONTEND_URI || 'exp://192.168.1.155:19000'
        res.redirect(uri + '?access_token=' + access_token + '&refresh_token=' + refresh_token)
    })
};

export default API;



