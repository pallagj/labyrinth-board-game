/**
 */
const requireOption = require("../requireOption");


module.exports = function (objectrepository) {
    return function (req, res, next) {
        if(res.locals.game.needPush){
            return res.redirect('/game/'+req.params.teamid)
        }

        let players = res.locals.game.players;
        let player = res.locals.player;

        //Next turn
        res.locals.game.needPush = true

        for(let i=0; i<players.length; i++){
            if(players[i].color === player.color){
                players[i].position = req.params.cellid
                res.locals.game.turn = players[(i + 1 + players.length) % players.length].color
                break;
            }
        }

        res.locals.game.save(err=>{
            if(err)
                return next(err)

            return next()
        })
    };
};
