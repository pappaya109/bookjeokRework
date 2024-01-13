import React, { useState, useRef } from 'react';
import styles from './JoinPage.module.scss';
import TagList from '../components/TagList';
import OutModifiBtn from '../components/source/Button/OutModifiBtn';
import axios from 'axios';
const JoinPage = () => {
    const [tagList, setTagList] = useState([]);
    const [tagNameList, setTagNameList] = useState([]);

    const [id, setId] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userNick, setUserNick] = useState();

    const handleAddTagList = (tag_idx, tag_name) => {
        setTagList(tagList => [...tagList, { tag_idx: tag_idx, tag_name }]);
    }


    const handleAddTagNameList = (tag_name) => {
        setTagNameList(tagNameList => [...tagNameList, tag_name]);

    }


    const filterTagList = (tag_id) => {
        const filtered = tagList.filter((tag) => {
            return tag.tag_id !== tag_id;
        })
        setTagList(filtered);
    }


    const filterTagNameList = (tag_name) => {
        const filtered = tagNameList.filter((tag) => {
            return tag !== tag_name;
        })
        setTagNameList(filtered);

    }


    /** 중복 아이디 체크 */
    const checkId = () => {
        // idchked, pwchked, idvalid 셋 다 참일때 모든 데이터를 db로 보내도록
        axios.post('http://localhost:3002/user/chkId', {
            user_id: id
        })
    }

    const handleJoin = () => {
        if (password == confirmPassword) {
            axios.post('http://localhost:3002/user/join', {
                user_id: id,
                user_pw: password,
                user_name: userName,
                user_email: userEmail,
                user_nick: userNick,
                tags : tagList
            })
        } else {
            alert("비밀번호를 다시 확인해 주세요")
        }
    }

    return (
        <main className={styles.wrapper}>
            <h2 className={styles.title}>회원가입</h2>
            <div className={styles.signUpArea}>
                <div className={styles.inputBox}>
                    <p className={styles.id}>아이디</p>
                    <div className={styles.signUpIdCon}>
                        <input
                            onChange={(e) => {
                                let regex = /[a-z][0-9]/;
                                regex.test(e.target.value) ?
                                    setId(e.target.value) :
                                    alert('영문 소문자및 숫자만 입력 가능합니다.')
                            }}
                            className={styles.commonInput}
                            type="text"
                            placeholder='영문 소문자 및 숫자만 입력가능합니다.'
                        />
                        <OutModifiBtn
                            title="중복확인"
                            handleClick={checkId}
                        />
                    </div>
                </div>
                <div className={styles.signInput}>
                    <p className={styles.pw}>비밀번호</p>
                    <input
                        className={styles.commonInput}
                        type="password"
                        placeholder='비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)'
                        value={password}
                        onChange={(e) => {
                            let regex = /\S{8,20}/;
                            regex.test(e.target.value) ?
                                setPassword(e.target.value) :
                                alert('공백은 포함되지 않습니다ㄴ.')

                        }}
                    />
                </div>
                <div className={styles.signInput}>
                    <p className={styles.pw}>비밀번호 확인</p>
                    <input
                        className={styles.commonInput}
                        type="password"
                        placeholder='비밀번호 재입력'
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>
                <div className={styles.signInput}>
                    <p className={styles.name}>이름</p>
                    <input
                        className={styles.commonInput}
                        type="text"
                        placeholder='이름을 입력하세요'
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </div>
                <div className={styles.signInput}>
                    <p className={styles.email}>이메일</p>
                    <input
                        className={styles.commonInput}
                        type="email"
                        placeholder='이메일 아이디를 입력하세요'
                        onChange={(event) => setUserEmail(event.target.value)}
                    />
                </div>
                <div className={styles.signInput}>
                    <p className={styles.nick}>닉네임</p>
                    <input
                        className={styles.commonInput}
                        type="text"
                        placeholder='닉네임을 입력하세요'
                        onChange={(event) => setUserNick(event.target.value)}
                    />
                </div>
            </div>
            <div className={styles.tagContainer}>
                <TagList
                    tagNames={tagNameList}
                    handleAddTagNameList={handleAddTagNameList}
                    filterTagNameList={filterTagNameList}
                    tags={tagList}
                    handleAddTagList={handleAddTagList}
                    filterTagList={filterTagList}
                />
            </div>
            <button
                className={styles.btnJoin}
                onClick={handleJoin}
            >
                회원가입
            </button>
        </main >
    )
}

export default JoinPage