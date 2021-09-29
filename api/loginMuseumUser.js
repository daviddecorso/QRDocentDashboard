import { failure, success } from '../api/utility/responseObject';
import { getTwilioCredentials } from '../configuration';
import { query } from '../database/databaseConnection';
const twilioCredentials = getTwilioCredentials();
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

        await client.messages
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

                res.status(200).send(JSON.stringify(success(resultObject)));
            })
            .catch(error => {
                console.log(error);

                res.status(200).send(JSON.stringify(failure('Error sending text message.')));
            });
    }
    else
    {
        res.status(200).send(JSON.stringify(failure('User does not exist.')));
    }
};
