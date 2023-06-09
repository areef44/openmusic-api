//env module
require('dotenv').config();

//Hapi module
const Hapi = require('@hapi/hapi');

//Albums module
const albums = require('./api/albums');
const AlbumsService = require('./services/postgres/AlbumsService');
const {AlbumsValidator} = require('./validator/albums');

//Songs module
const songs = require('./api/songs')
const SongsService = require('./services/postgres/SongsService');
const {SongsValidator} = require('./validator/songs');

//Exceptions module
const ClientError = require('./exceptions/ClientError');

 
const init = async () => {
  const albumsService = new AlbumsService();
  const albumsValidator = new AlbumsValidator();
  const songsService = new SongsService();
  const songsValidator = new SongsValidator();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    //register albums service dan validatornya
    {
      plugin: albums,
      options: {
          service: albumsService,
          validator: albumsValidator,
      },
    },

    //register songs service dan validatornya
    {
      plugin: songs,
      options: {
          service: songsService,
          validator: songsValidator,
      },
    },
  ]);

  //konfigurasi response jika server error
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error){
      if (response instanceof ClientError){
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      if (!response.isServer){
        return h.continue;
      }

      const newResponse = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      
      newResponse.code(500);
      console.error(response);
      return newResponse;
    }

    return h.continue;
  });
    
  //Start Server
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
init();