import React from 'react';
import styles from './BookmarkPage.module.scss';
const BookmarkPage = () => {
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
            <h2>북마크</h2>
            <hr></hr>
            <MyPageBoxBook path={'/my/bookmark'} item={<BookItem />} />
          </article>
        </div>
    </div>
  )
}

export default BookmarkPage