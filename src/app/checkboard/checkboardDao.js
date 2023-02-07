// userId todo 조회
async function selectCheckboardTodo(connection, userId) {
    const selectUserIdQuery = `
                   SELECT todoId,  title, importance, urgencyDegree, deadline, deadlineTime, memo, status, chesspiece
                        , CASE WHEN deadline = DATE_FORMAT(now(),'%Y-%m-%d') then 'day'
                        WHEN (DATE_FORMAT(deadline,'%Y-%m-%d')>= date_add(now(),interval -1-weekday(now()) day))
                        AND (DATE_FORMAT(deadline,'%Y-%m-%d')<= date_add(now(),interval +6-weekday(now()) day)) then 'week'
                        WHEN DATE_FORMAT(deadline,'%m')= DATE_FORMAT(now(),'%m') then 'month'
                        ELSE 'else'
                        END AS deadline_
                    FROM todo
                    WHERE userId = ? 
                   `;
    const [userRow] = await connection.query(selectUserIdQuery, [userId, userId]);
    return userRow;
  }



  module.exports = {
    selectCheckboardTodo
  };