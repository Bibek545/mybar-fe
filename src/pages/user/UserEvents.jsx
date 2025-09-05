// src/pages/user/UserEvents.jsx
import React from "react";
import { Card, Button, Badge, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const events = [
  {
    id: 1,
    name: "Tequila Thursday",
    date: "26 Sep 2025",
    time: "8:00 PM",
    description: "Half-price tequila shots and live DJ all night.",
    status: "Upcoming",
  },
  {
    id: 2,
    name: "Jazz & Wine Night",
    date: "15 Aug 2025",
    time: "7:30 PM",
    description: "Sip wine and enjoy live jazz under candlelight.",
    status: "Past",
  },
  {
    id: 3,
    name: "Whiskey Tasting Evening",
    date: "1 Oct 2025",
    time: "6:00 PM",
    description: "Explore premium whiskeys with our expert sommelier.",
    status: "Upcoming",
  },
];

const UserEvents = () => {
  const upcoming = events.filter((e) => e.status === "Upcoming");
  const past = events.filter((e) => e.status === "Past");

  return (
    <div>
      <h4 className="mb-4">📅 Events & Experiences</h4>
      <p>
        Discover upcoming happenings and past highlights at{" "}
        <strong>The Hidden Pour</strong>.
      </p>

      {/* Upcoming Events */}
      <section className="mt-4">
        <h5 className="mb-3">🔜 Upcoming Events</h5>
        <Row xs={1} md={2} lg={2} className="g-4">
          {upcoming.map((event) => (
            <Col key={event.id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Card.Title>{event.name}</Card.Title>
                    <Badge bg="success">{event.status}</Badge>
                  </div>
                  <Card.Text className="text-muted small mb-1">
                    {event.date} at {event.time}
                  </Card.Text>
                  <Card.Text>{event.description}</Card.Text>
                  <Link to="/user/book-table">
                    <Button
                      variant="outline-dark"
                      className="text-orange border-orange px-4"
                    >
                      {" "}
                      Book Now
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Past Events */}
      <section className="mt-5">
        <h5 className="mb-3">📸 Past Highlights</h5>
        <Row xs={1} md={2} lg={2} className="g-4">
          {past.map((event) => (
            <Col key={event.id}>
              <Card className="h-100 bg-light-subtle">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Card.Title>{event.name}</Card.Title>
                    <Badge bg="secondary">{event.status}</Badge>
                  </div>
                  <Card.Text className="text-muted small mb-1">
                    {event.date} at {event.time}
                  </Card.Text>
                  <Card.Text>{event.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default UserEvents;
