import { query } from '../database/databaseConnection';
const { commandResult } = require('../configuration');

module.exports = async(req, res) =>
{
    /*const userPhoneNumber = req.body.phone_number;
    const queryString = 'SELECT museum.fn_register_museum_user($1) AS success';
    const parameters = [userPhoneNumber];
    const queryResult = await query(queryString, parameters);

    if (queryResult.rows[0].success)
    {
        commandResult.success = true;
    }
    else
    {
        commandResult.success = false;
        commandResult.message = 'User already exists.';
    }*/

    const twilioCredentials = require('../configuration').getTwilioCredentials();
    const client = require('twilio')(twilioCredentials.accountSID, twilioCredentials.authToken);

    // Literally just doesn't work
    client.messages 
    .create({ 
        body: 'hi :D',  
        messagingServiceSid: twilioCredentials.messagingServiceSID,
        to: '+13057101065' 
    }) 
    .then(message => console.log(message.sid)) 
    .done();

    res.status(200).send(JSON.stringify('done'));
};
