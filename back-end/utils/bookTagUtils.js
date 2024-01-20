const { executeQuery } = require('./reviewTagUtils')

const connectTagBook = async (book_idx, tags, callback) => {
  const query = "INSERT INTO t_booktag (book_idx, tag_idx) VALUES (?, ?)";

  try {
    for (const tag of tags) {
      const tag_idx = tag.tag_idx;
      await executeQuery(query, [book_idx, tag_idx]);
    }
    callback(true);
  } catch (error) {
    console.error(error);
    callback(false);
  }
};

module.exports = {
  connectTagBook
}