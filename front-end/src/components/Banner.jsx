import React, { useState, useEffect } from 'react'
import styles from './Banner.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import axios from 'axios';


const Banner = () => {
    let [exposedBooks, setExposedBooks] = useState([
        {
            title: "책 제목입니다1",
            desc: "책 설명입니다1"
        },
        {
            title: "책 제목입니다2",
            desc: "책 설명입니다2"
        },
        {
            title: "책 제목입니다3",
            desc: "책 설명입니다3"
        },
    ])

    useEffect(() => {
        axios.get('http://localhost:3002/book/randomly')
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })
    }, []);


    return (
        <div className={styles.wrapper}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                // autoplay={{ delay: 4000, disableOnInteraction: false }}
                spaceBetween={50}
                pagination={true}
            // effectFade={true}
            >
                {
                    exposedBooks.map((a, i) => {
                        return (
                            <SwiperSlide>
                                <div className={styles.contentBox}>
                                    <p className={styles.bookInfo}>
                                        <h1>{exposedBooks[i].title}</h1>
                                        <p>{exposedBooks[i].desc}</p>
                                    </p>
                                    <div className={styles.book}></div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }

            </Swiper>
        </div>
    )
};

export default Banner;