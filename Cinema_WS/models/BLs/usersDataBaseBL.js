const User = require('../usersSchema')
const jsonFile = require('jsonfile')

let getLogInInfo = function(){
    return new Promise((resolve, reject) => {
        User.find({}, (err, usersLogInData) => {
            if(err){
                reject(err)
            }
            else{
                resolve(usersLogInData)
            }
        })
    })
}


let getUserById = function(id){
    return new Promise((resolve, reject) => {
        User.findById(id, (err, user) => {
            if(err){
                reject(err)
            }
            else{
                resolve(user)
            }
        })
    })
}


let addUser = function(userObj){
    return new Promise((resolve, reject) => {
        let user = new User({
            userName: userObj.userName,
            password: userObj.password
        })

        user.save((err) => {
            if(err){
                reject(err)
            }
            else{
                resolve({
                    userId: user._id,
                    resp: "user Added"
                })
            }
        })
    })
}

let updateUser = function(id, userObj){
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate((id), {
            userName: userObj.userName,
            password: userObj.password
        }, (err) => {
            if(err){
                reject(err)
            }
            else{
                resolve("User Updated")
            }
        })
    })
}


let deleteUser = function(id){
    return new Promise((resolve, reject) =>{
        jsonFile.readFile('./jsonFiles/deletedData.json', async(err, data) => {
            if(err){
                reject(err)
            }
            else{
                let userData = await getUserById(id);
                let addedData = {...data, logInInfo: [...data.logInInfo, userData]}
                jsonFile.writeFile('./jsonFiles/deletedData.json', addedData , (err) => {
                    if(err){
                        reject(err)
                    }
                    else{
                        User.findByIdAndDelete(id, (err) =>{
                            if(err){
                                reject(err)
                            }
                            else{
                                resolve("User Deleted and added to deleted json file")
                            }
                        })
                    }
                })
            }
        })
        
    })
}

module.exports = {getLogInInfo, getUserById, addUser, updateUser, deleteUser}