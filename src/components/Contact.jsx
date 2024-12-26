import "../stylesheets/contactS.sass";
import { Row, Col, Container } from "react-bootstrap";
import SectionHeader from "./subComponents/SectionHeader";

function Contact() {
  return (
    <section className="contact-section">
      <SectionHeader title="Contact" />
      <Container>
        <section className="d-flex justify-content-center align-items-center">
          <Row className="content justify-content-center align-items-center">
            <Col
              md={4}
              xs={12}
              className="info d-flex flex-column flex-column justify-content-center align-items-center p-4 mr-3"
            ></Col>
            <Col md={8} xs={12} className="form"></Col>
          </Row>
        </section>
      </Container>
    </section>
  );
}

export default Contact;
