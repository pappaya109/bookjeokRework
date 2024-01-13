import styles from '@/components/common/BookContainer/BookContainer.module.scss'
import Link from 'next/link'

const BookContainer = () => {
    return (
        <div className={styles.contentBg}>


            <article className={styles.wrapper}>
                <ul className={styles.tapMenu}>
                    <li>프론트엔드</li>
                    <li>백엔드</li>
                    <li>프로그래밍 기술</li>
                </ul>

                {/* 더보기, 책장 */}
                <div className={styles.contentBox}>
                        <Link className={styles.moreLink} href={'#'}>더보기</Link>
                       
                        <section className={styles.bookShelf}>
                            <div className={styles.books}>
                                <div className={styles.dummyBook}></div>
                                <div className={styles.dummyBook}></div>
                                <div className={styles.dummyBook}></div>
                                <div className={styles.dummyBook}></div>
                            </div>
                        </section>

                        <section className={styles.bookShelf}>
                            <div className={styles.books}>
                                <div className={styles.dummyBook}></div>
                                <div className={styles.dummyBook}></div>
                                <div className={styles.dummyBook}></div>
                                <div className={styles.dummyBook}></div>
                            </div>
                        </section> 
                </div>
            </article>
        </div>
    )
}

export default BookContainer