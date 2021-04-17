const express = require('express')
const utils = require('../../utils')

const router = express.Router()

router.route('/').get(async(req, resp) => {
    let allMoviesData = await utils.getAll("http://localhost:8000/api/movies")
    return resp.json(allMoviesData.data)
})

router.route('/:movieId').get(async(req, resp) => {
    let movieId = req.params.movieId
    let movieData = await utils.getById("http://localhost:8000/api/movies/", movieId)
    return resp.json(movieData)
})

router.route('/').post(async(req, resp) => {
    let obj = req.body
    let data = await utils.add("http://localhost:8000/api/movies", obj)
    return resp.json(data)
})

router.route('/:movieId').put(async(req, resp) => {
    let movieId = req.params.movieId
    let obj = req.body
    let data = await utils.update("http://localhost:8000/api/movies/", movieId, obj)
    return resp.json(data)
})

router.route('/:movieId').delete(async(req, resp) => {
    let movieId = req.params.movieId
    let data = await utils.del("http://localhost:8000/api/movies/", movieId)
    return resp.json(data)
})

module.exports = router