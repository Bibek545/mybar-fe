import React, { useState } from "react";
import HeroParallax from "../components/HeroParallax"; // optional

export default function CareersPage() {
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setStatus({ type: "error", msg: "Please fill required fields." });
      return;
    }

    const data = new FormData(form); // handles file upload too
    try {
      // TODO: replace with your endpoint
      const res = await fetch("/api/careers/apply", { method: "POST", body: data });
      if (!res.ok) throw new Error("Failed to submit");
      form.reset();
      setStatus({ type: "success", msg: "Application submitted! We’ll be in touch." });
    } catch (err) {
      setStatus({ type: "error", msg: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="careers-page">
      <HeroParallax
        title="Careers"
        subtitle="Come join us."
        image="/images/restCareerBack.png"
        height={800}
        titleColor="#f8f3f3ff"
      />

      <section className="container py-4 py-md-5">
        <div className="row g-4 g-lg-5 align-items-start">
          <div className="col-lg-6">
            <h2 className="careers-title">Work with us</h2>
            <p className="text-muted">
              We’re always looking for friendly, curious people who care about great hospitality.
              If you love cocktails, teamwork, and a calm rush, we’d love to hear from you.
            </p>

            <ul className="list-unstyled careers-list">
              <li>• Front of House (servers, hosts)</li>
              <li>• Bar Team (bartenders, barbacks)</li>
              <li>• Kitchen (chefs, preps)</li>
              <li>• Casual & part‑time roles</li>
            </ul>

            <p className="small text-muted">
              Don’t see the perfect role? Send us your details anyway—we review applications weekly.
            </p>
          </div>

          <div className="col-lg-6">
            <div className="card careers-card shadow-sm">
              <div className="card-body p-4">
                <h3 className="h5 mb-3">Apply now</h3>
                {status.msg && (
                  <div
                    className={`alert ${status.type === "success" ? "alert-success" : "alert-danger"} py-2`}
                  >
                    {status.msg}
                  </div>
                )}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">First name *</label>
                      <input name="firstName" className="form-control" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Last name *</label>
                      <input name="lastName" className="form-control" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email *</label>
                      <input type="email" name="email" className="form-control" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input name="phone" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Role you’re applying for *</label>
                      <select name="role" className="form-select" required>
                        <option value="">Select a role</option>
                        <option>Front of House</option>
                        <option>Bartender</option>
                        <option>Barback</option>
                        <option>Chef</option>
                        <option>Kitchen Hand</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Resume (PDF/DOC)</label>
                      <input type="file" name="resume" accept=".pdf,.doc,.docx" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Message</label>
                      <textarea name="message" rows="4" className="form-control" placeholder="Tell us a bit about you…" />
                    </div>
                    <div className="col-12 form-check">
                      <input className="form-check-input" type="checkbox" id="consent" name="consent" required />
                      <label className="form-check-label" htmlFor="consent">
                        I consent to The Hidden Pour storing my details for recruitment.
                      </label>
                    </div>
                    <div className="col-12 d-flex gap-3 mt-2">
                      <button className="btn btn-thp" type="submit">Submit application</button>
                      <a className="btn btn-thp-outline" href="mailto:careers@hiddenpour.com">Email us</a>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <p className="small text-muted mt-3">
              We’re an equal opportunity employer. If you need adjustments in the process, let us know.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
