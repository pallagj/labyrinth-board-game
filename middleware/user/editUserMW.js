/**
 */

const requireOption = require('../requireOption')
const invalidPassword = require('../invalidPassword')

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel')

    return function(req, res, next) {
        console.log('auth - edituser: TRY edituser (' + req.body.email + ', ' + req.body.password + ')')

        if(typeof req.body.email === 'undefined'
            || invalidPassword(req, res)
            || typeof req.body.familyName === 'undefined'
            || typeof req.body.givenName === 'undefined'
        ) {
            console.log('auth - edituser: UNDEFINED MANDATORY INPUT')

            res.locals.error = res.locals.error ? res.locals.error : 'Missing registration information!'
            return next()
        }

        UserModel.findOne({email: req.session.user.email}, (err, user) => {

            user.password = req.body.password
            user.email = req.body.email
            user.name = req.body.givenName + ' ' + req.body.familyName
            user.gender = req.body.gender
            user.familyName = req.body.familyName
            user.givenName = req.body.givenName
            user.birth = req.body.birth

            user.save(err => {
                if(err) return next(err)

                //Successful
                req.session.login = true
                req.session.user = user
                return req.session.save(err => res.redirect('/home'))
            })
        })

    }
}


