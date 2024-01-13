import React from 'react';
import styles from './MyCommentsPage.module.scss';
const MyCommentsPage = () => {
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
            <h2>내가 쓴 댓글</h2>
            <hr></hr>
            <MyPageBoxBook path={'/my/bookmark'} item={<BookItem />} />
          </article>
        </div>
    </div>
  )
}

export default MyCommentsPage