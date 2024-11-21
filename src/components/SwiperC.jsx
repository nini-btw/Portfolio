import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade"; // Import CSS for fade effect

function SwiperC() {
  let imgS = "https://placehold.co/900x500";
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]} // Include EffectFade module
      effect="coverflow" // Set the effect to fade
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide className="d-flex align-items-center justify-content-center">
        <img src={imgS} alt="" />
      </SwiperSlide>
      <SwiperSlide className="d-flex align-items-center justify-content-center">
        <img src={imgS} alt="" />
      </SwiperSlide>
      <SwiperSlide className="d-flex align-items-center justify-content-center">
        <img src={imgS} alt="" />
      </SwiperSlide>
      <SwiperSlide className="d-flex align-items-center justify-content-center">
        <img src={imgS} alt="" />
      </SwiperSlide>
      <SwiperSlide className="d-flex align-items-center justify-content-center">
        <img src={imgS} alt="" />
      </SwiperSlide>
      <SwiperSlide className="d-flex align-items-center justify-content-center">
        <img src={imgS} alt="" />
      </SwiperSlide>
      <SwiperSlide className="d-flex align-items-center justify-content-center">
        <img src={imgS} alt="" />
      </SwiperSlide>
    </Swiper>
  );
}

export default SwiperC;
