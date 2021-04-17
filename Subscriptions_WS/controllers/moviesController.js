const express = require('express')
const moviesBL = require('../models/BLs/moviesBL')

const router = express.Router();

router.route('/').get(async function(req, resp){
    let data = await moviesBL.getAllMovies();
    return resp.json(data)
})

router.route('/:movieId').get(async function(req, resp){
    let movieId = req.params.movieId;
    let data = await moviesBL.getMovieById(movieId)
    return resp.json(data)
})

router.route('/').post(async function(req, resp){
    let movieObj = req.body;
    let data = await moviesBL.addMovie(movieObj)
    return resp.json(data)
})

router.route('/:movieId').put(async function(req,resp){
    let movieId = req.params.movieId
    let movieObj = req.body
    let data = await moviesBL.updateMovie(movieId, movieObj)
    return resp.json(data)
})

router.route('/:movieId').delete(async function(req, resp){
    let movieId = req.params.movieId
    let data = await moviesBL.deleteMovie(movieId)
    return resp.json(data)
})

module.exports = router