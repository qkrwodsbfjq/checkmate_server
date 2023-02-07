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

// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                SELECT email
                FROM user
                WHERE email = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  return emailRows;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO user(email, password, nickname)
        VALUES (?, ?, ?);
    `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );

  return insertUserInfoRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT email, nickname, password
        FROM user 
        WHERE email = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
        SELECT status, userId
        FROM user 
        WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      email
  );
  return selectUserAccountRow[0];
}

// userid 가져오기 -> userCode를 만들기 위해
async function selectUserIdforcode(connection, email) {
  const selectUserIdQuery = `
        SELECT userId
        FROM user 
        WHERE email = ?;`;
  const selectUserIdRow = await connection.query(
    selectUserIdQuery,
      email
  );
  return selectUserIdRow[0];
}

// userCode 업데이트
async function updateUserCode(connection, updateUserInfoParams) {
  console.log(updateUserInfoParams)
  const updateUserCodeQuery = `
  UPDATE user
  SET userCode = ?
  WHERE userid = ?;`;
  const updateUserCodeRow = await connection.query(updateUserCodeQuery, updateUserInfoParams);
  return updateUserCodeRow[0];
}


  module.exports = {
    selectUserId,
    updateUserInfo,
    updateUserStatus,
    selectAcceptanceStatus,
    updateAcceptanceStatus_0,
    updateAcceptanceStatus_1,
    selectUserEmail,
    insertUserInfo,
    selectUserPassword,
    selectUserAccount,
    selectUserIdforcode,
    updateUserCode,

  };