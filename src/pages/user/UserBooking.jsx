import React, { useState } from "react";
import { Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const initialUpcomingBookings = [
  { id: 1, date: "2025-08-25", time: "7:00 PM", guests: 2, status: "Confirmed" },
];

const initialPastBookings = [
  { id: 3, date: "2025-07-15", time: "8:00 PM", guests: 3, status: "Completed" },
  { id: 4, date: "2025-07-02", time: "5:30 PM", guests: 2, status: "Completed" },
];

const THP_ORANGE = "#D97B3F";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const UserBooking = () => {
  const [upcoming, setUpcoming] = useState(initialUpcomingBookings);
  const [past] = useState(initialPastBookings);

  const handleCancel = (id) => {
    const updated = upcoming.filter((b) => b.id !== id);
    setUpcoming(updated);
  };

  return (
    <div className="pb-5 mt-4">
      <div className="mb-4">
        <h3 className="fw-bold text-dark">📅 My Bookings</h3>
        <p className="text-muted mb-0">
          Manage your upcoming and past reservations at <strong>The Hidden Pour</strong>.
        </p>
      </div>

      <Card className="mb-4 shadow-sm border-0 rounded-3 bg-white">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-semibold text-dark mb-0">Upcoming Bookings</h5>
            <Link
              to="/user/book-table"
              className="btn btn-sm"
              style={{ borderColor: THP_ORANGE, color: THP_ORANGE }}
            >
              + Book a Table
            </Link>
          </div>

          {upcoming.length === 0 ? (
            <p className="text-muted">You have no upcoming bookings.</p>
          ) : (
            <Table responsive borderless className="align-middle">
              <thead className="text-muted small">
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Guests</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map((b) => (
                  <tr key={b.id}>
                    <td>{formatDate(b.date)}</td>
                    <td>{b.time}</td>
                    <td>{b.guests}</td>
                    <td>
                      <span className={`badge bg-${b.status === "Confirmed" ? "success" : "warning"}`}>
                        {b.status}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleCancel(b.id)}
                        style={{ borderColor: THP_ORANGE, color: THP_ORANGE }}
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Card className="shadow-sm border-0 rounded-3 bg-white">
        <Card.Body>
          <h5 className="mb-3 fw-semibold text-dark">Past Bookings</h5>

          {past.length === 0 ? (
            <p className="text-muted">No past bookings found.</p>
          ) : (
            <Table responsive borderless className="align-middle">
              <thead className="text-muted small">
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Guests</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {past.map((b) => (
                  <tr key={b.id}>
                    <td>{formatDate(b.date)}</td>
                    <td>{b.time}</td>
                    <td>{b.guests}</td>
                    <td>
                      <span className="badge bg-secondary">{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserBooking;
