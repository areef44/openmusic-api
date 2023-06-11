//joi module
const Joi = require('joi');

//current year module
const currentYear = new Date().getFullYear();

//SongPayloadSchema Definition
const SongPayloadSchema = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().integer().min(1990).max(currentYear).required(),
    performer : Joi.string().required(),
    genre: Joi.string().required(),
    duration: Joi.number(),
    albumId: Joi.string(),
});

//exports song payload schema
module.exports = { SongPayloadSchema };