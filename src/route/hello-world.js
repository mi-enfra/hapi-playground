'use strict';

exports.plugin = {
    name: 'HelloWorld',
    version: '1.0.0',
    register: async function (server, options) {
        server.route({
            method: 'GET',
            path: '/hello/{name?}',
            handler: prepareMessage
        });
    }
};

const prepareMessage = (request, h) => {
    const user = request.params.name || 'stranger';
    const query = request.query || {};
    return h.response({
            'hello': user,
            query
        })
        .code(200);
}