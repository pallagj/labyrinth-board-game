/**
 */
const requireOption = require("../requireOption");

function fromAll(i, j){
    let index = i*7 + j
    return Math.floor(index / 14) * 10 + (index % 14 < 7 ? Math.floor(index%14/2) : index%14 - 4)
}

function toAll(i){
    return Math.floor(i / 10) * 14 + (i < 3 ? i*2 + 1 : i + 4)
}

function copy(a, b){
    a.orientation = b.orientation
    a.cardId = b.cardId
}

let mod = (x) => (x + 7) % 7

function push(table, newCard, i, j, di, dj){
    let first = {}, out = {}
    copy(first, table[fromAll(i, j)])


    let I, J
    for(let index = 0; index < 6; index++){
        I = mod(i + di)
        J = mod(j + dj)

        if(index === 0){
            copy(table[fromAll(i, j)], newCard)
            copy(out, table[fromAll(I, J)])
        } else {
            copy(table[fromAll(i, j)], table[fromAll(I, J)])
        }

        i = I
        j = J
    }

    copy(table[fromAll(i, j)], first)

    return out
}

module.exports = function (objectrepository) {
    const TeamModel = requireOption(objectrepository, "TeamModel");
    const GameModel = requireOption(objectrepository, "GameModel");

    return function (req, res, next) {
        if(!res.locals.game.needPush || req.params.startcell === res.locals.game.disabledPush){
            return res.redirect('/game/' + req.params.teamid)
        }

        let startcell = req.params.startcell

        let startI = Math.floor(startcell / 7)
        let startJ = startcell % 7

        let dir = req.params.dir;
        let dI = (dir-1)%2
        let dJ = -(dir-2)%2

        copy(res.locals.game.plusCard, push(
            res.locals.game.table,
            res.locals.game.plusCard,
            startI,
            startJ,
            dI,
            dJ
        ))

        let players = res.locals.game.players
        players.forEach(player => {
            let posI = Math.floor(player.position / 7)
            let posJ = player.position % 7
            /**
             * dJ*startI + dJ*dI*x = posI*dJ
             * dI*startJ + dJ*dI*x = posJ*dI
             */
            if(dJ*startI - dI*startJ === posI*dJ - posJ*dI){
                posI = mod(posI + -dI)
                posJ = mod(posJ + -dJ)
            }

            player.position = posI * 7 + posJ
        })

        if(startI === 0 || startI === 6) startI = 6 - startI
        if(startJ === 0 || startJ === 6) startJ = 6 - startJ

        res.locals.game.disabledPush = startI*7 + startJ
        res.locals.game.needPush = false

        res.locals.game.save(err=>{
            if(err)
                return next(err)

            return next();
        })
    };
};
