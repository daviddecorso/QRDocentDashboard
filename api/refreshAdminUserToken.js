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
        const password = userInDb.password;
        const keyToCompare = generate.generateKey(userId, password);
        if (keyToCompare !== tokenPayload.key) 
        {
            throw new Error('Password has changed.');
        }

        const newAccessToken = generate.adminUserAccessToken(userInDb);
        res.status(200).send(JSON.stringify({ accessToken: newAccessToken }));
    } 
    catch (error) 
    {
        res.status(200).send(failure('Invalid or expired token for request.'));
    }
};