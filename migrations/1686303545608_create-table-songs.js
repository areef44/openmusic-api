/* eslint-disable camelcase */


exports.up = pgm => {
    pgm.createTable('songs',{
        id: {
           type: 'VARCHAR(50)',
           primaryKey: true,
        },
        title: {
           type: 'VARCHAR(50)',
           notNull: true,
        },
        year: {
           type: 'integer',
           notNull: true,
        },
        performer: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        genre: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        duration: {
            type: 'integer',
        },
        album_id: {
            type: 'varchar(30)',
            references: '"albums"',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
        created_at: {
           type: 'text',
           notNull:true,
        },
        updated_at: {
           type: 'text',
           notNull: true,
        },   
       });
};

exports.down = pgm => {
    pgm.dropTable('songs');
};
