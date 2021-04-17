const mongoose = require('mongoose')

let moviesSchema = mongoose.Schema;

let Movie = new moviesSchema({
    name: String,
    genres: [String],
    image: String,
    premiered: Date
})

module.exports = mongoose.model('movies', Movie);

