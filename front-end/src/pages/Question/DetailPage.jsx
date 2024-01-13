import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import styles from './DetailPage.module.scss'
import FillModifiBtn from '../../components/source/Button/FillModifiBtn';
import AnswerCard from '../../components/common/AnswerCard/AnswerCard';

const DetailPage = () => {

    const [questionData, setQuestionData] = useState({});
    const [answerData, setAnswerData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3002/question/getQuestion')
            .then(res => res.json())
            .then(data => setQuestionData(data));

        fetch('http://localhost:3002/question/getAnswer')
            .then(res => res.json())
            .then(data => setAnswerData(data));
    }, []);

    const aContentRef = useRef();

    const handleCommentWrite = () => {
        return (
            axios.post
                ('http://localhost:3002/question/insertAnswer',
                    {
                        user_id: "",
                        a_content: aContentRef.current.value
                    }
                )
                .then(res => {

                })

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
                    <textarea className={styles.commentArea} ref={aContentRef} cols="50" rows="10" placeholder='내용을 입력하세요' />
                    <div className={styles.fillBtnContainer}>
                        <FillModifiBtn title="등록" handleClick={handleCommentWrite} />
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