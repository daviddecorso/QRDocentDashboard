import generate from './utility/generateToken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = (req, res) => {
    const userID = req.body.userID;
    const phoneNumber = req.body.phoneNumber;
    const user = {
        userID: userID,
        phoneNumber: phoneNumber
    };

    const accessToken = generate.museumUserAccessToken(user);
    const refreshToken = generate.museumUserRefreshToken(user);

    res.status(200).send(JSON.stringify({ accessToken, refreshToken }));
};
