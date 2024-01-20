const connection = require('./../config/database');

const getTagByUserId = (user_id, callback) => {
  const query = "SELECT u.user_id, t.tag_idx, t.tag_name, t.tag_type FROM t_user u INNER JOIN t_usertag ut ON u.user_id = ut.user_id INNER JOIN t_tag t ON ut.tag_idx = t.tag_idx WHERE u.user_id = ?";
  connection.query(query, user_id, (err, result) => {
    if (err) {
      callback(err, null);
      return ;
    } else {
      callback(null, result);
      return ;
    }
  })
}

module.exports = {
  getTagByUserId
}