/**
 * This will send the email, if the user forgot his/her password
 */
const requireOption = require('../requireOption')
const sendEmail = require('../sendEmail')
const generator = require('generate-password')

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel')

    return function(req, res, next) {

        if(typeof res.locals.foundUser === 'undefined'){
            res.locals.error = 'Not valid email'
            return next();
        }

        let foundUser = res.locals.foundUser
        console.log('auth - forgot: TRY SEND EMAIL (' + foundUser.email + ')')

        let newPassword = generator.generate({
            length: 20,
            numbers: true
        })

        foundUser.password = newPassword
        foundUser.save((err => {
            if(err)
                return next(err)

            sendEmail(foundUser)
            return res.redirect('/')
        }))

        console.log('auth - forgot: SEND NEW PASSWORD EMAIL (' + newPassword + ')')
    }
}
