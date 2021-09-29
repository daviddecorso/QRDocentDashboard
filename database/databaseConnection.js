import { getDatabaseCredentials } from '../configuration';
import { Pool } from 'pg';
const pool = new Pool(getDatabaseCredentials());

async function query(queryString, parameters) 
{
    try
    {
        const result = await pool.query(queryString, parameters);
        return result;
    }
    catch (error)
    {
        throw new Error('Error executing query.\n' + error.stack);
    }
}

module.exports = 
{
    query
};