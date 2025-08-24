import React, { useState } from "react";
import { Form, Button, Card, Toast } from "react-bootstrap";

const UserSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Bookings",
    message: "",
  });

  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support message submitted:", formData);
    setShowToast(true);
    setFormData({ name: "", email: "", subject: "Bookings", message: "" });
  };

  return (
    <Card className="p-4 shadow-sm border-0">
      <h3 className="text-black mb-4">Need Help? Contact Us</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Subject</Form.Label>
          <Form.Select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          >
            <option>Bookings</option>
            <option>Member Perks</option>
            <option>Events</option>
            <option>Profile Settings</option>
            <option>Something Else</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            placeholder="Tell us more about your issue..."
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button
          type="submit"
          variant="white"
          className="px-5 text-orange border-orange"
        >
          Submit
        </Button>
      </Form>

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        bg="success"
        className="position-absolute bottom-0 end-0 m-4"
      >
        <Toast.Body className="text-white">Message submitted successfully!</Toast.Body>
      </Toast>
    </Card>
  );
};

export default UserSupport;
