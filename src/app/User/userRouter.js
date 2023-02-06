module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
 
    app.get('/user/:userId', user.getProfile);
    app.patch('/user/:userId/nickname', user.modifyNickname);
    app.patch('/user/:userId/secession', user.deleteAccount);
    app.patch('/user/:userId/acceptance', user.modifyAcceptanceStatus);

    app.get('/app/auto-login', jwtMiddleware, user.check);
}