/**
 */
const requireOption = require('../requireOption')
const sendEmail = require('../sendEmail')
const generator = require('generate-password')

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel')

    return function(req, res, next) {
        const email = req.body.email
        console.log('auth - forgot: TRY SEND EMAIL (' + email + ')')

        UserModel.findOne(
            { email: email, loginType: "Simple" },
            function(err, user) {
                if (user) {
                    let newPassword = generator.generate({
                        length: 20,
                        numbers: true
                    })

                    console.log('auth - forgot: SEND NEW PASSWORD EMAIL (' + newPassword + ')')

                    user.password = newPassword
                    user.save()

                    sendEmail(user)

                    return res.redirect('/')
                } else {
                    console.log('auth - forgot: EMAIL NOT EXISTS')

                    res.locals.error = 'Email not found :('
                    return next()
                }
            })
    }
}
