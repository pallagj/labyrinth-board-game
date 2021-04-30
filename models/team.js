const Schema = require('mongoose').Schema
const db = require('../config/db')

const Team = db.model('Team', {
    name: String,
    description: String,

    numberOfGames: {
        type: Number,
        default: 0
    },

    players: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },

           color: {
                type: String,
                enum: ['yellow', 'red', 'blue', 'green']
            },

            victories: {
                type: Number,
                default: 0
            },
        }
    ],
})

module.exports = Team
