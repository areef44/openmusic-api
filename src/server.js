const Hapi = require('@hapi/hapi');
const albums = require('./api/albums');
const songs = require('./api/songs')
const AlbumsService = require('./services/inMemory/AlbumsService');
const SongsService = require('./services/inMemory/SongsServices');
const AlbumsValidator = require('./validator/albums');
const SongsValidator = require('./validator/songs');
 
const init = async () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: albums,songs,
    options: {
        service: albumsService, songsService,
        validator: AlbumsValidator, SongsValidator,
    },
  });
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
init();