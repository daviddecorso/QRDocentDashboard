import authentication from './middleware/authentication';
import query from '../database/databaseConnection';
import { success } from './utility/responseObject';

const API = async(req, res) =>
{
    const userInfo = req.middleware.userInfo;
    const userID = userInfo.userID;

    const queryString = `
        SELECT s.scan_id, e.name, e.description, e.image,
            json_agg(
                json_build_object(
                    'URL', ec.url,
                    'description', ec.description,
                    'position', ec.position,
                    'contentTypeID', ec.exhibit_content_type_id
                ) ORDER BY ec.position
            ) AS exhibit_contents
        FROM museum.scan AS s
            JOIN museum.exhibit AS e ON s.exhibit_id = e.exhibit_id
            JOIN museum.exhibit_content AS ec ON e.exhibit_id = ec.exhibit_id
        WHERE s.user_id = $1
        GROUP BY e.exhibit_id, s.scan_id
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
            mainImage: queryResult.rows[i].image,
            contents: queryResult.rows[i].exhibit_contents
        };

        scans.push(scan);
    }

    res.status(200).setHeader('Content-Type', 'application/json')
        .send(JSON.stringify(success({ scans })));
};

export default authentication(API);