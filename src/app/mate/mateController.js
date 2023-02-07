const jwtMiddleware = require("../../../config/jwtMiddleware");
const mateProvider = require("./mateProvider");
const mateService = require("./mateService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");


/**
 * API No. 1
 * API Name : 메이트 페이지 정보 조회 API
 * [GET] /mate/{userId}
 */
exports.getMate = async function (req, res) {
    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;

    
    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    
        const mateByUserIdInfo = await mateProvider.retrieveMate(userId);
        return res.send(response(baseResponse.SUCCESS, mateByUserIdInfo));
    }
}



/**
 * API No. 2
 * API Name : 메이트 리스트 정보 조회 API
 * [GET] /mate/{userId}/list
 */
exports.getMateList = async function (req, res) {
    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!userId) return res.send(errResponse(baseResponse.USER_USERCODE_EMPTY));
    
        const mateListByUserId = await mateProvider.retrieveMateList(userId);
        return res.send(response(baseResponse.SUCCESS, mateListByUserId));
    }
}



/**
 * API No. 3
 * API Name : 메이트 검색 API
 * [GET] /mate/{userId}/search
 */
exports.searchMate = async function (req, res) {
    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const friendCode = req.body.friendCode;


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!friendCode) return res.send(errResponse(baseResponse.USER_USERCODE_EMPTY));
    
        const createMateByUserId = await mateService.createMate(userId, friendCode);
    
        const mateByUserCode = await mateProvider.retrieveSearchMate(userId,friendCode);
        return res.send(response(baseResponse.SUCCESS, mateByUserCode));
    }
}




/**
 * API No. 4
 * API Name : 친구 추가 API
 * [PATCH] /mate/:userId/add
 */
exports.addMate = async function (req, res) {
    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const friendId = req.body.friendId;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!friendId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    
        const addFriendInfo = await mateService.addFriend(userId, friendId);
        return res.send(addFriendInfo);
    }
};




/**
 * API No. 5
 * API Name : 친구 삭제 API
 * [PATCH] /mate/:userId/delete
 */
exports.deleteMate = async function (req, res) {
    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const friendId = req.body.friendId;


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!friendId) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));
    
        const deleteFriendInfo = await mateService.deleteFriend(userId, friendId);
        return res.send(deleteFriendInfo);
    }
};