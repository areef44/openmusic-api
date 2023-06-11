//module nanoid
const { nanoid } = require("nanoid");

//module postgresql
const { Pool } = require('pg');

//module exceptions invariant error
const InvariantError = require("../../exceptions/InvariantError");

//module exceptions notfounderror
const NotFoundError = require("../../exceptions/NotFoundError");

//module exceptions notfounderror
const { mapDBToModelSongs } = require("../../utils");

//definisi class constructor untuk songs service
class SongsService {
    constructor() {

    //inisialiasasi properti pool postgres
      this._pool = new Pool();

    }

    //service untuk menambahkan song
    async addSong({ title, year, genre, performer, duration, albumId }) {
        const id = `song-${nanoid(16)}`;
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        //query menambahkan songs
        const query = {
            text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
            values: [id, title, year, genre, performer, duration, albumId, createdAt, updatedAt],
        };

        //eksekusi query menambahkan song
        const {rows}  = await this._pool.query(query);

        //cek rows
        if (!rows[0].id){

            //jika tidak ada munculkan pesan error
            throw new InvariantError('Lagu gagal ditambahkan');
        }

        //jika ada return hasilnya
        return rows[0].id;
    }

    //service untuk menampilkan semua data lagu
    async getSongs(params){

        //deklarasi parameter title dan performer
        const {title, performer} = params;

        //cek jika ada permintaan parameter title dan performer maka
        if (title && performer){

            //lakukan query untuk memunculkan data lagu berdasarkan title dan performer
            const query = {
                text: 'SELECT id, title, performer FROM songs WHERE title ILIKE $1 AND performer ILIKE $2',
                values: [`%${title}%`, `%${performer}%`],
            };

            //eksekusi query 
            const {rows} = await this._pool.query(query);

            //return data rows
            return rows;
        }

        //jika ada permintaan title maka
        if (title) {

            //lakukan query memunculkan data lagu berdasarkan title
            const query = {
                text: 'SELECT id, title, performer FROM songs WHERE title ILIKE $1',
                values: [`%${title}%`],
            };

            //eksekusi query 
            const {rows} = await this._pool.query(query);

            //return data rows
            return rows;
        }

        //jika ada permintaan performer
        if (performer) {

            //lakukan query memunculkan data lagu berdasarkan performer
            const query = {
                text: 'SELECT id, title, performer FROM songs WHERE performer ILIKE $1',
                values: [`%${performer}%`],
            };

            //eksekusi query
            const {rows} = await this._pool.query(query);

            //return data rows
            return rows;
        }

        //jika tidak ada parameter maka lakukan query munculkan data lagu yang hanya menampilkan id,title,performer
        const query = {
            text: 'SELECT id, title, performer FROM songs',
        };

        //eksekusi query
        const {rows} = await this._pool.query(query);

        //return data rows
        return rows;
        }

    //service untuk menampilkan data lagu berdasarkan id
    async getSongById(id){
        const query = {
            text: 'SELECT * FROM songs WHERE id = $1',
            values: [id],
        };

        //eksekusi query
        const result = await this._pool.query(query);

        //cek jika rowcount tidak ada
        if(!result.rowCount){

            //munculkan pesan error
            throw new NotFoundError('Lagu tidak ditemukan');
        }

        //return rows data berdasarkan mappping
        return result.rows.map(mapDBToModelSongs)[0];
    }

    //service untuk merubah data lagu berdasarkan id
    async editSongById(id, { title, year, genre, performer, duration, albumId }){
        
        //mengambil time 
        const updatedAt = new Date().toISOString();

        //query untuk update songs
        const query = {
            text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6, updated_at = $7 WHERE id = $8 RETURNING id',
            values: [title, year, genre, performer, duration, albumId, updatedAt, id],
        };

        //eksekusi query update song lalu simpan ke variabel rowCount
        const {rowCount} = await this._pool.query(query);

        //cek rowsCount 
        if ( !rowCount ){

            //jika kosong maka tampilkan
            throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
        }

    }

    //service untuk menghapus data lagu berdasarkan id
    async deleteSongById(id){

        //query untuk menghapus data lagu
        const query = {
            text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
            values:[id],
        }

        //eksekusi query lalu simpan ke variabel rowCount
        const {rowCount} = await this._pool.query(query);

        //cek rowsCount jika kosong maka
        if ( !rowCount ){

            //munculkan pesan error
            throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
        }
    }

  };

  //exportd module song service
  module.exports = SongsService;