//invariant error module
const InvariantError = require('../../exceptions/InvariantError');

//AlbumPayloadSchema Module
const { AlbumPayloadSchema } = require('./schema');

//fungsi validasi Albums
class AlbumsValidator {

    validateAlbumPayload = (payload) => {

        const validationResult = AlbumPayloadSchema.validate(payload);

        //cek jika validation result nya error
        if (validationResult.error){
            throw new InvariantError(validationResult.error.message);
        }

        return validationResult.value;
    };
};

//exports module AlbumsValidator
module.exports = { AlbumsValidator };