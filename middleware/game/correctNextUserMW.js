/**
 */
const requireOption = require("../requireOption");
const {Types} = require("mongoose");

module.exports = function (objectrepository) {
    const TeamModel = requireOption(objectrepository, "TeamModel");
    const GameModel = requireOption(objectrepository, "GameModel");

    return function (req, res, next) {
        // console.log(`res.locals.user._id=${res.locals.user._id}`)

        let player = res.locals.team.players.find(player => player.userId.toString() === res.locals.user._id.toString())
        res.locals.player = player
        if(player !== undefined && player.color === res.locals.game.turn){
            // console.log(`game - next: ${player.color} IS YOU`)
            return next();
        }

        // console.log(`game - next: ${player.color} IS NOT YOU`)
        return res.redirect('/game/'+req.params.teamid)
    };
};
