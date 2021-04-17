const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/projectusersDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
