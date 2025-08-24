// all API call related to signup , login , token
//api calling service

import { apiProcessor } from "./api";

const apiBaseUrl = "http://localhost:8020";
const authApiEP = apiBaseUrl + "/api/v1/auth";

export const signUpNewUserApi = async (payload) => {
  const obj = {
    url: authApiEP + "/register",
    method: "post",
    payload,
    showToast: true,
  };

  const result = await apiProcessor(obj);
  console.log(result);
};

export const activateNewUserApi = async (payload) => {
  const obj = {
    url: authApiEP + "/activate-user",
    method: "post",
    payload,
  };
  return apiProcessor(obj);
};

export const signInUserApi = async (payload) => {
  const obj = {
    url: authApiEP + "/login",
    method: "post",
    payload,
    showToast: true,
  };

  return apiProcessor(obj);
};
//request new accessJWT api
export const fetchNewAcessJWTApi = async () => {
  const obj = {
    url: authApiEP + "/renew-jwt",
    method: "get",
    isPrivateCall: true,
    isRefreshJWt: true,
  };

  return apiProcessor(obj);
};

//logout

export const logoutApi = () => {
  const obj = {
    url: authApiEP + "/logout",
    method: "get",
    isPrivateCall: true,
  };
  return apiProcessor(obj);
};

//request password reset otp
export const requestPassResetOTPApi = async (payload) => {
  const obj = {
    url: authApiEP + "/otp",
    method: "post",
   payload,
  };
  return apiProcessor(obj);
};


//reset the password
export const resetPassApi = async (payload) => {
    const obj = {
        url: authApiEP + '/reset-password',
        method: "post",
        payload,
        showToast: true,
    };
    return apiProcessor(obj);
}