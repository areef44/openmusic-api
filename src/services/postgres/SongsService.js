const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const { mapDBToModel } = require("../../utils");

class SongsService {
    constructor() {
      this._pool = new Pool;
    }

    async addSong({ title, year, performer, genre, duration, albumId }) {
        const id = `song-${nanoid(16)}`;
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO songs VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id',
            values: [title, year, performer, genre, duration, albumId, id, createdAt, updatedAt],
        };

        const {rows} = await this._pool.query(query);

        if (!rows[0].id){
            throw new InvariantError('Lagu gagal ditambahkan');
        }

        return rows[0].id;
    }

    async getSongs(title, perfomer ){

        let query = '';

        if (title && performer){
            query = {
                text: 'SELECT id, title, performer FROM songs WHERE lower(title) LIKE $1 AND lower(perfomer) ILIKE $2',
                values: [`%${title.toLowerCase()}%`, `%${performer.toLowerCase()}%`],
            };
        }else if (title){
            query = {
                text: 'SELECT id, title,performer FROM songs where lower(title) like $1',
                values: [`%${title.toLowerCase()}%`],
            };
        }else if(perfomer){
            query = {
                text: 'SELECT id, title,performer FROM songs where lower(performer) like $1',
                values: [`%${performer.toLowerCase()}%`],
            };
        }else {
            query = 'SELECT id,title,performer FROM songs';
        }

        const result = await this._pool.query(query);
        if (!result.rows.length){
            throw new NotFoundError('Lagu tidak ditemukan');
        }
        return result.rows;
        }

    async getSongById(id){
        const query = {
            text: 'SELECT id,title, year, performer, genre, duration, album_id FROM songs WHERE id = $1',
            values: [id],
        };

        const {rows, rowCount} = await this._pool.query(query);

        //cek jika rowcount tidak ada
        if(!rowCount){
            throw new NotFoundError('Lagu tidak ditemukan');
        }

        return rows.map(mapDBToModel)[0];
    }

    async editSongById(id, { title, year, performer, genre, duration, albumId }){
        
        const updatedAt = new Date().toISOString();

        const query = {
            text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, album_id = $6 updated_at = $7 WHERE id = $8 RETURNING id',
            values: [title,year,performer, genre, duration, albumId, updatedAt, id],
        };

        const {rowCount} = await this._pool.query(query);

        //cek rowsCount
        if ( !rowCount ){
            throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
        }

    }

    async deleteSongById(id){
        const query = {
            text: 'DELETE FROM songs WHERE id = $1 RETURNING id'
        }

        const {rowCount} = await this._pool.query(query);

        //cek rowsCount
        if ( !rowCount ){
            throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
        }
    }

  }

  module.exports = SongsService;