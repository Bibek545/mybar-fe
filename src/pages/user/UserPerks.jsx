import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";

const perks = [
  // 🍸 Free Welcome Drink
  {
    id: 1,
    title: "🍸 Free Welcome Drink",
    description: "Enjoy a complimentary drink on your first visit as a member.",
    type: "Active Now",
  },
  // 💰 Earn Points
  {
    id: 2,
    title: "💰 Earn Points on Every Booking",
    description: "Collect points and redeem them for discounts when you pay.",
    type: "Earn/Spend Points",
  },
  // 🎁 Monthly Surprise
  {
    id: 3,
    title: "🎁 Monthly Surprise",
    description: "Every month, we randomly surprise members with a treat.",
    type: "Limited-Time",
  },
  // 🛍️ Bottle Shop Discount
  {
    id: 4,
    title: "🛍️ Bottle Shop Discount",
    description: "Get 10% off select bottles in our take-home section.",
    type: "Active Now",
  },
  // 🎉 Birthday Treat
  {
    id: 5,
    title: "🎉 Birthday Treat",
    description: "Get a free dessert or cocktail during your birthday week!",
    type: "Occasion-Based",
  },
  // 📱 Refer a Friend
  {
    id: 6,
    title: "📱 Refer a Friend",
    description: "Invite friends and earn 100 points when they book.",
    type: "Earn/Spend Points",
  },
  // 🍹 Extended Happy Hour
  {
    id: 7,
    title: "🍹 Extended Happy Hour",
    description: "Members enjoy happy hour prices until 8PM every Friday.",
    type: "Active Now",
  },
];

const UserPerks = () => {
  return (
    <div className="pb-5 mt-4">
      <h3 className="fw-bold text-dark mb-3">🎁 Member Perks</h3>
      <p className="text-muted">
        As a valued member of <strong>The Hidden Pour</strong>, enjoy these exclusive perks and promotions.
      </p>

      <Row className="g-4 mt-2">
        {perks.map((perk) => (
          <Col key={perk.id} xs={12} md={6} lg={4}>
            <Card className="perk-card h-100 shadow-sm border-0 rounded-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="fw-semibold text-dark mb-1">{perk.title}</h5>
                  <Badge bg="light" text="dark" className="border border-1 border-dark-subtle">
                    {perk.type}
                  </Badge>
                </div>
                <p className="text-muted small mb-0">{perk.description}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UserPerks;
