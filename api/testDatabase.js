import query from '../database/databaseConnection';

module.exports = async(req, res) =>
{
    const queryString = 'SELECT user_id, phone_number FROM museum.user WHERE user_id = $1 OR user_id = $2';
    const parameters = [1, 2];
    const queryResult = await query(queryString, parameters);

    const users = [];

    // Not needed, but just to show off.
    if (queryResult.rows.length !== 0)
    {
        for (let i = 0; i < queryResult.rows.length; i++)
        {
            const user = {
                user_id: queryResult.rows[i].user_id,
                phone_number: queryResult.rows[i].phone_number
            };

            users.push(user);
        }
    }

    const jsonResult = {
        row_count: queryResult.rows.length,
        users: users
    };

    res.status(200).send(JSON.stringify(jsonResult));
};
