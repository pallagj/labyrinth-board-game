const mongoose = require('mongoose')

mongoose.connect(process.env.mongoUrl, {useNewUrlParser: true}).then(r =>{})


module.exports = mongoose
