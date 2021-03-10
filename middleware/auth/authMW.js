/**
 * If the user is authenticated, save user to locals.user and call next, otherwise redirect to /
 */
const requireOption = require('../requireOption')

module.exports = function(objectrepository, nextIf) {
    const UserModel = requireOption(objectrepository, 'UserModel')

    return function(req, res, next) {
        console.log('auth - check - NEXT (' + nextIf + ')')

        if (typeof req.session.userId === 'undefined') {
            console.log('auth - check:  NOT LOGGED IN')
            return nextIf === 'loggedIn' ? res.redirect('/') :  next()
        }

        UserModel.findOne({_id: req.session.userId}, (err, user) => {
            if(user){
                console.log('auth - check: LOGGED IN')
                res.locals.user = user;
                return nextIf === 'loggedIn' ? next() : res.redirect('/')
            }

            console.log('auth - check: NOT FOUND ID ('+req.session.userId+')')
            return nextIf === 'loggedIn' ? res.redirect('/') :  next()
        })
    }
}
