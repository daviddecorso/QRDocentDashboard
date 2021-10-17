import authentication from './middleware/authentication';
import query from '../database/databaseConnection';
import { success } from './utility/responseObject';

const API = async(req, res) =>
{
    const userInfo = req.middleware.userInfo;
    const museumID = userInfo.museumID;

    const queryString = `
        SELECT e.exhibit_id, e.name, e.description, e.exhibit_status_id, e.created_at,
            json_agg(
                json_build_object(
                    'URL', ec.url,
                    'description', ec.description,
                    'position', ec.position,
                    'contentTypeID', ec.exhibit_content_type_id
                ) ORDER BY ec.position
            ) AS exhibit_contents
        FROM museum.exhibit AS e
            JOIN museum.exhibit_content AS ec ON e.exhibit_id = ec.exhibit_id
        WHERE e.museum_id = $1
        GROUP BY e.exhibit_id
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
            exhibitStatusID: queryResult.rows[i].exhibit_status_id,
            createdAt: queryResult.rows[i].created_at,
            contents: queryResult.rows[i].exhibit_contents
        };

        exhibits.push(exhibit);
    }

    res.status(200).setHeader('Content-Type', 'application/json')
        .send(JSON.stringify(success({ exhibits })));
};

export default authentication(API);