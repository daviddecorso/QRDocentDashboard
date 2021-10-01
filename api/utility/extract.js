function extractHeaderAuthorization(authorization)
{
    return authorization.startsWith('Bearer ') ? authorization.substring(7, authorization.length) : null;
}

module.exports =
{
    extractHeaderAuthorization
};