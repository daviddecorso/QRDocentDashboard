import authentication from './middleware/authentication';
import query from '../database/databaseConnection';
import { success } from './utility/responseObject';

const API = async(req, res) =>
{
    const userInfo = req.middleware.userInfo;
    const museumID = userInfo.museumID;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    const queryString = `
        SELECT 
        _exhibit_id AS exhibit_id, _name AS name, _image AS image, _most_scans_from_range AS most_scans_from_range
        FROM admin.fn_get_most_popular_exhibit_by_date_range($1, $2::DATE, $3::DATE)
    `;
    const parameters = [museumID, startDate, endDate];
    const queryResult = await query(queryString, parameters);

    if (queryResult.rows.length > 0)
    {
        const mostPopularExhibit = {
            exhibitID: queryResult.rows[0].exhibit_id,
            name: queryResult.rows[0].name,
            mainImage: queryResult.rows[0].image,
            scans: queryResult.rows[0].most_scans_from_range
        };

        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(success({ mostPopularExhibit })));
    }
    else
    {
        const mostPopularExhibit = {};

        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(success({ mostPopularExhibit })));
    }
};

export default authentication(API);