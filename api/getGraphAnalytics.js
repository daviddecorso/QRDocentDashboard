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
    SELECT _exhibit_percentages AS exhibit_percentages, _date AS date, _total_scans AS total_scans,
        _average_user_visit AS average_user_visit, _exhibit_analytics AS exhibit_analytics
    FROM admin.fn_get_graph_analytics_by_date_range($1, $2::DATE, $3::DATE)
        `;
    const parameters = [museumID, startDate, endDate];
    const queryResult = await query(queryString, parameters);

    const dates = [];
    for (let i = 0; i < queryResult.rows.length; i++)
    {
        const date = {
            date: queryResult.rows[i].date,
            totalScans: queryResult.rows[i].total_scans,
            averageUserVisit: queryResult.rows[i].average_user_visit,
            exhibitAnalytics: queryResult.rows[i].exhibit_analytics
        };

        dates.push(date);
    }

    res.status(200).setHeader('Content-Type', 'application/json')
        .send(JSON.stringify(success({ exhibitPercentages: typeof queryResult.rows[0] !== 'undefined'
            ? queryResult.rows[0].exhibit_percentages
            : [], dates })));
};

export default authentication(API);