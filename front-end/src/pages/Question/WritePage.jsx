import React from 'react'
import styles from './WritePage.module.scss'
import FillModifiBtn from '../../components/source/Button/FillModifiBtn';

const WritePage = () => {
    const handleAlert = () => {
        return (
            alert('작성되었습니다!')
        )
    }

    return (
        <div className={styles.rvContainer}>
            <div className={styles.rvBg}>
            </div>
            <div className={styles.titlenInput}>
                <h3>글쓰기</h3>
                {/* 답변 작성 박스 */}
                <div className={`${styles.cnTxt} ${styles.ctBox}`}>
                    <textarea className={styles.commentArea} cols="50" rows="10" placeholder='내용을 입력하세요' />
                    <div className={styles.fillBtnContainer}>
                        <FillModifiBtn title="등록" handleClick={handleAlert} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WritePage