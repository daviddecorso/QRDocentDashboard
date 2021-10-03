import crypto from 'crypto';
import jwt from 'jsonwebtoken';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const FIFTEEN_MINUTES_IN_SECONDS = 15 * 60;

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
    const userID = user.userID;
    const email = user.email;
    const museumID = user.museumID;
    const type = 'access';
    const tokenPayload = { type, userID, email, museumID };
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET_KEY, { expiresIn: FIFTEEN_MINUTES_IN_SECONDS });
    return accessToken;
}

function adminUserRefreshToken(user)
{
    const userID = user.userID;
    const email = user.email;
    const museumID = user.museumID;
    const password = user.password;
    const type = 'refresh';
    const key = generateKey(userID, password);
    const tokenPayload = { type, userID, email, museumID, key };
    const refreshToken = jwt.sign(tokenPayload, JWT_SECRET_KEY);
    return refreshToken;
}

function museumUserAccessToken(user)
{
    const userID = user.userID;
    const phoneNumber = user.phoneNumber;
    const type = 'access';
    const tokenPayload = { type, userID, phoneNumber };
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET_KEY, { expiresIn: FIFTEEN_MINUTES_IN_SECONDS });
    return accessToken;
}

function museumUserRefreshToken(user)
{
    const userID = user.userID;
    const phoneNumber = user.phoneNumber;
    const type = 'refresh';
    const key = generateKey(userID, phoneNumber);
    const tokenPayload = { type, userID, phoneNumber, key };
    const refreshToken = jwt.sign(tokenPayload, JWT_SECRET_KEY);
    return refreshToken;
}

export default
{
    adminUserAccessToken,
    adminUserRefreshToken,
    museumUserAccessToken,
    museumUserRefreshToken,
    generateKey
};