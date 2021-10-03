import { failure, success } from '../api/utility/responseObject';
import query from '../database/databaseConnection';

module.exports = async(req, res) =>
{
    const userPhoneNumber = req.body.phoneNumber;
    const queryString = 'SELECT museum.fn_register_museum_user($1) AS success';
    const parameters = [userPhoneNumber];
    const queryResult = await query(queryString, parameters);

    if (queryResult.rows[0].success)
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(success()));
    }
    else
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(failure('user already exists')));
    }
};
