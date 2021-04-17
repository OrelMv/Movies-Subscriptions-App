const jFile = require('jsonfile')

//get all usersData
let getUsersData = function(){
    return new Promise((resolve, reject) => {
        jFile.readFile("./jsonFiles/users.json", (err, allUsers) => {
            if(err){
                reject(err)
            }
            else{
                resolve(allUsers)
            }
        })
    })
}

//get userById
let getUserById = function(id){
    return new Promise((resolve, reject) => {
        jFile.readFile('./jsonFiles/users.json', (err, allUsers) => {
            if(err){
                reject(err)
            }
            else{
                let userIndex = allUsers.findIndex(user => user.id == id)
                let user = allUsers[userIndex]
                resolve(user)
            }
        })
    })
}

//add user
let addUser = function(userId, userObj){
    return new Promise((resolve, reject) => {
        jFile.readFile('./jsonFiles/users.json', (err, allUsers) => {
            if(err){
                reject(err)
            }
            else{
                let obj = {
                    id: userId,
                    firstName: userObj.firstName,
                    lastName: userObj.lastName,
                    createdDate: userObj.createdDate,
                    sessionTimeOut: userObj.sessionTimeOut
                }
                let arrObj = [...allUsers, obj]
                jFile.writeFile('./jsonFiles/users.json', arrObj, (err) => {
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve("user Added")
                    }
                })
            }
        })
    })
}

//update user
let updateUser = function(id, userObj){
    return new Promise((resolve, reject) => {
        jFile.readFile('./jsonFiles/users.json', (err, allUsers) => {
            if(err){
                reject(err)
            }
            else{
                let userIndex = allUsers.findIndex(user => user.id == id)
                allUsers[userIndex] = {
                    id: id,
                    firstName: userObj.firstName,
                    lastName: userObj.lastName,
                    createdDate: userObj.createdDate,
                    sessionTimeOut: userObj.sessionTimeOut
                }
                jFile.writeFile('./jsonFiles/users.json', allUsers, (err)=> {
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve("user Updated")
                    }
                })
            }
        })
    })
}

//delete user
let deleteUser = function(id){
    return new Promise((resolve, reject) =>{
        // before I delete the data from the users json, I store it in deleted json file
        jFile.readFile('./jsonFiles/deletedData.json', async(err, deletedData) => {
            if(err){
                reject(err)
            }
            else{
                let currentUserData = await getUserById(id)
                let addedData = {...deletedData, jsonData: [...deletedData.jsonData, currentUserData]}
                jFile.writeFile('./jsonFiles/deletedData.json', addedData, (err) => {
                    if(err){
                        reject(err)
                    }
                    else{
                        //delete the user data from the users json
                        jFile.readFile('./jsonFiles/users.json', (err, allUsers) => {
                            if(err){
                                reject(err)
                             }
                            else{
                                let usersObj = allUsers.filter(user=> user.id != id)
                                jFile.writeFile('./jsonFiles/users.json', usersObj, (err) => {
                                    if(err){
                                        reject(err)
                                    }
                                    else{
                                        resolve("user Deleted and added to deleted json file")
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



module.exports = {getUsersData, getUserById, addUser, updateUser, deleteUser }

