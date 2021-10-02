import { extractHeaderAuthorization } from '../utility/extract';
import { failure } from '../utility/responseObject';
import jwt from 'jsonwebtoken';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authentication = handler => {
    return async(req, res) => {
        const accessToken = extractHeaderAuthorization(req.headers.authorization);

        try
        {
            const tokenPayload = jwt.verify(accessToken, JWT_SECRET_KEY);
            if (tokenPayload.type !== 'access')
            {
                throw new Error('Wrong token type.');
            }

            req.middleware = {
                userInfo: tokenPayload
            };

            // handler is an argument that holds our original API function after being filtered through the middleware.
            // So the API will finally run if the middleware runs successfully for this particular request.
            return await handler(req, res);
        }
        catch (error)
        {
            res.status(200).send(failure(error.message));
        }
    };
};

export default authentication;