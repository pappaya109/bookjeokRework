const { executeQuery } = require('./reviewTagUtils');

const connectTagUser = async (user_id, tags, callback) => {
  console.log(user_id, tags)
  const query = "INSERT INTO t_usertag (user_id, tag_idx) VALUES (?, ?)";
  try {
    for (const tag of tags) {
      const tag_idx = tag.tag_idx;
      await executeQuery(query, [user_id, tag_idx]);
    }
    callback(true);
  } catch (error) {
    callback(false)
  }
}

module.exports = {
  connectTagUser
}