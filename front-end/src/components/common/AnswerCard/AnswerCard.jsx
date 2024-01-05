import React from "react";
import styles from './AnswerCard.module.scss'

const AnswerCard = ({ userName, content }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.titleArea}>
                <h3>{userName}</h3>
                {/* 유저 이름 옆 체크표시 추후 작업 <img /> */}
            </div>
            <p>{content}</p>
        </div>
    )
}

export default AnswerCard