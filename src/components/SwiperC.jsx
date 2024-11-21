import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
function SwiperC() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 3000 }}
      loop
      pagination={{ clickable: true }}
      direction="horizontal"
    >
      <SwiperSlide className="d-flex align-items-center justify-content-center">
        <img src="https://placehold.co/900x500/000000/FFF" alt="" />
      </SwiperSlide>
    </Swiper>
  );
}

export default SwiperC;
