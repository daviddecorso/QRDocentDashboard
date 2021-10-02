import generate from './utility/generateToken';
import jwt from 'jsonwebtoken';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = (req, res) => {
    const userID = req.body.userID;
    const phoneNumber = req.body.phoneNumber;
    const user = {
        userID: userID,
        phoneNumber: phoneNumber
    };

    const accessToken = generate.museumUserRefreshToken(user);
    const decodedAccessToken = jwt.verify(accessToken, JWT_SECRET_KEY);

    console.log(`accessToken: ${accessToken}\n\ndecoded accessToken: ${JSON.stringify(decodedAccessToken)}\n`);

    res.status(200).send('hi');
};
