const { mapDBToModelSongs } = require("../../utils");

class SongsHandler {
    constructor(service, validator) {
      this._service = service;
      this._validator = validator;

    }
    

    async postSongHandler(request, h){

            const songValidated = this._validator.validateSongPayload(request.payload);

            const songId = await this._service.addSong(songValidated);

            const response = h.response({
                status: 'success',
                message: 'Lagu berhasil ditambahkan',
                data:{
                    songId,
                },
            });
            response.code(201);
            return response;
    }

    async getSongsHandler(request, h){

        const params = request.query 

        const song = await this._service.getSongs(params);

        const songs = song.map(song => mapDBToModelSongs(song));

        const response = h.response({
                status: 'success',
                data: {
                    songs: songs,
                },
            });
        return response;
    }

    async getSongByIdHandler(request){

            const { id } = request.params;

            const song = await this._service.getSongById(id);

            return {
                status: 'success',
                data: {
                    song,
                },
            };
    }

    async putSongByIdHandler(request, h){
    
            const songValidated = this._validator.validateSongPayload(request.payload);

            const { id } = request.params;

            await this._service.editSongById(id, songValidated);

            const response = h.response ({
                status: 'success',
                message: 'Lagu berhasil diperbarui',
            });
            return response;
    }

    async deleteSongByIdHandler(request, h){

            const { id } = request.params;

            await this._service.deleteSongById(id);

            const response = h.response({
                status: 'success',
                message: 'Lagu berhasil dihapus'
            });
            return response;
    }
};

module.exports = SongsHandler;