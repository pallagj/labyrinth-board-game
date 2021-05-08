/**
 */
const requireOption = require("../requireOption");


module.exports = function (objectrepository) {
    return function (req, res, next) {
        if(!res.locals.game.needPush){
            return res.redirect('/game/'+req.params.teamid)
        }

        let game = res.locals.game
        game.plusCard.orientation = (game.plusCard.orientation + 1) % 4
        game.save(err=>{
            if(err)
                return next(err)

            return next();
        })
    };
};
