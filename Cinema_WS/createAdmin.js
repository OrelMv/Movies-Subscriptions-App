require('./configs/usersDataBase')
const jFile = require('jsonfile')
const User = require('./models/usersSchema')

const admin = new User({
    userName: "admin",
    password: "admin"
})

admin.save(err => {
    if(err){
        console.log(err)
    } else {
        let permissionsData = [{id: admin._id, permissions: ["View Subscriptions", "Create Subscriptions", 
            "Delete Subscriptions", "Update Subscriptions", "View Movies", "Create Movies", "Delete Movies", "Update Movies"]}]
            
        jFile.writeFile('./jsonFiles/permissions.json', permissionsData, err => {
            if(err){
                console.log(err)
            } else {
                let usersData = [{id: admin._id, firstName: "admin",
                lastName: "admin",
                createdDate: "10-01-2009",
                sessionTimeOut: 100}]
                jFile.writeFile('./jsonFiles/users.json', usersData, err => {
                    if(err){
                        console.log(err)
                    }
                })
            }
        })
    }
})
