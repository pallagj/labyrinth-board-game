/**
 */

const requireOption = require('../requireOption')
const invalidPassword = require('../invalidPassword')
const path = require('path')

module.exports = function(objectrepository, rootDir) {
    const UserModel = requireOption(objectrepository, 'UserModel')

    return function(req, res, next) {
        console.log('auth - upload: TRY UPLOAD')
        let user = req.session.user

        let profilepicture
        let uploadPath

        if (!req.files || Object.keys(req.files).length === 0) {
            return next()
        }

        // The name of the input field (i.e. "profilepicture") is used to retrieve the uploaded file
        profilepicture = req.files.profilepicture
        console.log('auth - upload: FILA NAME GOT (' + profilepicture.name + ')')
        pictureUrl = '/images/profilepictures/' + user._id + path.extname(profilepicture.name)
        uploadPath = rootDir + '/static' + pictureUrl
        console.log('Files saved to: ' + uploadPath)
        // Use the mv() method to place the file somewhere on your server
        profilepicture.mv(uploadPath).then(r => {
            UserModel.findOne({email: req.session.user.email}, (err, user) => {

                user.pictureUrl = pictureUrl

                user.save(err => {
                    if(err) return next()

                    //Successful
                    req.session.login = true
                    req.session.user = user
                    return req.session.save(err => next())
                })
            })
        })
    }
}


