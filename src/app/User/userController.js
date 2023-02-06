const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("./userProvider");
const userService = require("./userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/**
 * API No. 1
 * API Name : 프로필 정보 조회 API
 * [GET] /user/{userId}
 */
exports.getProfile = async function (req, res) {
    const userIdFromJWT = req.verifiedToken.userId;
    const userId = req.params.userId;

    
    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    
        const userByUserId = await userProvider.retrieveUser(userId);
        return res.send(response(baseResponse.SUCCESS, userByUserId));
    }
};


/**
 * API No. 2
 * API Name : 닉네임 변경 API
 * [PATCH] /user/:userId/nickname
 */
exports.modifyNickname = async function (req, res) {
    const userIdFromJWT = req.verifiedToken.userId;

    const userId = req.params.userId;
    const nickname = req.body.nickname;

    
    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));
    
        const editUserInfo = await userService.editUser(userId, nickname);
        return res.send(editUserInfo);
    }
};


/**
 * API No. 3
 * API Name : 계정 삭제 API
 * [PATCH] /user/:userId/secession
 */
exports.deleteAccount = async function (req, res) {
    const userIdFromJWT = req.verifiedToken.userId
    
    const userId = req.params.userId;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    
        const deleteUserInfo = await userService.deleteUser(userId);
        return res.send(deleteUserInfo);
    }
    

};


/**
 * API No. 4
 * API Name : 계정 삭제 API
 * [PATCH] /user/:userId/acceptanceStatus
 */
exports.modifyAcceptanceStatus = async function (req, res) {
    const userIdFromJWT = req.verifiedToken.userId
    
    const userId = req.params.userId;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    
        const modifyAcceptanceStatusInfo = await userService.modifyAcceptanceStatus(userId);
        return res.send(modifyAcceptanceStatusInfo);
    }
    

};







/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
