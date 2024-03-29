const connection = require('./../config/database');

const postReview = (
  book_idx, 
  review_title, 
  review_content,
  created_at, 
  user_id, 
  likes, 
  dislikes, 
  updated_at,
  callback
  ) => {
  const query = `INSERT INTO t_review (
    book_idx,
    review_title,
    review_content,
    created_at,
    user_id,
    likes,
    dislikes,
    updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(
      query,
      [
        book_idx,
        review_title,
        review_content,
        created_at,
        user_id,
        likes,
        dislikes,
        updated_at
      ],
      (err, result) => {
        if (err) {
          console.log(err)
          callback(err, null);
          return ;
        } else {
          
        }
        const newReviewId = result.insertId;
        callback(null, newReviewId);
      }
    )
}

module.exports = {
  postReview
}