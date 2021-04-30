/**
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
