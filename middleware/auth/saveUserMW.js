/**
 * Search the user by the email address and save to foundUser
 */
const requireOption = require('../requireOption')

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel')

    return function(req, res, next) {
        if(typeof res.locals.user === 'undefined'){
            return next()
        }

        let user = res.locals.user
        user.save(err => {
            if(err)
                return next(err)

            //Successful
            req.session.userId = user._id
            return req.session.save(err => res.redirect('/home'))
        })
    }
}
