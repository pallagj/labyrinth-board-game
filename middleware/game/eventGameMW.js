/**
 */
const requireOption = require("../requireOption");

module.exports = function (activeTeam) {

    return function (req, res) {
        console.log('Got /events');
        res.set({
            'Cache-Control': 'no-cache',
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive'
        });
        res.flushHeaders();

        // Tell the client to retry every 10 seconds if connectivity is lost
        res.write('retry: 10000\n\n');

        let teamId = req.params.teamid.toString()
        let userId = res.locals.user._id.toString()

        if(typeof activeTeam[teamId] === 'undefined'){
            activeTeam[teamId] = {}
        }

        activeTeam[teamId][userId] = res
    };
};
