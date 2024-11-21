import "swiper/css";
import SwiperC from "./SwiperC";

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
        <SwiperC />
      </div>
    </>
  );
}
export default Project;
