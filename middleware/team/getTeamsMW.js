/**
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, "UserModel");

    return function (req, res, next) {
        next();
    };
};
