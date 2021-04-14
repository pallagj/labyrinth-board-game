const Schema = require('mongoose').Schema
const db = require('../config/db')

const Team = db.model('Team', {
    name: String,

    _red: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _blue: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _green: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _yellow: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = Team
