/**
 */
function getCard(index, cards) {
    let sum = 0

    for(let i=0; i<cards.length; i++){
        let card = cards[i]

        sum += card.amount

        if(index<sum){
            return card
        }
    }

    return null
}


function toIndex(i) {
    return Math.floor(i / 14) * 10 + (i % 14 < 7 ? Math.floor(i%14/2) : i%14 - 4)
}

module.exports = function (objectrepository) {
    return function (req, res, next) {
        let game = res.locals.game

        //Clone
        let fullMap = JSON.parse(JSON.stringify(res.locals.map));

        let fixCardId = 34

        for(let i=0; i<7; i++){
            for(let j=0; j<7; j++){

                if(fullMap[i][j] === null){
                    let card = game.table[toIndex(i*7+j)]

                    let cardId = card.cardId

                    let cell = res.locals.cardsMap[cardId] // getCard(cardId, res.locals.cards)
                    fullMap[i][j] = {
                        type: cell.type,
                        target: cell.target,
                        orientation: card.orientation,
                        cardId: cardId
                    }
                } else {
                    fullMap[i][j]['cardId'] = fixCardId
                    fixCardId++
                }
            }
        }

        res.locals.fullMap = fullMap

        let plusCard = res.locals.cardsMap[game.plusCard.cardId] // getCard(game.plusCard.cardId, res.locals.cards)
        plusCard['orientation'] = game.plusCard.orientation

        res.locals.plusCard = plusCard
        next()
    };
};
