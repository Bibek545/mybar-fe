import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Badge,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import RewardsSummaryCard from "./RewardsSummaryCard";
import { getMyRewardsApi } from "../../services/authAPI.jsx";

const perks = [
  {
    id: 1,
    title: "🍸 Free Welcome Drink",
    description: "Enjoy a complimentary drink on your first visit as a member.",
    hint: "Available on your first dine-in after joining. Ask your server to redeem.",
    type: "Active Now",
  },
  {
    id: 2,
    title: "💰 Earn Points on Every Booking",
    description: "Collect points and redeem them for discounts when you pay.",
    hint: "Earn 1 point per $1 spent. 100 points ≈ $10 off your bill.",
    type: "Earn/Spend Points",
  },
  {
    id: 3,
    title: "🎁 Monthly Surprise",
    description: "Every month, we randomly surprise members with a treat.",
    hint: "Opt-in to emails to be eligible. Surprises vary each month!",
    type: "Limited-Time",
  },
  {
    id: 4,
    title: "🛍️ Bottle Shop Discount",
    description: "Get 10% off select bottles in our take-home section.",
    hint: "Look for the THP-tagged selections at the counter.",
    type: "Active Now",
  },
  {
    id: 5,
    title: "🎉 Birthday Treat",
    description: "Get a free dessert or cocktail during your birthday week!",
    hint: "Valid with ID or profile birthdate. One redemption per year.",
    type: "Occasion-Based",
  },
  {
    id: 6,
    title: "📱 Refer a Friend",
    description: "Invite friends and earn 100 points when they book.",
    hint: "Points drop after your friend dines and confirms their booking.",
    type: "Earn/Spend Points",
  },
  {
    id: 7,
    title: "🍹 Extended Happy Hour",
    description: "Members enjoy happy hour prices until 8PM every Friday.",
    hint: "Show your member profile at the bar to access member pricing.",
    type: "Active Now",
  },
];

const UserPerks = () => {
  const [points, setPoints] = useState(0);
  const [loadingPts, setLoadingPts] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingPts(true);
      setError("");
      try {
        const res = await getMyRewardsApi(); // GET /api/v1/rewards/me
        if (mounted) {
          if (res?.status === "success") {
            setPoints(res?.data?.rewardPoints ?? 0);
          } else {
            setError(res?.message || "Could not load rewards.");
          }
        }
      } catch {
        if (mounted) setError("Could not load rewards.");
      } finally {
        if (mounted) setLoadingPts(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const renderPopover = (perk) => (
    <Popover id={`perk-popover-${perk.id}`}>
      <Popover.Header as="h6" className="mb-0">
        {perk.title}
      </Popover.Header>
      <Popover.Body>
        <div>{perk.hint || perk.description}</div>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="pb-5 mt-4">
      <h3 className="fw-bold text-dark mb-3">🎁 Member Perks</h3>
      <p className="text-muted">
        As a valued member of <strong>The Hidden Pour</strong>, enjoy these
        exclusive perks and promotions.
      </p>

      <Row className="g-4 mt-2">
        {/* Points summary */}
        <Col xs={12} md={6} lg={4}>
          {loadingPts ? (
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="p-4">Loading points…</Card.Body>
            </Card>
          ) : error ? (
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="p-4">
                <div className="text-muted small">
                  {/^unauthor/i.test(error)
                    ? "Sign in to view and earn rewards."
                    : "Rewards unavailable right now."}
                </div>
              </Card.Body>
            </Card>
          ) : (
            <RewardsSummaryCard points={points} compact showAction={false} />
          )}
        </Col>

        {/* Perk cards with hover popovers */}
        {perks.map((perk) => (
          <Col key={perk.id} xs={12} md={6} lg={4}>
            <OverlayTrigger
              trigger={["hover", "focus"]}
              placement="auto"
              delay={{ show: 120, hide: 120 }}
              overlay={renderPopover(perk)}
            >
              <Card
                className="perk-card h-100 shadow-sm border-0 rounded-3 cursor-pointer"
                tabIndex={0} // focusable for keyboard/mobile
              >
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="fw-semibold text-dark mb-1">
                      {perk.title}
                    </h5>
                    <Badge
                      bg="light"
                      text="dark"
                      className="border border-1 border-dark-subtle"
                    >
                      {perk.type}
                    </Badge>
                  </div>
                  <p className="text-muted small mb-0">{perk.description}</p>
                </Card.Body>
              </Card>
            </OverlayTrigger>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UserPerks;
