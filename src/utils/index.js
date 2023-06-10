const mapDBToModel = ({ 
    id,
    name,
    title,
    year,
    performer,
    genre,
    duration,
    album_id
  }) => ({
    id,
    name,
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

  module.exports = { mapDBToModel,mapDBToModelAlbums };