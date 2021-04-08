'use strict';

require('dotenv').config();
const Hapi = require('@hapi/hapi');

// Route handlers
const NotFound = require('./../route/not-found.js');
const HelloWorld = require('./../route/hello-world.js');

const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST
});

// Remove trailing slashes
server.ext('onRequest', function (request, h) {
    request.setUrl(request.url, true);
    return h.continue;
});

async function setRoutes() {
    await server.register(HelloWorld);
    await server.register(NotFound);
}

exports.init = async () => {
    await server.initialize();
    setRoutes();
    return server;
};

exports.start = async () => {
    await server.start();
    setRoutes();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});