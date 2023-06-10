const mapDBToModel = ({ 
    id,
    title,
    year,
    performer,
    genre,
    duration,
    album_id
  }) => ({
    id,
    title,
    year,
    performer,
    genre,
    duration,
    albumId : album_id,
  });

  const mapDBToModelAlbums = ({
    id,
    name,
    year,
    }, song) => ({
    id,
    name,
    year,
    songs: song
    });

    const mapDBToModelSongs = ({ 
      id,
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    }) => ({
      id,
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    });

  module.exports = { mapDBToModel,mapDBToModelAlbums,mapDBToModelSongs };