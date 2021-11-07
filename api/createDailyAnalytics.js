import { failure, success } from './utility/responseObject';
import query from '../database/databaseConnection';

const API = async(req, res) =>
{
    const authorization = req.body.authorization;
    if (authorization === process.env.ADMIN_CREATION_PASSWORD)
    {
        const queryStringGetMuseum = 'SELECT museum_id FROM admin.museum';
        const parametersGetMuseum = [];
        const queryResultGetMuseum = await query(queryStringGetMuseum, parametersGetMuseum);

        const failures = [];
        for (let i = 0; i < queryResultGetMuseum.rows.length; i++)
        {
            const queryString = 'SELECT admin.fn_create_daily_analytics($1) AS success';
            const parameters = [queryResultGetMuseum.rows[i].museum_id];
            const queryResult = await query(queryString, parameters);

            if (!queryResult.rows[0].success)
            {
                failures.push(failure('error creating analytics for museum ' + queryResultGetMuseum.rows[i].museum_id +
                '. analytics may already exist for this museum for today'));
            }
        }

        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(success({ failures })));
    }
    else
    {
        res.status(200).setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(failure('not authorized to create analytics')));
    }
};

export default API;