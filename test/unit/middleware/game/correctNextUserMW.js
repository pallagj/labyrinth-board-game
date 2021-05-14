const expect = require('chai').expect
const correctNextUserMW = require('../../../../middleware/game/correctNextUserMW')
const {Types} = require("mongoose");

describe('correctNextUser middleware ', function () {

    it('Not found player', function (done) {
        let mw = correctNextUserMW({
            TeamModel: {},
            GameModel: {}
        })

        mw(
            {
                params:{
                    teamid: '000'
                }
            },
            {
                locals: {
                    team:{
                        players: []
                    }
                },
                redirect: (url) => {
                    expect(url).to.be.eql('/game/000')
                    done()
                }
            },
            ()=>{}
        )
    })

    it('Wrong next playerr', function(done){
        let commonId  = Types.ObjectId()

        let mw = correctNextUserMW({
            TeamModel: {},
            GameModel: {}
        })

        let locals = {
            team:{
                players: [
                    {
                        userId: Types.ObjectId(),
                        color: 'red'
                    },

                    {
                        userId: commonId,
                        color: 'green'
                    }
                ]
            },
            user:{
                _id: commonId
            },
            game:{
                turn: 'red'
            }
        }

        mw(
            {
                params:{
                    teamid: '000'
                }
            },
            {
                locals: locals,
                redirect: (url) => {
                    expect(locals.player.color).to.be.eql(locals.team.players[1].color)
                    done()
                }
            },
            ()=>{
            }
        )
    })


    it('Correct next player', function(done){
        let commonId  = Types.ObjectId()

        let mw = correctNextUserMW({
            TeamModel: {},
            GameModel: {}
        })

        let locals = {
            team:{
                players: [
                    {
                        userId: Types.ObjectId(),
                        color: 'red'
                    },

                    {
                        userId: commonId,
                        color: 'green'
                    }
                ]
            },
            user:{
                _id: commonId
            },
            game:{
                turn: 'green'
            }
        }

        mw(
            {
                params:{
                    teamid: '000'
                }
            },
            {
                locals: locals,
                redirect: (url) => {
                }
            },
            ()=>{
                expect(locals.player.color).to.be.eql(locals.team.players[1].color)
                done()
            }
        )
    })
})
