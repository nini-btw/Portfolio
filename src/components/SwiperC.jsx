import { useState, useEffect } from "react";
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
import "swiper/css/effect-coverflow";
import { Row, Col } from "react-bootstrap";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import VisibilityIcon from "@mui/icons-material/Visibility";

function SwiperC() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayContent, setOverlayContent] = useState(null);
  const [showOne, setShowOne] = useState(true);

  const projects = [
    {
      id: 1,
      name: "HAP",
      description:
        "The AHP Decision-Making Application is a web-based tool that helps users evaluate and prioritize options through a structured decision-making process. By allowing users to define criteria and sub-criteria, perform pairwise comparisons, and calculate priorities, the app simplifies complex decision-making. It features a user-friendly interface with a clean design, highlighted by a blue color accent. The application demonstrates proficiency in web development, state management with Redux Toolkit, and implementing the Analytic Hierarchy Process for real-world decision-making problems.",
      image:
        "../../images//png/screenshots/hap/Screenshot_2024-12-28_22-00-45.png",
      tech: ["react js", "redux toolkit", "css/sass"],
      link: "https://ahpcalcul.netlify.app/",
      github: "https://github.com/nini-btw/hap",
      mockup: "../../images/png/mockup/all-devices-white-ahp.png",
    },
    {
      id: 2,
      name: "Calculator",
      description: "Description of Project 2",
      image:
        "../../images/png/screenshots/calculator/Screenshot_2024-12-29_00-38-14.png",
      tech: ["html", "java script", "css"],
      link: "https://nini-btw.github.io/Calculator/",
      github: "https://github.com/nini-btw/Calculator",
      mockup: "../../images/png/mockup/all-devices-white (2).png",
    },
    {
      id: 3,
      name: "Project 1",
      description: "Description of Project 1",
      image: "../../images/project/screenshot (5).png",
      tech: ["javascript", "sass", "react"],
    },
    {
      id: 4,
      name: "Project 4",
      description: "Description of Project 2",
      image: "../../images/project/screenshot (4).png",
      tech: ["javascript", "sass", "react"],
    },
    {
      id: 5,
      name: "Project 5",
      description: "Description of Project 1",
      image: "../../images/project/screenshot (5).png",
      tech: ["javascript", "sass", "react"],
    },
    {
      id: 6,
      name: "Project 6",
      description: "Description of Project 2",
      image: "../../images/project/screenshot (4).png",
      tech: ["javascript", "sass", "react"],
    },
    // Add more projects as needed
  ];

  const handleSlideClick = (project) => {
    setOverlayContent(project); // Set the content for the overlay
    setShowOverlay(true); // Show the overlay
  };

  const closeOverlay = () => {
    setShowOverlay(false); // Hide the overlay
    setOverlayContent(null); // Clear the content
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setShowOne((prev) => !prev); // Toggle between 'one' and 'two'
    }, 3000); // Switch every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div>
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
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        className="mySwiper"
      >
        {projects.map((project) => (
          <SwiperSlide
            key={project.id}
            onClick={() => handleSlideClick(project)}
          >
            <img src={project.image} alt={project.name} />
          </SwiperSlide>
        ))}
      </Swiper>

      {showOverlay && (
        <div className="overlay" onClick={closeOverlay}>
          <div
            className="overlay-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the overlay content
          >
            <button className="close-button" onClick={closeOverlay}>
              ×
            </button>
            <Row className="d-flex align-items-center justify-content-center">
              <Col
                md="12"
                xs="12"
                lg="4"
                className="projectDescription d-flex flex-column justify-content-between align-items-start"
              >
                <div className="name">
                  <h1>{overlayContent.name}</h1>
                </div>

                <div className="description">
                  <p>{overlayContent.description}</p>
                </div>
                <div className="tech">
                  <h2>Tech Used</h2>
                  <div className="list d-flex flex-wrap">
                    {overlayContent.tech.map((t) => {
                      return (
                        <>
                          <div>{t}</div>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="buttons d-flex align-items-center justify-content-around">
                  <a href={overlayContent.github} target="_blank">
                    <button className="git">
                      Git Hub Link
                      <ArrowOutwardIcon />
                    </button>
                  </a>
                  <a href={overlayContent.link} target="_blank">
                    <button className="view">
                      Live Preview
                      <VisibilityIcon />
                    </button>
                  </a>
                </div>
              </Col>
              <Col md="12" xs="12" lg="8">
                <div className={`one ${showOne ? "visible" : "hidden"}`}>
                  <div className="mockUp">
                    <img
                      src={overlayContent.mockup}
                      alt={overlayContent.name}
                      className="overlay-image"
                    />
                  </div>
                </div>
                <div className={`two ${!showOne ? "visible" : "hidden"}`}>
                  <div className="screenShots">
                    <div className="sc1">
                      <img
                        src="../../images/png/screenshots/hap/Screenshot_2024-12-28_22-00-45.png"
                        alt="1"
                      />
                    </div>
                    <div className="sc2">
                      <img
                        src="../../images/png/screenshots/hap/Screenshot_2024-12-28_21-16-44.png"
                        alt="2"
                      />
                    </div>
                    <div className="sc3">
                      <img
                        src="../../images/png/screenshots/hap/Screenshot_2024-12-28_21-17-10.png"
                        alt="3"
                      />
                    </div>
                    <div className="sc4">
                      <img
                        src="../../images/png/screenshots/hap/4.png"
                        alt="4"
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}

export default SwiperC;
