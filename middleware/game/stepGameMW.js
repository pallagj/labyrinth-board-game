/**
 */
const requireOption = require("../requireOption");
const stepPossible = require('../stepPossible')


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
                if(!stepPossible(res.locals.fullMap, res.locals.cardtypes, players[i].position, req.params.cellid))
                    return res.redirect('/game/'+req.params.teamid)

                players[i].position = req.params.cellid

                let I = Math.floor(players[i].position / 7)
                let J = players[i].position % 7

                if(players[i].targets[0] === res.locals.fullMap[I][J].cardId){
                    console.log('Sikeer')
                    players[i].targets.splice(0, 1)
                }

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
