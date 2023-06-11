
const routes = (handler) => [

    //endpoint untuk add song 
    {
        method: 'POST',
        path: '/songs',
        handler: (request, h) => handler.postSongHandler(request, h),
    },

    //endpoint untuk getAllSongs
    {
        method: 'GET',
        path: '/songs',
        handler: (request, h) => handler.getSongsHandler(request, h),
    },

    //endpoint untuk getsongbyid
    {
        method: 'GET',
        path: '/songs/{id}',
        handler: (request, h) => handler.getSongByIdHandler(request, h),
    },

    //endpoint untuk editsongbyid
    {
        method: 'PUT',
        path: '/songs/{id}',
        handler: (request, h) => handler.putSongByIdHandler(request, h),
    },

    //endpoint untuk deletesongbyid
    {
        method: 'DELETE',
        path: '/songs/{id}',
        handler: (request, h) => handler.deleteSongByIdHandler(request, h),
    },
];

//exports module routes
module.exports = routes;