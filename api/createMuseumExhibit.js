import { failure, success } from './utility/responseObject';
import authentication from './middleware/authentication';
import query from '../database/databaseConnection';

const API = async(req, res) =>
{
    const userInfo = req.middleware.userInfo;
    const name = req.body.name;
    const description = req.body.description;
    const imageURL = req.body.imageURL;
    const videoURL = req.body.videoURL;
    const websiteURL = req.body.websiteURL;
    const museumID = userInfo.museumID;

    const queryString = `
        INSERT INTO museum.exhibit(name, description, image, video, website, exhibit_status_id, museum_id)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING exhibit_id
        `;
    const parameters = [name, description, imageURL, videoURL, websiteURL, 0, museumID];
    const queryResult = await query(queryString, parameters);

    if (queryResult.rows.length > 0)
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(success({ exhibitID: queryResult.rows[0].exhibit_id })));
    }
    else
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(failure('error creating exhibit')));
    }
};

export default authentication(API);