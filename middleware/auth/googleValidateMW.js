/**
 * Verifies the google login
 */
const requireOption = require('../requireOption')

const clientID = "227633389701-sqfeeh0d7ufqn2ilbe7tqhskmrpjiear.apps.googleusercontent.com"

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel')

    return function(req, res, next) {
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

            res.locals.googleUser = new UserModel({
                userId: payload['sub'],
                email: payload['email'],
                emailVerified: payload['email_verified'],
                name: payload['name'],
                pictureUrl: payload['picture'],
                locale: payload['locale'],
                familyName: payload['family_name'],
                givenName: payload['given_name']
            })

            next();
        }

        verify().catch((reason => {
            console.log('auth - googleLogin: LOG IN ERROR (' + reason+ ')')

            res.locals.error = reason
            next();
        }))
    }
}
