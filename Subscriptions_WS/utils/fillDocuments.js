require('../configs/subscriptionsDataBase')
const Movie = require('../models/schemas/moviesSchema')
const Member = require('../models/schemas/membersSchema')
const Subscription = require('../models/schemas/subscriptionsSchema')
const utils = require('./utils')

let getMembersData = async()=> {
    let membersData = await utils.getData("https://jsonplaceholder.typicode.com/users");

    membersData.data.forEach(member => {

        let memberObj = new Member({
            name: member.name,
            email: member.email,
            city: member.address.city
        })

        memberObj.save(err=>{
            if(err){
                console.log(err)
            } else {
                let subscriptionObj = new Subscription({
                    memberId: memberObj._id,
                    movies: []
                })
                subscriptionObj.save(err => {
                    if(err){
                        console.log(err);
                    }
                })
            }
        })
        
    })

}

let getMoviesData = async() => {
    let moviesData = await utils.getData("https://api.tvmaze.com/shows")
    for(let i = 0; i < 15; i++){

        let movieObj = new Movie({
            name: moviesData.data[i].name,
            genres: moviesData.data[i].genres,
            image: moviesData.data[i].image.medium,
            premiered: moviesData.data[i].premiered
        })
        movieObj.save(err => {
            if(err){
                console.log(err)
            }
        })
    }

    
}

getMembersData()
getMoviesData()

