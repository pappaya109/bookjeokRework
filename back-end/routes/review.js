const express = require('express');
const router = express.Router();

const { checkBookExist, postBook } = require('./../utils/bookUtils.js');
const { connectTagBook } = require('./../utils/bookTagUtils.js')
const { postReview } = require('../utils/reviewUtils.js');
const { checkUserExist } = require('../utils/userUtils.js');
const { connectTagReview, getTagByReviewId } = require('../utils/reviewTagUtils.js');
const connection = require('./../config/database.js')

// 리뷰 검색 api, 인자 값 [도서 아이디]
router.get('/getReview/:book_idx', (req, res)=>{
  const { book_idx } = req.params;
  const query = "select * from t_review where book_idx = ?" 
  connection.query(query, book_idx, (err, result) => {
    if (err) {
      res.status(500).send({
        message : "failed to get review by book_id",
        data : null,
        error: err
      })
    } else {
        getTagByReviewId(result, (err, result) => {
          if (err) {
            res.status(500).send({
              message : "failed to get review by book_id",
              data : null,
              error: err
            })
          } else {
              res.status(200).send({
                message : "succeed to get review by book_id",
                data : result,
                error: null
            })
          }
      })}
  })
})

// 리뷰 등록 api, 인자 값 [ isbn, review_content, user_id ]
router.post('/postReview', (req, res) => {
  const { isbn, review_title, review_content, datetime, user_id, tags } = req.body;
  checkUserExist(user_id, (err, userId) => {
    if (err) {
      res.status(404).send({
        message: "user not exist",
        data: null,
        error: err
      })
    }
    checkBookExist(isbn, (err, bookId) => {
      if (err) {
        postBook(isbn, (err, newBookId) => {
        if (err) {
          res.status(500).send({
            message: "failed to post book",
            data: null,
            error: err
          })
        }
        postReview(newBookId, review_title, review_content, datetime, userId, 0, 0, datetime, (err, reviewId) => {
          if (err) {
            res.status(500).send({
              message: "failed to post review",
              data: null,
              error: err
            })
          }
          connectTagBook(bookId, tags, (result) => {
            if (!result) {
              res.status(500).send({
              message: "failed to connect booktag",
              data: null,
              error: result
            })
            } else {
              connectTagReview(reviewId, tags, (result) => {
                if (!result) {
                  res.status(500).send({
                  message: "failed to connect reviewtag",
                  data: null,
                  error: result
                })
              }
              res.status(200).send({
                message: "succeed to post new review ",
                data: reviewId,
                error: null
              })
              })
            }
          })
        })   
      })
    } else {
      const datetime = new Date();
      postReview(bookId, review_title, review_content, datetime, user_id, 0, 0, datetime, (err, reviewId) => {
        if (err) {
          res.status(500).send({
            message: "failed to post review",
            data: null,
            error: err
          })
        }
        connectTagBook(bookId, tags, (result) => {
          if (!result) {
            res.status(500).send({
            message: "failed to connect booktag",
            data: null,
            error: result
          })
          } else {
            connectTagReview(reviewId, tags, (result) => {
              if (!result) {
                res.status(500).send({
                message: "failed to connect reviewtag",
                data: null,
                error: result
              })
            }
            res.status(200).send({
              message: "succeed to post new review",
              data: reviewId,
              error: null
            })
            })
          }
        })
      })
    }
   });
  })
})
//나의 리뷰
router.get('/myReview', (req, res)=>{
  const { user_id } = req.query
  const sql = 'select * from t_review where user_id = ?';  
  connection.query(sql, [user_id], (err,result) => {
  if (err) {
    res.send({
      status: false,
      message : "fail",
      result : null,
      error: err
    })
  }
   res.send({
      status: true,
      message : "success",
      result : result,
      error: null
   })
  })
})
//내가 좋아한 리뷰
router.get('/reviewLikes', (req, res, next) => {
  const { user_id } = req.query;
  // checkUserExist(user_id, (err, userId) => {
  //   if (err || userId === -1) {
  //     res.send({
  //       status: false,
  //       message: "user not exist",
  //       data: null,
  //       error: err
  //     })
  //   }
    const sql  = 'select u.user_id, r.review_title, r.review_content, r.likes from t_user u inner join t_review r on u.user_id = r.user_id where u.user_id = ?;'
    connection.query(sql, [user_id], (err, result) => {
      if (err) {
        res.send({
        status: false,
        message: "failed to query",
        data: null,
        error: err
      })
        } else {
          res.send({
            status: true,
            message: "success",
            data: result,
            error: null
        })
      }
    })
  })
// })

// 내가 북마크한 책
router.get('/myBookmark', (req, res, next) => {
const {  user_id } = req.query;
console.log('내가 넣은 값은 =', req.query)
console.log(  user_id )

  
    let sql = 'select bm.bookmark_idx, u.user_id, b.book_idx from t_bookmark bm, t_user u, t_book b where u.user_id = bm.user_id and bm.book_idx = b.book_idx and u.user_id = ?;'
    connection.query(sql, [ user_id ], (err, result) => {
      console.log('결과', result)
      if(err) {
        console.log('결과값 에러')
        console.log(err)
      } else {
        res.send({
          message : 'success',
          review : result
        })
      }
    })
  })

// 나의 질문
router.get('/myquestion', (req,res, next) => {
  const { user_id} = req.query;
  console.log('내가 넣은 값은 =', req.query)
  console.log( user_id)

  // checkUserExist(user_id, (err, userId) => {
  //   if (err || userId === -1) {
  //     console.log("HAHA")
  //     res.send({
  //       "status": false,
  //       "message": "user not exist",
  //       "data": null,
  //       "error": err
  //     })
  //   }
    let sql = 'select q.q_idx, q.q_title, q.q_content, q.created_at, u.user_id, q.q_views from t_question q inner join t_user u on q.user_id = u.user_id where u.user_id =?;'
    connection.query(sql, [user_id], (err, result) => {
      console.log('결과', result)
      if(err) {
        console.log('결과값 에러')
        console.log(err)
      } else {
        res.send({
          message : 'success',
          review : result
        })
      }
    }) 
  })
// })

// 08-11일 민재 작업
router.post('/addlikescount', (req,res) => {
  const {review_idx, book_idx, review_title, review_content, created_at, user_id, likes, dislikes, updated_at} = req.body;
  console.log('내가 넣은 값', req.body)
  const addlikesCount = 'UPDATE t_review SET likes = likes + 1 WHERE review_idx = ?'
  connection.query(addlikesCount, [review_idx, book_idx, review_title, review_content, created_at, user_id, likes, dislikes, updated_at], (err, result) => {
    console.log('결과', result)
    if(err) {
      console.log('결과값 에러')
      console.log(err)
    } else {
      res.send({
        status : 1,
        message : 'success',
        review : result
      })
    }
  })
})

//2023-08-13~14 민재 ..나중에 쓸려면 쓸 답변 등록 
router.post('/insertAnswer', (req,res) => {
  const {ans_idx, q_idx, ans_content, answered_at, user_id, choiced_yn} = req.body;
  console.log('내가 넣은 값', req.body)
  const insertAnswer = 'insert into t_answer values(?,?,?,?,?,?)'
  connection.query(insertAnswer, [ans_idx, q_idx, ans_content, answered_at, user_id, choiced_yn], (err, result) => {
    console.log('결과', result)
    if (err) {
      console.log('결과값 에러')
      console.log(err)
    } else {
      res.send({
        status : 1,
        message : 'success',
        review : result
      })
    }
  })
})
// 2023-08-13~14 민재 ..답변 내용 수정
router.post('/updateAnswer', (req,res) => {
  const {ans_content, ans_idx} = req.body;
  console.log('내가 넣은 값', req.body)
  const updateAnswer = 'update t_answer set ans_content = ? where ans_idx = ?; '
  connection.query(updateAnswer, [ans_content, ans_idx], (err, result) => {
    console.log('결과', result)
    if (err) {
      console.log('결과값 에러')
      console.log(err)
    } else {
      res.send({
        status : 1,
        message : 'success',
        review : result
      })
    }
  }
)})
// 리뷰 삭제
router.post('/reviewDelete', (req, res) => {
  const { review_idx, user_id } = req.body;
  // 유저 확인
  checkUserExist(user_id, (err, userId) => {
    if (err || userId === -1) {
      console.log("user not exist2")
      res.send({
        status: 0,
        message: "user not exist",
        data: null,
        error: err
      })
      return
    }
    // 리뷰 존재 확인
    const checkReviewQuery = "SELECT * FROM t_review WHERE review_idx = ?";
    connection.query(checkReviewQuery, [review_idx], (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "리뷰 삭제 중 오류 발생",
          status: -1
        });
        return;
      }
      if (result.length === 0 || String(result[0].user_id) !== String(user_id)) {
        res.send({
          message: "해당 리뷰를 찾을 수 없습니다.",
          status: 0
        })
        return;
      }
      // 3. 리뷰 작성자 확인 => 세션값 확인 여부 
      const review = result[0];
      const checkUserQuery = "SELECT * FROM t_user WHERE user_id = ?";
      connection.query(checkUserQuery, [review.user_id], (err, userResult) => {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: "리뷰 작성자 확인 중 오류 발생",
            status: -1
          });
          return;
        }
        if (result.length === 0) {
          res.status(404).send({
            message: "해당 리뷰를 찾을 수 없습니다.",
            status: 0
          });
          return;
        }
        // 댓글 삭제
        const deleteCommentsQuery = "DELETE FROM t_comment WHERE review_idx = ?";
        connection.query(deleteCommentsQuery, [review_idx], (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send({
              message: "댓글 삭제 중 오류 발생",
              status: -1
            });
            return;
          }
          // 4. 리뷰 삭제
          const deleteReviewQuery = "DELETE FROM t_review WHERE review_idx = ?";
          connection.query(deleteReviewQuery, [review_idx], (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send({
                message: "리뷰 삭제 중 오류 발생",
                status: -1
              });
              return;
            }
            res.send({
              message: "리뷰 삭제 성공",
              status: 1
            });
          })
        })
      })
    })
  })
})

// 리뷰 수정
router.post('/reviewFix', (req, res) => {
  const { review_idx, review_content, user_id } = req.body;
  console.log(req.body)
  // 리뷰 작성자 확인
  const checkAuthorQuery = 'SELECT user_id FROM t_review WHERE review_idx = ?';
  connection.query(checkAuthorQuery, [review_idx], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: '리뷰 수정 중 오류 발생',
        status: -1
      });
      return;
    }
    // 리뷰 작성자가 맞는지 확인
    if (result.length === 0 || String(result[0].user_id) !== String(user_id)) {
      console.log("왜 안되지..",result[0].user_id)
      console.log("왜 안되지..",user_id)
      res.status(403).send({
        message: '해당 리뷰의 작성자만 수정할 수 있습니다.',
        status: 0
      });
      return;
    }
    // 리뷰 수정 쿼리 실행
    const updateReviewQuery = 'UPDATE t_review SET review_content = ? WHERE review_idx = ?';
    connection.query(updateReviewQuery, [review_content, review_idx], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: '리뷰 수정 중 오류 발생',
          status: -1
        });
        return;
      }

      res.send({
        message: '리뷰 수정 성공',
        status: 1
      });
    })
  })
})

// 리뷰 검색 api, 인자 값 [도서 아이디]
router.get('/getReview/:book_idx', (req, res)=>{
    const { book_idx } = req.params;
    const query = "select * from t_review where book_idx = ?" 
    connection.query(query, book_idx, (err, result) => {
      if (err) {
        res.status(500).send({
          message : "failed to get review by book_id",
          data : null,
          error: err
        })
      } else {
          getTagByReviewId(result, (err, result) => {
            if (err) {
              res.status(500).send({
                message : "failed to get review by book_id",
                data : null,
                error: err
              })
            } else {
                res.status(200).send({
                  message : "succeed to get review by book_id",
                  data : result,
                  error: null
              })
            }
        })}
    })
  })
  
  // 리뷰 등록 api, 인자 값 [ isbn, review_content, user_id ]
  router.post('/postReview', (req, res) => {
    const { isbn, review_title, review_content, datetime, user_id, tags } = req.body;
    checkUserExist(user_id, (err, userId) => {
      if (err) {
        res.status(404).send({
          message: "user not exist",
          data: null,
          error: err
        })
      }
      checkBookExist(isbn, (err, bookId) => {
        if (err) {
          postBook(isbn, (err, newBookId) => {
          if (err) {
            res.status(500).send({
              message: "failed to post book",
              data: null,
              error: err
            })
          }
          postReview(newBookId, review_title, review_content, datetime, userId, 0, 0, datetime, (err, reviewId) => {
            if (err) {
              res.status(500).send({
                message: "failed to post review",
                data: null,
                error: err
              })
            }
            connectTagBook(bookId, tags, (result) => {
              if (!result) {
                res.status(500).send({
                message: "failed to connect booktag",
                data: null,
                error: result
              })
              } else {
                connectTagReview(reviewId, tags, (result) => {
                  if (!result) {
                    res.status(500).send({
                    message: "failed to connect reviewtag",
                    data: null,
                    error: result
                  })
                }
                res.status(200).send({
                  message: "succeed to post new review ",
                  data: reviewId,
                  error: null
                })
                })
              }
            })
          })   
        })
      } else {
        const datetime = new Date();
        postReview(bookId, review_title, review_content, datetime, user_id, 0, 0, datetime, (err, reviewId) => {
          if (err) {
            res.status(500).send({
              message: "failed to post review",
              data: null,
              error: err
            })
          }
          connectTagBook(bookId, tags, (result) => {
            if (!result) {
              res.status(500).send({
              message: "failed to connect booktag",
              data: null,
              error: result
            })
            } else {
              connectTagReview(reviewId, tags, (result) => {
                if (!result) {
                  res.status(500).send({
                  message: "failed to connect reviewtag",
                  data: null,
                  error: result
                })
              }
              res.status(200).send({
                message: "succeed to post new review",
                data: reviewId,
                error: null
              })
              })
            }
          })
        })
      }
     });
    })
  })
  //나의 리뷰
  router.get('/myReview', (req, res)=>{
    const { user_id } = req.query
    const sql = 'select * from t_review where user_id = ?';  
    connection.query(sql, [user_id], (err,result) => {
    if (err) {
      res.send({
        status: false,
        message : "fail",
        result : null,
        error: err
      })
    }
     res.send({
        status: true,
        message : "success",
        result : result,
        error: null
     })
    })
  })
  //내가 좋아한 리뷰
  router.get('/reviewLikes', (req, res, next) => {
    const { user_id } = req.query;
    // checkUserExist(user_id, (err, userId) => {
    //   if (err || userId === -1) {
    //     res.send({
    //       status: false,
    //       message: "user not exist",
    //       data: null,
    //       error: err
    //     })
    //   }
      const sql  = 'select u.user_id, r.review_title, r.review_content, r.likes from t_user u inner join t_review r on u.user_id = r.user_id where u.user_id = ?;'
      connection.query(sql, [user_id], (err, result) => {
        if (err) {
          res.send({
          status: false,
          message: "failed to query",
          data: null,
          error: err
        })
          } else {
            res.send({
              status: true,
              message: "success",
              data: result,
              error: null
          })
        }
      })
    })
  // })
  
  // 내가 북마크한 책
  router.get('/myBookmark', (req, res, next) => {
  const {  user_id } = req.query;
  console.log('내가 넣은 값은 =', req.query)
  console.log(  user_id )
  
    
      let sql = 'select bm.bookmark_idx, u.user_id, b.book_idx from t_bookmark bm, t_user u, t_book b where u.user_id = bm.user_id and bm.book_idx = b.book_idx and u.user_id = ?;'
      connection.query(sql, [ user_id ], (err, result) => {
        console.log('결과', result)
        if(err) {
          console.log('결과값 에러')
          console.log(err)
        } else {
          res.send({
            message : 'success',
            review : result
          })
        }
      })
    })
  
  // 나의 질문
  router.get('/myquestion', (req,res, next) => {
    const { user_id} = req.query;
    console.log('내가 넣은 값은 =', req.query)
    console.log( user_id)
  
    // checkUserExist(user_id, (err, userId) => {
    //   if (err || userId === -1) {
    //     console.log("HAHA")
    //     res.send({
    //       "status": false,
    //       "message": "user not exist",
    //       "data": null,
    //       "error": err
    //     })
    //   }
      let sql = 'select q.q_idx, q.q_title, q.q_content, q.created_at, u.user_id, q.q_views from t_question q inner join t_user u on q.user_id = u.user_id where u.user_id =?;'
      connection.query(sql, [user_id], (err, result) => {
        console.log('결과', result)
        if(err) {
          console.log('결과값 에러')
          console.log(err)
        } else {
          res.send({
            message : 'success',
            review : result
          })
        }
      }) 
    })
  // })
  
  // 08-11일 민재 작업
  router.post('/addlikescount', (req,res) => {
    const {review_idx, book_idx, review_title, review_content, created_at, user_id, likes, dislikes, updated_at} = req.body;
    console.log('내가 넣은 값', req.body)
    const addlikesCount = 'UPDATE t_review SET likes = likes + 1 WHERE review_idx = ?'
    connection.query(addlikesCount, [review_idx, book_idx, review_title, review_content, created_at, user_id, likes, dislikes, updated_at], (err, result) => {
      console.log('결과', result)
      if(err) {
        console.log('결과값 에러')
        console.log(err)
      } else {
        res.send({
          status : 1,
          message : 'success',
          review : result
        })
      }
    })
  })
  
  //2023-08-13~14 민재 ..나중에 쓸려면 쓸 답변 등록 
  router.post('/insertAnswer', (req,res) => {
    const {ans_idx, q_idx, ans_content, answered_at, user_id, choiced_yn} = req.body;
    console.log('내가 넣은 값', req.body)
    const insertAnswer = 'insert into t_answer values(?,?,?,?,?,?)'
    connection.query(insertAnswer, [ans_idx, q_idx, ans_content, answered_at, user_id, choiced_yn], (err, result) => {
      console.log('결과', result)
      if (err) {
        console.log('결과값 에러')
        console.log(err)
      } else {
        res.send({
          status : 1,
          message : 'success',
          review : result
        })
      }
    })
  })
  // 2023-08-13~14 민재 ..답변 내용 수정
  router.post('/updateAnswer', (req,res) => {
    const {ans_content, ans_idx} = req.body;
    console.log('내가 넣은 값', req.body)
    const updateAnswer = 'update t_answer set ans_content = ? where ans_idx = ?; '
    connection.query(updateAnswer, [ans_content, ans_idx], (err, result) => {
      console.log('결과', result)
      if (err) {
        console.log('결과값 에러')
        console.log(err)
      } else {
        res.send({
          status : 1,
          message : 'success',
          review : result
        })
      }
    }
  )})
  // 리뷰 삭제
  router.post('/reviewDelete', (req, res) => {
    const { review_idx, user_id } = req.body;
    // 유저 확인
    checkUserExist(user_id, (err, userId) => {
      if (err || userId === -1) {
        console.log("user not exist2")
        res.send({
          status: 0,
          message: "user not exist",
          data: null,
          error: err
        })
        return
      }
      // 리뷰 존재 확인
      const checkReviewQuery = "SELECT * FROM t_review WHERE review_idx = ?";
      connection.query(checkReviewQuery, [review_idx], (err, result) => {
        if (err) {
          console.log(err);
          res.send({
            message: "리뷰 삭제 중 오류 발생",
            status: -1
          });
          return;
        }
        if (result.length === 0 || String(result[0].user_id) !== String(user_id)) {
          res.send({
            message: "해당 리뷰를 찾을 수 없습니다.",
            status: 0
          })
          return;
        }
        // 3. 리뷰 작성자 확인 => 세션값 확인 여부 
        const review = result[0];
        const checkUserQuery = "SELECT * FROM t_user WHERE user_id = ?";
        connection.query(checkUserQuery, [review.user_id], (err, userResult) => {
          if (err) {
            console.log(err);
            res.status(500).send({
              message: "리뷰 작성자 확인 중 오류 발생",
              status: -1
            });
            return;
          }
          if (result.length === 0) {
            res.status(404).send({
              message: "해당 리뷰를 찾을 수 없습니다.",
              status: 0
            });
            return;
          }
          // 댓글 삭제
          const deleteCommentsQuery = "DELETE FROM t_comment WHERE review_idx = ?";
          connection.query(deleteCommentsQuery, [review_idx], (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send({
                message: "댓글 삭제 중 오류 발생",
                status: -1
              });
              return;
            }
            // 4. 리뷰 삭제
            const deleteReviewQuery = "DELETE FROM t_review WHERE review_idx = ?";
            connection.query(deleteReviewQuery, [review_idx], (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).send({
                  message: "리뷰 삭제 중 오류 발생",
                  status: -1
                });
                return;
              }
              res.send({
                message: "리뷰 삭제 성공",
                status: 1
              });
            })
          })
        })
      })
    })
  })
  
  // 리뷰 수정
  router.post('/reviewFix', (req, res) => {
    const { review_idx, review_content, user_id } = req.body;
    console.log(req.body)
    // 리뷰 작성자 확인
    const checkAuthorQuery = 'SELECT user_id FROM t_review WHERE review_idx = ?';
    connection.query(checkAuthorQuery, [review_idx], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: '리뷰 수정 중 오류 발생',
          status: -1
        });
        return;
      }
      // 리뷰 작성자가 맞는지 확인
      if (result.length === 0 || String(result[0].user_id) !== String(user_id)) {
        console.log("왜 안되지..",result[0].user_id)
        console.log("왜 안되지..",user_id)
        res.status(403).send({
          message: '해당 리뷰의 작성자만 수정할 수 있습니다.',
          status: 0
        });
        return;
      }
      // 리뷰 수정 쿼리 실행
      const updateReviewQuery = 'UPDATE t_review SET review_content = ? WHERE review_idx = ?';
      connection.query(updateReviewQuery, [review_content, review_idx], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: '리뷰 수정 중 오류 발생',
            status: -1
          });
          return;
        }
  
        res.send({
          message: '리뷰 수정 성공',
          status: 1
        });
      })
    })
  })




module.exports = router;