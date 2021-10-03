import authentication from './middleware/authentication';

const API = async(req, res) =>
{
    const userInfo = req.middleware.userInfo;
    res.status(200).setHeader('Content-Type', 'application/json')
        .send(JSON.stringify(userInfo));
};

export default authentication(API);