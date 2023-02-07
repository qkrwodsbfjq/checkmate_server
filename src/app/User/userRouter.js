module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

 
    app.get('/user/:userId', jwtMiddleware, user.getProfile);
    app.patch('/user/:userId/nickname', jwtMiddleware, user.modifyNickname);
    app.patch('/user/:userId/secession', jwtMiddleware, user.deleteAccount);
    app.patch('/user/:userId/acceptance', jwtMiddleware, user.modifyAcceptanceStatus);


    //회원가입
    app.post('/app/users', user.postUsers);
    //로그인
    app.post('/app/login', user.login);


    app.get('/app/auto-login', jwtMiddleware, user.check);
}