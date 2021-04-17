const express = require('express')
//cors policy
const cors = require('cors')
const bodyParser = require('body-parser')

require('./configs/usersDataBase')

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

let usersController = require('./controllers/usersController')
let membersSubsAPIController = require('./controllers/subscriptionsAPIcontrollers/apiMembersController')
let moviesSubsAPIController = require('./controllers/subscriptionsAPIcontrollers/apiMoviesController')
let subscriptionsSubsAPIController = require('./controllers/subscriptionsAPIcontrollers/apiSubsController')

app.use('/api/users', usersController)
app.use('/api/users/subsapi/members', membersSubsAPIController)
app.use('/api/users/subsapi/movies', moviesSubsAPIController)
app.use('/api/users/subsapi/subscriptions', subscriptionsSubsAPIController)

app.listen(8001)

console.log("Server is running...")