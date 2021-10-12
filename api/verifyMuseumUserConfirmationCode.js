import { failure, success } from './utility/responseObject';
import generate from './utility/generateToken';
import query from '../database/databaseConnection';

module.exports = async(req, res) =>
{
    const confirmationCode = req.body.confirmationCode;
    const phoneNumber = req.body.phoneNumber;
    const queryString = 'SELECT user_id, confirmation_code FROM museum.user WHERE phone_number = $1';
    const parameters = [phoneNumber];
    const queryResult = await query(queryString, parameters);
    if (queryResult.rows.length === 0)
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(failure('user does not exist')));
        return;
    }

    const confirmationCodeStoredInDatabase = queryResult.rows[0].confirmation_code;
    if (confirmationCode !== confirmationCodeStoredInDatabase)
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(failure('incorrect confirmation code')));
        return;
    }

    const user = {
        userID: queryResult.rows[0].user_id,
        phoneNumber: phoneNumber,
        confirmationCode: queryResult.rows[0].confirmation_code
    };

    const accessToken = generate.museumUserAccessToken(user);
    const refreshToken = generate.museumUserRefreshToken(user);
    res.status(200).setHeader('Content-Type', 'application/json')
        .send(JSON.stringify(success({ accessToken, refreshToken })));
};
