import { failure, success } from './utility/responseObject';
import authentication from './middleware/authentication';
import query from '../database/databaseConnection';

const API = async(req, res) =>
{
    const userInfo = req.middleware.userInfo;
    const userID = userInfo.userID;
    const exhibitID = req.body.exhibitID;

    const queryString = `
        SELECT _scan_id AS scan_id, _name AS name, _description AS description, 
        _image AS image, _video AS video, _website AS website
        FROM museum.fn_create_museum_user_scan($1, $2);
        `;
    const parameters = [userID, exhibitID];
    const queryResult = await query(queryString, parameters);

    if (queryResult.rows[0].scan_id !== 0)
    {
        const insertedScan = {
            scanID: queryResult.rows[0].scan_id,
            name: queryResult.rows[0].name,
            description: queryResult.rows[0].description,
            imageURL: queryResult.rows[0].image,
            videoURL: queryResult.rows[0].video,
            websiteURL: queryResult.rows[0].website
        };

        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(success({ insertedScan })));
    }
    else
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(failure('scan already exists for user')));
    }
};

export default authentication(API);