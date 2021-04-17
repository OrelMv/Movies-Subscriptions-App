const Movie = require('../schemas/moviesSchema')
const jsonFile = require('jsonfile')
const subscriptionsBL = require('./subscriptionsBL')
const Subscription = require('../schemas/subscriptionsSchema')

let getAllMovies = function(){
    return new Promise((resolve, reject) => {
        Movie.find({}, (err, allMovies) => {
            if(err){
                reject(err)
            }
            else{
                resolve(allMovies)
            }
        })
    })
}

let getMovieById = function(id){
    return new Promise((resolve, reject) => {
        Movie.findById(id, (err, movie) => {
            if(err){
                reject(err)
            }
            else{
                resolve(movie)
            }
        })
    })
}


let addMovie = function(movieObj){
    return new Promise((resolve, reject) => {
        let movie = new Movie({
            name: movieObj.name,
            genres: movieObj.genres,
            image: movieObj.image,
            premiered: movieObj.premiered
        })

        movie.save((err) => {
            if(err){
                reject(err)
            }
            else{

                jsonFile.readFile('./movieSubscription.json', (err, data) => {
                    if(err){
                        reject(err)
                    }
                    else{
                        //add to movie subscribers with members array empty
                        let movieSubscribersArray = [...data.movieSubscribers, {movieId: movie._id, members: []}]

                        //add to each members in the json this movie to the not whatched list 
                        data.memberMoviesNotWhatched.forEach(member => {
                            member.moviesNotWhatched.push({movieId: movie._id, name: movie.name})
                        })

                        let obj = {movieSubscribers: movieSubscribersArray, memberMoviesNotWhatched: data.memberMoviesNotWhatched}
                        jsonFile.writeFile('./movieSubscription.json', obj, err => {
                            if(err){
                                reject(err)
                            }
                            else{
                                resolve("Movie Added")
                            }
                        })

                    }
                }) 
            }
        })
    })
}

let updateMovie = function(id, movieObj){
    return new Promise((resolve, reject) => {
        Movie.findByIdAndUpdate((id), {
            name: movieObj.name,
            genres: movieObj.genres,
            image: movieObj.image,
            premiered: movieObj.premiered   
        }, (err) => {
            if(err){
                reject(err)
            }
            else{
                resolve("Movie Updated")
            }
        })
    })
}


let deleteMovie = function(id){
    return new Promise((resolve, reject) =>{

        jsonFile.readFile('./models/deletedData.json', async(err, deletedData) => {
            if(err){
                reject(err)
            }
            else{
                let currentMovieData = await getMovieById(id)
                let addedData = {...deletedData, movies: [...deletedData.movies, currentMovieData]}
                jsonFile.writeFile('./models/deletedData.json', addedData, async(err) => {
                    if(err){
                        reject(err)
                    }
                    else{

                        let allSubs = await subscriptionsBL.getAllSubs()
                        
                        //array of subs 
                        //iterate all of them and do find by id and update
                        allSubs.membersSubscriptions.forEach(sub => {
                            let movies = sub.movies.filter(movie => movie.movieId != id)
                            Subscription.findByIdAndUpdate(sub._id, {
                                memberId: sub.memberId,
                                movies: movies
                            }, err => {
                                if(err){
                                    reject(err)
                                }
                            })
                        })

                        jsonFile.readFile('./movieSubscription.json', (err, data) => {
                            if(err){
                                reject(err)
                            }
                            else{
                                //in movie subscribers we look for this perticuler movie and remove it
                                let movieSubs = data.movieSubscribers
                                for(let i = 0; i < movieSubs.length; i++){
                                    if(movieSubs[i].movieId == id){
                                        movieSubs.splice(i, 1)
                                        break
                                    }
                                }
                                 // in memberNotWhatched- for each member, we check if this movie is in the list of movies he has not whatched
                                 // if it is we remove it
                                data.memberMoviesNotWhatched.forEach( member => {
                                    for(let i = 0; i < member.moviesNotWhatched.length; i++){
                                        if(member.moviesNotWhatched[i].movieId == id){
                                            member.moviesNotWhatched.splice(i ,1)
                                            break
                                        }
                                    }
                                })

                                let obj = {movieSubscribers: data.movieSubscribers, memberMoviesNotWhatched: data.memberMoviesNotWhatched}
                                jsonFile.writeFile('./movieSubscription.json', obj , err => {
                                    if(err){
                                        reject(err)
                                    }
                                    else{
                                        Movie.findByIdAndDelete(id, (err) =>{
                                            if(err){
                                                reject(err)
                                            }
                                            else{
                                                resolve("Movie Deleted and added to deleted json file")
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })

    })
}

module.exports = {getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie}