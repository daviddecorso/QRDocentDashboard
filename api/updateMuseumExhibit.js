import authentication from './middleware/authentication';
import query from '../database/databaseConnection';
import { success } from './utility/responseObject';

const API = async(req, res) =>
{
    const name = req.body.name;
    const description = req.body.description;
    const imageURL = req.body.imageURL;
    const videoURL = req.body.videoURL;
    const websiteURL = req.body.websiteURL;
    const exhibitID = req.body.exhibitID;

    const queryString = `
        UPDATE museum.exhibit 
        SET name = $1, description = $2, image = $3, video = $4, website = $5 
        WHERE exhibit_id = $6
        `;
    const parameters = [name, description, imageURL, videoURL, websiteURL, exhibitID];
    await query(queryString, parameters);
    
    res.status(200).setHeader('Content-Type', 'application/json')
        .send(JSON.stringify(success()));
};

export default authentication(API);