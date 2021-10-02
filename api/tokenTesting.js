import authentication from './middleware/authentication';

const API = async(req, res) =>
{
    const userInfo = req.middleware.userInfo;
    res.status(200).send(JSON.stringify(userInfo));
};

export default authentication(API);