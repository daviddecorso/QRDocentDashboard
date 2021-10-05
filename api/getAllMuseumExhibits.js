import authentication from './middleware/authentication';
import query from '../database/databaseConnection';
import { success } from './utility/responseObject';

const API = async(req, res) =>
{
    const userInfo = req.middleware.userInfo;
    const museumID = userInfo.museumID;

    const queryString = `
        SELECT exhibit_id, name, description, image, video, website, exhibit_status_id, created_at 
        FROM museum.exhibit 
        WHERE museum_id = $1
        `;
    const parameters = [museumID];
    const queryResult = await query(queryString, parameters);

    const exhibits = [];
    for (let i = 0; i < queryResult.rows.length; i++)
    {
        const exhibit = {
            exhibitID: queryResult.rows[i].exhibit_id,
            name: queryResult.rows[i].name,
            description: queryResult.rows[i].description,
            imageURL: queryResult.rows[i].image,
            videoURL: queryResult.rows[i].video,
            websiteURL: queryResult.rows[i].website,
            exhibitStatusID: queryResult.rows[i].exhibit_status_id,
            createdAt: queryResult.rows[i].created_at
        };

        exhibits.push(exhibit);
    }

    res.status(200).setHeader('Content-Type', 'application/json')
        .send(JSON.stringify(success({ exhibits })));
};

export default authentication(API);