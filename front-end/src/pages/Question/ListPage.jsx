import React from 'react'
import styles from './ListPage.module.scss';

const ListPage = () => {
    return (
        <section className={styles.listSection}>
            <div>
                <div className={styles.listTitle}>
                    <h1>개발인</h1>
                    <div className={styles.button}>
                        <FillButton
                            title="질문등록"
                            handleClick={handleClick}
                        />
                    </div>
                </div>
                {
                    qnaData.map((a, i) => {
                        return (
                            <div className='styles.qnaCardContainer'
                                style={{ marginBottom: '1rem' }} onClick={() => {
                                    window.location.href = '/qna/qnapost'
                                }}>
                                <QnACard
                                    title={qnaData[i].title}
                                    commentCnt={qnaData[i].commentCnt}
                                    body={qnaData[i].body}
                                    username={qnaData[i].username}
                                    date={qnaData[i].date}
                                    tags={qnaData[i].tags}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </section >
    )
}

export default ListPage