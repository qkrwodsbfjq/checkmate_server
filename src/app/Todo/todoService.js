const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const todoProvider = require("./todoProvider");
const todoDao = require("./todoDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");
const userProvider = require("../User/userProvider");
const userDao = require("../User/userDao");


// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createTodo = async function (userId,title, importance, urgencyDegree, deadline,
                                     deadlineTime, memo, status,chesspiece,categoryId)
{
    try {

        const insertTodoParams = [userId,title,importance,urgencyDegree,deadline,deadlineTime,memo,status,chesspiece,categoryId];
        const connection = await pool.getConnection(async (conn) => conn);
        console.log(insertTodoParams);
        const todoResult = await todoDao.insertTodo(connection,insertTodoParams);
        console.log(`추가된 todo : ${todoResult[0].todoId}`)
        connection.release();
        return response(baseResponse.CREATE_TODO_SUCCESS);

    } catch (err) {
        logger.error(`App - createTodo Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.createCategory = async function (title,color,userId)
{
    try {
        const insertCategoryParams = [title, color,userId];
        const connection = await pool.getConnection(async (conn) => conn);
        console.log(insertCategoryParams);
        const categoryResult = await todoDao.insertCategory(connection, insertCategoryParams);
        connection.release();
        return response(baseResponse.CREATE_CATEGORY_SUCCESS,categoryResult);
    } catch (err)
    {
        logger.error(`App - createCategory Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.updateCategoryId = async function (categoryId,title,color)
{
    try {
        console.log(categoryId);
        const insertCategoryParams = [title,color,categoryId];
        const connection = await pool.getConnection(async (conn) => conn);
        const editCategoryResult = await todoDao.updateCategoryInfo(connection,insertCategoryParams);
        connection.release();

        return response(baseResponse.SUCCESS);
    }catch (err)
    {
        logger.error(`App - editCategory Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.createContents = async function(todoId,content,status)
{
    try {

        const insertContentParams = [todoId,content,status];
        const connection = await pool.getConnection(async (conn) => conn);
        const contentsResult = await todoDao.insertContent(connection,insertContentParams);
        console.log(`추가된 content : ${contentsResult[0].contentsId}`)
        connection.release();

        return response(baseResponse.SUCCESS);
    }catch (err)
    {
        logger.error(`App - insertContent Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.updateContentsId = async function (contentsId,content,status)
{
    try {
        console.log(contentsId);
        const insertContentsParams = [content,status,contentsId];
        const connection = await pool.getConnection(async (conn) => conn);
        const editContentsResult = await todoDao.updateContentInfo(connection,insertContentsParams);
        connection.release();

        return response(baseResponse.UPDATE_CONTENTS_SUCCESS);
    }catch (err)
    {
        logger.error(`App - editContents Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.updateTodoId = async function (userId,todoId,title, importance, urgencyDegree, deadline,
                                     deadlineTime, memo, status,chesspiece,categoryId)
{
    try {

        const updateTodoParams = [title,importance,urgencyDegree,deadline,deadlineTime,memo,status,chesspiece,categoryId,todoId];
        const connection = await pool.getConnection(async (conn) => conn);
        const todoResult = await todoDao.updateTodo(connection,updateTodoParams);
        if(status == 1)
        {
            const userId1 = userId;
            const userId2 = userId;
            todoDao.updateAchievement(connection,userId,userId1,userId2);
            console.log('status 1 인 todo 생겨서 성취율 변경');
        }
        connection.release();
        return response(baseResponse.UPDATE_TODO_SUCCESS);

    } catch (err) {
        logger.error(`App - editTodo Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};