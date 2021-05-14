const expect = require('chai').expect
const simpleLoginMW = require('../../../../middleware/auth/simpleLoginMW')

describe('simpleLogin middleware ', function () {

    it('Not found User', function (done) {

        let mw = simpleLoginMW({
            UserModel: {
            }
        })

        let locals = {}

        mw(
            {},
            {
                locals: locals
            },
            () => {
                expect(locals.error).to.be.eql("Login was not successful")
                done()
            }
        )
    })

    it('Wrong User password', function (done) {

        let mw = simpleLoginMW({
            UserModel: {}
        })

        let locals = {
            foundUser: {
                password: "0123"
            }
        }

        mw(
            {
                body: {
                    password: "admin"
                }
            },
            {
                locals: locals
            },
            () => {
                expect(locals.error).to.be.eql("Login was not successful")
                done()
            }
        )
    })


    it('Correct password', function (done) {

        let mw = simpleLoginMW({
            UserModel: {}
        })

        let locals = {
            foundUser: {
                password: "0123"
            }
        }

        mw(
            {
                body: {
                    password: "0123"
                }
            },
            {
                locals: locals
            },
            () => {
                expect(locals.userToSave).to.be.eql(locals.foundUser)
                done()
            }
        )
    })

})
