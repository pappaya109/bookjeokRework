const express = require('express');
const router = express.Router();
const conn = require('../src/config/database');

router.get('/randomly', (req, res)=> {
    console.log('Book Router')
    // 테이블을 책 인덱스(내림차순) 으로 정렬한 후, 
    // 1~ 첫번째 인덱스 번호 에서 랜덤으로 3개를 뽑는다.
    

})





module.exports = router; 