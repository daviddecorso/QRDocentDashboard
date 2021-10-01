import authentication from './middleware/authentication';

const API = async(req, res) =>
{
    const userInfo = req.locals.user;
    res.status(200).send(JSON.stringify(userInfo));
};

export default authentication(API);