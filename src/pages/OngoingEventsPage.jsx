import React, { useEffect, useState, useRef } from "react";
import { Container, Carousel, Modal, Button } from "react-bootstrap";
import { getAllEventItemsApi } from "../services/authAPI.jsx";

function formatDateRange(start, end) {
  try {
    const s = new Date(start);
    const e = end ? new Date(end) : null;
    const fmt = (d) =>
      d.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    return e ? `${fmt(s)} — ${fmt(e)}` : fmt(s);
  } catch {
    return "";
  }
}

export default function OngoingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getAllEventItemsApi();
      if (res.status === "success") {
        setEvents(res.data || []);
        setError("");
      } else {
        setError(res.message || "Failed to load events.");
      }
      setLoading(false);
    })();
  }, []);

  // simple auto-slide (Carousel also supports interval prop, this is explicit)
  useEffect(() => {
    if (!events.length) return;
    intervalRef.current = setInterval(
      () => setIndex((p) => (p + 1) % events.length),
      5000
    );
    return () => clearInterval(intervalRef.current);
  }, [events.length]);

  return (
    <Container className="py-5">
      <h2 className="text-black mb-3">Ongoing Events</h2>
      {loading && <p>Loading events…</p>}
      {error && <p className="text-danger">{error}</p>}

      {events.length > 0 && (
        <Carousel
          activeIndex={index}
          onSelect={setIndex}
          interval={null} // we handle interval manually above
          pause="hover"
          indicators={events.length > 1}
          variant="dark"
        >
          {events.map((ev) => (
            <Carousel.Item key={ev._id || ev.id}>
              <div className="ongoing-center">
                <div
                  className="ongoing-card compact"
                  onClick={() => setSelected(ev)}
                >
                  <img
                    className="ongoing-img"
                    src={ev.imageUrl || "/images/placeholder-event.jpg"}
                    alt={ev.title || "Event"}
                  />
                  <div className="ongoing-info center">
                    <h3 className="ongoing-name">{ev.title}</h3>
                    <button className="btn-outline" type="button">
                      View details
                    </button>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      {/* Modal with details */}
      <Modal show={!!selected} onHide={() => setSelected(null)} centered>
        {selected?.imageUrl && (
          <img
            src={selected.imageUrl}
            alt=""
            className="w-100"
            style={{ maxHeight: 260, objectFit: "cover" }}
          />
        )}
        <Modal.Header closeButton>
          <Modal.Title>{selected?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(selected?.startAt || selected?.dateRange) && (
            <div className="mb-2">
              <strong>Date: </strong>
              {selected?.dateRange ||
                formatDateRange(selected?.startAt, selected?.endAt)}
            </div>
          )}
          {selected?.location && (
            <div className="mb-2">
              <strong>Location: </strong>
              {selected.location}
            </div>
          )}
          {selected?.price && (
            <div className="mb-2">
              <strong>Price: </strong>
              {selected.price}
            </div>
          )}
          {selected?.description && (
            <p className="mb-0">{selected.description}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button href="/booking" variant="dark">
            Make a Booking
          </Button>
          <Button
            variant="outline-dark"
            className="text-orange border-orange"
            onClick={() => setSelected(null)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
