import { failure, success } from './utility/responseObject';
import argon2 from './utility/argon2';
import generate from './utility/generateToken';
import query from '../database/databaseConnection';

module.exports = async(req, res) =>
{
    const email = req.body.email;
    const password = req.body.password;
    const queryString = 'SELECT user_id, password, museum_id FROM admin.user WHERE email = $1';
    const parameters = [email];
    const queryResult = await query(queryString, parameters);
    if (queryResult.rows.length === 0)
    {
        res.status(200).send(JSON.stringify(failure('incorrect email or password')));
        return;
    }

    const passwordStoredInDatabase = queryResult.rows[0].password;
    const isPasswordCorrect = await argon2.verify(passwordStoredInDatabase, password);
    if (!isPasswordCorrect)
    {
        res.status(200).send(JSON.stringify(failure('incorrect email or password')));
        return;
    }

    const user = {
        userID: queryResult.rows[0].user_id,
        email: email,
        museumID: queryResult.rows[0].museum_id,
        password: queryResult.rows[0].password
    };

    const accessToken = generate.adminUserAccessToken(user);
    const refreshToken = generate.adminUserRefreshToken(user);
    res.status(200).send(JSON.stringify(success({ accessToken, refreshToken })));
};
