function success(result)
{
    return {
        success: true,
        result
    };
}

function failure(message)
{
    return {
        success: false,
        message
    };
}

module.exports =
{
    success,
    failure
};