const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("./userProvider");
const userService = require("./userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

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
 * API Name : 수신 동의 여부  API
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


/**
 * API No. 5
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {
    /**
     * Body: email, password, nickname
     */
    const {email, password, nickname} = req.body;
    // 빈 값 체크
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

    // 길이 체크
    //if (email.length > 30)
    //    return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

    // 형식 체크 (by 정규표현식)
    //if (!regexEmail.test(email))
    //    return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    // 기타 등등 - 추가하기


    const signUpResponse = await userService.createUser(
        email,
        password,
        nickname
    );

    console.log("signUpResponse : ",signUpResponse)

    return res.send(signUpResponse);
};

// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 6
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {email, password} = req.body;

    // TODO: email, password 형식적 Validation

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};




/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
