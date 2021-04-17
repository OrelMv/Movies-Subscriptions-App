require('../configs/subscriptionsDataBase')
const Movie = require('../models/schemas/moviesSchema')
const Member = require('../models/schemas/membersSchema')
const utils = require('./utils')

let getMembersData = async()=> {
    let membersData = await utils.getData("https://jsonplaceholder.typicode.com/users");
    let arr = []
    membersData.data.forEach(member => {
        arr.push({
            name: member.name,
            email: member.email,
            city: member.address.city
        })
    })
    return arr
}

let getMoviesData = async() => {
    let moviesData = await utils.getData("https://api.tvmaze.com/shows")
    let arr = []
    for(let i = 0; i < 30; i++){
        arr.push({
            name: moviesData.data[i].name,
            genres: moviesData.data[i].genres,
            image: moviesData.data[i].image.medium,
            premiered: moviesData.data[i].premiered
        })
    }
    return arr
    
}

let putCollections = async() => {
    let movies = await getMoviesData();
    movies.forEach(movie=> {
        let newMovie = new Movie({
            name: movie.name,
            genres: movie.genres,
            image: movie.image,
            premiered: movie.premiered
        })
        newMovie.save(err=>{
            if(err){
                console.log(err)
            }
        });
    })

    let members = await getMembersData();
    members.forEach(member=> {
        let newMember = new Member({
            name: member.name,
            email:member.email,
            city: member.city
        })

        newMember.save(err=>{
            if(err){
                console.log(err)
            }
        })
    })
}

putCollections();
