/**
 * If the user is authenticated, call next, otherwise redirect to /
 */
const requireOption = require('../requireOption')

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof req.session.login === 'undefined' || req.session.login !== true) {
            console.log('auth - check: FAIL')
            return res.redirect('/')
        }

        console.log('auth - check: OK')

        next()
    }
}
