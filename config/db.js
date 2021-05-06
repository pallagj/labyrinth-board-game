const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://labyrinth-board-game:${process.env.mongoPassword}@cluster0.aqsn9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {useNewUrlParser: true}).then(r =>{})


module.exports = mongoose
