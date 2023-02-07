module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
 
    app.get('/user/:userId', jwtMiddleware, user.getProfile);
    app.patch('/user/:userId/nickname', jwtMiddleware, user.modifyNickname);
    app.patch('/user/:userId/secession', jwtMiddleware, user.deleteAccount);
    app.patch('/user/:userId/acceptance', jwtMiddleware, user.modifyAcceptanceStatus);

    app.get('/app/auto-login', jwtMiddleware, user.check);
}