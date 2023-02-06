module.exports = function(app){
    const checkboard = require('./mateController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
 
    app.get('/mate/:userId', checkboard.getMate);
    app.get('/mate/:userId/list', checkboard.getMateList);
    app.get('/mate/:userId/search', checkboard.searchMate);
    app.patch('/mate/:userId/add', checkboard.addMate);
    app.patch('/mate/:userId/delete', checkboard.deleteMate);

}