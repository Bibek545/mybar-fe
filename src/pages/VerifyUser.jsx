import React, { useEffect, useRef, useState } from "react";
import { Alert, Spinner, Button, Card } from "react-bootstrap";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { activateNewUserApi } from "../services/authAPI";
import { FaCircleCheck, FaTriangleExclamation } from "react-icons/fa6";

const BRAND_ORANGE = "#D97B3F";

const VerifyUser = () => {
  const [isPending, setIsPending] = useState(true);
  const [response, setResponse] = useState({});
  const shouldFetchRef = useRef(true);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sessionId = searchParams.get("sessionId");
  const t = searchParams.get("t");

  // One-time verify call
  useEffect(() => {
    if (!shouldFetchRef.current) return;

    // If link is malformed, show error quickly
    if (!sessionId || !t) {
      setResponse({
        status: "error",
        message: "Invalid activation link. Please use the latest link we emailed you.",
      });
      setIsPending(false);
      shouldFetchRef.current = false;
      return;
    }

    (async () => {
      try {
        const result = await activateNewUserApi({ sessionId, t });
        setResponse(result);
      } catch (err) {
        setResponse({
          status: "error",
          message:
            err?.response?.data?.message ||
            "Activation failed. The link may be invalid or expired.",
        });
      } finally {
        setIsPending(false);
      }
    })();

    shouldFetchRef.current = false;
  }, [sessionId, t]);

  // Redirect after success
  useEffect(() => {
    if (response?.status === "success") {
      const id = setTimeout(() => navigate("/login"), 2200);
      return () => clearTimeout(id);
    }
  }, [response?.status, navigate]);

  const isSuccess = response?.status === "success";
  const isError = response?.status === "error";

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "#f6f6f8",       // lighter app background
        color: "#222",
        padding: 24,
      }}
    >
      <Card
        className="shadow-lg"
        style={{
          width: "min(540px, 92vw)",
          borderRadius: 16,
          backgroundColor: "#fff",   // white card
          border: `1px solid ${BRAND_ORANGE}33`, // subtle orange border
        }}
      >
        <Card.Body className="p-4 p-md-5 text-center">
          {/* Brand */}
          <h2 className="m-0" style={{ color: "#111", fontWeight: 700 }}>The Hidden Pour</h2>
          <p className="mt-1 mb-4" style={{ color: "#666" }}>Account Verification</p>

          {/* Loading */}
          {isPending && (
            <div className="py-3">
              <Spinner animation="border" role="status" />
              <div className="mt-3" style={{ color: "#444" }}>
                Verifying your account… please wait.
              </div>
            </div>
          )}

          {/* Result */}
          {!isPending && (
            <>
              {isSuccess && (
                <div className="py-2">
                  <FaCircleCheck size={52} color={BRAND_ORANGE} />
                  <h4 className="mt-3" style={{ color: "#111" }}>You’re in!</h4>
                  <p style={{ color: "#555" }}>
                    {response?.message || "Account verified successfully."}
                  </p>

                  <div className="d-grid gap-2 mt-2">
                    <Button
                      as={Link}
                      to="/login"
                      style={{ backgroundColor: BRAND_ORANGE, border: "none" }}
                    >
                      Go to Login
                    </Button>
                    <div style={{ fontSize: 13, color: "#777" }}>
                      Redirecting you shortly…
                    </div>
                  </div>
                </div>
              )}

              {isError && (
                <div className="py-2">
                  <FaTriangleExclamation size={52} color="#cc3333" />
                  <h4 className="mt-3" style={{ color: "#111" }}>Verification failed</h4>

                  <Alert
                    variant="light"
                    className="mt-3 text-start"
                    style={{ borderColor: "#cc3333", color: "#a40000" }}
                  >
                    {response?.message ||
                      "The link may be invalid or expired. Please request a new one."}
                  </Alert>

                  <div className="d-grid gap-2 mt-2">
                    <Button
                      as={Link}
                      to="/login"
                      variant="outline-dark"
                      style={{ borderColor: BRAND_ORANGE, color: BRAND_ORANGE }}
                    >
                      Back to Login
                    </Button>
                    <Button
                      as={Link}
                      to="/signup"
                      style={{ backgroundColor: BRAND_ORANGE, border: "none" }}
                    >
                      Create a new account
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default VerifyUser;
