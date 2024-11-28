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
import "swiper/css/effect-fade"; // Import CSS for fade effect

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
      pagination={true}
      className="mySwiper"
      loop
      navigation
      autoplay={{
        delay: 1000,
        pauseOnMouseEnter: true,
      }}
    >
      <SwiperSlide>
        <img src="../../images/project/screenshot (5).png" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../../images/project/screenshot (4).png" />
      </SwiperSlide>
    </Swiper>
  );
}

export default SwiperC;
