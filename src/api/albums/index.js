//module album handler
const AlbumsHandler = require('./handler');

//module routes song
const routes = require('./routes');

//plugin albums
module.exports = {
    name : 'albums',
    version: '1.0.0',
    register: async (server, { service,validator }) => {
        const albumsHandler = new AlbumsHandler(service,validator);
        server.route(routes(albumsHandler));
    },
};