// userId 메이트 조회
async function selectMate(connection, userId) {
    const selectUserIdQuery = `
                    SELECT userId, userCode, nickname, achievementRate
                    FROM user
                    WHERE userId = ?
                    OR userId = ANY (SELECT friendId FROM friend WHERE userId = ? AND relationship = 1);
                   `;
    const [userRow] = await connection.query(selectUserIdQuery, [userId, userId]);
    return userRow;
  }
  

// userId 메이트 리스트 조회
async function selectMateList(connection, userId) {
    const selectUserIdQuery = `
                    SELECT friendId,
                    (SELECT userCode FROM user WHERE userId = friendId) AS friendCode,
                    (SELECT nickname FROM user WHERE userId = friendId) AS nickname,
                    relationship
                    FROM friend
                    WHERE userId = ?
                    AND relationship = 1;
                   `;
    const [userRow] = await connection.query(selectUserIdQuery, userId);
    return userRow;
  }


// friendCode 유저 아이디 유무 확인
async function userSearch(connection, friendCode) {
    const selectUserIdQuery = `
                    SELECT userId
                    FROM user
                    WHERE userCode = ?;
                   `;
    const [userRow] = await connection.query(selectUserIdQuery, [friendCode]);
    return userRow;
  }


  // userId, friendCode 친구 테이블 유무 확인
  async function friendTableSearch(connection, userId, friendCode) {
      const selectUserIdQuery = `
                        SELECT friendTableId
                        FROM friend
                        WHERE userId = ?
                        AND friendId = (SELECT userId FROM user WHERE userCode = ?);
                        `;
      const [userRow] = await connection.query(selectUserIdQuery, [userId, friendCode]);
      return userRow;
    }


  // userId, friendCode 친구 테이블 생성
async function createFriend(connection, userId, friendCode) {
    const selectUserIdQuery = `
                    INSERT INTO friend 
                    (userId, friendId, relationship) VALUES (?, (SELECT userId from user WHERE userCode = ?), 0),
                    ((SELECT userId from user WHERE userCode = ?), ?, 0);
                   `;
    const [userRow] = await connection.query(selectUserIdQuery, [userId, friendCode, friendCode, userId]);
    return userRow;
  }



  // friendCode 메이트 검색
async function selectMateSearch(connection, userId, friendCode) {
    const selectUserIdQuery = `
                    SELECT userId AS friendId, userCode AS friendCode, nickname,
                    (SELECT relationship FROM friend WHERE userId = ? AND friendId = (SELECT userId FROM user WHERE userCode = ?)) AS relationship
                    FROM user
                    WHERE userCode = ?
                   `;
    const [userRow] = await connection.query(selectUserIdQuery, [userId, friendCode, friendCode]);
    return userRow;
  }
  

  //userId, friendId 친구 relationship 1로 변경
  async function updateFriendRelationship_1(connection, userId, friendId) {
    const updateUserQuery = `
                    UPDATE friend 
                    SET relationship = 1
                    WHERE userId = ?
                    AND friendId = ?
                    OR userId = ?
                    AND friendId = ?;
                    `;
    const updateUserRow = await connection.query(updateUserQuery, [userId, friendId, friendId, userId]);
    return updateUserRow[0];
  }
  

  //userId, friendId 친구 relationship 0으로 변경
  async function updateFriendRelationship_0(connection, userId, friendId) {
    const updateUserQuery = `
                    UPDATE friend 
                    SET relationship = 0
                    WHERE userId = ?
                    AND friendId = ?
                    OR userId = ?
                    AND friendId = ?;
                    `;
    const updateUserRow = await connection.query(updateUserQuery, [userId, friendId, friendId, userId]);
    return updateUserRow[0];
  }


  module.exports = {
    selectMate,
    selectMateList,
    selectMateSearch,
    userSearch,
    friendTableSearch,
    createFriend,
    updateFriendRelationship_1,
    updateFriendRelationship_0
  };