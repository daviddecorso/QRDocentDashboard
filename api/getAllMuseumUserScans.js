import authentication from './middleware/authentication';
import query from '../database/databaseConnection';
import { success } from './utility/responseObject';

const API = async(req, res) =>
{
    const userInfo = req.middleware.userInfo;
    const userID = userInfo.userID;

    const queryString = `
        SELECT s.scan_id, e.name, e.description, e.image, e.video, e.website
        FROM museum.scan AS s
            JOIN museum.exhibit AS e ON s.exhibit_id = e.exhibit_id
        WHERE s.user_id = $1
        `;
    const parameters = [userID];
    const queryResult = await query(queryString, parameters);

    const scans = [];
    for (let i = 0; i < queryResult.rows.length; i++)
    {
        const scan = {
            scanID: queryResult.rows[i].scan_id,
            name: queryResult.rows[i].name,
            description: queryResult.rows[i].description,
            imageURL: queryResult.rows[i].image,
            videoURL: queryResult.rows[i].video,
            websiteURL: queryResult.rows[i].website
        };

        scans.push(scan);
    }

    res.status(200).setHeader('Content-Type', 'application/json')
        .send(JSON.stringify(success({ scans })));
};

export default authentication(API);