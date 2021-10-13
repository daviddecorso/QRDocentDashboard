import { failure, success } from '../api/utility/responseObject';
import { getTwilioCredentials } from '../configuration';
import query from '../database/databaseConnection';
const twilioCredentials = getTwilioCredentials();
const client = require('twilio')(twilioCredentials.accountSID, twilioCredentials.authToken);

module.exports = async(req, res) =>
{
    const phoneNumber = req.body.phoneNumber;
    const randomSixDigitCode = (Math.floor(100000 + Math.random() * 900000)).toString();
    const queryString = 'SELECT museum.fn_login_museum_user($1, $2) AS success';
    const parameters = [phoneNumber, randomSixDigitCode];
    const queryResult = await query(queryString, parameters);

    if (queryResult.rows[0].success)
    {
        await client.messages
            .create({
                body: 'Your confirmation code is: ' + randomSixDigitCode,
                messagingServiceSid: twilioCredentials.messagingServiceSID,
                to: phoneNumber
            })
            .then(message => {
                console.log(message.sid);

                res.status(200).setHeader('Content-Type', 'application/json')
                    .send(JSON.stringify(success()));
            })
            .catch(error => {
                console.log(error);

                res.status(200).setHeader('Content-Type', 'application/json')
                    .send(JSON.stringify(failure(error.message)));
            });
    }
    else
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(failure('user does not exist')));
    }
};
