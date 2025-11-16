import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";

const THP_ORANGE = "#D97B3F";

const UserBookTable = () => {
  const [form, setForm] = useState({
    date: "",
    time: "",
    guests: "",
    note: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Details:", form);
    setShowAlert(true);
    setForm({ date: "", time: "", guests: "", note: "" });
  };

  return (
    <div className="pb-5 mt-4">
      <h3 className="fw-bold text-dark mb-3">📅 Book a Table</h3>
      <p className="text-muted">Reserve your spot at <strong>The Hidden Pour</strong>.</p>

      <Card className="p-4 shadow-sm border-0 rounded-3 bg-white">
        <Card.Body>
          {showAlert && (
            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
              Your booking has been submitted!
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Number of Guests</Form.Label>
              <Form.Select
                name="guests"
                value={form.guests}
                onChange={handleChange}
                required
              >
                <option value="">-- Select --</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Note (optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="note"
                value={form.note}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-grid">
              <Button
                type="submit"
                style={{ backgroundColor: THP_ORANGE, borderColor: THP_ORANGE, borderRadius: "9999px" }}
              >
                Book Now
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserBookTable;
