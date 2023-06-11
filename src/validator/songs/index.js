//invariant error module
const InvariantError = require("../../exceptions/InvariantError");

//SongPayloadSchema Module
const { SongPayloadSchema } = require("./schema");

//fungsi validasi Songs
class SongsValidator {

    validateSongPayload = (payload) => {

        const validationResult = SongPayloadSchema.validate(payload);

        //cek jika validation result nya error
        if (validationResult.error){
            throw new InvariantError(validationResult.error.message);
        }

        return validationResult.value;
    };
};

//exports module songs validator
module.exports = { SongsValidator };