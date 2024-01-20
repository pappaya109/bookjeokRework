const express = require('express');
const router = express.Router();
const config = require('../config/database');

// 질문 등록 인자 값 [ q_title, q_content, user_id, tags ]
router.post('/postQuestion', (req, res) => {
    const { q_title, q_content, user_id, tags } = req.body;
    console.log(req.body)
    checkUserExist(user_id, (err, userId) => {
      if (err || userId === -1) {
        res.send({
          status: false,
          message: "user not exist",
          result: null,
          error: err
        });
        return;
      }
      // 질문 등록 
      const insertQuestionQuery = "INSERT INTO t_question (q_title, q_content, created_at, user_id, q_views) VALUES (?, ?, NOW(), ?, 0)";
      config.query(insertQuestionQuery, [q_title, q_content, user_id], (err, questionResult) => {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: "질문 등록 중 오류 발생",
            status: -1,
            error: err
          });
          return;
        }
  
        // 질문과 태그 관계 등록
        const question_id = questionResult.insertId;
        const insertQuestionTagQuery = "INSERT INTO t_questag (q_idx, tag_idx) VALUES (?, ?)";
        const tagIds = tags.map(tag => tag.tag_idx);
  
        // 비동기 반복 실행을 위한 함수
        function insertTags(tagIds, index) {
          if (index >= tagIds.length) {
            // 모든 태그 등록이 완료되면 질문 등록 성공 메시지를 보내고 종료
            res.send({
              message: "질문 등록 성공",
              status: 1
            });
            return;
          }
  
          const tag_idx = tagIds[index];
          console.log(tag_idx);
          config.query(insertQuestionTagQuery, [question_id, tag_idx], (err, questionTagResult) => {
            if (err) {
              console.log(err);
              res.status(500).send({
                message: "질문과 태그 관계 등록 중 오류 발생",
                status: -1,
                error: err
              });
              return;
            }
  
            console.log("제발 되라", tag_idx);
            // 태그의 tag_count 업데이트
            const updateTagCountQuery = "UPDATE t_tag SET tag_count = tag_count + 1 WHERE tag_idx = ?";
            config.query(updateTagCountQuery, [tag_idx], (err, updateResult) => {
              if (err) {
                console.log(err);
                res.status(500).send({
                  message: "태그 카운트 업데이트 중 오류 발생",
                  status: -1,
                  error: err
                });
                return;
              }
  
              // 다음 인덱스의 태그를 처리하기 위해 재귀 호출
              insertTags(tagIds, index + 1);
            });
          });
        }
  
        // 시작 인덱스 0으로 insertTags 함수 호출
        insertTags(tagIds, 0);
      });
    });
  });
  
  
  
  
  
  
  
  
  // 개발인 질문 조회 후 q_views 업데이트 및 질문 정보 가져오기 api, 인자 값 [q_idx]
  router.post('/getQuestion', (req, res) => {
    const { q_idx } = req.body;
  
    // 질문 조회 후 q_views 업데이트
    const updateViewsQuery = "UPDATE t_question SET q_views = q_views + 1 WHERE q_idx = ?";
    config.query(updateViewsQuery, [q_idx], (err, updateResult) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "q_views 업데이트 중 오류 발생",
          status: -1,
          error: err
        });
        return;
      }
  
      // 질문 정보 가져오기
      const getQuestionQuery = "SELECT * FROM t_question WHERE q_idx = ?";
      config.query(getQuestionQuery, [q_idx], (err, questionResult) => {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: "질문 정보 조회 중 오류 발생",
            status: -1,
            error: err
          });
          return;
        }
  
        if (questionResult.length === 0) {
          res.send({
            message: "해당 질문이 존재하지 않습니다.",
            status: 0
          });
          return;
        }
  
        res.send({
          message: "질문 정보 조회 및 q_views 업데이트 성공",
          status: 1,
          questions : questionResult
        });
      });
    });
  });
  
  
  
  
  module.exports = router;