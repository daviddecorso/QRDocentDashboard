import { failure, success } from '../api/utility/responseObject';
import { query } from '../database/databaseConnection';

module.exports = async(req, res) =>
{
    const userPhoneNumber = req.body.phone_number;
    const queryString = 'SELECT museum.fn_register_museum_user($1) AS success';
    const parameters = [userPhoneNumber];
    const queryResult = await query(queryString, parameters);

    let result;
    if (queryResult.rows[0].success)
    {
        result = success();
    }
    else
    {
        result = failure('User already exists.');
    }

    res.status(200).send(JSON.stringify(result));
};
