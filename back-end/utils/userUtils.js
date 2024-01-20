const connection = require('./../config/database');
const { executeQuery } = require('./reviewTagUtils');

const checkUserExist = (user_id, callback) => {
  const query = "SELECT * FROM t_user WHERE user_id = ?";
  connection.query(query, user_id, (err, row) => {
    if (err) {
      console.log(err);
      callback(err, null);
      return ;
    }
    if (row[0] === undefined) {
      callback(null, -1);
      return ;
    }
    const userId = row[0].user_id;
    callback(null, userId);
  })
}

const deleteUser = (user_id, callback) => {
  const query = "DELETE FROM t_user WHERE user_id = ?";
  connection.query(query, user_id, (err, row) => {
    if (err) {
      console.log(err);
      callback(err, null);
      return ;
    } else {
      callback(null, row);
      return ;
    }
  })
}

const getUserName = async (user_id, callback) => {
  const query = "SELECT * FROM t_user WHERE user_id = ?";
  connection.query(query, user_id, (err, result) => {
    callback(null, result)
  })
}

module.exports = {
  checkUserExist,
  deleteUser,
  getUserName
}