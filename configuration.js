function getBaseURL()
{
    let baseURL = '';

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
    {
        baseURL = 'http://localhost:3000/';
    }
    else if (process.env.NODE_ENV === 'production')
    {
        baseURL = 'https://qrdocent.com/';
    }

    return baseURL;
}

function getDatabaseCredentials()
{
    let credentials;

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
    {
        credentials = {
            user: '',
            password: '',
            host: '',
            port: 0,
            database: ''
        };

        credentials.user = process.env.DEV_USER;
        credentials.password = process.env.DEV_PASSWORD;
        credentials.host = process.env.DEV_HOST;
        credentials.port = process.env.DEV_PORT;
        credentials.database = process.env.DEV_DATABASE;
    }
    else if (process.env.NODE_ENV === 'production')
    {
        credentials = {
            user: '',
            password: '',
            host: '',
            port: 0,
            database: '',
            ssl: {
                rejectUnauthorized: false,
                ca: ''
            }
        };

        credentials.user = process.env.PROD_USER;
        credentials.password = process.env.PROD_PASSWORD;
        credentials.host = process.env.PROD_HOST;
        credentials.port = process.env.PROD_PORT;
        credentials.database = process.env.PROD_DATABASE;
        credentials.ssl.ca = process.env.PROD_SSL;
    }

    return credentials;
}

module.exports =
{
    getBaseURL: getBaseURL,
    getDatabaseCredentials: getDatabaseCredentials
};

// TODO: Figure out how to initialize app to have NODE_ENV equal production. development is default value.