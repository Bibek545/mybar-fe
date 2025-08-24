import React from "react";
import { Button, Form, Card } from "react-bootstrap";
import CustomInput from "../components/customInput/CustomInput.jsx";
import { signUpInputes } from "../assets/customInputs/userSignUpInputs.js";
import useForm from "../hooks/useForm.js";
import { signUpNewUserApi } from "../services/authAPI.jsx";

const BRAND_ORANGE = "#D97B3F";

const initialState = {};
const SignUpPage = () => {
  const { form, setForm, handleOnChange, passwordErrors } = useForm(initialState);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) return alert("Password does not match");

    const result = await signUpNewUserApi(rest);
    console.log(result);
  };

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
          {/* Brand header */}
          <div className="text-center mb-4">
            <h2 className="m-0" style={{ color: "#111", fontWeight: 700 }}>
              The Hidden Pour
            </h2>
            <p className="mt-1 mb-0" style={{ color: "#666" }}>
              Create your account
            </p>
          </div>

          <Form onSubmit={handleOnSubmit}>
            {signUpInputes.map((input) => (
              <CustomInput key={input.name} {...input} onChange={handleOnChange} />
            ))}

            <div className="py-2">
              <ul className="text-danger mb-0">
                {passwordErrors.length > 0 &&
                  passwordErrors.map((msg) => <li key={msg}>{msg}</li>)}
              </ul>
            </div>

            <div className="d-grid mt-3">
              <Button
                type="submit"
                disabled={passwordErrors.length}
                style={{ backgroundColor: BRAND_ORANGE, border: "none" }}
              >
                Sign Up
              </Button>
            </div>

            <div className="text-center mt-3" style={{ color: "#666" }}>
              Already have an account?{" "}
              <a href="/login" style={{ color: BRAND_ORANGE }}>
                Login
              </a>{" "}
              here
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUpPage;
