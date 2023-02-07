const jwtMiddleware = require("../../../config/jwtMiddleware");
const todoProvider = require("../../app/Todo/todoProvider");
const todoService = require("../../app/Todo/todoService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");
const userService = require("../User/userService");
const userProvider = require("../User/userProvider");
const {TODO_TODOID_EMPTY} = require("../../../config/baseResponseStatus");


/**
 * API No. 1
 * API Name: todo 생성
 * [POST] /app/todo
 */

exports.postTodo = async function (req,res)
{
    /**
     * Query String: userId,title,importance,urgencyDegree,deadline,deadlineTime
     * memo,status,chesspiece,categoryId
     */

    const userId = req.query.userId;
    const title = req.query.title;
    const importance = req.query.importance;
    const urgencyDegree = req.query.urgencyDegree;
    const deadline = req.query.deadline;
    const deadlineTime = req.query.deadlineTime;
    const memo = req.query.memo;
    const status = req.query.status;
    const chesspiece = req.query.chesspiece;
    const categoryId = req.query.categoryId;

    // 빈값 체크 오류
    if (!userId) {
        return res.send(response(baseResponse.TODO_USERID_EMPTY));
    }

    const createResponse = await todoService.createTodo(
        userId,
        title,
        importance,
        urgencyDegree,
        deadline,
        deadlineTime,
        memo,
        status,
        chesspiece,
        categoryId,
    );

    return res.send(createResponse);

}

/**
 * API No. 2
 * API Name: todo 조회 (날짜로)
 * [GET] /app/todo
 */

exports.getTodo = async function (req,res)
{
    /**
     * Query String: day , userId
     */


    const day = req.query.day;
    const userId = req.query.userId;

    if (!day) {
        // 오늘 조회

        const todoListResult = await todoProvider.retrieveTodoList(userId);
        return res.send(response(baseResponse.SUCCESS, todoListResult));
    } else {
        // 특정 날짜 조회
        const todoListByday = await todoProvider.retrieveTodoList(userId,day);
        return res.send(response(baseResponse.SUCCESS, todoListByday));
    }

}

/**
 * API No. 3
 * API Name: todo Id로 상세조회 (todoId로)
 * [GET] /app/todoId
 */
exports.getTodoId = async function (req,res)
{
    console.log('Controller 진입');
    /**
     * Query String: userId,todoId
     */
    console.log('Controller 진입');
    const userId = req.query.userId;
    const todoId = req.query.todoId;

    //빈값 체크 오류
    console.log('Controller 진입');
    if(!userId)
    {
        return res.send(response(baseResponse.TODO_USERID_EMPTY));
    }
    if(!todoId)
    {
        return res.send(response(baseResponse.TODO_TODOID_EMPTY));
    }

    const fullTodoById = await todoProvider.retrieveFullTodoList(userId,todoId);
    return res.send(response(baseResponse.SUCCESS,fullTodoById));

}

/**
 * API No. 4
 * API Name: category 생성하기
 * [POST] /app/category
 */
exports.postCategory = async function (req,res)
{
    /**
     * Query String: title,color
     */
    const title = req.query.title;
    const color = req.query.color;
    const userId = req.query.userId

    //빈값 체크
    if(!title)
    {
        return res.send(response(baseResponse.TODO_CATEGORYTITLE_EMPTY));
    }

    const createCategory = await todoService.createCategory(title,color,userId);
    return res.send(createCategory);
}

/**
 * API No. 5
 * API Name: category 생성하기
 * [PATCH] /app/category/update
 */
exports.updateCategory = async function (req,res)
{
    /**
     * Query String: categoryId,title,color
     */
    const categoryId = req.query.categoryId;
    const title = req.query.title;
    const color = req.query.color;

    //빈값 체크
    if(!categoryId)
    {
        return res.send(response(baseResponse.TODO_CATEGORYID_EMPTY));
    }
    const updateCategory = await todoService.updateCategoryId(categoryId,title,color);
    return res.send(updateCategory);

}
/**
 * API No. 6
 * API Name: category 조회하기
 * [GET] /app/category
 */
exports.getCategory = async function (req,res)
{
    /**
     * Query String: userId
     */

    const userId = req.query.userId;

    if (!userId)
    {
        return res.send(response(baseResponse.TODO_USERID_EMPTY));
    }
    const getCategory = await todoProvider.getCategoryId(userId);
    return res.send(response(baseResponse.SUCCESS,getCategory));
}

/**
 * API No. 7
 * API Name: contents 생성하기
 * [POST] /app/contents
 */

exports.postContents = async function (req,res)
{
    /**
     * Query String: todoId,content,status
     */

    const todoId = req.query.todoId;
    const content = req.query.content;
    const status = req.query.status;


    const createContent = await todoService.createContents(todoId,content,status);
    return res.send(response(baseResponse.CREATE_CONTENTS_SUCCESS));
}

/**
 * API No. 8
 * API Name: contents 조회하기
 * [GET] /app/contents
 */

exports.getContents = async function (req,res) {
    /**
     * Query String: todoId , contentsId
     */
    const todoId = req.query.todoId;
    const contentsId = req.query.contentsId;

    if (!contentsId) // contentsid 가 없다면 todoid 에 해당하는 contents 조회
    {
        const contentsListResult = await todoProvider.retrieveContentsList(todoId);
        return res.send(response(baseResponse.SUCCESS,contentsListResult))

    } else {
        const contentsListbyId = await todoProvider.retrieveContentsList(todoId,contentsId);
        return res.send(response(baseResponse.SUCCESS,contentsListbyId));
    }
}

/**
 * API No. 9
 * API Name: contents 수정하기
 * [PATCH] /app/contents/update
 */

exports.updateContents = async function (req,res)
{
    /**
     * Query String: contentsId,content,status
     */
    const contentsId = req.query.contentsId;
    const content = req.query.content;
    const status = req.query.status;

    //빈값 체크
    if(!contentsId)
    {
        return res.send(response(baseResponse.TODO_CONTENTSID_EMPTY));
    }
    const updateContents = await todoService.updateContentsId(contentsId,content,status);
    return res.send(updateContents);

}

/**
 * API No. 10
 * API Name: todo 수정하기
 * [PATCH] /app/todo/update
 */
exports.updateTodo = async function (req,res)
{
    /**
     * Query String: userId,todoId,title,importance,urgencyDegree,deadline,deadlineTime
     * memo,status,chesspiece,categoryId
     */
    const userId = req.query.userId
    const todoId = req.query.todoId
    const title = req.query.title;
    const importance = req.query.importance;
    const urgencyDegree = req.query.urgencyDegree;
    const deadline = req.query.deadline;
    const deadlineTime = req.query.deadlineTime;
    const memo = req.query.memo;
    const status = req.query.status;
    const chesspiece = req.query.chesspiece;
    const categoryId = req.query.categoryId;

    // 빈값 체크 오류
    if (!todoId) {
        return res.send(response(baseResponse.TODO_TODOID_EMPTY));
    }

    const updateResponse = await todoService.updateTodoId(
        userId,
        todoId,
        title,
        importance,
        urgencyDegree,
        deadline,
        deadlineTime,
        memo,
        status,
        chesspiece,
        categoryId,
    );

    return res.send(updateResponse);

}

