import React from 'react'
import styles from './JoinPage.module.scss'

const JoinPage = () => {
    return (
        <main className={styles.wrapper}>
            <h2 className={styles.title}>회원가입</h2>


            <div className={styles.signUpArea}> 
                    <div className={styles.inputBox}>
                        <p className={styles.id}>아이디</p>
                        <div className={styles.signUpIdCon}>
                            <input
                                className={styles.idInput}
                                type="text"
                                placeholder='영문 소문자 및 숫자만 입력가능합니다.'
                                // onChange={(event) => setUserId(event.target.value)}
                            />
                            {/* <OutModifiBtn
                    title="중복확인"
                    handleClick={''}
                  /> */}
                        </div>
                    </div>
                    <div className={styles.signInput}>
                        <p className={styles.pw}>비밀번호</p>
                        <input
                            className={styles.commonInput}
                            type="password"
                            placeholder='비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)'
                            // value={password}
                            // onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className={styles.signInput}>
                        <p className={styles.pw}>비밀번호 확인</p>
                        <input
                            className={styles.commonInput}
                            type="password"
                            placeholder='비밀번호 재입력'
                            // value={confirmPassword}
                            // onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </div>
                    <div className={styles.signInput}>
                        <p className={styles.name}>이름</p>
                        <input
                            className={styles.commonInput}
                            type="text"
                            placeholder='이름을 입력하세요'
                            // onChange={(event) => setUserName(event.target.value)}
                        />
                    </div>
                    <div className={styles.signInput}>
                        <p className={styles.email}>이메일</p>
                        <input
                            className={styles.commonInput}
                            type="email"
                            placeholder='이메일 아이디를 입력하세요'
                            // onChange={(event) => setUserEmail(event.target.value)}
                        />
                    </div>
                    <div className={styles.signInput}>
                        <p className={styles.nick}>닉네임</p>
                        <input
                            className={styles.commonInput}
                            type="text"
                            placeholder='닉네임을 입력하세요'
                            // onChange={(event) => setUserNick(event.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.tagContainer}>
                    {/* <TagList
                        tagNames={tagNameList}
                        handleAddTagNameList={handleAddTagNameList}
                        filterTagNameList={filterTagNameList}
                        tags={tagList}
                        handleAddTagList={handleAddTagList}
                        filterTagList={filterTagList}
                    /> */}
                </div>
                <button
                    className={styles.btnJoin}
                    // onClick={handleJoin}
                    >
                    회원가입
                </button>
        </main >
    )
}

export default JoinPage