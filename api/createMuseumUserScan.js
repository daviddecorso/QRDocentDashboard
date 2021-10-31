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
        _image AS image, _exhibit_contents AS exhibit_contents
        FROM museum.fn_create_museum_scan($1, $2);
        `;
    const parameters = [userID, exhibitID];
    const queryResult = await query(queryString, parameters);

    if (queryResult.rows[0].scan_id !== 0)
    {
        const createdScan = {
            scanID: queryResult.rows[0].scan_id,
            name: queryResult.rows[0].name,
            description: queryResult.rows[0].description,
            mainImage: queryResult.rows[0].image,
            contents: queryResult.rows[0].exhibit_contents
        };

        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(success({ createdScan })));
    }
    else
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(failure('scan already exists for user')));
    }
};

export default authentication(API);