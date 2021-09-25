import { query } from '../database/databaseConnection';
const commandResult = require('../configuration').getCommandResult();
const twilioCredentials = require('../configuration').getTwilioCredentials();
const client = require('twilio')(twilioCredentials.accountSID, twilioCredentials.authToken);

module.exports = async(req, res) =>
{
    const userPhoneNumber = req.body.phone_number;
    const queryString = 'SELECT museum.fn_login_museum_user($1) AS user_id';
    const parameters = [userPhoneNumber];
    const queryResult = await query(queryString, parameters);
    const userID = queryResult.rows[0].user_id;

    if (userID !== 0)
    {
        const randomSixDigitCode = Math.floor(100000 + Math.random() * 900000);

        client.messages
            .create({
                body: 'Your confirmation code is: ' + randomSixDigitCode.toString(),
                messagingServiceSid: twilioCredentials.messagingServiceSID,
                to: userPhoneNumber
            })
            .then(message => {
                console.log(message.sid);
                const resultObject = {
                    user_id: userID,
                    confirmation_code: randomSixDigitCode
                };
                commandResult.success = true;
                commandResult.result = resultObject;

                res.status(200).send(JSON.stringify(commandResult));
            })
            .catch(error => {
                console.log(error);
                commandResult.success = false;
                commandResult.message = 'Error sending text message.';

                res.status(200).send(JSON.stringify(commandResult));
            });
    }
    else
    {
        commandResult.success = false;
        commandResult.message = 'User does not exist.';

        res.status(200).send(JSON.stringify(commandResult));
    }
};
