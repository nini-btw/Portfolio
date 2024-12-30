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
        "The AHP Decision-Making Application simplifies complex decisions through the Analytic Hierarchy Process. Users can define criteria, perform pairwise comparisons, and calculate priorities. Featuring a clean, blue-accented design and built with Redux Toolkit, it ensures ease of use and efficient state management. This tool is ideal for systematic evaluation and prioritization, showcasing practical web development skills.",
      image:
        "../../public/images/screenshots/hap/Screenshot_2024-12-28_22-00-45.png",
      tech: ["react js", "redux toolkit", "css/sass"],
      link: "https://ahpcalcul.netlify.app/",
      github: "https://github.com/nini-btw/hap",
      mockup: "../../public/images/mockup/all-devices-white-ahp.png",
      screenshots: [
        "../../public/images/screenshots/hap/Screenshot_2024-12-28_22-00-45.png",
        "../../public/images/screenshots/hap/Screenshot_2024-12-28_21-16-44.png",
        "../../public/images/screenshots/hap/Screenshot_2024-12-28_21-17-10.png",
        "../../public/images/screenshots/hap/4.png",
      ],
    },
    {
      id: 2,
      name: "Calculator",
      description:
        "A simple yet functional calculator built with HTML, CSS, and JavaScript, featuring a sleek design with both light and dark mode options. This project showcases DOM manipulation skills and provides a seamless user experience for basic arithmetic operations.",
      image: "../../public/images/screenshots/calculator/screenshot (4).png",
      tech: ["html", "css", "java script"],
      link: "https://nini-btw.github.io/Calculator/",
      github: "https://github.com/nini-btw/Calculator",
      mockup: "../../public/images/mockup/all-devices-white-calc.png",
      screenshots: [
        "../../public/images/screenshots/calculator/screenshot (11).png",
        "../../public/images/screenshots/calculator/screenshot (4).png",
        "../../public/images/screenshots/calculator/screenshot (4).png",
        "../../public/images/screenshots/calculator/screenshot (11).png",
      ],
    },
    {
      id: 3,
      name: "Leon",
      description:
        "A sleek and modern web template designed for creative agencies, featuring a minimal and elegant landing page. Built with responsive design principles, it ensures seamless adaptability across all devices. The template highlights clean layouts, bold typography, and smooth transitions to captivate users. Perfect for showcasing portfolios, services, and projects, it offers an immersive experience while maintaining simplicity and professionalism.",
      image: "../../public/images/screenshots/template2/screenshot (6).png",
      tech: ["html", "css"],
      link: "https://nini-btw.github.io/Template-01/",
      github: "https://github.com/nini-btw/Template-01",
      mockup: "../../public/images/mockup/all-devices-white-templat-2.png",
      screenshots: [
        "../../public/images/screenshots/template2/screenshot (6).png",
        "../../public/images/screenshots/template2/screenshot (7).png",
        "../../public/images/screenshots/template2/screenshot (8).png",
        "../../public/images/screenshots/template2/screenshot (9).png",
      ],
    },
    {
      id: 4,
      name: "ToDo App",
      description:
        "A dynamic and user-friendly to-do app built with Pug.js, JavaScript, and Sass, designed to streamline task management. Featuring task labeling options for personal and work categories, it helps users stay organized and focused. User data is securely stored in the browser storage, ensuring persistence without the need for a backend. The app combines a clean, responsive design with seamless functionality, offering an efficient solution for managing daily tasks.",
      image: "../../public/images/screenshots/calculator/screenshot (5).png",
      tech: ["pug js", "sass", "java script"],
      link: "https://nini-btw.github.io/ToDo/",
      github: "https://github.com/nini-btw/ToDo",
      mockup: "../../public/images/mockup/all-devices-white-todo.png",
      screenshots: [
        "../../public/images/screenshots/calculator/screenshot (5).png",
        "../../public/images/screenshots/calculator/screenshot (5).png",
        "../../public/images/screenshots/calculator/screenshot (5).png",
        "../../public/images/screenshots/calculator/screenshot (5).png",
      ],
    },
    {
      id: 5,
      name: "Kasper",
      description:
        "Kasper is a beautifully crafted landing page built with just HTML and CSS, embodying simplicity and elegance. It captivates users with its clean design and smooth structure. Perfect for showcasing creativity, it offers a professional and responsive layout, ensuring flawless display on all devices. Kasper is a testament to the power of minimalism and the art of web design.",
      image: "../../public/images/screenshots/template1/Kasper.png",
      tech: ["html", "css"],
      link: "https://nini-btw.github.io/Template-02/",
      github: "https://github.com/nini-btw/Template-02",
      mockup: "../../public/images/mockup/all-devices-white -template-1.png",
      screenshots: [
        "../../public/images/screenshots/template1/Kasper.png",
        "../../public/images/screenshots/template1/screenshot (12).png",
        "../../public/images/screenshots/template1/screenshot (11).png",
        "../../public/images/screenshots/template1/screenshot (10).png",
      ],
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
                    {overlayContent.screenshots.map((src, index) => (
                      <div key={index} className={`sc${index + 1}`}>
                        <img src={src} alt={`Screenshot ${index + 1}`} />
                      </div>
                    ))}
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
