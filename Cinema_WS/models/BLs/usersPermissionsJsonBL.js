const jFile = require('jsonfile')

//get all users permissions
let getAllUsersPermissions = function(){
    return new Promise((resolve, reject) => {
        jFile.readFile('./jsonFiles/permissions.json', (err, allPermissions) => {
            if(err){
                reject(err)
            }
            else{
                resolve(allPermissions)
            }
        })
    })
}

//get user permissions by userId
let getUserPermissions = function(id){
    return new Promise((resolve, reject) => {
        jFile.readFile('./jsonFiles/permissions.json', (err, allPermissions) => {
            if(err){
                reject(err)
            }
            else{
                let userPermissionsIndex = allPermissions.findIndex(per => per.id == id)
                let userPer = allPermissions[userPermissionsIndex]
                resolve(userPer)
            }
        })
    })
}

//add new user
let addUserPer = function(userId, userPerObj){
    return new Promise((resolve, reject) => {
        jFile.readFile('./jsonFiles/permissions.json', (err, allPermissions) => {
            if(err){
                reject(err)
            }
            else{
                let obj = {
                    id: userId,
                    permissions: userPerObj.permissions
                }
                let arrObj = [...allPermissions, obj]
                jFile.writeFile('./jsonFiles/permissions.json', arrObj, (err)=> {
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve("user Per Added")
                    }
                })
            }
        })
    })
}

//update permissions
let updatePermissions = function(id, permissionsArray){
    return new Promise((resolve, reject) => {
        jFile.readFile('./jsonFiles/permissions.json', (err, allPermissions) => {
            if(err){
                reject(err)
            }
            else{
                let userIndex = allPermissions.findIndex(per=> per.id == id)
                allPermissions[userIndex].permissions = permissionsArray
                jFile.writeFile('./jsonFiles/permissions.json',allPermissions, (err)=> {
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve("permissions updated")
                    }
                })
            }
        })
    })
}

//delete user
let deleteAllUsersPermissions = function(id){
    return new Promise((resolve, reject) =>{
        //before i delete the data from the permissions json, I store it in deleted json file 
        jFile.readFile('./jsonFiles/deletedData.json', async(err, deletedData) => {
            if(err){
                reject(err)
            }
            else{
                let currentUserData = await getUserPermissions(id)
                let addedData = {...deletedData, permissionsData: [...deletedData.permissionsData, currentUserData]}
                jFile.writeFile('./jsonFiles/deletedData.json', addedData, (err) => {
                    if(err){
                        reject(err)
                    }
                    else{
                        //delete the data from the permissions json file
                        jFile.readFile('./jsonFiles/permissions.json', (err, allPermissions) => {
                            if(err){
                                reject(err)
                            }
                            else{
                                let usersObj = allPermissions.filter(user=> user.id != id)
                                jFile.writeFile('./jsonFiles/permissions.json', usersObj, (err) => {
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

module.exports = {getAllUsersPermissions, getUserPermissions, addUserPer, updatePermissions
    , deleteAllUsersPermissions}