//Auth
const authMW = require('../middleware/auth/authMW')
const checkGoogleLoginMW = require('../middleware/auth/googleLogin')
const checkSimpleLoginMW = require('../middleware/auth/simpleLoginMW')
const logoutMW = require('../middleware/auth/logOutMW')
const registerMW = require('../middleware/auth/registerMW')
const forgotPasswordMW = require('../middleware/auth/forgotPasswordMW')
const editUserMW = require('../middleware/user/editUserMW')
const uploadProfileImageMW = require('../middleware/user/uploadProfileImageMW')

const renderMW = require('../middleware/renderMW')

const UserModel = require('../models/user')

module.exports = function(app) {
    const objRepo = {
        UserModel: UserModel
    }

    app.post('/upload/profilepicture',  authMW(objRepo), uploadProfileImageMW(objRepo, app.get('rootDir')), renderMW(objRepo, 'profilesettings'));

    //User main pages [main]
    app.use('/friends', authMW(objRepo, 'loggedIn'), renderMW(objRepo, 'friends'))
    app.use('/game', authMW(objRepo), renderMW(objRepo, 'game'))
    app.use('/gameteams', authMW(objRepo), renderMW(objRepo, 'gameteams'))
    app.use('/home', authMW(objRepo), renderMW(objRepo, 'home'))

    app.get('/profilesettings', authMW(objRepo), renderMW(objRepo, 'profilesettings'))
    app.post('/profilesettings', authMW(objRepo), editUserMW(objRepo), renderMW(objRepo, 'profilesettings'))

    //Authentication [auth]
    app.use('/logout', logoutMW(objRepo), renderMW(objRepo, 'index'))

    app.use('/forgotpassword', forgotPasswordMW(objRepo), renderMW(objRepo, 'forgotPassword'))

    app.post('/register', registerMW(objRepo), renderMW(objRepo, 'register'))
    app.get('/register', renderMW(objRepo, 'register'))

    app.use('/googlelogin', checkGoogleLoginMW(objRepo), renderMW(objRepo, 'home'))
    app.use('/', checkSimpleLoginMW(objRepo), renderMW(objRepo, 'index'))
}
