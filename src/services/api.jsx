import axios from "axios";
import { toast } from "react-toastify";
import { fetchNewAcessJWTApi } from "./authAPI.jsx";

const getAccessJWT = () => {
  return sessionStorage.getItem("accessJWT");
};
const getRefreshJWt = () => {
  return localStorage.getItem("refreshJWT");
};

export const apiProcessor = async ({
  url,
  method,
  payload,
  showToast,
  isPrivateCall,
  isRefreshJWt,
}) => {
  try {
    const headers = {};

    if (isPrivateCall) {
      const token = isRefreshJWt ? getRefreshJWt() : getAccessJWT();
      headers.authorization = "bearer " + token;
    }
    const responsePending = axios({
      url,
      method,
      data: payload,
      headers,

      //headers
    });

    //show toastMessage
    if (showToast) {
      toast.promise(responsePending, {
        pending: "Please wait....",
      });
    }
    const { data } = await responsePending;
    showToast && toast[data.status](data.message);
    return data;
  } catch (error) {
    console.log(error);
    const msg = error?.response?.data?.message || error.message;
    showToast && toast.error(msg);
    console.log(msg);
    if (error.status === 401 && msg === "jwt expired") {
      // call api to get new accessJWT

      const { payload } = await fetchNewAcessJWTApi();

      if (payload) {
        sessionStorage.setItem("accessJWT", payload);
      }
      //call the api processor
      return apiProcessor({
        url,
        method,
        payload,
        showToast,
        isPrivateCall,
        isRefreshJWt,
      });
    } else {
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");
    }
    return {
      status: "error",
      message: msg,
    };
  }
};
