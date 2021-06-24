const config = require('../config');
const express = require('express');
const path = require('path');

// Create the express server application
const app = express();

app.use(express.static('dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes not served by the server should be served by the client
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

// Start the server
app.listen(config.port, err => {
    if (err) {
        throw err;
    }

    console.log(`Listening at http://localhost:${config.port}`);
});
