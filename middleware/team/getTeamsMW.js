/**
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const TeamModel = requireOption(objectrepository, "TeamModel");

    return function (req, res, next) {
        TeamModel.aggregate([
                {
                    $match: {
                        "players.userId": res.locals.user._id
                    }
                },

                {
                    $lookup: {
                        from: 'users',
                        localField: 'players.userId',
                        foreignField: '_id',
                        as: 'playersData'
                    }
                }
            ],

            (err, result) => {
                res.locals.teams = result
                next()
        })
    };
};
