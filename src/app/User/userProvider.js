const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

exports.retrieveUser = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userResult = await userDao.selectUserId(connection, userId);
  
    connection.release();
  
    return userResult[0];
  };