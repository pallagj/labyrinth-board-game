/**
 */
const requireOption = require('../requireOption')

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel')

    return function(req, res, next) {
        let email = req.body.email
        let password = req.body.password

        console.log('auth - simpleLogin: TRY LOGIN (' + email + ', ' +password + ')')

       if(typeof password === 'undefined'){
           return next()
       }

       UserModel.findOne({email: email, loginType: 'Simple'},  (err, user) =>{
            if(user){
                //Valid User
                if(user.password === password){
                    console.log('auth - simpleLogin: SUCCESS LOGIN')

                    req.session.login = true
                    req.session.user = user
                    return req.session.save(err => res.redirect('/home'))
                } else {
                    console.log('auth - simpleLogin: WRONG PASSWORD (' + password + '!='+user.password + ')')

                    res.locals.error = 'Wrong password!'
                    return next()
                }
            } else {
                console.log('auth - simpleLogin: NOT EXISTING USER')

                res.locals.error = 'Not existing user!'
                return next()
            }

       })

        //res.locals.error = 'Rossz jelszó!'
        //return next()
    }
}
