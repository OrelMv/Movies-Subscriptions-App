const Member = require('../schemas/membersSchema')
const subscriptionsBL = require('./subscriptionsBL')
const moviesBL = require('./moviesBL')
const jsonFile = require('jsonfile')

let getAllMembers = function(){
    return new Promise((resolve, reject) => {
        Member.find({}, (err, allMembers) => {
            if(err){
                reject(err)
            }
            else{
                resolve(allMembers)
            }
        })
    })
}

let getMemberById = function(id){
    return new Promise((resolve, reject) => {
        Member.findById(id, (err, member) => {
            if(err){
                reject(err)
            }
            else{
                resolve(member)
            }
        })
    })
}


let addMember = function(memberObj){
    return new Promise((resolve, reject) => {
        let member = new Member({
            name: memberObj.name,
            email: memberObj.email,
            city: memberObj.city
        })

        member.save(async(err) => {
            if(err){
                reject(err)
            }
            else{
                //adding a subscription in subs collection
                await subscriptionsBL.addSub(member._id)
                //adding to the json file this member and put to his none whatched movies array, all the movies  --> 
                //beacause he has not whatched a movie yet
                jsonFile.readFile('./movieSubscription.json', async(err, data) => {
                    if(err){
                        reject(err)
                    }
                    else{
                        let allMoviesData = await moviesBL.getAllMovies()
                        let allMovies = allMoviesData.map(movie=> {
                            return {movieId: movie._id, name: movie.name}
                        })
                        let obj = {...data, memberMoviesNotWhatched: [...data.memberMoviesNotWhatched, {memberId: member._id, moviesNotWhatched: allMovies}]}
                        
                        jsonFile.writeFile('./movieSubscription.json', obj, err=>{
                            if(err){
                                reject(err)
                            }
                            else{
                                resolve("Member Added")
                            }
                        })
                    }
                    
                })
                
            }
        })
    })
}

let updateMember = function(id, memberObj){
    return new Promise((resolve, reject) => {
        Member.findByIdAndUpdate((id), {
            name: memberObj.name,
            email: memberObj.email,
            city: memberObj.city
        }, (err) => {
            if(err){
                reject(err)
            }
            else{
                resolve("Member Updated")
            }
        })
    })
}


let deleteMember = function(id){
    return new Promise((resolve, reject) =>{

        jsonFile.readFile('./models/deletedData.json', async(err, deletedData) => {
            if(err){
                reject(err)
            }
            else{
                let currentMemberData = await getMemberById(id)
                let addedData = {...deletedData, members: [...deletedData.members, currentMemberData]}
                jsonFile.writeFile('./models/deletedData.json', addedData, (err) => {
                    if(err){
                        reject(err)
                    }
                    else{

                        jsonFile.readFile('./movieSubscription.json', (err, data) => {
                            if(err){
                                reject(err)
                            }
                            else{
                                //check if he subscribed to a movie, if he did remove him from the members array of this perticuler movie
                                data.movieSubscribers.forEach(movie => {
                                    if(movie.members.length != 0){
                                        let updatedMembers = movie.members.filter(member => member.memberId != id)
                                        movie.members = updatedMembers
                                    }
                                    
                                })

                                //delete this member from the members not whatched array
                                let currentMemberIndex = data.memberMoviesNotWhatched.findIndex(member => member.memberId == id)
                                data.memberMoviesNotWhatched.splice(currentMemberIndex, 1)

                                let obj = {movieSubscribers: data.movieSubscribers, memberMoviesNotWhatched: data.memberMoviesNotWhatched}

                                jsonFile.writeFile('./movieSubscription.json', obj, err => {
                                    if(err){
                                        reject(err)
                                    }
                                    else{
                                        Member.findByIdAndDelete(id, (err) =>{
                                            if(err){
                                                reject(err)
                                            }
                                            else{
                                                resolve("Member Deleted and added to deleted json file")
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

module.exports = {getAllMembers, getMemberById, addMember, updateMember, deleteMember}