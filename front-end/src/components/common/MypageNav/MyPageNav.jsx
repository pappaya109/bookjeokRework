import React from 'react'
import { NavLink } from 'react-router-dom'
const MyPageNav = () => {
    return (
        <ul>
            <li><NavLink to="/my/mypage">마이 페이지</NavLink></li>
            <li><NavLink to="/my/mylibrary">내 서재</NavLink></li>
            <li><NavLink to="/my/mybookmark">북마크</NavLink></li>
            <li><NavLink to="/my/likesreview">좋아요 한 리뷰</NavLink></li>
            <li><NavLink to="/my/myreview">내가 쓴 리뷰</NavLink></li>
            <li><NavLink to="/my/mycomment">내가 쓴 댓글</NavLink></li>
            <li><NavLink to="/my/myquestion">내가 쓴 질문</NavLink></li>
            <li><NavLink to="/my/myinfo">회원정보 수정</NavLink></li>
        </ul>
    )
}

export default MyPageNav