//Auth
const authMW = require('../middleware/auth/authMW')
const forgotPasswordMW = require('../middleware/auth/forgotPasswordMW')
const googleLoginMW = require('../middleware/auth/googleLoginMW')
const googleValidateMW = require('../middleware/auth/googleValidateMW')
const logoutMW = require('../middleware/auth/logOutMW')
const simpleLoginMW = require('../middleware/auth/simpleLoginMW')


//Team
const delTeamMW = require('../middleware/team/delTeamMW')
const getTeamMW = require('../middleware/team/getTeamMW')
const getTeamsMW = require('../middleware/team/getTeamsMW')
const saveTeamMW = require('../middleware/team/saveTeamMW')

//User
const editUserMW = require('../middleware/user/editUserMW')
const findUserMW = require('../middleware/user/findUserMW')
const getUserMW = require('../middleware/user/getUserMW')
const registerMW = require('../middleware/user/registerMW')
const saveUserMW = require('../middleware/user/saveUserMW')
const delUserMW = require('../middleware/user/delUserMW')
const uploadProfileImageMW = require('../middleware/user/uploadProfileImageMW')

//Game
const initGameMW = require('../middleware/game/initGameMW')
const rotateGameMW = require('../middleware/game/rotateGameMW')
const pushGameMW = require('../middleware/game/pushGameMW')
const stepGameMW = require('../middleware/game/stepGameMW')
const correctNextUserMW = require('../middleware/game/correctNextUserMW')
const eventGameMW = require('../middleware/game/eventGameMW')
const onEventGameMW = require('../middleware/game/onEventGameMW')
const createActualMapMW = require('../middleware/game/createActualMapMW')

const renderMW = require('../middleware/renderMW')

const UserModel = require('../models/user')
const TeamModel = require('../models/team')
const GameModel = require('../models/game')

module.exports = function(app) {
    const objRepo = {
        UserModel: UserModel,
        TeamModel: TeamModel,
        GameModel: GameModel
    }

    activeTeams = {}
    app.get('/game/:teamid/event',
        authMW(objRepo, 'loggedIn'),
        getTeamMW(objRepo),
        eventGameMW(activeTeams))


    app.use('/team/new',
        authMW(objRepo, 'loggedIn'),
        saveTeamMW(objRepo),
        renderMW(objRepo, 'teameditnew'))

    app.post('/team/edit/:teamid',
        authMW(objRepo, 'loggedIn'),
        getTeamMW(objRepo),
        saveTeamMW(objRepo),
        renderMW(objRepo, 'teameditnew'))

    app.get('/team/edit/:teamid',
        authMW(objRepo, 'loggedIn'),
        getTeamMW(objRepo),
        renderMW(objRepo, 'teameditnew'))

    app.use('/team/del/:teamid',
        authMW(objRepo, 'loggedIn'),
        getTeamMW(objRepo),
        delTeamMW(objRepo),
        renderMW(objRepo, 'teamedit'))


    app.post('/upload/profilepicture',
        authMW(objRepo, 'loggedIn'),
        uploadProfileImageMW(objRepo, app.get('rootDir')),
        renderMW(objRepo, 'profilesettings'));

    app.use('/game/:teamid/rotate',
        authMW(objRepo, 'loggedIn'),
        getTeamMW(objRepo),
        initGameMW(objRepo),
        correctNextUserMW(objRepo),
        rotateGameMW(objRepo),
        onEventGameMW(activeTeams),
        createActualMapMW(objRepo),
        renderMW(objRepo, 'game'))

    app.use('/game/:teamid/step/:cellid',
        authMW(objRepo, 'loggedIn'),
        getTeamMW(objRepo),
        initGameMW(objRepo),
        correctNextUserMW(objRepo),
        createActualMapMW(objRepo),
        stepGameMW(objRepo),
        onEventGameMW(activeTeams),
        renderMW(objRepo, 'game'))

    app.use('/game/:teamid/push/:startcell;:dir',
        authMW(objRepo, 'loggedIn'),
        getTeamMW(objRepo),
        initGameMW(objRepo),
        correctNextUserMW(objRepo),
        pushGameMW(objRepo),
        onEventGameMW(activeTeams),
        createActualMapMW(objRepo),
        renderMW(objRepo, 'game'))

    app.use('/game/:teamid',
        authMW(objRepo, 'loggedIn'),
        getTeamMW(objRepo),
        initGameMW(objRepo),
        createActualMapMW(objRepo),
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
        saveUserMW(objRepo),
        renderMW(objRepo, 'profilesettings'))

    app.use('/friends',
        authMW(objRepo, 'loggedIn'),
        renderMW(objRepo, 'friends'))

    //Authentication [auth]
    app.use('/deleteuser',
        authMW(objRepo, 'loggedIn'),
        delUserMW(objRepo),
        logoutMW(objRepo),
        renderMW(objRepo, 'index'))

    app.use('/logout',
        authMW(objRepo, 'loggedIn'),
        logoutMW(objRepo),
        renderMW(objRepo, 'index'))

    app.post('/forgotpassword',
        authMW(objRepo, 'loggedOut'),
        findUserMW(objRepo),
        forgotPasswordMW(objRepo),
        renderMW(objRepo, 'forgotPassword'))

    app.get('/forgotpassword',
        authMW(objRepo, 'loggedOut'),
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
        renderMW(objRepo, 'index'))

    app.post('/',
        authMW(objRepo, 'loggedOut'),
        findUserMW(objRepo),
        simpleLoginMW(objRepo),
        saveUserMW(objRepo),
        renderMW(objRepo, 'index'))

    app.get('/',
        authMW(objRepo, 'loggedOut'),
        renderMW(objRepo, 'index'))

    app.get(/.*/,
        renderMW(objRepo, 'notfound'))

}
