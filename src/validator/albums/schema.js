//joi module
const Joi = require('joi');

//current year module
const currentYear = new Date().getFullYear();

//AlbumPayloadSchema Definition
const AlbumPayloadSchema = Joi.object({
    name: Joi.string().required(),
    year: Joi.number().integer().min(1900).max(currentYear).required(),
});

//exports albums payload schema
module.exports = { AlbumPayloadSchema };

