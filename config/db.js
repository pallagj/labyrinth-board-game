const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/labyrinth', {useNewUrlParser: true}).then(r =>{})

module.exports = mongoose
