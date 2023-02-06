const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const checkboardDao = require("./checkboardDao");

exports.retrieveCheckboard = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const checkboardResult = await checkboardDao.selectCheckboardTodo(connection, userId);
  
    connection.release();
  
    return checkboardResult;
  };