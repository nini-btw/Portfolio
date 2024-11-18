import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../stylesheets/projectS.sass";

function Project() {
  return (
    <>
      <header className="text-center">
        <h2 className="heading heading-sec heading-sec__mb-med">
          <span className="heading-sec__main">About Me</span>
          <span className="heading-sec__sub">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis
            tempora explicabo quae quod deserunt eius sapiente
          </span>
        </h2>
      </header>
      <div className="section swiper-container d-flex align-items-center justify-content-center">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          navigation
          autoplay={{ delay: 3000 }}
          loop
          pagination={{ clickable: true }}
          direction="horizontal"
        >
          <SwiperSlide className="d-flex align-items-center justify-content-center">
            Slide 1
          </SwiperSlide>
          <SwiperSlide className="d-flex align-items-center justify-content-center">
            Slide 2
          </SwiperSlide>
          <SwiperSlide className="d-flex align-items-center justify-content-center">
            Slide 3
          </SwiperSlide>
          <SwiperSlide className="d-flex align-items-center justify-content-center">
            Slide 4
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
export default Project;
