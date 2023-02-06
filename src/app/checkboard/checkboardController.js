const jwtMiddleware = require("../../../config/jwtMiddleware");
const checkboardProvider = require("./checkboardProvider");
const checkboardService = require("./checkboardService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");


/**
 * API No. 1
 * API Name : checkboard 정보 조회 API
 * [GET] /checkboard/{userId}
 */
exports.getCheckboard = async function (req, res) {
    //const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;

    /*
    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

        const editUserInfo = await userService.editUser(userId, nickname)
        return res.send(editUserInfo);
    }
    */

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const checkboardByUserId = await checkboardProvider.retrieveCheckboard(userId);
    return res.send(response(baseResponse.SUCCESS, checkboardByUserId));
}