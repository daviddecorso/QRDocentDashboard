import { failure, success } from './utility/responseObject';
import { getBaseURL } from '../configuration';
import authentication from './middleware/authentication';
import query from '../database/databaseConnection';
import querystring from 'querystring';

const API = async(req, res) =>
{
    // TODO: Fix naming, depracations, and make calls async/await!
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(
                process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
            ).toString('base64'))
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            console.log(access_token)
            res.send({
                'access_token': access_token
            });
        }
    });
};

export default API;



