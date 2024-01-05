import React, { useContext, useState, } from 'react';
import { Link } from 'react-router-dom';
import styles from './ModalLogin.module.scss';


const ModalLogin = () => {
  // const { loginModalClose } = useContext();
  // const { userIdHandler, loginHandler } = useContext();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin =  () => {
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
  }
  return (
    <section className={styles.wrapper}>
      <div className={styles.modal}>  
        <button className={styles.close} 
        // onClick={loginModalClose}
        >
          x
        </button>
        <h1>로그인</h1>
        <hr />
        <div className={styles.logCon}>
          <p className={styles.id}>사용자아이디</p>
          <input 
            type="text" 
            placeholder='아이디를 입력하시오'
            // onChange={(event) => setUserId(event.target.value)}
          />
          <p className={styles.pw}>비밀번호</p>
          <input 
            type="password" 
            placeholder='비밀번호를 입력하시오'
            // onChange={(event) => setPassword(event.target.value)}  
          />
          <button 
            className={styles.btn_login} 
            // onClick={handleLogin}
            >로그인</button>
          <Link href="/join">회원이 아니신가요?</Link>
        </div>
      </div>
    </section>
  )
}

export default ModalLogin