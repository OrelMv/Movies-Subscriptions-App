const Subscription = require('../schemas/subscriptionsSchema')
const jsonFile = require('jsonfile')

let getAllSubs = function(){
    return new Promise((resolve, reject) => {
        Subscription.find({}, (err, allSubs) => {
            if(err){
                reject(err)
            }
            else{
                jsonFile.readFile('./movieSubscription.json', (err, subsInfo) => {
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve({
                            subsInfo: subsInfo,
                            membersSubscriptions: allSubs
                        })
                    }
                })
            }
        })
    })
}

let getSubById = function(id){
    return new Promise((resolve, reject) => {
        Subscription.findById(id, (err, sub) => {
            if(err){
                reject(err)
            }
            else{
                resolve(sub)
            }
        })
    })
}

let addSub = function(memberId){
    return new Promise((resolve, reject) => {
        let sub = new Subscription({
            memberId: memberId,
            movies: []
        })
    
        sub.save((err) => {
            if(err){
                reject(err)
            }
            else{
                resolve("subscription added")
            }
        })
    })
    
}

let updateSub = function(id, subObj){
    return new Promise(async(resolve, reject) => {
        let currentSub = await getSubById(id)
        let subscriberMovies = [...currentSub.movies, {movieId: subObj.movieId, date: subObj.date}]
        Subscription.findByIdAndUpdate(id, {
                memberId: subObj.memberId,
                movies: subscriberMovies
            }, err=>{
                if(err){
                    reject(err)
                }
                else{
                    jsonFile.readFile('./movieSubscription.json', (err, data) => {
                        if(err){
                            reject(err)
                        }
                        else{
                            //in movie subscribers find that perticuler movie and add to his members array this member that just subscribe to this movie
                            let currentMovieIndex = data.movieSubscribers.findIndex(movie => movie.movieId == subObj.movieId)
                            let member = {memberId: subObj.memberId, date: subObj.date}

                            data.movieSubscribers[currentMovieIndex] = {movieId: subObj.movieId, members: [...data.movieSubscribers[currentMovieIndex].members, member ]}

                            //find that member in memberMoviesNotWhatched and remove that movie from the list of movies not whatched
                            let currentMemberIndex = data.memberMoviesNotWhatched.findIndex(member => member.memberId == subObj.memberId)
                            let memberMoviesArray = data.memberMoviesNotWhatched[currentMemberIndex].moviesNotWhatched
                            for(let i = 0; i < memberMoviesArray.length; i++){
                                if(memberMoviesArray[i].movieId == subObj.movieId){
                                    memberMoviesArray.splice(i, 1)
                                    break
                                }
                            }

                            let obj = {movieSubscribers: data.movieSubscribers, memberMoviesNotWhatched: data.memberMoviesNotWhatched}

                            jsonFile.writeFile('./movieSubscription.json', obj, err => {
                                if(err){
                                    reject(err)
                                }   
                                else{
                                    resolve("ok")
                                }
                            })


                        }
                    })
                }
            })
         
        
    })
    
}

let deleteSub = function(id){
    return new Promise((resolve, reject) => {

        jsonFile.readFile('./models/deletedData.json', async(err, deletedData) => {
            if(err){
                reject(err)
            }
            else{
                let currentSubscription = await getSubById(id)
                let addedData = {...deletedData, subscriptions: [...deletedData.subscriptions, currentSubscription]}
                jsonFile.writeFile('./models/deletedData.json', addedData, (err) => {
                    if(err){
                        reject(err)
                    }
                    else{
                        Subscription.findByIdAndDelete(id, err=>{
                            if(err){
                                reject(err)
                            }
                            else{
                                resolve("subscription deleted and added to deleted json file")
                            }
                        })
                    }
                })
            }
        })

        
    })
    
}

module.exports = {getAllSubs, getSubById, addSub, updateSub, deleteSub}