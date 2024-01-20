const connection = require('./../config/database');
const { getUserName } = require('./userUtils');

const connectTagReview = async (review_idx, tags, callback) => {
  const query = "INSERT INTO t_reviewtag (review_idx, tag_idx) VALUES (?, ?)";

  try {
    for (const tag of tags) {
      const tag_idx = tag.tag_idx;
      await executeQuery(query, [review_idx, tag_idx]);
      console.log(tag);
      await addTagCount(tag_idx);
    }
    callback(true);
  } catch (error) {
    console.error(error);
    callback(false);
  }
};

const addTagCount = async (tag_idx) => {
  const query = "UPDATE t_tag SET tag_count = tag_count + 1 WHERE tag_idx = ?";
  await executeQuery(query, [tag_idx]);
};

const executeQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getTagByReviewId = async (reviews, callback) => {
  const query = "SELECT r.review_idx, t.tag_idx, t.tag_name FROM t_review r INNER JOIN t_reviewtag rt ON r.review_idx = rt.review_idx INNER JOIN t_tag t ON rt.tag_idx = t.tag_idx WHERE r.review_idx = ?"
  let response = [];
  console.log(reviews)
  try {
    for (const review of reviews) {
      let data = {
        review: review,
        tags: null,
        user: null
      }
      await getTagByReviewIdUtils(query, review, (err, tags) => {
        if (!err) {
          data.tags = tags;
        }
      })
      await getUserName(review.user_id, (err, user) => {
        if (!err) {
          data.user = user;
          response.push(data);
        } 
      })
    }
    callback(null, response);
  } catch (err) {
    callback(err, null)
  }
}

const getTagByReviewIdUtils = async(query, review, callback) => {
  console.log(review.review_idx)
  const res = await executeQuery(query, review.review_idx);
  callback(null, res);
}

module.exports = {
  connectTagReview,
  addTagCount,
  getTagByReviewId,
  executeQuery,
  getTagByReviewIdUtils
}