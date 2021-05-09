/**
 */
function mod (x) {
    return (x + 4) % 4
}

function rotate(a, i){
    let out = []


    for(let j=0; j<4; j++)
        out[mod(i+j)] = a[j]

    return out
}


function stepPossibleFind(map, dir, fromI, fromJ, toI, toJ, deep) {
    let outRange = (i, j) => i<0 || 6<i || j<0 || 6<j

    if(outRange(fromI, fromJ) || outRange(toI, toJ) || map[fromI][fromJ] === null)
        return false

    let actual = map[fromI][fromJ]

    if(dir !== -1 && actual[dir] !== 1)
        return false

    if(fromI === toI && fromJ === toJ){
        return true
    }

    map[fromI][fromJ] = null

    for(let i=0; i<4; i++){
        if(actual[i] === 1){
            if(stepPossibleFind(map, mod(i+2),fromI + (i-1)%2, fromJ - (i-2) % 2, toI, toJ, deep+1)){

                return true
            }

        }
    }

    return false
}

function stepPossible(map, cardtypes, from, to) {
    map = JSON.parse(JSON.stringify(map));

    let fromI = Math.floor(from / 7)
    let fromJ = from % 7

    let toI = Math.floor(to / 7)
    let toJ = to % 7

    for(let i=0; i<7; i++){
        for(let j=0; j<7; j++){
            map[i][j] = rotate(
                cardtypes[map[i][j].type],
                map[i][j].orientation)
        }
    }

    return stepPossibleFind(map, -1, fromI, fromJ, toI, toJ, 0)
}

module.exports = stepPossible
