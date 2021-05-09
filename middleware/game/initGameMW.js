/**
 */
const requireOption = require("../requireOption");

const {Types} = require("mongoose");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

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

module.exports = function (objectrepository) {
    const TeamModel = requireOption(objectrepository, "TeamModel");
    const GameModel = requireOption(objectrepository, "GameModel");

    return function (req, res, next) {
        res.locals.map = req.app.get('map')
        res.locals.cards = req.app.get('cards')
        res.locals.cardtypes = req.app.get('cardtypes')

        let cardsMap = {}
        for(let cardId=0; cardId<34; cardId++){
            cardsMap[cardId] = getCard(cardId, res.locals.cards)
        }
        res.locals.cardsMap = cardsMap


        if( typeof res.locals.team.gameId === 'undefined' || res.locals.team.gameId === null){
            let playerColors = res.locals.team.players.map( p=> p.color)

            let game = new GameModel()
            game.turn = playerColors[0]

            let cards = Array.from({length:34}, (v, i) => i);
            shuffleArray(cards)

            game.table = cards.map(c => {return {cardId: c, orientation: Math.floor(Math.random()*4)}})

            game.plusCard = game.table.pop()

            let targets = []
            for(let j=0; j < 34; j++){
                if(cardsMap[j].target === true){
                    targets.push(j)
                }
            }

            let fixTargets = []
            for(let i=0; i<16; i++){
                if(i !== 0 && i !== 3 && i !== 12 && i!==15){
                    fixTargets.push(i+34);
                }
            }

            targets = [...targets, ...fixTargets]

            shuffleArray(targets)

            console.log('targets: ' + targets)

            for(let i=0; i<playerColors.length; i++){
                let color = playerColors[i]

                let colorToPosition = (color) => {
                    switch (color) {
                        case 'yellow': return 0 //0
                        case 'red': return 6  //3
                        case 'green': return 42 //21
                        case 'blue': return 48 //24
                    }
                }

                let colorToTarget = (color) => {
                    switch (color) {
                        case 'yellow': return 34
                        case 'red': return 37
                        case 'green': return 46
                        case 'blue': return 49
                    }
                }


                let cardPerPlayer = Math.floor(targets.length/playerColors.length)

                let playerTargets = targets.slice(cardPerPlayer*i, cardPerPlayer*(i+1))
                playerTargets.push(colorToTarget(color))

                game.players.push({
                    color: color,
                    position: colorToPosition(color),
                    ranking: -1,
                    targets: playerTargets
                })
            }
            game.save(err=>{
                if(err)
                    return next(err)

                res.locals.game = game
                res.locals.team.gameId = res.locals.game._id
                res.locals.team.save()

                return next();
            })

        } else {
            GameModel.findOne({_id: res.locals.team.gameId}, (err, game) =>{
                if(err)
                    return next(err)

                res.locals.game = game
                return next();
            })
        }
    };
};
