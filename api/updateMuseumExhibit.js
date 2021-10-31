import { failure, success } from './utility/responseObject';
import authentication from './middleware/authentication';
import query from '../database/databaseConnection';

const API = async(req, res) =>
{
    const exhibitID = req.body.exhibitID;
    const name = req.body.name;
    const description = req.body.description;
    const image = req.body.mainImage;
    const exhibitContents = JSON.stringify(req.body.contents);

    const queryString = 'SELECT admin.fn_update_museum_exhibit($1, $2, $3, $4, $5) AS success';
    const parameters = [exhibitID, name, description, image, exhibitContents];
    const queryResult = await query(queryString, parameters);

    if (queryResult.rows[0].success)
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(success()));
    }
    else
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(failure('error updating exhibit')));
    }
};

export default authentication(API);