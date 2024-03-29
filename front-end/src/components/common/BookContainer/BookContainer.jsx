import styles from './BookContainer.module.scss';
import { NavLink, Link } from 'react-router-dom';

const BookContainer = () => {
    return (
        <div className={styles.wrapper}>
            <ul className={styles.tapMenu}>
                <NavLink to="#" >
                    {({ isActive, isPending }) => (
                        <li className={isActive ? `${styles.active}` : ""}>프론트엔드</li>
                    )}
                </NavLink>
                <NavLink to="#" >
                    {({ isActive, isPending }) => (
                        <li className={isActive ? `${styles.active}` : ""}>백엔드</li>
                    )}
                </NavLink>
                <NavLink to="#" >
                    {({ isActive, isPending }) => (
                        <li className={isActive ? `${styles.active}` : ""}>프로그래밍 기술</li>
                    )}
                </NavLink>
            </ul>
            <section className={styles.contentBox}>
                <Link className={styles.moreLink} href={'#'}>더보기</Link>
                <section className={styles.bookShelf}>
                    <div className={styles.books}>
                        <div className={styles.dummyBook}></div>
                        <div className={styles.dummyBook}></div>
                        <div className={styles.dummyBook}></div>
                        <div className={styles.dummyBook}></div>
                    </div>
                    <div className={styles.rectangle}></div>
                </section>
                <section className={styles.bookShelf}>
                    <div className={styles.books}>
                        <div className={styles.dummyBook}></div>
                        <div className={styles.dummyBook}></div>
                        <div className={styles.dummyBook}></div>
                        <div className={styles.dummyBook}></div>
                    </div>
                    <div className={styles.rectangle}></div>
                </section>
            </section>
        </div>
    )
}

export default BookContainer