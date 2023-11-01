import React from 'react';
import { SliderContainer } from './style.js';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';


function Slider({ bannerList }) {

  return (
    <SliderContainer>
      <div className="before"></div>
      <div className='swiper'>
        <div className='swiper-wrapper'>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            pagination={{ el: '.swiper-pagination', clickable: true }}
          >
          {
            bannerList.map((slider, idx) => {
              return (
                  <SwiperSlide className='slider-nav' key={idx}>
                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                  </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
      <div className='swiper-pagination'></div>
    </div>
    </SliderContainer >
  )
}

export default React.memo(Slider);