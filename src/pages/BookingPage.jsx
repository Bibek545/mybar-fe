import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import HeroParallax from "../components/HeroParallax";

const BookingPage = () => {
  return (
    <div>
      {/* Hero */}
      <HeroParallax
        imageUrl="/images/booking-hero.jpg"
        title="Book Your Experience at THP"
         height={300}
      />

      {/* Booking Section */}
      <section className="booking-section pb-3">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <Card className="shadow-lg border-0 rounded-4">
                <Card.Body className="p-5">
                  <div className="text-center mb-4">
                    <h2 className="text-black fw-bold">🍸 Reserve Your Table</h2>
                    <p className="text-muted">
                      We'd love to host you at{" "}
                      <span className="text-orange fw-semibold">The Hidden Pour</span>
                    </p>
                  </div>

                  <Form>
                    {/* Name + Email */}
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>👤 Name</Form.Label>
                          <Form.Control type="text" placeholder="John Doe" required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>📧 Email</Form.Label>
                          <Form.Control type="email" placeholder="john@email.com" required />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Phone + Guests */}
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>📱 Phone</Form.Label>
                          <Form.Control type="tel" placeholder="04xx xxx xxx" required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>🧑‍🤝‍🧑 Guests</Form.Label>
                          <Form.Control type="number" min="1" max="20" defaultValue="2" />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Date + Time */}
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>📅 Date</Form.Label>
                          <Form.Control type="date" required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>⏰ Time</Form.Label>
                          <Form.Control type="time" required />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Special Request */}
                    <Form.Group className="mb-4">
                      <Form.Label>📝 Special Requests</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Allergies, preferences, occasion..."
                      />
                    </Form.Group>

                    <div className="text-center">
                      <Button className="btn-thp px-5" type="submit">
                        Submit Booking
                      </Button>
                    </div>
                  </Form>

                  <hr className="my-4" />

                  <div className="text-center small text-muted">
                    Group of 25+? Check out our{" "}
                    <a href="/event" className="text-orange">events page</a> <br />
                    <strong>Email:</strong> booking@hiddenpour.com.au <br />
                    <strong>Phone:</strong> (02) 9000 0000
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default BookingPage;
