//module mapping DB dari folder utils
const { mapDBToModelSongs } = require("../../utils");

//definisi class constructor untuk songhandler
class SongsHandler {
    constructor(service, validator) {
    //inisialiasi service dan validator untuk songs handler
      this._service = service;
      this._validator = validator;
    }
    
    //handler untuk menambahkan songs
    async postSongHandler(request, h){

        //validasi songs payload
        const songValidated = this._validator.validateSongPayload(request.payload);

        //eksekusi service add songs yang telah divalidasi
        const songId = await this._service.addSong(songValidated);

        //response untuk eksekusi 
        const response = h.response({
            status: 'success',
            message: 'Lagu berhasil ditambahkan',
            data:{
                    songId,
            },
        });

        //pesan response hasil eksekusi
        response.code(201);

        //return hasil respon
        return response;
    }

    //handler untuk mendapatkan data semua song
    async getSongsHandler(request, h){

        //dapatkan parameter 
        const params = request.query 

        //eksekusi service get songs
        const song = await this._service.getSongs(params);

        //simpan ke variabel song dan data hasil eksekusi sesuaikan dengan mappingDB
        const songs = song.map(song => mapDBToModelSongs(song));

        //response hasil eksekusi
        const response = h.response({
                status: 'success',
                data: {
                    songs: songs,
                },
            });

        //return hasil eksekusi
        return response;
    }

    //handler untuk mendapatkan data song berdasarkan id
    async getSongByIdHandler(request){

        //dapatkan id
        const { id } = request.params;

        //eksekusi service getSongById
        const song = await this._service.getSongById(id);

        //return data hasil variabel albums
        //return data hasil variabel song
        return {
            status: 'success',
            data: {
                song,
            },
        };
    }

    //handler untuk merubah data songs berdasarkan id
    async putSongByIdHandler(request, h){
    
        //validasi songs payload
        const songValidated = this._validator.validateSongPayload(request.payload);

        //dapatkan id
        const { id } = request.params;

        //eksekusi service editsongbyid
        await this._service.editSongById(id, songValidated);

        //simpan response ke variabel response
        const response = h.response ({
            status: 'success',
            message: 'Lagu berhasil diperbarui',
        });

        //kembalikan response
        return response;
    }

    //handler untuk merubah data album berdasarkan id
    async deleteSongByIdHandler(request, h){

        //dapatkan id
        const { id } = request.params;

        //eksekusi service deleteSongByid
        await this._service.deleteSongById(id);

        //simpan response ke variabel response
        const response = h.response({
            status: 'success',
            message: 'Lagu berhasil dihapus'
        });

        //kembalikan response
        return response;
    }
};

//eksports module SongsHandler
module.exports = SongsHandler;