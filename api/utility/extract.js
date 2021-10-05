function extractHeaderAuthorization(authorization)
{
    return typeof authorization !== 'undefined' && authorization.startsWith('Bearer ')
        ? authorization.substring(7, authorization.length)
        : '';
}

module.exports =
{
    extractHeaderAuthorization
};