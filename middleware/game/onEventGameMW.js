/**
 */
const requireOption = require("../requireOption");

module.exports = function (activeTeam) {

    return function (req, res, next) {

        let teamId = req.params.teamid.toString()

        if(typeof activeTeam[teamId] !== 'undefined'){
            Object.values(activeTeam[teamId]).forEach(response => {
                response.write(`data: 0\n\n`)
            })
        }

        return next();
    };
};
