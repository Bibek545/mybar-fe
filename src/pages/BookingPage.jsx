import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import HeroParallax from "../components/HeroParallax"; // your hero component

const BookingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroParallax
        imageUrl="/images/booking-hero.jpg"
        title="Book Your Experience at THP"
      />

      {/* Booking Section */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="shadow border-0">
              <Card.Body className="p-4">
                <h2 className="text-center text-black mb-4">Reservation Form</h2>

                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Your name" required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="you@email.com" required />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="tel" placeholder="04xx xxx xxx" required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Guests</Form.Label>
                        <Form.Control type="number" min="1" max="20" defaultValue="2" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Time</Form.Label>
                        <Form.Control type="time" required />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label>Special Requests</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Any allergies, preferences, etc." />
                  </Form.Group>

                  <div className="text-center">
                    <Button variant="dark" className="text-orange border-orange px-5" type="submit">
                      Submit Booking
                    </Button>
                  </div>
                </Form>

                <hr className="my-4" />

                <div className="text-center">
                  <p className="text-muted mb-1">
                    Group of 25+? Head over to our <a href="/event" className="text-orange">events page</a>.
                  </p>
                  <p>
                    <strong>Email:</strong> booking@hiddenpour.com.au <br />
                    <strong>Phone:</strong> (02) 9000 0000
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BookingPage;
