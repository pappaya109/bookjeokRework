// 08-11 민재 작업
const { executeQuery } = require('./reviewTagUtils');

const addlikesCount = async (likes) => {
  const query = 'UPDATE t_review SET likes = likes + 1 WHERE review_idx = ?'
  await executeQuery(query, [likes]);

};

module.exports = {
    addlikesCount
  }