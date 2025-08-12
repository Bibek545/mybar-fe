import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { signUpInputes } from "../assets/customInputs/userSignUpInputs.js";
import CustomInput from "../customInput/CustomInput.jsx";
import { useForm } from "../hooks/useForm.js";
import { signUpNewUserApi } from "../helpers/authApi.js";
import { ToastContainer } from "react-toastify";
import { toastSuccess, toastError } from "../helpers/toastHelper.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";


const initialState = {}

const SignUpPage = () => {
    const {form, setForm, handleOnChange, passwordErrors} = useForm(initialState);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log(form);
        

        // const {confirmPassword, ...rest} = form
        // if(confirmPassword!==rest.password) return alert("Password does not match")
        //     const result = await signUpNewUserApi(rest)
        // console.log(result);    
          

        const {confirmPassword, ...rest} = form;
        if(confirmPassword!==rest.password) return alert("Passswod doesnot match") 
          const result = await signUpNewUserApi(rest);
        console.log(result);
}

console.log(passwordErrors);
       


// {
//            return toastError("Password does not match")
//         }
    
//          try {
//           const res = await signUpNewUserApi(rest);
//           console.log("API RESPONSE, res")
//           const {status, message} = res.data;

//            if(status === "success") {
//             toastSuccess(message);
//            } else {
//             toastError(message|| "something went wrong")
//            }
//          } catch(error) {
//           toastError(error?.response?.data?.message || "something went wrong");
//          }
//     }
     


  return (
    <>
    <div className="d-flex justify-content-center">
    <Form onSubmit={handleOnSubmit} 
     style={{width: "450px"}} className="card p-5 mt-5 shadow-lg mb-5">
       <h3>Sing up to continue</h3>
       {
        signUpInputes.map((input)=>(
        <CustomInput key={input.name} {...input} onChange = {handleOnChange}/>))
       }
      <Button variant="primary" type="submit"> 
        Submit
      </Button>
      <br />
       <h6 className="text-center">Already have an account? <Link to = "/login">Login</Link> here</h6>
    </Form>
 
    </div>
    <ToastContainer position="top-right" autoClose = {3000} />
    </>
    
  )
}

export default SignUpPage;
