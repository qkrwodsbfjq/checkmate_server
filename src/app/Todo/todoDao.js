
// todo 생성
async function insertTodo(connection,insertTodoParams){
    const insertTodoQuery =`
        INSERT INTO todo (userId,title,importance,urgencyDegree,deadline,deadlineTime,memo,status,chesspiece,categoryId)
        VALUES (?, ?, ?, ? ,? ,? ,? ,? ,?,?);
        `;

    const insertTodoRow = await connection.query(insertTodoQuery,insertTodoParams)
    return insertTodoRow;
}

// todo 조회 (오늘)
async function selectTodo(connection,userId,dateStr)
{
    console.log(dateStr);
    const selectTodoQuery = `
                SELECT todoId,userId,title,importance,urgencyDegree,DATE_FORMAT(deadline,'%Y-%m-%d') AS deadline,deadlineTime,
                    memo,status,DATE_FORMAT(createdAt,'%Y-%m-%d') as createdAt,chesspiece,categoryId  
                FROM todo 
                WHERE userId = ? AND deadline = ?;
                `;
    const [todoRows] = await connection.query(selectTodoQuery,[userId,dateStr]);
    return todoRows;
}

// todo 조회(날짜로)
async function selectTodoDay(connection,userId,day)
{
    const selectTodoQuery = `
                SELECT todoId,userId,title,importance,urgencyDegree,DATE_FORMAT(deadline,'%Y-%m-%d') AS deadline,deadlineTime,
                    memo,status,DATE_FORMAT(createdAt,'%Y-%m-%d') as createdAt,chesspiece,categoryId
                FROM todo 
                WHERE userId = ?  AND  deadline = ?;
                `;
    const [tododayRows] = await connection.query(selectTodoQuery,[userId,day]);
    return tododayRows;
}

// todo 의 상세 내용 (id 와 join 을 사용해서)
async  function selectFullTodo(connection,userId,todoId)
{
    console.log('Dao 진입');
    const selectFullTodoQuery = `
                SELECT  todoId,todo.userId,todo.title as todoTitle,importance,urgencyDegree,DATE_FORMAT(deadline,'%Y-%m-%d') AS deadline,deadlineTime,
                        memo,status,DATE_FORMAT(todo.createdAt,'%Y-%m-%d') as createdAt,chesspiece,todo.categoryId,category.title as 
                        categoryTitle,
                        category.color
                FROM todo
                INNER JOIN category
                    ON todo.categoryId = category.categoryId
--                 INNER JOIN contents 
--                     ON todo.todoId = contents.todoId 따로 조회를 하는게 편할듯 함
                WHERE todo.userId = ? AND todo.todoId = ?;
                `;

    const [fullTodoIdRows] = await connection.query(selectFullTodoQuery,[userId,todoId]);
    return fullTodoIdRows;
}
// category 생성
async function insertCategory(connection,insertCategoryParams)
{
    const insertCategoryQuery =`
        INSERT INTO category (title,color,userId)
        VALUES (?, ?,?);
        `;
    // const [CategoryRows] = await connection.query(insertCategoryQuery,insertCategoryParams);
    connection.query(insertCategoryQuery,insertCategoryParams);
    return insertCategoryParams;
}

//category 수정
async function updateCategoryInfo(connection,insertCategoryParams)
{
    const updateCategoryQuery =`
        UPDATE category
        SET title = ? , color = ?
        WHERE categoryId = ?;
    `;
    connection.query(updateCategoryQuery,insertCategoryParams);
    return;
}

//cateogry 조회
async function selectCategory(connection,userId)
{
    const selectCategoryQuery = `
        SELECT *
        FROM category
        WHERE category.userId = ?`;

    const [categoryRows] = await connection.query(selectCategoryQuery,userId);

    return categoryRows;
}

// {
//     const selectCategoryQuery = `
//         SELECT *
//         FROM category
//         WHERE category.categoryId IN (SELECT todo.categoryId FROM todo WHERE todo.userId = ?)`;
//
//     const selectNormalQuery = ` SELECT * FROM category WHERE category.categoryId = 1;`;
//
//     const [categoryRows] = await connection.query(selectCategoryQuery,userId);
//     if(categoryRows[0] == null)
//     {
//         const [NormalRows] = await connection.query(selectNormalQuery);
//         return NormalRows;
//     }
//     return categoryRows;
// }

//contents 생성
async function insertContent(connection,insertContentParams){
    const insertContentQuery =`
        INSERT INTO contents (todoId,content,status)
        VALUES (?, ?, ?);
        `;

    const insertContentRow = await connection.query(insertContentQuery,insertContentParams)
    return insertContentRow;
}

// contents 조회

async function selectContents(connection,todoId)
{
    const selectContentsQuery = `
                SELECT *  
                FROM contents 
                WHERE todoId = ?;
                `;
    const [contentsRows] = await connection.query(selectContentsQuery,todoId);
    return contentsRows;
}
// 특정 content 조회
async function selectContentsById(connection,todoId, contentsId)
{
    const selectContentsByIdQuery = `
                SELECT *  
                FROM contents 
                WHERE todoId = ? AND contentsId = ?;
                `;
    const [ContentsRowsById] = await connection.query(selectContentsByIdQuery,[todoId,contentsId]);
    return ContentsRowsById;
}

//content 수정
async function updateContentInfo(connection,insertContentsParams)
{
    const updateContentQuery =`
        UPDATE contents
        SET content = ? , status = ?
        WHERE contentsId = ?;
    `;
    connection.query(updateContentQuery,insertContentsParams);
    return;
}
// todo 수정

async function updateTodo(connection,updateTodoParams)
{
    const updateTodoQuery =`
        UPDATE todo
        SET title = ?,
            importance = ?,
            urgencyDegree = ?,
            deadline = ?,
            deadlineTime = ?,
            memo = ?,
            status = ?,
            chesspiece = ?,
            categoryId = ?
            
        WHERE todoId = ?;
    `;
    connection.query(updateTodoQuery,updateTodoParams);
    return;
}

// status 가 1 인 todo 가 늘어났을경우
async function updateAchievement (connection,userId,userId1,userId2)
{
    const updateAchievementRate = `
    update user
    set achievementRate = (SELECT  count(*)
                           FROM todo WHERE DATE_FORMAT(deadline,'%m')= DATE_FORMAT(now(),'%m') AND status=1 AND userId =?)
                              /(SELECT count(*) FROM todo
                                WHERE DATE_FORMAT(deadline,'%m')= DATE_FORMAT(now(),'%m') AND userId =?) * 100
    where userId = ?;`;
    connection.query(updateAchievementRate,[userId,userId1,userId2]);
    return
}
// (SELECT count(*) FROM todo
// WHERE DATE_FORMAT(deadline,'%m')= DATE_FORMAT(now(),'%m') AND userId =?)/(SELECT  count(*)
// FROM todo WHERE DATE_FORMAT(deadline,'%m')= DATE_FORMAT(now(),'%m') AND status=1 AND userId =?)
//
// (SELECT count(*) FROM todo
// WHERE DATE_FORMAT(deadline,'%m')= DATE_FORMAT(now(),'%m') AND userId =?)
//
// (SELECT  count(*)
// FROM todo WHERE DATE_FORMAT(deadline,'%m')= DATE_FORMAT(now(),'%m') AND status=1 AND userId =?)


module.exports = {
    insertTodo,
    selectTodo,
    selectTodoDay,
    selectFullTodo,
    insertCategory,
    updateCategoryInfo,
    selectCategory,
    insertContent,
    selectContents,
    selectContentsById,
    updateContentInfo,
    updateTodo,
    updateAchievement,
};

