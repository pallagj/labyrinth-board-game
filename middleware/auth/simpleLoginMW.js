/**
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, "UserModel");

    return function (req, res, next) {
        if (typeof res.locals.foundUser === "undefined" ||
            res.locals.foundUser.password !== req.body.password) {

            console.log("auth - simpleLogin: NOT EXISTING USER");
            res.locals.error = "Login was not successful";

            return next();
        } else {
            console.log("auth - simpleLogin: LOGGED IN");
            res.locals.userToSave = res.locals.foundUser;

            return next();
        }
    };
};
