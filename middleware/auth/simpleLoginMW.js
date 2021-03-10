/**
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, "UserModel");

    return function (req, res, next) {
        if (typeof res.foundUser !== "undefined" ||
            res.foundUser.password !== req.body.password) {

            console.log("auth - simpleLogin: NOT EXISTING USER");
            res.locals.error = "Login was not successful";

            return next();
        } else {
            console.log("auth - simpleLogin: LOGGED IN");

            return res.redirect("/home");
        }
    };
};
