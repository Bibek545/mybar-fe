import React from "react";
import HeroParallax from "../components/HeroParallax"; // reusable parallax hero
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      {/* HERO SECTION */}
      <HeroParallax
        image="/images/HomePage1.png"
        title="The Hidden Pour"
        titleColor="#f4efebff"
      />

      {/* INTRO SECTION */}
      <Container className="py-5 text-center">
        <h2 className="text-black">Elevated. Intimate. Inspired.</h2>
        <p className="text-muted">
          Nestled within Sydney Olympic Park, The Hidden Pour blends a moody
          cocktail atmosphere with modern dining. Perfect for events, weekend
          drinks, or special date nights.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
          <Button href="/booking" className="btn-thp">
            Make a Booking
          </Button>
          <Button href="/menu" className="btn-thp-outline">
            View Menu
          </Button>
        </div>
      </Container>

      {/* FEATURED BOXES */}
      <Container className="py-5">
        <Row className="g-4">
          {/* Eat & Drink */}
          <Col md={4} className="text-center card-box">
            <img
              src="/images/HomePage1.png"
              alt="Eat and Drink"
              className="img-fluid rounded shadow mb-3"
            />
            <h4 className="text-black">Eat & Drink</h4>
            <p className="text-muted">
              Explore our seasonal menu crafted with fresh produce and bold
              flavors. Try our signature cocktails and share plates.
            </p>
            {/* <Button href="/menus" className="btn-thp-outline">
              Explore Menu
            </Button> */}
            <Link to="/menu" className="btn btn-thp-outline">
  Explore Menu
</Link>
          </Col>

          {/* Host Events */}
          <Col md={4} className="text-center card-box">
            <img
              src="/images/HomePage1.png"
              alt="Events"
              className="img-fluid rounded shadow mb-3"
            />
            <h4 className="text-black">Host Events</h4>
            <p className="text-muted">
              Our suites are perfect for birthdays, corporate events, and
              weddings. Enquire now to book your space.
            </p>
<Link to="/event" className="btn btn-thp-outline">
  Event Spaces
</Link>
          </Col>

          {/* Book */}
          <Col md={4} className="text-center card-box">
            <img
              src="/images/HomePage1.png"
              alt="Reserve a Table"
              className="img-fluid rounded shadow mb-3"
            />
            <h4 className="text-black">Reserve a Table</h4>
            <p className="text-muted">
              Book a seat in our cozy dining room, terrace, or at the cocktail
              bar. Walk-ins welcome, bookings preferred.
            </p>
<Link to="/booking" className="btn btn-thp-outline">
  Reserve Now
</Link>
          </Col>
        </Row>
      </Container>

      {/* TRADING TIMES & CONTACT */}
      <Container className="py-5 bg-light">
        <Row>
          <Col md={6}>
            <h4 className="text-black">Trading Times</h4>
            <p className="text-muted mb-0">
              <strong>Mon–Tue:</strong> Closed
            </p>
            <p className="text-muted mb-0">
              <strong>Wed–Sat:</strong> 11:30am – 10:00pm
            </p>
            <p className="text-muted">
              <strong>Sun:</strong> 11:30am – 9:00pm
            </p>
          </Col>
          <Col md={6}>
            <h4 className="text-black">Contact</h4>
            <p className="text-muted mb-0">
              <strong>Email:</strong> book@hiddenpour.com.au
            </p>
            <p className="text-muted mb-0">
              <strong>Phone:</strong> (02) 9000 0000
            </p>
            <p className="text-muted">
              <strong>Address:</strong> 15 Hill Rd, Sydney Olympic Park, NSW
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
