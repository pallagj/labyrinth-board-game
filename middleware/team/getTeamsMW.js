/**
 * This will seach all the teams to the user
 *
 * It’s important to be in the team all team,
 * because otherwise someone else will have access to the team,
 * so I added the "players.userId": res.locals.user._id to the $match
 *
 * I also merged the user data, because I need to render the profile pictures in every team cards with number of victories
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
