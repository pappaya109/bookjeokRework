import React from 'react'
import styles from './MyQuestionPage.module.scss'
const MyQuestionPage = () => {
  return (
    <div className={styles.Wrapper}>
        <header>
          <div className={styles.ProfileBox}>
          </div>
        </header>
        <div className={styles.ContentWrapper}>
          <aside className={styles.SideBar}>
            <MyPageNav />
          </aside>
          <article className={styles.ContentBox}>
            <h2>내가 쓴 질문</h2>
            <hr></hr>
            <MyPageBoxBook path={'/my/bookmark'} item={<BookItem />} />
          </article>
        </div>
    </div>
  )
}

export default MyQuestionPage