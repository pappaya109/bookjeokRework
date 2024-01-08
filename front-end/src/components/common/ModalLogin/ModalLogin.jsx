import React, { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './ModalLogin.module.scss';
import axios from 'axios';

const ModalLogin = () => {
  // const { loginModalClose } = useContext();
  // const { userIdHandler, loginHandler } = useContext();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // const handleLogin = () => {
  //     try {
  //       const response = await axios.post('http://localhost:3333/user/login', {
  //         user_id: userId,
  //         user_pw: password
  //       })
  //       console.log(response)
  //       alert("로그인에 성공하였습니다.");
  //       sessionStorage.setItem('sessionId',response.data.userInfo[0].user_id)
  //       loginModalClose();
  //       userIdHandler(response.data.userInfo[0].user_id);
  //       loginHandler()
  //       push('/')
  //     } catch (err) {
  //       alert("로그인에 실패하였습니다")
  //     }
  // }
  const inputRef = useRef([]);

  /** 로그인 기능 */
  const handleLogin = () => {
    axios.post('http://localhost:3002/user/login', {
      user_id : inputRef.current[0].value,
      user_pw : inputRef.current[1].value
    })
    .then(res => {
      console.log(res.data)
    })
  }
  return (
    <section className={styles.wrapper}>
      <div className={styles.modal}>
        <div className={styles.btnBox}>
          <button className={styles.close}
          // onClick={loginModalClose}
          >
            x
          </button>
        </div>
        <h1>로그인</h1>
        <hr />
        <div className={styles.logCon}>
          <p className={styles.id}>사용자아이디</p>
            <input
              type="text"
              placeholder='아이디를 입력해주세요'
              ref={el => inputRef.current[0] = el}
            // onChange={(event) => setUserId(event.target.value)}
            />
            <p className={styles.pw}>비밀번호</p>
            <input
              type="password"
              placeholder='비밀번호를 입력해주세요'
              ref={el => inputRef.current[1] = el}
            // onChange={(event) => setPassword(event.target.value)}  
            />
            <button
              className={styles.btn_login}
              onClick={handleLogin}
            >
              로그인
            </button>
          <Link href="/join">회원이 아니신가요?</Link>
        </div>
      </div>
    </section>
  )
}

export default ModalLogin