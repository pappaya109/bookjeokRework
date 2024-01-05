import React from 'react'
import styles from './DetailPage.module.scss'
import FillModifiBtn from '../../components/source/Button/FillModifiBtn';
import AnswerCard from '../../components/common/AnswerCard/AnswerCard';

const DetailPage = () => {

    const handleAlert = () => {
        return (
            alert('변경되었습니다!')
        )
    }

    return (
        // questionData, answerData는 다 더미데이터 이름-> 추후에 변경 작업할 것 
        <div className={styles.rvContainer}>
            <div className={styles.rvBg}>
            </div>
            <div className={styles.titlenInput}>
                <h3>{questionData.title}</h3>
                <h5>{questionData.author}</h5>
                <div className={`${styles.cnTxt} ${styles.ctBox}`}>
                    <p className={styles.reviewCtx}>
                        {questionData.content}
                    </p>
                </div>

                {/* 답변 작성 박스 */}
                <div className={`${styles.cnTxt} ${styles.ctBox}`}>
                    <textarea className={styles.commentArea} cols="50" rows="10" placeholder='내용을 입력하세요' />
                    <div className={styles.fillBtnContainer}>
                        <FillModifiBtn title="등록" handleClick={handleAlert} />
                    </div>
                </div>

                {/* 답변 */}
                {
                    answerData.map((a, i) => {
                        return (
                            <div className={styles.aCardwrapper}>
                                <AnswerCard userName={answerData[i].author} content={answerData[i].answercontent} />
                            </div>
                        )

                    })
                }


            </div>

        </div>
    )
}

export default DetailPage