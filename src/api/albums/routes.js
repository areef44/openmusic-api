

const routes = (handler) => [

    //endpoint untuk add albums 
    {
        method: 'POST',
        path: '/albums',
        handler: (request, h) => handler.postAlbumHandler(request, h),
    },

    //endpoint untuk getallalbums
    {
        method: 'GET',
        path: '/albums',
        handler: (request, h) => handler.getAlbumsHandler(request, h),
    },

    //endpoint untuk getalbumsbyidhandler 
    {
        method: 'GET',
        path: '/albums/{id}',
        handler: (request, h) => handler.getAlbumByIdHandler(request, h),
    },

    //endpoint untuk editalbumbyid
    {
        method: 'PUT',
        path: '/albums/{id}',
        handler: (request, h ) => handler.putAlbumByIdHandler(request, h),
    },

    //endpoint untuk deletealbumbyid
    {
        method: 'DELETE',
        path: '/albums/{id}',
        handler: (request, h ) => handler.deleteAlbumByIdHandler(request, h),
    },
];

//exports module routes
module.exports = routes;