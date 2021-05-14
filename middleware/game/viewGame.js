/**
 */
const requireOption = require("../requireOption");
const stepPossible = require('../stepPossible')

function createArrowCell(i, j, dist){
    if(dist % 2 === 0 && i !== j){
        let dir = (i + 1) * i + j + 1

        return {
            clickable: true,
            svg: [`arrow-${dir}`]
        }
    }

    return {
        clickable: true,
        svg: [`clear`]
    }
}

function createGameCell(i, j, dist, game){
    i -= 1
    j -= 1

    let cell = {
        clickable: true,
        svg: [`map/three-way-3.svg`]
    }

    /* player */
    let player = game.players.find(p=>p.position === i*7+j)

    if ( player !== undefined) {
        cell.types.push(player.color)
        cell.types.push(player.targets.length)
    }

}


module.exports = function (objectrepository) {
    return function (req, res, next) {
        let table = [[]]

        for(let i=0; i < 9;  i++) for(let j=0; j < 9; j++){
            let dist = Math.abs(i - 4) + Math.abs(j - 4)

            table[i][j] = dist < 4 ?
                createArrowCell(i, j, dist)
                : createGameCell(i-1, j-1, dist)
        }
    };
};
