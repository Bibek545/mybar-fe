import React, { useEffect, useState } from "react";
import { Card, Table, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  getMyBookingsApi,
  cancelMyBookingApi,
  createMemberBookingApi, // 👈 NEW
} from "../../services/authAPI.jsx";

const THP_ORANGE = "#D97B3F";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// normalize "7:00 PM" -> "19:00"
const normalizeTime = (t = "") => {
  if (!t) return "00:00";
  if (/am|pm/i.test(t)) {
    const [hmm, ap] = t.trim().split(/\s+/);
    let [h, m] = hmm.split(":").map(Number);
    const isPM = /pm/i.test(ap);
    if (h === 12) h = isPM ? 12 : 0;
    else if (isPM) h += 12;
    return `${String(h).padStart(2, "0")}:${String(m || 0).padStart(2, "0")}`;
  }
  return t;
};

const toDateTime = (dateStr, timeStr) => {
  if (!dateStr) return null;
  const t = normalizeTime(timeStr);
  return new Date(`${dateStr}T${t}:00`);
};

const badgeClass = (status = "") => {
  const s = (status || "").toLowerCase();
  if (s === "confirmed") return "bg-success";
  if (s === "pending") return "bg-warning";
  if (s === "cancelled") return "bg-danger";
  if (s === "completed") return "bg-secondary";
  return "bg-secondary";
};

export default function UserBooking() {
  // lists
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // create form
  const [creating, setCreating] = useState(false);
  const [createMsg, setCreateMsg] = useState({ type: "", text: "" });
  const [form, setForm] = useState({
    date: "",
    time: "",
    guests: 2,
    allergies: "",
    notes: "",
  });

  const fetchMine = async () => {
    setLoading(true);
    setError("");
    const res = await getMyBookingsApi();
    if (res?.status !== "success") {
      setError(res?.message || "Failed to load bookings. Please sign in.");
      setLoading(false);
      return;
    }

    const now = new Date();
    const items = (res.data || []).map((b) => {
      const dt = toDateTime(b.date, b.time);
      return {
        id: b._id || b.id,
        date: b.date,
        time: b.time,
        guests: b.guests,
        status: b.status || "pending",
        _dt: dt,
      };
    });

    const upcomingItems = items
      .filter((b) => b.status !== "cancelled" && b._dt && b._dt >= now)
      .sort((a, b) => a._dt - b._dt);

    const pastItems = items
      .filter((b) => b._dt && b._dt < now)
      .sort((a, b) => b._dt - a._dt);

    setUpcoming(upcomingItems);
    setPast(pastItems);
    setLoading(false);
  };

  useEffect(() => {
    fetchMine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // create member booking
  const onCreateChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onCreateSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    setCreateMsg({ type: "", text: "" });

    const payload = {
      date: form.date,            // "YYYY-MM-DD"
      time: form.time,            // "HH:MM"
      guests: Number(form.guests),
      allergies: form.allergies.trim(),
      notes: form.notes.trim(),
    };

    const res = await createMemberBookingApi(payload);
    if (res?.status === "success") {
      setCreateMsg({ type: "success", text: "Booking created!" });
      // reset only the changeable fields
      setForm((f) => ({ ...f, date: "", time: "", guests: 2, allergies: "", notes: "" }));
      fetchMine();
    } else {
      setCreateMsg({ type: "danger", text: res?.message || "Could not create booking." });
    }
    setCreating(false);
  };

  // cancel
  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    const prev = upcoming;
    setUpcoming((u) => u.filter((b) => b.id !== id)); // optimistic

    const res = await cancelMyBookingApi(id);
    if (res?.status !== "success") {
      setUpcoming(prev); // revert
      alert(res?.message || "Could not cancel booking.");
    } else {
      fetchMine();
    }
  };

  return (
    <div className="pb-5 mt-4">
      <div className="mb-4">
        <h3 className="fw-bold text-dark">📅 My Bookings</h3>
        <p className="text-muted mb-0">
          Manage your upcoming and past reservations at <strong>The Hidden Pour</strong>.
        </p>
      </div>

      {/* Create Member Booking */}
      <Card className="mb-4 shadow-sm border-0 rounded-3 bg-white">
        <Card.Body>
          <h5 className="fw-semibold text-dark mb-3">Create a Booking (Members)</h5>
          {createMsg.text && (
            <Alert variant={createMsg.type} className="py-2">
              {createMsg.text}
            </Alert>
          )}
          <Form onSubmit={onCreateSubmit}>
            <Row className="g-3">
              <Col md={3}>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={onCreateChange}
                  required
                />
              </Col>
              <Col md={3}>
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={onCreateChange}
                  required
                />
              </Col>
              <Col md={2}>
                <Form.Label>Guests</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  name="guests"
                  value={form.guests}
                  onChange={onCreateChange}
                  required
                />
              </Col>
              <Col md={4}>
                <Form.Label>Allergies</Form.Label>
                <Form.Control
                  type="text"
                  name="allergies"
                  value={form.allergies}
                  onChange={onCreateChange}
                  placeholder="(optional)"
                />
              </Col>
              <Col md={12}>
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="notes"
                  value={form.notes}
                  onChange={onCreateChange}
                  placeholder="(optional)"
                />
              </Col>
              <Col md={12} className="d-flex gap-2">
                <Button type="submit" disabled={creating} className="btn btn-dark">
                  {creating ? "Submitting…" : "Create Booking"}
                </Button>
                <Link
                  to="/user/book-table"
                  className="btn btn-sm"
                  style={{ borderColor: THP_ORANGE, color: THP_ORANGE }}
                >
                  + Book via full page
                </Link>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Upcoming */}
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

          {loading ? (
            <p>Loading…</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : upcoming.length === 0 ? (
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
                      <span className={`badge ${badgeClass(b.status)}`}>{b.status}</span>
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

      {/* Past */}
      <Card className="shadow-sm border-0 rounded-3 bg-white">
        <Card.Body>
          <h5 className="mb-3 fw-semibold text-dark">Past Bookings</h5>
          {loading ? (
            <p>Loading…</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : past.length === 0 ? (
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
                      <span className={`badge ${badgeClass(b.status)}`}>{b.status}</span>
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
}
