module.exports = function(app){
    const checkboard = require('./mateController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
 
    app.get('/mate/:userId', jwtMiddleware, checkboard.getMate);
    app.get('/mate/:userId/list', jwtMiddleware, checkboard.getMateList);
    app.get('/mate/:userId/search', jwtMiddleware, checkboard.searchMate);
    app.patch('/mate/:userId/add', jwtMiddleware, checkboard.addMate);
    app.patch('/mate/:userId/delete', jwtMiddleware, checkboard.deleteMate);

}