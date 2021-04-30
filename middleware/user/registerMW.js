/**
 * Registration
 */

const requireOption = require('../requireOption')
const invalidPassword = require('../invalidPassword')

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel')

    return function(req, res, next) {

        if(typeof res.locals.simpleUser === 'undefined'){
            res.locals.error = 'Wrong inputs!'
            return next();
        }

        if(typeof res.locals.foundUser !== 'undefined'){
            res.locals.error = 'User is already exists!'
            return next();
        }

        res.locals.userToSave = res.locals.simpleUser;

        next();
    }
}


