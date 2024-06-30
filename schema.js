// here we are adding this file schema.js in video validation of schema 
//here we will do validation of schema server side with the help of npm package joi
//so first download the npm i joi then create schema.js file in major project folder
//and write this

const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description : Joi.string().required(),
        location: Joi.string().required(),
        country :  Joi.string().required(),
        price :  Joi.number().required().min(0),
        image : Joi.string().allow("", null),
    }).required(), 
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});