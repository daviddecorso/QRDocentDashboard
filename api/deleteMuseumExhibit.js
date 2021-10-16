import { failure, success } from './utility/responseObject';
import authentication from './middleware/authentication';
import query from '../database/databaseConnection';

const API = async(req, res) =>
{
    const exhibitID = req.body.exhibitID;

    const queryString = 'SELECT admin.fn_delete_museum_exhibit($1) AS success';
    const parameters = [exhibitID];
    const queryResult = await query(queryString, parameters);

    if (queryResult.rows[0].success)
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(success()));
    }
    else
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(failure('error deleting exhibit')));
    }
};

export default authentication(API);