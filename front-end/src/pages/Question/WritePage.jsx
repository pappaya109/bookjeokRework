import React, { useRef } from 'react'
import axios from 'axios'
import styles from './WritePage.module.scss'
import FillModifiBtn from '../../components/source/Button/FillModifiBtn';

const WritePage = () => {

    const titleRef = useRef();
    const contentRef = useRef();


    const handleWrite = () => {
        return (
            axios.post
                ('http://localhost:3002/question/postQuestion',
                    {
                        user_id: "",
                        q_title: titleRef.current.value,
                        q_content: contentRef.current.value,
                        q_views: 0
                    }
                )
                .then((res) => {

                })
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
                    <input ref={titleRef} className={styles.commentTitle} type="text" placeholder='제목을 입력하세요' />
                    <textarea ref={contentRef} className={styles.commentArea} cols="50" rows="10" placeholder='내용을 입력하세요' />
                    <div className={styles.fillBtnContainer}>
                        <FillModifiBtn title="등록" handleClick={handleWrite} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WritePage