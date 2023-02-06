// userId 회원 조회
async function selectUserId(connection, userId) {
    const selectUserIdQuery = `
                   SELECT userCode, nickname, acceptanceStatus, 
                   (SELECT count(*) FROM friend WHERE userCode IN 
                   (SELECT userCode FROM user where userId = ?)) AS mate
                   FROM user
                   WHERE userId = ?;
                   `;
    const [userRow] = await connection.query(selectUserIdQuery, [userId, userId]);
    return userRow;
  }
  

  //userId nickname 변경
  async function updateUserInfo(connection, id, nickname) {
    const updateUserQuery = `
                    UPDATE user 
                    SET nickname = ?
                    WHERE userId = ?;
                    `;
    const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
    return updateUserRow[0];
  }
 

  //userId status 변경
  async function updateUserStatus(connection, id) {
    const updateUserQuery = `
    UPDATE user 
    SET status = "INACTIVE"
    WHERE userId = ?;`;
    const updateUserRow = await connection.query(updateUserQuery, [id]);
    return updateUserRow[0];
  }


  async function selectAcceptanceStatus(connection, userId) {
      const selectUserIdQuery = `
                     SELECT acceptanceStatus
                     FROM user
                     WHERE userId = ?
                     `;
      const [userRow] = await connection.query(selectUserIdQuery, [userId]);
      return userRow[0];
    }
 

  //userId acceptanceStatus 0으로 변경
  async function updateAcceptanceStatus_0(connection, id) {
    const updateUserQuery = `
    UPDATE user 
    SET acceptanceStatus = 0
    WHERE userId = ?;`;
    const updateUserRow = await connection.query(updateUserQuery, [id]);
    return updateUserRow[0];
  }
 

  //userId acceptanceStatus 1로 변경
  async function updateAcceptanceStatus_1(connection, id) {
    const updateUserQuery = `
    UPDATE user 
    SET acceptanceStatus = 1
    WHERE userId = ?;`;
    const updateUserRow = await connection.query(updateUserQuery, [id]);
    return updateUserRow[0];
  }



  module.exports = {
    selectUserId,
    updateUserInfo,
    updateUserStatus,
    selectAcceptanceStatus,
    updateAcceptanceStatus_0,
    updateAcceptanceStatus_1,
  };