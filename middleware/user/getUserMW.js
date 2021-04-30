/**
 *  It creats a simpleUser variable from the html form
 */
const invalidPassword = require('../invalidPassword')
const requireOption = require('../requireOption')

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel')

    return function(req, res, next) {
        if(typeof req.body.email === 'undefined'
            || invalidPassword(req, res)
            || typeof req.body.familyName === 'undefined'
            || typeof req.body.givenName === 'undefined') {
            console.log('auth - register: UNDEFINED MANDATORY INPUT')

            res.locals.error = res.locals.error ? res.locals.error : 'Missing registration information!'
            return next()
        }

        res.locals.simpleUser = new UserModel({
            password: req.body.password,
            email: req.body.email,
            emailVerified: false,
            name: req.body.givenName + ' ' + req.body.familyName,
            gender: req.body.gender,
            familyName: req.body.familyName,
            givenName: req.body.givenName,
            birth: req.body.birth
        })

        next();
    }
}


