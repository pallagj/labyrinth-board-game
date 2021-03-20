/**
 */
const requireOption = require('../requireOption')

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel')

    return function(req, res, next) {
        if(typeof res.locals.googleUser === 'undefined'){
            return next();
        }

        let googleUser = res.locals.googleUser;
        let foundUser  = res.locals.foundUser

        if(typeof foundUser !== 'undefined' && foundUser.userId){
            //TODO SESSION
        } else {
            //TODO
        }


        /*
        UserModel.findOne({ userId: googleUser.userId}, (err, user) => {
            if (user) {
                console.log('auth - googleLogin: USER IS ALREADY EXISTS')
            } else {
                console.log('auth - googleLogin: USER IS NOT EXISTS')
                console.log('auth - googleLogin: CREATE NEW USER')

                googleUser.save(err => {
                    console.log("User saved")
                })
            }

            req.session.login = true
            req.session.user = user
            return req.session.save(err => res.redirect('/home'))
        })*/

    }
}
