const { Pool } = require('pg');
const { getDatabaseCredentials } = require('../configuration');
const pool = new Pool(getDatabaseCredentials());

async function query(queryString, parameters) 
{
    // const start = Date.now();
    try
    {
        const result = await pool.query(queryString, parameters);
        // const duration = Date.now() - start;
        // console.log('Executed query', { queryString, duration, rows: result.rowCount });

        return result;
    }
    catch (error)
    {
        throw new Error('Error executing query!\n' + error.stack);
    }
}

module.exports = 
{
    query: query
};