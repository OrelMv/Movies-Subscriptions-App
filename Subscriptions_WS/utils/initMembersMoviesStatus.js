const jFile = require('jsonfile')
const utils = require('./utils')

let getAll = async function(){
    let moviesResp = await utils.getData("http://localhost:8001/api/users/subsapi/movies")
    let movies = moviesResp.data

    let memebrsResp = await utils.getData("http://localhost:8001/api/users/subsapi/members")
    let members = memebrsResp.data

   

    let notWhatchedArray = []
    let moviesInfo = []

    moviesSubsArray = []

    for(let i = 0; i < movies.length; i++){
        let obj = {
            movieId: movies[i]._id,
            members: []
        }
        moviesSubsArray.push(obj)
        moviesInfo.push({movieId: movies[i]._id, name: movies[i].name})
    }
    
    for(let i = 0; i < members.length; i++){
        let obj = {
            memberId: members[i]._id,
            moviesNotWhatched: moviesInfo
        }
        notWhatchedArray.push(obj)
    }


    let updatedObj = {movieSubscribers: moviesSubsArray, memberMoviesNotWhatched: notWhatchedArray}
    jFile.writeFile('../movieSubscription.json', updatedObj, err => {
        if(err){
            console.log(err);
        }
        else{
            console.log("ok");
            console.log("movies Subs Length: ",moviesSubsArray.length)
            console.log("members Movies Not Whatched: ", notWhatchedArray.length)
        }
    } )

}

getAll()
