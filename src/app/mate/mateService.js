const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const mateProvider = require("./mateProvider");
const mateDao = require("./mateDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

//const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

exports.createMate = async function (userId, friendCode) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const searchUserResult = await mateDao.userSearch(connection, friendCode);
        const friendTableSearchResult = await mateDao.friendTableSearch(connection, userId, friendCode);
        if (searchUserResult[0])
            if(!friendTableSearchResult[0])
                await mateDao.createFriend(connection, userId, friendCode);
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}


exports.addFriend = async function (userId, friendId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const addFriendResult = await mateDao.updateFriendRelationship_1(connection, userId, friendId)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}


exports.deleteFriend = async function (userId, friendId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const deleteFriendResult = await mateDao.updateFriendRelationship_0(connection, userId, friendId)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}