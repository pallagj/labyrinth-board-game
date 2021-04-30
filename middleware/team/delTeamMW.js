/**
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, "UserModel");

    return function (req, res, next) {
        if(res.locals.team === 'undefined'){
            return next()
        }

        res.locals.team.remove(err => {
            if(err)
                next(err)

            return res.redirect('/gameteams')
        })
    };
};
