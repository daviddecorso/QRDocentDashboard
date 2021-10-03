import { failure, success } from './utility/responseObject';
import argon2 from './utility/argon2';
import query from '../database/databaseConnection';

module.exports = async(req, res) =>
{
    const authorizationForAdminRegistration = req.body.authorization;
    if (authorizationForAdminRegistration === process.env.ADMIN_CREATION_PASSWORD)
    {
        const email = req.body.email;
        const password = await argon2.hash(req.body.password);
        const museumID = req.body.museumID;
        const queryString = 'SELECT admin.fn_register_admin_user($1, $2, $3) AS success';
        const parameters = [email, password, museumID];
        const queryResult = await query(queryString, parameters);

        if (queryResult.rows[0].success)
        {
            res.status(200).setHeader('Content-Type', 'application/json')
                .send(JSON.stringify(success()));
        }
        else
        {
            res.status(200).setHeader('Content-Type', 'application/json')
                .send(JSON.stringify(failure('user already exists')));
        }
    }
    else
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(failure('not authorized to register admin')));
    }
};
