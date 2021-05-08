/**
 * This will seach the team with id from the params
 *
 * It’s important to be in the team,
 * because otherwise someone else will have access to the team,
 * so I added the "players.userId": res.locals.user._id to the $match
 *
 * I also merged the user data, because I need the email addresses too
 */
const requireOption = require("../requireOption");

const {Types} = require("mongoose");

module.exports = function (objectrepository) {
    const TeamModel = requireOption(objectrepository, "TeamModel");

    return function (req, res, next) {
        TeamModel.aggregate([
                {
                    $match: {
                        _id: new Types.ObjectId(req.params.teamid),
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

            (err, teamData) => {
                if(err || !teamData || teamData.length === 0) {
                    return next(err);
                }

                res.locals.teamData = teamData[0]
                TeamModel.findOne({_id: new Types.ObjectId(req.params.teamid)}, (err, team) =>{
                    if(err ||  !team)
                        return next(err)

                    res.locals.team = team
                    next()
                })
            })
    };
};
