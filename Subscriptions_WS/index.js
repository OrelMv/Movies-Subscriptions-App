const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

require('./configs/subscriptionsDataBase')

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

let membersController = require('./controllers/membersController')
let moviesController = require('./controllers/moviesController')
let subscriptionsController = require('./controllers/subscriptionsController')

app.use('/api/members', membersController)
app.use('/api/movies', moviesController)
app.use('/api/subscriptions', subscriptionsController)

app.listen(8000)

console.log("Server is running...")