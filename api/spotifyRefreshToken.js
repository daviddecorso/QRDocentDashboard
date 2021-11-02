import axios from 'axios';
import { failure } from '../api/utility/responseObject';

const API = async(req, res) =>
{
    const refreshToken = req.query.refresh_token;
    const configOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        params: {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
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

        if (response.statusCode === 200)
        {
            const accessToken = response.body.access_token;

            console.log(response.body);
            res.send({
                access_token: accessToken
            });
        }
    }
    catch (error)
    {
        console.log(error);
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(failure(error.message)));
    }
};

export default API;