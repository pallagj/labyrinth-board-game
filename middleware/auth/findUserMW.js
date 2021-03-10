/**
 * Search the user by the email address and save to foundUser
 */
const requireOption = require('../requireOption')

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel')

    return function(req, res, next) {
        let isForm = typeof req.body.email !== 'undefined'
        let isGoogle = typeof res.locals.googleUser !== 'undefined'

        if(!isForm && !isGoogle){
            console.log('auth - find: NOT DEFINED EMAIL')

            return next();
        }

        let email = isForm ? req.body.email : res.locals.googleUser

        UserModel.findOne({email: email}, (err, user) => {
            if(user){
                console.log('auth - find: EMAIL FOUND ('+user.email+')')
                res.locals.foundUser = user
            } else {
                console.log('auth - find: EMAIL NOT FOUND ('+user.email+')')
            }

            return next();
        })
    }
}
