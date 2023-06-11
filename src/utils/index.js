//mapDBToModel mapping
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

//mapDBToModelAlbums mapping
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

//mapDBToModelSongs mapping
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

//exports mapping
module.exports = { mapDBToModel,mapDBToModelAlbums,mapDBToModelSongs };