//Auth
const authMW = require('../middleware/auth/authMW')
const forgotPasswordMW = require('../middleware/auth/forgotPasswordMW')
const googleLoginMW = require('../middleware/auth/googleLoginMW')
const googleValidateMW = require('../middleware/auth/googleValidateMW')
const logoutMW = require('../middleware/auth/logOutMW')
const simpleLoginMW = require('../middleware/auth/simpleLoginMW')

//Friend
const delFriendMW = require('../middleware/friend/delFriendMW')
const getFriendMW = require('../middleware/friend/getFriendMW')
const getFriendsMW = require('../middleware/friend/getFriendsMW')
const saveFriendMW = require('../middleware/friend/saveFriendMW')


//Team
const delTeamMW = require('../middleware/Team/delTeamMW')
const getTeamMW = require('../middleware/Team/getTeamMW')
const getTeamsMW = require('../middleware/Team/getTeamsMW')
const saveTeamMW = require('../middleware/Team/saveTeamMW')

//User
const editUserMW = require('../middleware/user/editUserMW')
const findUserMW = require('../middleware/user/findUserMW')
const getUserMW = require('../middleware/user/getUserMW')
const registerMW = require('../middleware/user/registerMW')
const saveUserMW = require('../middleware/user/saveUserMW')
const uploadProfileImageMW = require('../middleware/user/uploadProfileImageMW')

const renderMW = require('../middleware/renderMW')

const UserModel = require('../models/user')

module.exports = function(app) {
    const objRepo = {
        UserModel: UserModel
    }

    app.use('/team/new',
        authMW(objRepo, 'loggedIn'),
        saveTeamMW(objRepo),
        renderMW(objRepo, 'teamedit'))

    app.use('/team/edit/:teamid',
        authMW(objRepo, 'loggedIn'),
        getTeamMW(objRepo),
        saveTeamMW(objRepo),
        renderMW(objRepo, 'teamedit'))
    app.use('/team/del/:teamid',
        getTeamMW(objRepo),
        delTeamMW(objRepo),
        renderMW(objRepo, 'teamedit'))

    app.use('/friend/new',
        authMW(objRepo, 'loggedIn'),
        saveFriendMW(objRepo),
        renderMW(objRepo, 'friendedit'))

    app.use('/friend/edit/:friendid',
        authMW(objRepo, 'loggedIn'),
        getFriendMW(objRepo),
        saveFriendMW(objRepo),
        renderMW(objRepo, 'friendedit'))
    app.use('/friend/del/:friendid',
        getFriendMW(objRepo),
        delFriendMW(objRepo),
        renderMW(objRepo, 'friendedit'))


    app.post('/upload/profilepicture',
        authMW(objRepo, 'loggedIn'),
        uploadProfileImageMW(objRepo, app.get('rootDir')),
        renderMW(objRepo, 'profilesettings'));

    app.use('/friend',
        authMW(objRepo, 'loggedIn'),
        getFriendsMW(objRepo),
        renderMW(objRepo, 'friend'))

    app.use('/game',
        authMW(objRepo, 'loggedIn'),
        renderMW(objRepo, 'game'))

    app.use('/gameteams',
        authMW(objRepo, 'loggedIn'),
        getTeamsMW(objRepo),
        renderMW(objRepo, 'gameteams'))

    app.use('/home',
        authMW(objRepo, 'loggedIn'),
        renderMW(objRepo, 'home'))

    app.get('/profilesettings',
        authMW(objRepo, 'loggedIn'),
        renderMW(objRepo, 'profilesettings'))

    app.post('/profilesettings',
        authMW(objRepo, 'loggedIn'),
        getUserMW(objRepo),
        findUserMW(objRepo),
        editUserMW(objRepo),
        renderMW(objRepo, 'profilesettings'))

    //Authentication [auth]
    app.use('/logout',
        authMW(objRepo, 'loggedIn'),
        logoutMW(objRepo),
        renderMW(objRepo, 'index'))

    app.use('/forgotpassword',
        authMW(objRepo, 'loggedOut'),
        findUserMW(objRepo),
        forgotPasswordMW(objRepo),
        renderMW(objRepo, 'forgotPassword'))

    app.post('/register',
        authMW(objRepo, 'loggedOut'),
        getUserMW(objRepo),
        findUserMW(objRepo),
        registerMW(objRepo),
        saveUserMW(objRepo),
        renderMW(objRepo, 'register'))

    app.get('/register',
        authMW(objRepo, 'loggedOut'),
        renderMW(objRepo, 'register'))

    app.use('/googlelogin',
        authMW(objRepo, 'loggedOut'),
        googleValidateMW(objRepo),
        findUserMW(objRepo),
        googleLoginMW(objRepo),
        saveUserMW(objRepo),
        renderMW(objRepo, 'home'))

    app.post('/',
        authMW(objRepo, 'loggedOut'),
        findUserMW(objRepo),
        simpleLoginMW(objRepo),
        saveUserMW(objRepo),
        renderMW(objRepo, 'index'))

    app.get('/',
        authMW(objRepo, 'loggedOut'),
        renderMW(objRepo, 'index'))
}
