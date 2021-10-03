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
        const email = tokenPayload.email;
        const museumID = tokenPayload.museumID;
        const key = tokenPayload.key;

        const queryString = 'SELECT password FROM admin.user WHERE user_id = $1';
        const parameters = [userID];
        const queryResult = await query(queryString, parameters);
        if (queryResult.rows.length === 0)
        {
            throw new Error('user does not exist');
        }

        const passwordStoredInDatabase = queryResult.rows[0].password;
        const keyToCompare = generate.generateKey(userID, passwordStoredInDatabase);
        if (keyToCompare !== key)
        {
            throw new Error('password has changed');
        }

        const user = {
            userID: userID,
            email: email,
            museumID: museumID
        };
        const newAccessToken = generate.adminUserAccessToken(user);
        res.status(200).send(JSON.stringify(success({ accessToken: newAccessToken })));
    }
    catch (error)
    {
        res.status(200).send(JSON.stringify(failure(error.message)));
    }
};