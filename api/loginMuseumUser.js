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
    
    client.messages 
    .create({ 
        body: 'hi :D',  
        messagingServiceSid: twilioCredentials.messagingServiceSID,
        to: '+13057101065' 
    }) 
    .then(message => {
        console.log(message.sid);
        res.status(200).send(JSON.stringify('done'));
    })
    .catch((error) => {
        console.log(error)
        res.status(200).send(JSON.stringify('error'));
    });
    

    //process: generate a random num and send to phone num, then pass that random generate number 
    // down as http response and have frontend verify if user inputs the same random num to confirm login

    
};
