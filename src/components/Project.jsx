import "swiper/css";
import SwiperC from "./SwiperC";

import "../stylesheets/projectS.sass";
import SectionHeader from "./subComponents/SectionHeader";

function Project() {
  return (
    <>
      <SectionHeader
        title="Projects "
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicinge "
      />
      <div className="section swiper-container">
        <SwiperC />
      </div>
    </>
  );
}
export default Project;
