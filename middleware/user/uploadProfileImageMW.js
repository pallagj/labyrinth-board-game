/**
 * This will receive the profile picture image, after save and assigns to the user by url
 */

const requireOption = require('../requireOption')
const invalidPassword = require('../invalidPassword')
const path = require('path')

module.exports = function(objectrepository, rootDir) {
    const UserModel = requireOption(objectrepository, 'UserModel')

    return function(req, res, next) {
        let user = res.locals.user

        if (!req.files || Object.keys(req.files).length === 0) {
            return next()
        }

        let profilepicture = req.files.profilepicture

        let pictureUrl = '/images/profilepictures/'
            + user._id
            + path.extname(profilepicture.name)

        profilepicture.mv(rootDir + '/static' + pictureUrl).then(r => {
            res.locals.user.pictureUrl = pictureUrl
            res.locals.user.save(err=>{
                if(err)
                    return next(err)

                return next();
            });
        })
    }
}


