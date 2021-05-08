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

module.exports = function (objectrepository) {
    const TeamModel = requireOption(objectrepository, "TeamModel");
    const GameModel = requireOption(objectrepository, "GameModel");

    return function (req, res, next) {
        res.locals.map = req.app.get('map')
        res.locals.cards = req.app.get('cards')
        res.locals.cardtypes = req.app.get('cardtypes')


        if( typeof res.locals.team.gameId === 'undefined' || res.locals.team.gameId === null){
            let playerColors = res.locals.team.players.map( p=> p.color)

            let game = new GameModel()
            game.turn = playerColors[0]

            let cards = Array.from({length:34}, (v, i) => i);
            shuffleArray(cards)

            game.table = cards.map(c => {return {cardId: c, orientation: Math.floor(Math.random()*4)}})
            game.plusCard = game.table.pop()

            for(let i=0; i<playerColors.length; i++){
                let color = playerColors[i]

                let colorToPosition = (color) => {
                    switch (color) {
                        case 'yellow': return 0
                        case 'red': return 6
                        case 'green': return 42
                        case 'blue': return 48
                    }
                }

                game.players.push({
                    color: color,
                    position: colorToPosition(color),
                    ranking: -1,
                    targets: [0]
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
