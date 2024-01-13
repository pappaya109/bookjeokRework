import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MyPageBoxBook.module.scss';
const MyPageBoxBook = ({ title, path, item, imgUrls }) => {
    return (
        <div className={styles.ContentItem}>
            <h3>{title}</h3>
            <div className={styles.LinkWrapper}>
                <Link href={path} className={styles.moreLink}>더보기</Link>
            </div>
            <div className={styles.BookWrapper}>
                {/* 반복문 돌릴 컴포넌트  인자는 item 임 */}
                <img href/>
            </div>
        </div>
    )
}

export default MyPageBoxBook