import { extractHeaderAuthorization } from '../utility/extract';
import { failure } from '../utility/responseObject';
import jwt from 'jsonwebtoken';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authentication = handler =>
    async(req, res) => {
        const accessToken = extractHeaderAuthorization(req.headers.authorization);

        try
        {
            const tokenPayload = jwt.verify(accessToken, JWT_SECRET_KEY);
            if (tokenPayload.type !== 'access')
            {
                throw new Error('wrong token type');
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
            // This catch block will return false for any unverified JWT tokens
            // AND even catches any errors the requested API might throw (such as query errors)
            res.status(200).setHeader('Content-Type', 'application/json')
                .send(JSON.stringify(failure(error.message)));
        }
    };

export default authentication;