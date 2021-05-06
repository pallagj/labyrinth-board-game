const Schema = require('mongoose').Schema
const db = require('../config/db')

const Game = db.model('Game',  {
    turn: {
        type: String,
        enum: ['yellow', 'red', 'blue', 'green']
    },

    needPush: {
        type: Boolean,
        default: true
    },

    disabledPush: {
        type: Number,
        default: -1
    },

    table: [{
        cardId: Number,
        orientation: Number
    }],

    plusCard: {
        cardId: Number,
        orientation: Number
    },

    players: [
        {
            color: {
                type: String,
                enum: ['yellow', 'red', 'blue', 'green']
            },
            position: Number,

            ranking: {type: Number, default: -1},
            targets: [Number]
        }
    ]
})

module.exports = Game
