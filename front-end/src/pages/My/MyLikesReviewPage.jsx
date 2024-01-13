import React from 'react';
import styles from './MyLikesReviewPage.module.scss';
const MyLikesReviewPage = () => {
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
                        <h2>좋아요 한 리뷰</h2>
                        <hr></hr>
                        <MyPageBoxBook path={'/my/bookmark'} item={<BookItem />} />
                    </article>
                </div>
        </div>
    )
}

export default MyLikesReviewPage