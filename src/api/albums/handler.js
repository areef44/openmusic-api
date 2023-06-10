const { mapDBToModelAlbums } = require("../../utils");

class AlbumsHandler {
    constructor(service, validator){
        this._service = service;
        this._validator = validator;

    }

    async postAlbumHandler(request, h){
        
        const albumValidated = this._validator.validateAlbumPayload(request.payload);
    
        const albumId = await this._service.addAlbum(albumValidated);
    
        const response = h.response({
            status : 'success',
            message: 'Album berhasil ditambahkan',
            data: {
                albumId,
            },
        });
        response.code(201);
        return response;
    }

    async getAlbumsHandler(){
        const albums = await this._service.getAlbums();
        return {
            status: 'success',
            data: {
                albums,
            },
        };
    }

    async getAlbumByIdHandler(request, h){
            const { id } = request.params;

            const mapAlbum = await this._service.getAlbumById(id);

            const album = mapDBToModelAlbums(mapAlbum.album, mapAlbum.songs);

            return {
                status: 'success',
                data: {
                album,
                },
            };
    }

    async putAlbumByIdHandler(request, h){

            const albumValidated = this._validator.validateAlbumPayload(request.payload);

            const { id } = request.params;
    
            await this._service.editAlbumById(id, albumValidated);
    

            const response = h.response ({
                status: 'success',
                message: 'Album berhasil diperbarui',
            });

            return response;
    }


    async deleteAlbumByIdHandler(request, h){
        
            const { id } = request.params;

            await this._service.deleteAlbumById(id);

            const response = h.response({
                status: 'success',
                message: 'Album berhasil dihapus',
            });

            return response;
    }
};

module.exports = AlbumsHandler;