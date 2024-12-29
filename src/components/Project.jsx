import "swiper/css";
import SwiperC from "./SwiperC";

import "../stylesheets/projectS.sass";
import SectionHeader from "./subComponents/SectionHeader";

function Project() {
  return (
    <>
      <SectionHeader
        title="Projects"
        subtitle="Explore some of the applications and tools I've developed."
      />
      <div className="section swiper-container">
        <SwiperC />
      </div>
    </>
  );
}
export default Project;
