import React from "react";
import HeroParallax from "../components/HeroParallax"; // your existing parallax hero
import { Container, Row, Col, Button } from "react-bootstrap";
import OngoingEvents from "./OngoingEventsPage";

const EventsPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroParallax
        image="/images/restEventBack.png" // replace with your image path
        title="Host Your Event at THP"
         titleColor="#f8f3f3ff"
      />
     
     <OngoingEvents />
      {/* Overview */}
      <Container className="py-5">
        <p>
          <strong>The Hidden Pour</strong> offers two beautiful, flexible spaces in
          Sydney Olympic Park. From work milestones and hens nights to birthdays
          and weddings, we do it all — with bespoke cocktails and warm service.
        </p>
        <p>
          Our <strong>Grand Suite</strong> opens to a single, seamless room for larger
          celebrations. The <strong>Private Dining Room</strong> is perfect for intimate
          lunches, dinners or meetings. Both spaces feature configurable layouts and
          in-house AV.
        </p>
        <p>
          <em>
            Please note: enquiries of 25+ are treated as group bookings. Smaller
            parties can book standard tables via{" "}
            <a href="/booking" className="text-orange">
              Make a Booking
            </a>
            .
          </em>
        </p>
      </Container>

      {/* Spaces */}
      <Container className="py-5">
        <Row className="mb-5">
          <Col md={6}>
            <img
              src="/images/THPGrandSuite.png"
              alt="THP Grand Suite"
              className="img-fluid rounded shadow"
            />
          </Col>
          <Col md={6} className="d-flex flex-column justify-content-center">
            <h2 className="text-black">THP Grand Suite</h2>
            <p>
              A large, light-filled room that brings all our suites together.
              High ceilings, clean lines and a modern bar backdrop set the scene
              for big moments.
            </p>
            <p>
              <strong>Capacity:</strong> up to 150 guests (cocktail) · up to 100 seated
            </p>
            <Button href="/contact" variant="outline-dark" className="text-orange border-orange">
              Enquire about this space
            </Button>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="order-md-2">
            <img
              src="/images/THPPrivateSuite.png"
              alt="THP Private Dining Room"
              className="img-fluid rounded shadow"
              
            />
          </Col>
          <Col md={6} className="d-flex flex-column justify-content-center order-md-1">
            <h2 className="text-black">THP Private Dining Room</h2>
            <p>
              A tucked-away room with natural light and refined finishes —
              ideal for social or corporate gatherings that need privacy.
            </p>
            <p>
              <strong>Capacity:</strong> up to 44 seated
            </p>
            <Button href="/contact" variant="outline-dark" className="text-orange border-orange">
              Enquire about this space
            </Button>
          </Col>
        </Row>
      </Container>

      {/* What's On */}
      <Container className="py-5 bg-light">
        <h2 className="text-black">What’s On</h2>
        <h4 className="text-orange">Melbourne Cup at THP</h4>
        <p>
          Dress the part and celebrate Spring Racing with a set menu (from{" "}
          <strong>$120pp</strong>) and optional beverage package.
        </p>
        <Button href="/events/melbourne-cup" variant="dark">
          Discover More
        </Button>
      </Container>

      {/* Booking CTA */}
      <Container className="py-5 text-center">
        <p>
          Completing our enquiry form does not confirm a booking. Our Events
          Manager will contact you to discuss details and provide a bespoke
          quote.
        </p>
        <Button href="/booking" variant="dark" className="mx-2">
          Make an Enquiry
        </Button>
        <Button
          href="/menu/THP-Events-Pack.pdf"
          variant="outline-dark"
          className="mx-2 text-orange border-orange"
        >
          View Events Kit
        </Button>
      </Container>

      {/* Contact & Trading Times */}
      <Container className="py-5">
        <Row>
          <Col md={6}>
            <h4 className="text-black">Trading Times</h4>
            <p>
              <strong>THP — Sydney Olympic Park</strong>
              <br />
              Mon–Tue: Closed
              <br />
              Wed–Sat: 11:30am – 10:00pm
              <br />
              Sun: 11:30am – 9:00pm
            </p>
          </Col>
          <Col md={6}>
            <h4 className="text-black">Contact</h4>
            <p>
              <strong>Email:</strong> events@hiddenpour.com.au
              <br />
              <strong>Phone:</strong> (02) 9000 0000
              <br />
              <strong>Address:</strong> 15 Hill Rd, Sydney Olympic Park, 2127
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EventsPage;
