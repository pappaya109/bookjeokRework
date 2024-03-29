import React, { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './ModalLogin.module.scss';
import axios from 'axios';
import { modalStore } from '../../../App';

const ModalLogin = () => {
  const { showModal, setShowModal, isLogined, setIsLogined } = useContext(modalStore);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  /** 로그인 기능 */
  const handleLogin = () => {
    axios.post('http://localhost:3002/user/login', {
      user_id : id,
      user_pw : password
    })
    .then(res => {
      if(res.data.msg == 'login success') {
        // sessionStorage.setItem('isLogined', true)
        setIsLogined(true)
        alert("로그인에 성공했습니다!")
        // 로그인이 성공하면 클라이언트 쪽의 sessionStorage에 성공했다는 상태값만 업데이트
        // 별개로 서버 쪽 session에 필요한 값들(비밀번호 제외)를 저장해놓으면 좋을 듯.
        setShowModal(false)
      } else {
        alert('로그인에 실패했습니다...')
        setIsLogined(false)
      }
    })
  }

  /** modal show/close 기능 */ 
  const handleModal = () => {
    if (!showModal) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.modal}>
        <div className={styles.btnBox}>
          <button className={styles.close}
          onClick={handleModal}
          >
            x
          </button>
        </div>
        <h1>로그인</h1>
        <hr />
        <div className={styles.logCon}>
          <p className={styles.label}>사용자 아이디</p>
            <input
              type="text"
              placeholder='아이디를 입력해주세요'
              onChange={(e)=> setId(e.target.value)}
            />
            <p className={styles.label}>비밀번호</p>
            <input
              type="password"
              placeholder='비밀번호를 입력해주세요'
              onChange={(e)=> setPassword(e.target.value)}
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