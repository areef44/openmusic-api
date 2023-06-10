const InvariantError = require('../../exceptions/InvariantError');
const { AlbumPayloadSchema } = require('./schema');

class AlbumsValidator {

    validateAlbumPayload = (payload) => {

        const validationResult = AlbumPayloadSchema.validate(payload);

        if (validationResult.error){
            throw new InvariantError(validationResult.error.message);
        }

        return validationResult.value;
    };
};

module.exports = { AlbumsValidator };