import React from 'react';
import styles from './MyLibraryPage.module.scss';
const MyLibrarypage = () => {
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
                        <h2>내 서재</h2>
                        <hr></hr>
                        <MyPageBoxBook path={'/my/bookmark'} item={<BookItem />} />
                    </article>
                </div>
        </div>
    )
}

export default MyLibrarypage