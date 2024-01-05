import React from 'react'
import styles from './QnACard.module.scss';

const QnACard = ({ title, commentCnt, body, username, date, tags }) => {
    return (
        <section className={styles.qnaContainer}>
            <div className={styles.qnaHeader}>
                <div className={styles.qnaTitle}>{title}</div>
                <div className={styles.talkbubbleBox}>{commentCnt}
                    <img src={"/assets/talkBubbles.png"} alt='a' width={15} height={20} />
                </div>
            </div>
            <div className={styles.qnaBody}>
                {body}
            </div>
            <div className={styles.qnaInfo}>
                <div className={styles.qnaProfile}>
                    <div className={styles.profileImg}>
                        <img src={"/assets/profile.svg"} alt='a' width={32} height={32} />
                    </div>
                    <div className={styles.usernameWapper}>
                        <div className={styles.username}>
                            {username}
                        </div>
                        <div className={styles.qnaCreatedAt}>
                            {date}
                        </div>
                    </div>
                </div>
                <div className={styles.tagContainer}>
                    {tags.map((tag) => {
                        return (
                            <div key={tag.tag_id} className={styles.qnaTag}>
                                #{tag.tag_name}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default QnACard