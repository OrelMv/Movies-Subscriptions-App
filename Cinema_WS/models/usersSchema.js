const mongoose = require('mongoose')

const usersSchema = mongoose.Schema;

let User = new usersSchema({
    userName: String,
    password: String
})

module.exports = mongoose.model('users', User)