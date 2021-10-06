import authentication from './middleware/authentication';
import query from '../database/databaseConnection';
import { success } from './utility/responseObject';

const API = async(req, res) =>
{
    const scanID = req.body.scanID;

    const queryString = 'DELETE FROM museum.scan WHERE scan_id = $1';
    const parameters = [scanID];
    await query(queryString, parameters);

    res.status(200).setHeader('Content-Type', 'application/json')
        .send(JSON.stringify(success()));
};

export default authentication(API);