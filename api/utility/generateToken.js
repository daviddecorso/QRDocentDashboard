import crypto from 'crypto';
import jwt from 'jsonwebtoken';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function encrypt(key)
{
    return crypto
        .createHmac('sha256', JWT_SECRET_KEY)
        .update(key)
        .digest('hex');
}

function generateKey(id, uniqueUserString)
{
    const rawKey = id + uniqueUserString;
    const key = encrypt(rawKey);
    return key;
}

function adminUserAccessToken(user)
{
    const userID = user.user_id;
    const email = user.email;
    const password = user.password;
    const key = generateKey(userID, password);
    const tokenPayload = { userID, email, key };
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET_KEY);
    return accessToken;
}

function museumUserAccessToken(user)
{
    const userID = user.user_id;
    const phoneNumber = user.phone_number;
    const key = generateKey(userID, phoneNumber);
    const tokenPayload = { userID, phoneNumber, key };
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET_KEY);
    return accessToken;
}

export default
{
    adminUserAccessToken,
    museumUserAccessToken
};