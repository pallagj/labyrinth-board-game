/**
 * Search the user by the email address and save to foundUser
 */
const requireOption = require('../requireOption')

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel')

    return function(req, res, next) {
        if(typeof res.locals.userToSave === 'undefined'){
            return next()
        }

        let userToSave = res.locals.userToSave
        userToSave.save(err => {
            if(err)
                return next(err)

            //Successful
            req.session.userId = userToSave._id
            return req.session.save(err => res.redirect('/home'))
        })
    }
}
