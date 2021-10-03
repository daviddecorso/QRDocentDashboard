function extractHeaderAuthorization(authorization)
{
    return authorization !== undefined && authorization.startsWith('Bearer ') ? authorization.substring(7, authorization.length) : '';
}

module.exports =
{
    extractHeaderAuthorization
};