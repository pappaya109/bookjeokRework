import React from 'react'
import styles from './Header.module.scss'
import FillButton from '../components/source/Button/FillButton'
import { Link } from 'react-router-dom'

const Header = () => {
    const handleClick = () => {
        console.log('Clicked^ㅅ^')
    }
    return (
        <section className={styles.WrapHeader}>
            {/*우측 최상단 네비게이션 */}
            <nav className={styles.userNav}>
                <FillButton title={"책 추가"} handleClick={console.log(handleClick)} />
                <Link className={styles.MenuLink} href={'#'}>로그인</Link>
                <Link className={styles.MenuLink} href={'#'}>회원가입</Link>
            </nav>

            {/* 로고 */}
            <div className={styles.logo}>
            <Link href="/">
                <img src='/logo.svg' />
                {/* <Image className={styles.logo} src={"/assets/logo.svg"}
                    width={168}
                    height={52}
                /> */}
            </Link>
            </div>

            {/* 메뉴 네비게이션 */}
            <nav className={styles.mainNav}>
                <Link className={styles.MenuLink} href={'#'} >개발 도서관</Link>
                <Link className={styles.MenuLink} href={'#'}>개발 인</Link>
            </nav>
        </section>
    )
}

export default Header