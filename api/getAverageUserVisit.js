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
        SELECT admin.fn_get_average_user_visit_by_date_range($1, $2::DATE, $3::DATE) 
        AS average_user_visit
        `;
    const parameters = [museumID, startDate, endDate];
    const queryResult = await query(queryString, parameters);

    res.status(200).setHeader('Content-Type', 'application/json')
        .send(JSON.stringify(success({ averageUserVisit: queryResult.rows[0].average_user_visit })));
};

export default authentication(API);