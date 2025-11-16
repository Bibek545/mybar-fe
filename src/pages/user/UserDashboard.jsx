import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import RewardsSummaryCard from "./RewardsSummaryCard.jsx"; // adjust path if needed
import { getMyRewardsApi } from "../../services/authAPI.jsx"; // adjust path if needed

const UserDashboard = () => {
  const [points, setPoints] = useState(0);
  const [loadingPts, setLoadingPts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoadingPts(true);
      const res = await getMyRewardsApi(); // GET /api/v1/rewards/me (private)
      if (res?.status === "success") {
        setPoints(res?.data?.rewardPoints || 0);
      }
      setLoadingPts(false);
    })();
  }, []);

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
                <Button variant="outline-dark" className="text-orange border-orange">
                  View All Bookings
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Rewards (live points) */}
        <Col md={6}>
          {loadingPts ? (
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">Loading rewards…</Card.Body>
            </Card>
          ) : (
            <RewardsSummaryCard
              points={points}
              onViewPerks={() => navigate("/user/perks")}
              // showAction defaults to true, so button appears here
            />
          )}
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
                <Link to="/user/book-table">
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
