import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Card, Form, Spinner, Container, Row, Col } from "react-bootstrap";
import CustomInput from "../components/customInput/CustomInput.jsx";
import useForm from "../hooks/useForm.js";
import { requestPassResetOTPApi, resetPassApi } from "../services/authAPI.jsx";
import { useNavigate } from "react-router-dom";

const initialState = {};
const timToRequestOtpAgain = 30;
const THP_ORANGE = "#D97B3F";

const ForgetPasswordPage = () => {
  const navigate = useNavigate();
  const emailRef = useRef("");
  const [showPassResetForm, setShowPassResetForm] = useState(false); // show second part of the form
  const [isOtpPending, setOtpPending] = useState(false); // spinner
  const [isOtpBtnDisabled, setOtpBtnDisabled] = useState(false); // disable button
  const [counter, setCounter] = useState(0); // show the counter in button

  const { form, passwordErrors, handleOnChange } = useForm(initialState);

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setOtpBtnDisabled(false);
    }
  }, [counter]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    setOtpPending(true);
    setOtpBtnDisabled(true);
    const response = await requestPassResetOTPApi({ email });
    if (response?.status === "success") {
      setShowPassResetForm(true);
    }
    setOtpPending(false);
    setCounter(timToRequestOtpAgain);
  };

  const handleOnPasswordResetSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const payload = {
      email,
      otp: form.otp,
      password: form.password,
    };

    const response = await resetPassApi(payload);
    if (response?.status === "success") {
      setTimeout(() => navigate("/login"), 3000);
    }
  };

  return (
    <div className="forgot-password py-5" style={{ backgroundColor: "#fff" }}>
      <Container>
        {/* Page Header */}
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#2b2b2b" }}>Password Reset</h2>
          <p className="text-muted mb-0">
            Reset your password securely for <span className="fw-semibold" style={{ color: "#2b2b2b" }}>The Hidden Pour</span>.
          </p>
        </div>

        {/* Two-Card Hub Layout */}
        <Row className="g-4 justify-content-center">
          {/* LEFT: Request OTP */}
          <Col xs={12} md={6} lg={5}>
            <Card className="shadow-sm border-0" style={{ borderRadius: "16px" }}>
              <Card.Body className="p-4 p-md-5">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="fw-semibold" style={{ color: "#2b2b2b", fontSize: 18 }}>Need an OTP?</span>
                </div>
                <p className="text-muted mb-3">
                  Enter your email and we’ll send a one‑time code to reset your password.
                </p>
                <Form onSubmit={handleOnSubmit}>
                  <CustomInput
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    passRef={emailRef}
                  />

                  <div className="d-grid mt-3">
                    <Button
                      type="submit"
                      disabled={isOtpBtnDisabled}
                      style={{ backgroundColor: THP_ORANGE, borderColor: THP_ORANGE, borderRadius: 9999 }}
                    >
                      {isOtpPending ? (
                        <Spinner variant="light" size="sm" />
                      ) : counter > 0 ? (
                        `Request again in ${counter}s`
                      ) : (
                        "Request OTP"
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT: Reset with OTP */}
          <Col xs={12} md={6} lg={5}>
            <Card className="shadow-sm border-0" style={{ borderRadius: "16px" }}>
              <Card.Body className="p-4 p-md-5">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="fw-semibold" style={{ color: "#2b2b2b", fontSize: 18 }}>Have your OTP?</span>
                </div>
                <p className="text-muted mb-3">
                  Use the code from your email to set a new password.
                </p>

                {/* When OTP requested, show the form and success tip */}
                {showPassResetForm ? (
                  <>
                    <Alert variant="success" className="py-2">
                      We’ve sent an OTP to your email. Please also check junk/spam if you don’t see it.
                    </Alert>

                    <Form onSubmit={handleOnPasswordResetSubmit}>
                      <CustomInput
                        label="OTP"
                        name="otp"
                        type="number"
                        required
                        placeholder="0000"
                        onChange={handleOnChange}
                      />
                      <CustomInput
                        label="New Password"
                        name="password"
                        type="password"
                        required
                        placeholder="••••••••"
                        onChange={handleOnChange}
                      />
                      <CustomInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        required
                        placeholder="••••••••"
                        onChange={handleOnChange}
                      />

                      <div className="py-2">
                        <ul className="mb-2" style={{ listStyle: "disc", paddingLeft: 18 }}>
                          {passwordErrors.length > 0 &&
                            passwordErrors.map((msg) => (
                              <li key={msg} className="text-danger small">{msg}</li>
                            ))}
                        </ul>
                      </div>

                      <div className="d-grid mt-2">
                        <Button
                          type="submit"
                          disabled={passwordErrors.length}
                          style={{ backgroundColor: THP_ORANGE, borderColor: THP_ORANGE, borderRadius: 9999 }}
                        >
                          Reset Password
                        </Button>
                      </div>
                    </Form>
                  </>
                ) : (
                  // Locked/placeholder state until OTP requested
                  <div className="text-muted" style={{ fontSize: 14 }}>
                    Once you request an OTP, you can enter it here and choose a new password.
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Terms & footer */}
        <div className="text-center text-muted mt-4 small">
          By continuing, you agree to our <a href="/terms" style={{ color: THP_ORANGE, textDecoration: "none" }}>Terms</a> & {" "}
          <a href="/privacy" style={{ color: THP_ORANGE, textDecoration: "none" }}>Privacy Policy</a>.
        </div>

        <div className="text-center text-muted mt-4" style={{ fontSize: 12 }}>
          © 2025 The Hidden Pour. All rights reserved.
        </div>
      </Container>
    </div>
  );
};

export default ForgetPasswordPage;
