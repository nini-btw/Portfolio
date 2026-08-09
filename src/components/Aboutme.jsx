import "../stylesheets/aboutmeS.sass";
import { Container, Row, Col } from "react-bootstrap";
import SectionHeader from "./subComponents/SectionHeader";
import SkillsMarquee from "./subComponents/SkillsMarquee";
import StatsRow from "./subComponents/StatsRow";
import GithubContributions from "./subComponents/GithubContributions";
import CvButton from "./subComponents/CvButton";
import AboutFacts from "./subComponents/AboutFacts";

function Aboutme() {
  return (
    <>
      <Container className="aboutme d-flex flex-column align-items-center">
        <SectionHeader
          title="About Me"
          subtitle="A passionate developer dedicated to creating innovative solutions."
        />

        <section className="w-100">
          <Row className="w-100 align-items-center">
            <Col
              md={6}
              xs={12}
              className="skills d-flex flex-column justify-content-center align-items-center"
            >
              <AboutFacts />
              <CvButton />
            </Col>
            <Col md={6} xs={12}>
              <div className="description">
                <h3>My Skills</h3>
                <SkillsMarquee />
              </div>
            </Col>
          </Row>
        </section>

        <StatsRow />
        <GithubContributions />
      </Container>
    </>
  );
}
export default Aboutme;
