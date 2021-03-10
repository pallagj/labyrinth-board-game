/**
 */

const requireOption = require('../requireOption')
const invalidPassword = require('../invalidPassword')

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel')

    return function(req, res, next) {
        console.log('auth - register: TRY REGISTER (' + req.body.email + ', ' + req.body.password + ')')

        if(typeof req.body.email === 'undefined'
            || invalidPassword(req, res)
            || typeof req.body.familyName === 'undefined'
            || typeof req.body.givenName === 'undefined'
        ) {
            console.log('auth - register: UNDEFINED MANDATORY INPUT')

            res.locals.error = res.locals.error ? res.locals.error : 'Missing registration information!'
            return next()
        }

        UserModel.findOne({email: req.body.email}, (err, user) => {
            if(user){
                console.log('auth - register: USER IS ALREADY EXISTS')

                res.locals.error = 'User is already exists!'
                return next()
            } else {
                console.log('auth - register: USER IS NOT EXISTS')
                console.log('auth - register: CREATE NEW USER')

                let newUser = new UserModel()

                newUser.loginType = 'Simple'
                newUser.password = req.body.password
                newUser.email = req.body.email
                newUser.emailVerified = false
                newUser.name = req.body.givenName + ' ' + req.body.familyName
                newUser.gender = req.body.gender
                newUser.familyName = req.body.familyName
                newUser.givenName = req.body.givenName
                newUser.birth = req.body.birth



                newUser.save(err => {
                    if(err) return next(err)

                    //Successful
                    req.session.login = true
                    req.session.user = newUser
                    return req.session.save(err => res.redirect('/home'))
                })
            }
        })
    }
}


