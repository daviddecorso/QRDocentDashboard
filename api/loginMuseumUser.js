import { failure, success } from '../api/utility/responseObject';
import generate from './utility/generateToken';
import { getTwilioCredentials } from '../configuration';
import query from '../database/databaseConnection';
const twilioCredentials = getTwilioCredentials();
const client = require('twilio')(twilioCredentials.accountSID, twilioCredentials.authToken);

module.exports = async(req, res) =>
{
    const phoneNumber = req.body.phoneNumber;
    const queryString = 'SELECT museum.fn_login_museum_user($1) AS user_id';
    const parameters = [phoneNumber];
    const queryResult = await query(queryString, parameters);
    const userID = queryResult.rows[0].user_id;

    if (userID !== 0)
    {
        const user = {
            userID,
            phoneNumber
        };
        const accessToken = generate.museumUserAccessToken(user);
        const refreshToken = generate.museumUserRefreshToken(user);
        const randomSixDigitCode = Math.floor(100000 + Math.random() * 900000);

        await client.messages
            .create({
                body: 'Your confirmation code is: ' + randomSixDigitCode.toString(),
                messagingServiceSid: twilioCredentials.messagingServiceSID,
                to: phoneNumber
            })
            .then(message => {
                console.log(message.sid);
                const resultObject = {
                    accessToken,
                    refreshToken,
                    confirmationCode: randomSixDigitCode
                };

                res.status(200).send(JSON.stringify(success(resultObject)));
            })
            .catch(error => {
                console.log(error);

                res.status(200).send(JSON.stringify(failure(error.message)));
            });
    }
    else
    {
        res.status(200).send(JSON.stringify(failure('user does not exist')));
    }
};
