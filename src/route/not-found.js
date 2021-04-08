'use strict';

exports.plugin = {
    name: 'NotFound',
    version: '1.0.0',
    register: async function (server, options) {
        server.route({
            method: '*',
            path: '/{any*}',
            handler: (request, h) => {
                return h.response()
                    .code(404);
            }
        });
    }
};