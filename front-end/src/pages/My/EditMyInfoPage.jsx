import React, { useState } from 'react';
import styles from './EditMyInfoPage.module.scss';
import MypageNav from '../../components/common/MypageNav/MyPageNav';
import FillModifiBtn from '../../components/source/Button/FillModifiBtn';
const EditMyInfoPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleAlert = () => {
    return (
      alert('변경되었습니다!')
    )
  }
  const handleEdit = () => {
    if (currentPassword === newPassword) {
      alert('새로운 비밀번호는 현재 비밀번호와 다르게 설정해주세요.');
      return;
    }
    //새로운 비밀번호 업데이트 로직 추가
    //console.log('비밀번호 업데이트 완료')
  }
  return (
    <div className={styles.Wrapper}>
        <header>
          <div className={styles.ProfileBox}>
          </div>
        </header>
        <div className={styles.ContentWrapper}>
          <aside className={styles.SideBar}>
            <MypageNav />
          </aside>
          <article className={styles.ContentBox}>
            <div className={styles.infoEdit}>
              <h3>회원정보수정</h3>
              <hr />
              <div className={styles.editArea}>
                <div className={styles.editInput}>
                  <p className={styles.name}>이름</p>
                  <input className={styles.nameInput} type="text" placeholder='송민재' disabled />
                </div>

                <div className={styles.editInput}>
                  <p className={styles.email}>이메일</p>
                  <input className={styles.emailInput} type="email" placeholder='smj1234@gmail.com' disabled />
                </div>

                <div className={styles.editInput}>
                  <p className={styles.nick}>닉네임</p>
                  <input className={styles.commonInput} type="text" placeholder='닉네임을 입력하세요' />
                </div>

                <div className={styles.editInput}>
                  <p className={styles.pw}>현재 비밀번호</p>
                  <input className={styles.commonInput} type="password" placeholder='현재 비밀번호' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </div>

                <div className={styles.editInput}>
                  <p className={styles.pw}>변경할 비밀번호</p>
                  <input className={styles.commonInput} type="password" placeholder='비밀번호 재입력' value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} />
                </div>

                <FillModifiBtn
                  title="변경하기"
                  handleClick={handleAlert}
                />
              </div>
            </div>
          </article>
        </div>
    </div >
  )
}

export default EditMyInfoPage