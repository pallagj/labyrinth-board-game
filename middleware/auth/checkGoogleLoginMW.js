/**
 */
const requireOption = require('../requireOption')

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel')

    return function(req, res, next) {
        const clientID = "227633389701-sqfeeh0d7ufqn2ilbe7tqhskmrpjiear.apps.googleusercontent.com"
        const idToken = req.body.idtoken

        //From Google:
        const {OAuth2Client} = require('google-auth-library')
        const client = new OAuth2Client(clientID)

        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: idToken,
                audience: clientID,
            })

            const payload = ticket.getPayload()

            console.log('auth - googleLogin: LOGGED IN (' + payload['email'] + ')')

            UserModel.findOne(
                { userId: payload['sub'] },
                function(err, user) {
                    if(err){
                        return next()
                    }

                    if (user) {
                        console.log('auth - googleLogin: USER IS ALREADY EXISTS')
                    } else {
                        console.log('auth - googleLogin: USER IS NOT EXISTS')
                        console.log('auth - googleLogin: CREATE NEW USER')

                        user = new UserModel()

                        user.loginType = "Google"
                        user.userId = payload['sub']
                        user.email= payload['email']
                        user.emailVerified= payload['email_verified']
                        user.name= payload['name']
                        user.pictureUrl=payload['picture']
                        user.locale=payload['locale']
                        user.familyName=payload['family_name']
                        user.givenName=payload['given_name']

                        user.save(err => {
                            console.log("User saved")
                        })
                    }

                    req.session.login = true
                    req.session.user = user
                    return req.session.save(err => res.redirect('/home'))
                })
        }

        verify().catch(console.error)
    }
}
