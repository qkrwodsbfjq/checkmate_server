const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const todoDao = require("./todoDao");


// Read 처리하는 곳

exports.retrieveTodoList = async function (userId,day)  {
    if(!day){
        const date = new Date();
        const year = date.getFullYear();
        const month = ('0'+(date.getMonth()+1)).slice(-2);
        const days = ('0'+date.getDate()).slice(-2);
        const dateStr = year +'-'+month+'-'+days;
        const connection = await pool.getConnection(async (conn) => conn);
        console.log(dateStr);
        const todoListResult = await todoDao.selectTodo(connection,userId,dateStr);
        connection.release();

        return todoListResult;
    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const todoListResult = await todoDao.selectTodoDay(connection,userId,day);
        connection.release();

        return todoListResult;
    }
};

exports.retrieveFullTodoList = async function (userId,todoId){
    const connection = await pool.getConnection(async (conn) => conn);
    const fullTodoListResult = await todoDao.selectFullTodo(connection,userId,todoId);
    connection.release();

    return fullTodoListResult;
};

exports.getCategoryId = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const categoryListResult =await todoDao.selectCategory(connection,userId);
    connection.release();

    return categoryListResult;
}

exports.retrieveContentsList = async function (todoId,contentsId)
{
    if(!contentsId)
    {
        const connection = await pool.getConnection(async (conn) => conn);
        const contentListResult = await todoDao.selectContents(connection,todoId);
        connection.release();
        return contentListResult;

    } else{

        const connection = await pool.getConnection(async (conn) => conn);
        const contentListByID = await todoDao.selectContentsById(connection,todoId,contentsId);
        connection.release();
        return contentListByID;
    }
}