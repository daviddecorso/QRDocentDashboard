import { failure, success } from './utility/responseObject';
import { extractHeaderAuthorization } from './utility/extract';
import generate from './utility/generateToken';
import jwt from 'jsonwebtoken';
import query from '../database/databaseConnection';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = async(req, res) => {
    const refreshToken = extractHeaderAuthorization(req.headers.authorization);

    try
    {
        const tokenPayload = jwt.verify(refreshToken, JWT_SECRET_KEY);
        if (tokenPayload.type !== 'refresh')
        {
            throw new Error('wrong token type');
        }

        const userID = tokenPayload.userID;
        const queryString = 'SELECT phone_number FROM museum.user WHERE user_id = $1';
        const parameters = [userID];
        const queryResult = await query(queryString, parameters);
        if (queryResult.rows.length === 0)
        {
            throw new Error('user does not exist');
        }

        const phoneNumber = queryResult.rows[0].phone_number;
        const keyToCompare = generate.generateKey(userID, phoneNumber);
        if (keyToCompare !== tokenPayload.key)
        {
            throw new Error('phone number not recognized');
        }

        const user = {
            userID: userID,
            phoneNumber: phoneNumber
        };
        const newAccessToken = generate.museumUserAccessToken(user);
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(success({ accessToken: newAccessToken })));
    }
    catch (error)
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(failure(error.message)));
    }
};