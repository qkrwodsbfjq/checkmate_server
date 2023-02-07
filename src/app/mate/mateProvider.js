const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./mateDao");

exports.retrieveMate = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const mateResult = await userDao.selectMate(connection, userId);
  
    connection.release();
  
    return mateResult;
  };

  
exports.retrieveMateList = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const mateListResult = await userDao.selectMateList(connection, userId);
  
    connection.release();
  
    return mateListResult;
  };

  
  exports.retrieveSearchMate = async function (userId, friendCode) {
      const connection = await pool.getConnection(async (conn) => conn);
      
      const mateSearchResult = await userDao.selectMateSearch(connection, userId, friendCode);
    
      connection.release();
    
      return mateSearchResult;
    };