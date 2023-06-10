const { nanoid } = require("nanoid");
const { Pool } = require('pg');
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const { mapDBToModel, mapDBToModelSongs } = require("../../utils");

class SongsService {
    constructor() {
      this._pool = new Pool();
    }


    async addSong({ title, year, genre, performer, duration, albumId }) {
        const id = `song-${nanoid(16)}`;
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
            values: [id, title, year, genre, performer, duration, albumId, createdAt, updatedAt],
        };

        const {rows}  = await this._pool.query(query);

        if (!rows[0].id){
            throw new InvariantError('Lagu gagal ditambahkan');
        }

        return rows[0].id;
    }

    async getSongs(params){

        const {title, performer} = params;

        if (title && performer){
            const query = {
                text: 'SELECT id, title, performer FROM songs WHERE title ILIKE $1 AND performer ILIKE $2',
                values: [`%${title}%`, `%${performer}%`],
            };

            const {rows} = await this._pool.query(query);
            return rows;
        }

        if (title) {
            const query = {
                text: 'SELECT id, title, performer FROM songs WHERE title ILIKE $1',
                values: [`%${title}%`],
            };

            const {rows} = await this._pool.query(query);
            return rows;
        }

        if (performer) {
            const query = {
                text: 'SELECT id, title, performer FROM songs WHERE performer ILIKE $1',
                values: [`%${performer}%`],
            };

            const {rows} = await this._pool.query(query);
            return rows;
        }

        const query = {
            text: 'SELECT id, title, performer FROM songs',
        };

        const {rows} = await this._pool.query(query);
        return rows;
        }

    async getSongById(id){
        const query = {
            text: 'SELECT * FROM songs WHERE id = $1',
            values: [id],
        };

        const result = await this._pool.query(query);

        //cek jika rowcount tidak ada
        if(!result.rowCount){
            throw new NotFoundError('Lagu tidak ditemukan');
        }

        return result.rows.map(mapDBToModelSongs)[0];
    }

    async editSongById(id, { title, year, genre, performer, duration, albumId }){
        
        const updatedAt = new Date().toISOString();

        const query = {
            text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6, updated_at = $7 WHERE id = $8 RETURNING id',
            values: [title, year, genre, performer, duration, albumId, updatedAt, id],
        };

        const {rowCount} = await this._pool.query(query);

        //cek rowsCount
        if ( !rowCount ){
            throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
        }

    }

    async deleteSongById(id){
        const query = {
            text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
            values:[id],
        }

        const {rowCount} = await this._pool.query(query);

        //cek rowsCount
        if ( !rowCount ){
            throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
        }
    }

  };

  module.exports = SongsService;