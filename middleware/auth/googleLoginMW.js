/**
 * This will allow to sign in with google
 */
const requireOption = require('../requireOption')

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel')

    return function(req, res, next) {
        if(typeof res.locals.googleUser === 'undefined'){
            res.locals.error = 'Undefined google user :('
            return next();
        }

        let googleUser = res.locals.googleUser;
        let foundUser  = res.locals.foundUser

        if(typeof foundUser !== 'undefined'){
            req.session.userId = foundUser._id
            return req.session.save(err => res.redirect('/home'))
        } else {
            res.locals.userToSave = googleUser;
            return next();
        }

    }
}
