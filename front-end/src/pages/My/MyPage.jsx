import React, { useState, useContext, useEffect } from 'react';
import styles from './MyPage.module.scss';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import MyPageBoxBook from '../../components/common/MyPageBox/MyPageBoxBook';
import BookItem from '../../components/common/BookItem/BookItem';
import MyPageNav from '../../components/common/MypageNav/MyPageNav';

const MyPage = () => {
    // 마이페이지 최초화면
    const [MarkList, setMarkList] = useState([]);

    const BookMarkList = async () => {
        //     try {
        //         const res = await axios.get('http://localhost:3333/review/myBookmark?user_id=' + 1)
        //         setMarkList(res.data)
        //         console.log(res)
        //     } catch (error) {
        //         console.log('error')
        //     }
        // }
        useEffect(() => {
            BookMarkList()
        }, [])

        return (
            <div className={styles.Wrapper}>
                    <header>
                        <div className={styles.ProfileBox}>
                        </div>
                        {/* {sessionStorage.getItem('sessionId') && <span className={styles.UserNameSpace}>{sessionStorage.getItem('sessionId')}</span>} */}
                    </header>
                    <div className={styles.ContentWrapper}>
                        <aside className={styles.SideBar}>
                            <MyPageNav />
                        </aside>
                        <article className={styles.ContentBox}>
                            <h2>마이페이지</h2>
                            <hr></hr>
                            <MyPageBoxBook title={'북마크한 책'} path={'/my/bookmark'} item={<BookItem />} />
                            <MyPageBoxBook title={'좋아요 한 리뷰'} path={'/my/likesreview'} item={''} />
                            <MyPageBoxBook title={'내가 쓴 리뷰'} path={'/my/myreview'} item={''} />
                            <MyPageBoxBook title={'내 질문'} path={'/my/myquestion'} item={''} />
                        </article>
                    </div>
            </div>
        )
    }
}
export default MyPage