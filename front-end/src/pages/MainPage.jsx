import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import Banner from '../components/Banner';
import Search from '../components/Search';
import BookContainer from '../components/BookContainer';

const Mainpage = () => {
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