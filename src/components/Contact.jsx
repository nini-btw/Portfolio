import "../stylesheets/contactS.sass";
import { useState } from "react";

import { Row, Col, Container } from "react-bootstrap";
import SectionHeader from "./subComponents/SectionHeader";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import emailjs from "emailjs-com"; // Import emailjs-com

function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState(""); // State to track errors
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form data before sending
  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setError("Please fill in all fields.");
      return false;
    }
    setError(""); // Clear error if validation passes
    return true;
  };

  // Send form data to email using EmailJS
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    if (validateForm()) {
      // Send the email via EmailJS
      emailjs
        .send(
          "service_9qwd6o4",
          "template_3vr527a",
          formData,
          "pPj9pQfa02Mc8xF2c"
        )
        .then(
          (response) => {
            console.log("Message sent successfully:", response);
            // Optionally reset the form or show a success message
          },
          (error) => {
            console.log("Failed to send message:", error);
            // Optionally show an error message
          }
        );
    }
  };

  return (
    <section className="contact-section">
      <SectionHeader title="Contact" />
      <Container>
        <section className="d-flex justify-content-center align-items-center">
          <Row className="content justify-content-center align-items-start">
            <Col
              md={4}
              xs={12}
              className="info d-flex flex-column flex-column justify-content-around align-items-center p-1 mr-3"
            >
              <div>
                <h4>Contact information</h4>
                <p>Get in touch with us</p>
              </div>
              <ul className="list p-0">
                <li>
                  <PhoneIcon />
                  <ul className="m-0 p-0">
                    <Row>
                      <li>05 40 93 68 51</li>
                      <li>06 68 87 77 82</li>
                    </Row>
                  </ul>
                </li>
                <li>
                  <EmailIcon />
                  denidenimohammed@gmail.com
                </li>
                <li>
                  <LocationOnIcon />
                  Oran, Algeria
                </li>
              </ul>
            </Col>
            <Col md={8} xs={12} className="form">
              <div className="form d-flex flex-column p-4">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "100%" },
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit} // Call handleSubmit on form submit
                >
                  <Row className="d-flex justify-content-center">
                    <Col md="6" xs="12">
                      <TextField
                        sx={{ width: "100%" }}
                        id="name"
                        name="name"
                        label="Your Name"
                        variant="standard"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col md="6" xs="12">
                      <TextField
                        sx={{ width: "100%" }}
                        id="email"
                        name="email"
                        label="Your Email"
                        variant="standard"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <TextField
                        sx={{ width: "100%" }}
                        id="subject"
                        name="subject"
                        label="Your Subject"
                        variant="standard"
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <TextField
                        sx={{ width: "100%" }}
                        id="message"
                        name="message"
                        label="Message"
                        multiline
                        rows={6}
                        variant="standard"
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  {error && <p style={{ color: "red" }}>{error}</p>}{" "}
                  {/* Show error if validation fails */}
                  <Row className="d-flex justify-content-center mt-3">
                    <Col md="9" className="text-center">
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          marginTop: "2rem",
                          fontSize: "2rem",
                          width: "100%",
                          backgroundColor: "#1976D2",
                          "&:hover": {
                            backgroundColor: "#1565C0",
                          },
                        }}
                      >
                        Send Message
                      </Button>
                    </Col>
                  </Row>
                </Box>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </section>
  );
}

export default Contact;
