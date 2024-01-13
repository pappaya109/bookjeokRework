const express = require('express');
const router = express.Router();
const conn = require('../config/database');


// 중복 아이디 확인
router.post('/chkId', (req, res) => {
    // console.log('check Id router!', req.body)
    let { user_id } = req.body;

    conn.query(sql, [id], (err,rows)=>{
        if (err == null) {
            if (rows.length > 0) {
                res.json({msg: 'dub'})
            } else {
                res.json({
                    msg: 'uniq'
                })
            }
        }
    })
})
// 회원가입 
router.post('/join', (req, res)=>{
    console.log('join router',req.body)
    const { user_id, user_pw, user_name, user_email, user_nick, tags } = req.body
    let sql = 'INSERT INTO user_table (user_id, user_pw, user_name, user_email, user_nick, tags) value(?, ?, ?, ?, ?, ?)'
    conn.query(sql, [user_id, user_pw, user_name, user_email, user_nick, tags], (err, rows)=>{
        console.log(rows)
        if(rows) {
            res.json({
                msg: 'join success!'
            })
        } else {
            res.json({
                msg: 'join failed'
            })
        }
    })
})

// 로그인 
router.post('/login', (req, res)=>{
    console.log(req.body)
    let { user_id, user_pw } = req.body;
    let sql = 'SELECT user_nick FROM t_user WHERE user_id = ? AND user_pw = ?'
    conn.query(sql, [user_id, user_pw], (err,rows)=>{
        if(rows) {
            console.log(rows)
            res.json({
                msg: 'login success',
                user_nick : rows[0].user_nick
            })
        }
        else {
            res.json({
                msg: 'login failed'
            })
        }
    })
})

// 회원정보 수정

// 회원 탈퇴


module.exports = router;