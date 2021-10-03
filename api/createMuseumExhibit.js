import { failure, success } from './utility/responseObject';
import authentication from './middleware/authentication';
import query from '../database/databaseConnection';

// Might need to change to return the primary key on ID upon success (google returning id from an insert into). Finish rest of CRUD for exhibits
const API = async(req, res) =>
{
    const userInfo = req.middleware.userInfo;
    const name = req.body.name;
    const description = req.body.description;
    const imageURL = req.body.imageURL;
    const videoURL = req.body.videoURL;
    const websiteURL = req.body.websiteURL;
    const statusID = req.body.statusID;
    const museumID = userInfo.museumID;

    const queryString = 'SELECT admin.fn_create_museum_exhibit($1, $2, $3, $4, $5, $6, $7) AS success';
    const parameters = [name, description, imageURL, videoURL, websiteURL, statusID, museumID];
    const queryResult = await query(queryString, parameters);
    
    if (queryResult.rows[0].success)
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(success()));
    }
    else
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(failure('exhibit name already exists')));
    }
};

export default authentication(API);