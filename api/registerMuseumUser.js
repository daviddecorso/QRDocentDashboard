import { query } from '../database/databaseConnection';
const commandResult = require('../configuration').getCommandResult();

module.exports = async(req, res) =>
{
    commandResult.reset();
    const userPhoneNumber = req.body.phone_number;
    const queryString = 'SELECT museum.fn_register_museum_user($1) AS success';
    const parameters = [userPhoneNumber];
    const queryResult = await query(queryString, parameters);

    if (queryResult.rows[0].success)
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
