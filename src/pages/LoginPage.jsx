import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { loginUserApi } from "../helpers/authApi";
import { useForm } from "../hooks/useForm.js";
import { toastError, toastSuccess } from "../helpers/toastHelper.js";
import { ToastContainer } from "react-toastify";
import { loginInputs } from "../assets/customInputs/userLoginInputs.js";
import CustomInput from "../customInput/CustomInput.jsx";
import { Link } from "react-router-dom";

const initialState = {};

const LoginPage = () => {
  const { form, handleOnChange } = useForm(initialState);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUserApi(form);
      const { status, message, accessToken } = res.data;

      if (status === "success") {
        toastSuccess(message);

        //optionally storing token, will use redux later
        localStorage.setItem("accessToken", accessToken);
      } else {
        toastError(message || "Login failed");
      }
    } catch (error) {
      toastError(error?.response?.data?.message || "Login error");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <Form onSubmit={ handleOnSubmit}
          style={{ width: "450px" }}
          className="card p-5 mt-5 shadow-lg mb-5"
        >
          <h3>Login to continue</h3>
          {loginInputs.map((input) => (
            <CustomInput key={input.email} {...input} onChange = { handleOnChange }/>
          ))}

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <br />

          <h6 className="text-center">Don't have the account? <Link to = "/signup">Sign Up</Link> here</h6>
        </Form>
      </div>
       <ToastContainer position="top-right" autoClose = {3000} />
    </>
  );
};

export default LoginPage;
