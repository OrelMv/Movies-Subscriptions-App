const mongoose = require('mongoose')

let subscriptionsSchema = mongoose.Schema;

let Subscription = new subscriptionsSchema({
    memberId: String,
    movies: [
        {
            movieId: String,
            date: Date
        }
    ]
})

module.exports = mongoose.model('subscriptions', Subscription )