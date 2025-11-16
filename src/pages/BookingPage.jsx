import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import HeroParallax from "../components/HeroParallax";
import { createBookingApi } from "../services/authAPI.jsx";

const BookingPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 2,
    date: "",
    time: "",
    notes: "", // maps to "Special Requests"
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess("");
    setError("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      guests: Number(form.guests),
      date: form.date,     // "YYYY-MM-DD" (backend can new Date() it)
      time: form.time,     // "HH:MM"
      notes: form.notes.trim(),
    };

    const res = await createBookingApi(payload);
    if (res?.status === "success") {
      setSuccess("Thanks! Your booking request has been received.");
      setForm({ name: "", email: "", phone: "", guests: 2, date: "", time: "", notes: "" });
    } else {
      setError(res?.message || "Could not submit booking. Please try again.");
    }

    setSubmitting(false);
  };

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

                  {success && <Alert variant="success">{success}</Alert>}
                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form onSubmit={onSubmit}>
                    {/* Name + Email */}
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>👤 Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            placeholder="John Doe"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>📧 Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            placeholder="john@email.com"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Phone + Guests */}
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>📱 Phone</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={onChange}
                            placeholder="04xx xxx xxx"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>🧑‍🤝‍🧑 Guests</Form.Label>
                          <Form.Control
                            type="number"
                            name="guests"
                            min="1"
                            max="20"
                            value={form.guests}
                            onChange={onChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Date + Time */}
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>📅 Date</Form.Label>
                          <Form.Control
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={onChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>⏰ Time</Form.Label>
                          <Form.Control
                            type="time"
                            name="time"
                            value={form.time}
                            onChange={onChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Special Request */}
                    <Form.Group className="mb-4">
                      <Form.Label>📝 Special Requests</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="notes"
                        value={form.notes}
                        onChange={onChange}
                        placeholder="Allergies, preferences, occasion..."
                      />
                    </Form.Group>

                    <div className="text-center">
                      <Button className="btn-thp px-5" type="submit" disabled={submitting}>
                        {submitting ? "Submitting…" : "Submit Booking"}
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
