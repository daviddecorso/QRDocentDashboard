import { query } from '../database/databaseConnection';
const { commandResult } = require('../configuration');

module.exports = async(req, res) =>
{
    const userPhoneNumber = req.body.phone_number;
    const queryString = 'SELECT museum.fn_register_museum_user($1) AS success';
    const parameters = [userPhoneNumber];
    const queryResult = await query(queryString, parameters);

    console.log(queryResult.rows[0].success);
    if (queryResult.rows[0].success === 1)
    {
        commandResult.success = true;
    }
    else
    {
        commandResult.success = false;
        commandResult.message = 'User already exists.';
    }

    res.status(200).send(JSON.stringify(commandResult));
};
