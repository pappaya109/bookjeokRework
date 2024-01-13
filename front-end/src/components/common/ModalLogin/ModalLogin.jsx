import React, { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './ModalLogin.module.scss';
import axios from 'axios';
import { modalStore } from '../../../App';

const ModalLogin = () => {
  const { showModal, setShowModal } = useContext(modalStore);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  /** 로그인 기능 */
  const handleLogin = () => {
    axios.post('http://localhost:3002/user/login', {
      user_id : id,
      user_pw : password
    })
    .then(res => {
      console.log(res.data)
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
          <p className={styles.id}>사용자아이디</p>
            <input
              type="text"
              placeholder='아이디를 입력해주세요'
              onChange={(e)=> setId(e.target.value)}
            />
            <p className={styles.pw}>비밀번호</p>
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