import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import OutlineInput from '../components/source/Input/OutlineInput'
import BookContainer from '../components/common/BookContainer/BookContainer';
import styles from './MainPage.module.scss';
import React, { useContext } from 'react';
import { modalStore } from '../App';
const Mainpage = () => {
    const { showModal, setShowModal } = useContext(modalStore);
    return (
        <div className={styles.wrapper}>
            <header className={styles.mainHeader}>
                <Header />
                <Banner />
            </header>
            <section className={styles.searchBar}>
                <OutlineInput btnTxt={"검색"} />
            </section>
            <main className={styles.mainContents}>
                <BookContainer />
            </main>
            <Footer />
        </div>
    )
}

export default Mainpage