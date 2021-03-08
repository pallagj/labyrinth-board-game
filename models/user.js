const Schema = require('mongoose').Schema
const db = require('../config/db')

const User = db.model('User', {
    /* For login */
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,

    emailVerified: Boolean,

    /* Details */
    name: String,
    givenName: String,
    familyName: String,
    gender: String,
    birth: Date,

    pictureUrl: String,
    locale: String
})

module.exports = User
