const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre')

const movieSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        minlength: 5,
        maxlength: 255,
        trim: true       
    },
    genre: {
        required: true,
        type: genreSchema        
    },
    numberInStock: {
        required: true,
        type: Number,        
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        required: true,
        type: Number,        
        min: 0,
        max: 255
    }
})

const Movie = mongoose.model('movie',movieSchema);

function validateMovie(movie) {
    const schema = {
      title: Joi.string().min(3).required(),
      genreId: Joi.string().required(),
      numberInStock: Joi.number().min(0).required(),
      dailyRentalRate: Joi.number().min(0).required()
    };
  
    return Joi.validate(movie, schema);
  }

exports.Movie = Movie;
exports.validate = validateMovie;