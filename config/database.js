const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host:'checkmate.czl6nehetqur.ap-northeast-2.rds.amazonaws.com',
    user:'qkrwodbsfjq',
    port: '3306',
    password:'34646464',
    database:'checkmate',
});

module.exports = {
    pool: pool
};