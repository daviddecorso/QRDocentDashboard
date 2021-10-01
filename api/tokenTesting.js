import authentication from './middleware/authentication';

const API = async(req, res) =>
{
    const userInfo = req.middleware.user_info;
    res.status(200).send(JSON.stringify(userInfo));
};

export default authentication(API);