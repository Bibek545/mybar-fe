// import axios from "axios";
// import { toast } from "react-toastify";
// import { fetchNewAcessJWTApi } from "./authAPI.jsx";

// const getAccessJWT = () => {
//   return sessionStorage.getItem("accessJWT");
// };
// const getRefreshJWt = () => {
//   return localStorage.getItem("refreshJWT");
// };

// export const apiProcessor = async ({
//   url,
//   method,
//   payload,
//   showToast,
//   isPrivateCall,
//   isRefreshJWt,
// }) => {
//   try {
//     const headers = {};

//     if (isPrivateCall) {
//       const token = isRefreshJWt ? getRefreshJWt() : getAccessJWT();
//       headers.authorization = "bearer " + token;
//     }
//     const responsePending = axios({
//       url,
//       method,
//       data: payload,
//       headers,

//       //headers
//     });

//     //show toastMessage
//     if (showToast) {
//       toast.promise(responsePending, {
//         pending: "Please wait....",
//       });
//     }
//     const { data } = await responsePending;
//     showToast && toast[data.status](data.message);
//     return data;
//   } catch (error) {
//     console.log(error);
//     const msg = error?.response?.data?.message || error.message;
//     showToast && toast.error(msg);
//     console.log(msg);
//     if (error.status === 401 && msg === "jwt expired") {
//       // call api to get new accessJWT

//       const { payload } = await fetchNewAcessJWTApi();

//       if (payload) {
//         sessionStorage.setItem("accessJWT", payload);
//       }
//       //call the api processor
//       return apiProcessor({
//         url,
//         method,
//         payload,
//         showToast,
//         isPrivateCall,
//         isRefreshJWt,
//       });
//     } else {
//       sessionStorage.removeItem("accessJWT");
//       localStorage.removeItem("refreshJWT");
//     }
//     return {
//       status: "error",
//       message: msg,
//     };
//   }
// };


import axios from "axios";
import { toast } from "react-toastify";
import { fetchNewAcessJWTApi } from "./authAPI.jsx"; // assuming this returns a new access token

const getAccessJWT = () =>
  sessionStorage.getItem("accessJWT") || localStorage.getItem("accessJWT"); // try both

const getRefreshJWT = () => localStorage.getItem("refreshJWT");

export const apiProcessor = async ({
  url,
  method = "get",
  payload,
  showToast = false,
  isPrivateCall = false,
  isRefreshJWT = false,
}) => {
  try {
    const headers = { "Content-Type": "application/json" };

    if (isPrivateCall) {
      const token = isRefreshJWT ? getRefreshJWT() : getAccessJWT();
      if (token) {
        headers.Authorization = `Bearer ${token}`; // 👈 Capital B
      }
    }

    const request = axios({
      url,
      method,
      data: payload,
      headers,
      // withCredentials: true, // enable if you use cookies
    });

    if (showToast) {
      toast.promise(request, { pending: "Please wait..." });
    }

    const { data } = await request;
    if (showToast && data?.message) toast[data.status || "success"](data.message);
    return data;
  } catch (error) {
    const statusCode = error?.response?.status;
    const msg = error?.response?.data?.message || error.message || "Request failed";

    if (showToast) toast.error(msg);

    // 🔁 Refresh flow: only for access-token protected calls
    if (isPrivateCall && statusCode === 401 && /jwt expired/i.test(msg)) {
      try {
        const refreshed = await fetchNewAcessJWTApi(); // your refresh endpoint
        const newAccess = refreshed?.payload || refreshed?.accessJWT || refreshed?.data?.accessJWT;
        if (newAccess) {
          sessionStorage.setItem("accessJWT", newAccess);
          // Retry original request once with the new token
          return apiProcessor({
            url,
            method,
            payload,
            showToast,
            isPrivateCall,
            isRefreshJWT: false,
          });
        }
      } catch (_) {
        // fall through to cleanup below
      }
    }

    // On other auth failures, clear tokens
    if (statusCode === 401) {
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");
    }

    return { status: "error", message: msg };
  }
};
