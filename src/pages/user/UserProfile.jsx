// pages/user/UserProfile.jsx
import React, { useState } from "react";
import { Form, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
// import { validator } from "../../helpers/validator"; // use your existing validator
import { toast } from "react-toastify";
import { validator } from "../../utils/validatePassword";

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "Bibek Hamal",
    email: "bibek@email.com",
    phone: "0412345678",
    favoriteDrink: "Espresso Martini",
    allergies: "None",
    newsletter: true,
    password: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validator(formData.password, formData.confirmPassword);
    if (errors.length > 0) {
      setPasswordErrors(errors);
      return;
    }
    setPasswordErrors([]);
    setIsUpdating(true);

    setTimeout(() => {
      setIsUpdating(false);
      toast.success("Profile updated successfully");
      setEditMode(false);
    }, 1500);
  };

  return (
    <div className="p-3">
      <h2 className="mb-4">My Profile</h2>

      <Form onSubmit={handleSubmit}>
        <Row className="align-items-center mb-4">
          <Col md={3} className="text-center">
            <img
              src={profileImage || "/images/placeholder-avatar.png"}
              alt="Profile"
              className="rounded-circle border"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            {editMode && (
              <Form.Group controlId="formFile" className="mt-3">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setProfileImage(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </Form.Group>
            )}
          </Col>

          <Col md={9}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    readOnly={!editMode}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    readOnly={!editMode}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    readOnly={!editMode}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Favorite Drink</Form.Label>
                  <Form.Control
                    type="text"
                    name="favoriteDrink"
                    value={formData.favoriteDrink}
                    onChange={handleInputChange}
                    readOnly={!editMode}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Allergies</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col>
                <Form.Check
                  type="switch"
                  label="Subscribe to Newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <p className="mb-1">Date Joined: 01 March 2024</p>
                <p className="mb-0">Membership Status: Gold Member</p>
              </Col>
              <Col className="text-end">
                <Button
                  variant="link"
                  className="text-orange"
                  onClick={() => (window.location.href = "/user/bookings")}
                >
                  View My Bookings
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        {editMode && (
          <>
            <hr />
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {passwordErrors.length > 0 && (
              <Alert variant="danger">
                <ul className="mb-0">
                  {passwordErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </Alert>
            )}
          </>
        )}

        <div className="text-center mt-4">
          {isUpdating ? (
            <Spinner animation="border" variant="dark" />
          ) : (
            <>
              {editMode ? (
                <>
                  <Button type="submit" variant="dark" className="me-3">
                    Save Changes
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setEditMode(true)} variant="dark">
                  Edit Info
                </Button>
              )}
            </>
          )}
        </div>
      </Form>
    </div>
  );
};

export default UserProfile;
