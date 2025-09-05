// components/RewardsSummaryCard.jsx
import React from "react";
import { Card, Button } from "react-bootstrap";

const DOLLARS_PER_POINT = 0.10;

export default function RewardsSummaryCard({
  points = 0,
  compact = false,
  showAction = true,          // <— controls whether the button shows
  onViewPerks,                // called when the button is clicked
}) {
  const dollarValue = (points * DOLLARS_PER_POINT).toFixed(2);

  return (
    <Card className={`border-0 shadow-sm ${compact ? "h-100" : ""}`}>
      <Card.Body className={compact ? "p-3" : "p-4"}>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex align-items-center">
            <span className="me-2" role="img" aria-label="trophy">🏆</span>
            <strong>THP Rewards</strong>
          </div>
        </div>

        <div className="d-flex align-items-baseline gap-2">
          <h3 className="mb-0">{points}</h3>
          <span className="text-muted">points</span>
        </div>

        <div className="text-muted small mt-1">
          ≈ ${dollarValue} off (when redeemed)
        </div>

        {showAction && (
          <div className="mt-3">
            <Button
              className="rs-view-btn text-orange border-orange"
              variant="outline-dark"
              size="sm"
              onClick={onViewPerks}
            >
              View Perks
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
