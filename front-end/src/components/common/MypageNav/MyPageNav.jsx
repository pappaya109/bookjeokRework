import React from 'react'
import styles from './MyPageNav.module.scss';
import { NavLink } from 'react-router-dom'
const MyPageNav = () => {
    return (
        <ul className={styles.sideBar}>
            <NavLink to="/my/mypage">
                {({ isActive, isPending }) => (
                    <li className={isActive ? `${styles.active}` : ""}>마이 페이지</li>
                )}
            </NavLink>
            <NavLink to="/my/mylibrary">
                {({ isActive, isPending }) => (
                    <li className={isActive ? `${styles.active}` : ""}>내 서재</li>
                )}
            </NavLink>
            <NavLink to="/my/mybookmark">
                {({ isActive, isPending }) => (
                    <li className={isActive ? `${styles.active}` : ""}>북마크</li>
                )}
            </NavLink>
            <NavLink to="/my/likesreview">
                {({ isActive, isPending }) => (
                    <li className={isActive ? `${styles.active}` : ""}>좋아요 한 리뷰</li>
                )}
            </NavLink>
            <NavLink to="/my/myreview">
                {({ isActive, isPending }) => (
                    <li className={isActive ? `${styles.active}` : ""}> 내가 쓴 리뷰</li>
                )}
            </NavLink>
            <NavLink to="/my/mycomment">
                {({ isActive, isPending }) => (
                    <li className={isActive ? `${styles.active}` : ""}>내가 쓴 댓글</li>
                )}
            </NavLink>
            <NavLink to="/my/myquestion">
                {({ isActive, isPending }) => (
                    <li className={isActive ? `${styles.active}` : ""}>내가 쓴 질문</li>
                )}
            </NavLink>
            <NavLink to="/my/myinfo">
                {({ isActive, isPending }) => (
                    <li className={isActive ? `${styles.active}` : ""}>회원정보 수정</li>
                )}
            </NavLink>
        </ul>
    )
}

export default MyPageNav