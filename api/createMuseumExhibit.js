import { failure, success } from './utility/responseObject';
import authentication from './middleware/authentication';
import query from '../database/databaseConnection';

const API = async(req, res) =>
{
    const userInfo = req.middleware.userInfo;
    const name = req.body.name;
    const description = req.body.description;
    const exhibitContents = req.body.contents;
    const defaultExhibitStatusID = 1;
    const museumID = userInfo.museumID;

    const queryString = '';
    const parameters = [];
    const queryResult = await query(queryString, parameters);

    if (queryResult.rows.length > 0)
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(success({ exhibitID: queryResult.rows[0].exhibit_id })));
    }
    else
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(failure('error creating exhibit')));
    }
};

export default authentication(API);