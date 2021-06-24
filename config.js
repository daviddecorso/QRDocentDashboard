const config = {
    development: {
        address: 'http://localhost',
        port: 3000,
        serverPort: 5500
    },
    test: {
        address: 'http://localhost',
        port: 3000,
        serverPort: 5500
    },
    production: {
        address: 'http://localhost',
        port: 3000,
        serverPort: 5500
    }
};

module.exports = config[process.env.NODE_ENV];
