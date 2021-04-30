const Schema = require('mongoose').Schema
const db = require('../config/db')

const Game = db.model('Game',  {
    turn: {
        type: String,
        enum: ['yellow', 'red', 'blue', 'green']
    },

    needPush: Boolean,

    disabledPush: Number,

    table: [{
        id: Number,
        orientation: Number
    }],

    players: [
        {
            color: {
                type: String,
                enum: ['yellow', 'red', 'blue', 'green']
            },

            ranking: Number,
            targets: [Number]
        }
    ]
})

module.exports = Game
