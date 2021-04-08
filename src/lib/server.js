'use strict';

require('dotenv').config();
const Hapi = require('@hapi/hapi');

const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST
});

server.route({
    method: 'GET',
    path: '/hello/',
    handler: (request, h) => {
        return h.response({
                'hello': 'world'
            })
            .code(200);
    }
});

exports.init = async () => {
    await server.initialize();
    return server;
};

exports.start = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});