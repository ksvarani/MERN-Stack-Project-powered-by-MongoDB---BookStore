import React, {useRef, useState} from 'react'
// Import Swiper React component 
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles 
import 'swiper/css';
import 'swiper/css/effect-cards';

import './BannerCard.css';
import book1 from '../../../assets/banner-books/book1.png'
import book2 from '../../../assets/banner-books/book2.png'
import book3 from '../../../assets/banner-books/book3.png'
import book4 from '../../../assets/banner-books/book4.png'
import book5 from '../../../assets/banner-books/book5.png'


import {EffectCards} from 'swiper/modules';

export const BannerCard = () => {
  return (
    <div className='banner'>
        <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className='mySwiper'
        >
            <SwiperSlide><img src={book1} alt="" className=' w-full'/></SwiperSlide>
            <SwiperSlide><img src={book2} alt="" className=' w-full'/></SwiperSlide>
            <SwiperSlide><img src={book3} alt="" className=' w-full'/></SwiperSlide>
            <SwiperSlide><img src={book4} alt="" className=' w-full'/></SwiperSlide>
            <SwiperSlide><img src={book5} alt="" className=' w-full'/></SwiperSlide>

        </Swiper>
    </div>
  )
}
