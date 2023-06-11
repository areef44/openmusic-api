//module nanoid
const { nanoid } = require('nanoid');

//module postgresql
const { Pool } = require('pg');

//module exceptions invariant error
const InvariantError = require('../../exceptions/InvariantError');

//module utils mapdb
const { mapDBToModel } = require('../../utils');

//module exceptions notfounderror
const NotFoundError = require('../../exceptions/NotFoundError');

//definisi class constructor untuk album service
class AlbumsService{
    constructor(){

        //inisialiasasi properti pool postgres
        this._pool = new Pool();
    }

    //service untuk menambahkan album
    async addAlbum({ name, year }){
        const id = `album-${nanoid(16)}`;
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        //query menambahkan album
        const query = {
            text: 'INSERT INTO albums VALUES($1, $2, $3, $4, $5) RETURNING id',
            values: [id,name,year,createdAt,updatedAt],
        };

        //eksekusi query album
        const result = await this._pool.query(query);

        //cek rows didatabase
        if (!result.rows[0].id){

            //jika tidak ada munculkan pesan error
            throw new InvariantError('Album gagal ditambahkan')
        }

        //jika ada maka munculkan hasil query
        return result.rows[0].id;
    }


    //service untuk menampilkan data semua albums
    async getAlbums(){

        //eksekusi query untuk get albums dan simpan ke dalam 
        const result = await this._pool.query('SELECT * FROM albums');

        //kembalikan hasilnya mengikuti permintaan dimapDBtoModel
        return result.rows.map(mapDBToModel);
    }

    //service untuk menampilkan data albums berdasarkan id
    async getAlbumById(id){

        //query untuk memunculkan data satu album berdasarkan id
        const queryAlbum = {
            text: 'SELECT * FROM albums WHERE id = $1',
            values: [id],
        };

        //eksekusi query album dan simpan kedalam variabel resultalbum
        const resultAlbum = await this._pool.query(queryAlbum);

        //cek rows length dari resultalbum jika tidak ada maka
        if(!resultAlbum.rows.length){

            //munculkan pesan error
            throw new NotFoundError('Album tidak ditemukan');
        }

        //query untuk memunculkan songs id songs title dan song performer serta fungsi join tabel songs dan albums berdasarkan id
        const querySong = {
            text: 'SELECT songs.id, songs.title, songs.performer FROM albums JOIN songs ON albums.id = songs.album_id WHERE albums.id = $1',
            values: [id],
        }

        //eksekusi query song dan simpan kedalam variabel resultsong
        const resultSong = await this._pool.query(querySong);
        
        //lalu return hasil kedua query
        return {album: resultAlbum.rows[0], songs: resultSong.rows};
    }

    //service untuk merubah data album berdasarkan id
    async editAlbumById(id, {name,year}){

        //dapatkan nilai updatedat berdasarkan time sekarang
        const updatedAt = new Date().toISOString();

        //query untuk updated album
        const query = {
            text: 'UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id',
            values: [name,year,updatedAt,id],
        };

        //eksekusi query update albums
        const result = await this._pool.query(query);

        //cek hasil result rows length nya jika kosong munculkan pesar error
        if(!result.rows.length){
            throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
        }
    }

    //service untuk menghapus data albums berdasarkan id
    async deleteAlbumById(id){

        //query untuk menghapus data albums berdasarkan id
        const query = {
            text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
            values: [id],
        }

        //eksekusi query data album
        const result = await this._pool.query(query);

        //cek result rows length nya jika kosong munculkan pesan error
        if (!result.rows.length){
            throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
        }
    }
};

//eksport class albums service
module.exports = AlbumsService;