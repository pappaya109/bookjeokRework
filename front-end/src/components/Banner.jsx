import React, { useState, useEffect } from 'react'
import styles from './Banner.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/scss/effect-fade';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss';
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

    useEffect(()=>{
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
                id={styles.pageSwiper}
                className={styles.slides}
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                spaceBetween={50}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                // navigation={true}
                pagination={{ clickable: true, type: 'bullets', }}
                effectFade={true}
            >   
                {
                    exposedBooks.map((a, i) => {
                        return (
                            <SwiperSlide>
                                <article className={styles.book_info}>
                                    <h1>{exposedBooks[i].title}</h1>
                                    <p>{exposedBooks[i].desc}</p>
                                </article>
                                <div className={styles.book}></div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )
};

export default Banner;