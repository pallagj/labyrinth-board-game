/**
 * Edited user data to userToSave local variable
 */

const requireOption = require('../requireOption')
const invalidPassword = require('../invalidPassword')

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel')

    return function(req, res, next) {
        if(typeof res.locals.simpleUser === 'undefined' || typeof res.locals.foundUser === 'undefined'){
            return next();
        }

        let sUser = res.locals.simpleUser
        let fUser = res.locals.foundUser

        fUser.email = sUser.email;
        fUser.password = sUser.password;

        fUser.name = sUser.name;
        fUser.familyName = sUser.familyName;
        fUser.givenName = sUser.givenName;
        fUser.gender = sUser.gender;
        fUser.birth = sUser.birth;

        res.locals.userToSave = fUser

        next();
    }
}


