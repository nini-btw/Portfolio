import "../stylesheets/aboutmeS.sass";
import { Container, Row, Col } from "react-bootstrap";

function Aboutme() {
  return (
    <>
      <Container className="aboutme d-flex flex-dir align-items-center flex-column">
        <header className="text-center">
          <h2 className="heading heading-sec heading-sec__mb-med">
            <span className="heading-sec__main">About Me</span>
            <span className="heading-sec__sub">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              facilis tempora explicabo quae quod deserunt eius sapiente
            </span>
          </h2>
        </header>
        <section className="d-flex justify-content-center align-items-center">
          <Row>
            <Col md={6} xs={12} className="skills">
              <div className="">
                <h3>Get to Know me!</h3>
                <p>
                  Hello! I&apos;m <strong>Mohammed</strong>, a{" "}
                  <strong>MERN Stack Developer</strong> based in{" "}
                  <strong>Oran</strong> with a{" "}
                  <strong>Bachelor’s degree in Computer Science</strong>. I’m
                  passionate about building dynamic, user-focused applications
                  and bringing clients’ visions to life through{" "}
                  <strong>scalable and efficient software solutions</strong>.
                  Let’s work together to turn your ideas into reality!
                </p>
              </div>
              <div className="cv">CV</div>
            </Col>
            <Col md={6} xs={12}>
              <div className=" description">
                <h3>My Skills</h3>
                <div className="elements d-flex flex-wrap">
                  <div className="element">HTML</div>
                  <div className="element">CSS</div>
                  <div className="element">JavaScript</div>
                  <div className="element">React</div>
                  <div className="element">REDUX</div>
                  <div className="element">SASS</div>
                  <div className="element">GIT</div>
                  <div className="element">NODE</div>
                  <div className="element">EXPRESS</div>
                  <div className="element">MONGO DB</div>
                </div>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </>
  );
}
export default Aboutme;
