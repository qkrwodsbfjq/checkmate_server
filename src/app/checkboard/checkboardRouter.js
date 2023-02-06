module.exports = function(app){
    const checkboard = require('./checkboardController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
 
    app.get('/checkboard/:userId', checkboard.getCheckboard);
}