import Header from '../components/Header';
import Footer from '../components/Footer';

import Banner from '../components/Banner';
import Search from '../components/Search';
import BookContainer from '../components/BookContainer';

import React, { useContext } from 'react';
import { modalStore } from '../App';
const Mainpage = () => {
    const { showModal, setShowModal } = useContext(modalStore);
    return (
        <div>
            <Header />
            <Banner />
            <Search />
            <BookContainer />
            <Footer />
        </div>
    )
}

export default Mainpage