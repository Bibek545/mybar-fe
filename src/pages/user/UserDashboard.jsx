import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  return (
    <Container className="py-4">
      <h4 className="mb-4">Welcome back, Bibek 👋</h4>

      <Row className="g-4">
        {/* Booking Summary */}
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-orange">🪑 Your Next Booking</h6>
              <p><strong>Date:</strong> Sept 21, 2025</p>
              <p><strong>Time:</strong> 7:30 PM</p>
              <p><strong>Guests:</strong> 4</p>
              <Link to="/user/bookings">
                <Button variant="outline-dark" className="text-orange border-orange">View All Bookings</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Perks */}
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-orange">🎁 THP Rewards</h6>
              <p>You have <strong>240 points</strong></p>
              <small>Earn 10 more points for $5 off your next visit!</small>
              <div className="mt-3">
                <Link to="/user/perks">
                  <Button variant="outline-dark" className="text-orange border-orange">View Perks</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Today's Promo – no black box */}
        <Col md={12}>
          <Card className="shadow-sm border-0 bg-light">
            <Card.Body>
              <h6 className="text-orange">🔥 Today’s Special</h6>
              <p className="mb-0">🍹 <strong>Tequila Thursdays</strong> — 2-for-1 cocktails from 5–7 PM tonight!</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col md={12}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-orange">⚡ Quick Actions</h6>
              <div className="d-flex flex-wrap gap-3 mt-2">
                <Link to="/booking">
                  <Button variant="dark" className="text-white px-4">Book Again</Button>
                </Link>
                <Link to="/user/profile">
                  <Button variant="outline-dark" className="text-orange border-orange px-4">Edit Profile</Button>
                </Link>
                <Link to="/user/profile#change-password">
                  <Button variant="outline-dark" className="text-orange border-orange px-4">Change Password</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
