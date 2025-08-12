import HeroParallax from "../components/HeroParallax";

export default function ContactPage() {
  return (
    <div className="contact-page">
      {/* Optional hero—delete if you don't want it */}
      <HeroParallax
        title="Contact"
        image="/images/restContBack.png"
        height={600}
        titleColor="#f8f3f3ff"
      />

      {/* Main content */}
      <section className="container py-4 py-md-5">
        <div className="row g-4 g-lg-5 align-items-start">
          {/* Left: Photo */}
          <div className="col-lg-5">
            <figure className="contact-photo">
              <img
                src="/images/contImg1.png"
                alt="Dining room at The Hidden Pour"
                loading="lazy"
              />
            </figure>
          </div>

          {/* Right: Details */}
          <div className="col-lg-7">
            <div className="contact-panel">
              <h2 className="contact-title">The Hidden Pour</h2>

              <div className="contact-block">
                <h6 className="contact-heading">Address</h6>
                <p className="mb-2">15 Sample St, Sydney NSW 2000</p>
                <a
                  className="contact-link"
                  href="https://maps.google.com/?q=The+Hidden+Pour+Sydney"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google Maps →
                </a>
              </div>

              <div className="contact-block">
                <h6 className="contact-heading">Email</h6>
                <a
                  className="contact-link"
                  href="mailto:bookings@hiddenpour.com"
                >
                  bookings@hiddenpour.com
                </a>
              </div>

              <div className="contact-block">
                <h6 className="contact-heading">Phone</h6>
                <a className="contact-link" href="tel:+61290000000">
                  (02) 9000 0000
                </a>
              </div>

              <div className="contact-block">
                <h6 className="contact-heading">Trading Hours</h6>
                <ul className="list-unstyled contact-hours">
                  <li>Mon – Tue: Closed</li>
                  <li>Wed – Thu: 11:30am – 9:30pm</li>
                  <li>Fri – Sat: 11:30am – 10:00pm</li>
                  <li>Sun: 11:30am – 9:00pm</li>
                </ul>
                <p className="text-muted small mb-0">
                  Kitchen opens from 12pm.
                </p>
              </div>

              <div className="contact-block">
                <h6 className="contact-heading">Groups & Events</h6>
                <p className="mb-2">
                  For event enquiries or larger bookings, please see our events
                  page or email us.
                </p>
                <a className="contact-link" href="/events">
                  Explore events →
                </a>
              </div>

              <div className="d-flex gap-3 mt-4">
                <a className="btn btn-thp" href="/booking">
                  Make a booking
                </a>
                <a
                  className="btn btn-thp-outline"
                  href="mailto:bookings@hiddenpour.com"
                >
                  Email us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
