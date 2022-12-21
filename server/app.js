'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config.js');
const routes = require('./routes/routes.js');

const app = express();

// Middleware functions
app.use(express.static(path.join(__dirname, './public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(function (request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Origin, Authorization, x-access-token, Content-Length, X-Requested-With,Content-Type,Accept");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

// Routes
app.use('/api', routes);

app.listen(config.server.port, () => {
    console.log(`Expesne system server is listening on http://localhost:${config.server.port}`);
});

module.exports = app;