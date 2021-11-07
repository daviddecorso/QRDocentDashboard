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
        SELECT COALESCE(AVG(total_scans), 0) AS average_daily_scans_from_range FROM
            (SELECT SUM(ea.total_scans) AS total_scans
            FROM admin.analytics AS a
                JOIN admin.exhibit_analytics AS ea ON a.analytics_id = ea.analytics_id
            WHERE a.museum_id = $1 AND (a.date_created >= $2::DATE AND a.date_created <= $3::DATE)
            GROUP BY a.analytics_id, a.date_created) AS total_scans_per_day
        `;
    const parameters = [museumID, startDate, endDate];
    const queryResult = await query(queryString, parameters);

    res.status(200).setHeader('Content-Type', 'application/json')
        .send(JSON.stringify(success({ averageDailyScans: queryResult.rows[0].average_daily_scans_from_range })));
};

export default authentication(API);