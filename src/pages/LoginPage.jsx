import React, { useEffect, useRef } from "react";
import { Button, Spinner, Form, Card } from "react-bootstrap";
import { loginInputs } from "../assets/customInputs/userLoginInputs.js";
import CustomInput from "../components/customInput/CustomInput.jsx";
import useForm from "../hooks/useForm.js";
import { signInUserApi } from "../services/authAPI.jsx";
import { fetchUserAction, autoLoginUser } from "../features/user/userAction.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const BRAND_ORANGE = "#D97B3F";

const initialState = {};
const SignInPage = () => {
  const { form, handleOnChange } = useForm(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showLoaderRef = useRef(true);

  const { user } = useSelector((state) => state.userInfo);

  useEffect(() => {
    user?._id ? navigate("/user") : dispatch(autoLoginUser());
  }, [user?._id, navigate, dispatch]);

  if (
    sessionStorage.getItem("accessJWT") ||
    localStorage.getItem("refreshJWT")
  ) {
    setTimeout(() => {
      showLoaderRef.current = false;
    }, 2000);
  } else {
    showLoaderRef.current = false;
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (form.email && form.password) {
      const { payload } = await signInUserApi(form);
      if (payload?.accessJWT) {
        sessionStorage.setItem("accessJWT", payload.accessJWT);
        localStorage.setItem("refreshJWT", payload.refreshJWT);
        dispatch(fetchUserAction());
      }
    } else {
      alert("Both input must be filled.");
    }
  };

  if (showLoaderRef.current) {
    return (
      <div
        className="vh-100 d-flex justify-content-center align-items-center"
        style={{ background: "#f6f6f8" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ background: "#f6f6f8", color: "#222", padding: 24 }}
    >
      <Card
        className="shadow-lg"
        style={{
          width: "min(520px, 92vw)",
          borderRadius: 16,
          backgroundColor: "#fff",
          border: `1px solid ${BRAND_ORANGE}33`,
        }}
      >
        <Card.Body className="p-4 p-md-5">
          <div className="text-center mb-4">
            <h2 className="m-0" style={{ color: "#111", fontWeight: 700 }}>
              The Hidden Pour
            </h2>
            <p className="mt-1 mb-0" style={{ color: "#666" }}>
              Welcome back
            </p>
          </div>

          <Form onSubmit={handleOnSubmit}>
            {loginInputs.map((input) => (
              <CustomInput key={input.name} {...input} onChange={handleOnChange} />
            ))}

            <div className="d-grid mt-3">
              <Button
                type="submit"
                style={{ backgroundColor: BRAND_ORANGE, border: "none" }}
              >
                Login
              </Button>
            </div>

            <div className="text-center mt-3" style={{ color: "#666" }}>
              <p className="mb-1">
                Forgot Password?{" "}
                <Link to="/forgot-password" style={{ color: BRAND_ORANGE }}>
                  Reset Now
                </Link>
              </p>
              <p className="mb-0">
                Don’t have an account?{" "}
                <Link to="/signup" style={{ color: BRAND_ORANGE }}>
                  Signup
                </Link>{" "}
                here
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignInPage;
