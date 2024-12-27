import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  A11y,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow"; // Corrected import for coverflow effect

function SwiperC() {
  return (
    <Swiper
      modules={[EffectCoverflow, Pagination, A11y, Navigation, Autoplay]}
      effect={"coverflow"}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={{ clickable: true }}
      navigation
      autoplay={{
        delay: 3000,
        disableOnInteraction: true, // Stops autoplay on user interaction
        pauseOnMouseEnter: true, // Stops autoplay when hovered
      }}
      className="mySwiper"
    >
      <SwiperSlide>
        <img src="../../images/project/screenshot (5).png" alt="Project 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../../images/project/screenshot (4).png" alt="Project 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../../images/project/screenshot (5).png" alt="Project 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../../images/project/screenshot (4).png" alt="Project 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../../images/project/screenshot (5).png" alt="Project 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../../images/project/screenshot (4).png" alt="Project 2" />
      </SwiperSlide>
      {/* Add more slides as needed */}
    </Swiper>
  );
}

export default SwiperC;
