import generate from './utility/generateToken';
import jwt from 'jsonwebtoken';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = (req, res) => {
    const userID = req.body.user_id;
    const phoneNumber = req.body.phone_number;
    const user = {
        user_id: userID,
        phone_number: phoneNumber
    };

    const accessToken = generate.museumUserAccessToken(user);
    const decodedAccessToken = jwt.verify(accessToken, JWT_SECRET_KEY);

    console.log(`accessToken: ${accessToken}\n\ndecoded accessToken: ${JSON.stringify(decodedAccessToken)}\n`);

    res.status(200).send('hi');
};
