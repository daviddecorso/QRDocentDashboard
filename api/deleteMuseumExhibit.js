import authentication from './middleware/authentication';
import query from '../database/databaseConnection';
import { success } from './utility/responseObject';

const API = async(req, res) =>
{
    const exhibitID = req.body.exhibitID;

    const queryString = 'DELETE FROM museum.exhibit WHERE exhibit_id = $1';
    const parameters = [exhibitID];
    await query(queryString, parameters);

    res.status(200).setHeader('Content-Type', 'application/json')
        .send(JSON.stringify(success()));
};

export default authentication(API);