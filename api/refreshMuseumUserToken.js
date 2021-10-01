import { extractHeaderAuthorization } from './utility/extract';
import { failure } from './utility/responseObject';
import generate from './utility/generateToken';
import jwt from 'jsonwebtoken';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = (req, res) => {
    const refreshToken = extractHeaderAuthorization(req.headers.authorization);

    try 
    {
        const tokenPayload = jwt.verify(refreshToken, JWT_SECRET_KEY);
        if (tokenPayload.type !== 'refresh')
        {
            throw new Error('Wrong token type.');
        }

        const userID = tokenPayload.user_id;

        
        // const userInDb = await findUserById(userId);
        const phoneNumber = userInDb.phone_number;
        const keyToCompare = generate.generateKey(userId, phoneNumber);
        if (keyToCompare !== tokenPayload.key) 
        {
            throw new Error('Phone number not recognized.');
        }

        const newAccessToken = generate.museumUserAccessToken(userInDb);
        res.status(200).send(JSON.stringify({ accessToken: newAccessToken }));
    } 
    catch (error) 
    {
        res.status(200).send(failure('Invalid or expired token for request.'));
    }
};