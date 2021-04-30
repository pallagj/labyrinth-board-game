/**
 * This will save the new or edited team in the db
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, "UserModel");
    const TeamModel = requireOption(objectrepository, "TeamModel");

    return function (req, res, next) {
        if(
            typeof req.body.name === 'undefined' ||
            typeof req.body.description === 'undefined' ||

            typeof req.body.yellowEmail === 'undefined' ||
            typeof req.body.redEmail === 'undefined' ||
            typeof req.body.blueEmail === 'undefined' ||
            typeof req.body.greenEmail === 'undefined'
        ){
            return next();
        }

        let players = [
            {email: req.body.yellowEmail, color: 'yellow'},
            {email: req.body.redEmail, color: 'red'},
            {email: req.body.blueEmail, color: 'blue'},
            {email: req.body.greenEmail, color: 'green'}
        ].filter(player => player.email !== '')

        if(players.length < 2){
            res.locals.error = 'You need a minimum of 2 players!'
            return next()
        }

        if(players.filter(player => player.email === res.locals.user.email).length === 0){
            res.locals.error = `You should be the part of the team (${res.locals.user.email})!`
            return next()
        }

        UserModel.find({email: { $in: players.map(player => player.email)} }, (err, users) => {
            if(users.length !== players.length){
                res.locals.error = 'Some of the email address are wrong!'
                return next()
            }

            let team

            if(typeof res.locals.team === 'undefined'){
                team = new TeamModel()
            } else {
                team = res.locals.team
            }

            team["name"] = req.body.name
            team["description"] = req.body.description
            team["players"] = []

            for(let i=0; i<players.length; i++){
                let player = players[i]
                let user = users.find(user => user.email === player.email)

                team["players"][i] = {}

                team["players"][i]["userId"] = user._id
                team["players"][i]["color"] = player.color
            }

            console.log(team['players'])

            team.save()

            res.redirect('/gameteams')

        })
    };
};
