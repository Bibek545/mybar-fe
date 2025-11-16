// all API call related to signup , login , token
//api calling service

import { apiProcessor } from "./api";

// const apiBaseUrl = "http://localhost:8020";
// const apiBaseUrl = "http://thp-be-env.eba-xy2dbsaa.ap-southeast-2.elasticbeanstalk.com";

 const apiBaseUrl = "https://mybar-be.onrender.com"

// http://thp-be-env.eba-xy2dbsaa.ap-southeast-2.elasticbeanstalk.com/

// const adminApiBaseUrl = "http://localhost:8040";
// const adminApiBaseUrl = "http://thp-admin-be-env.eba-pejytbmb.ap-southeast-2.elasticbeanstalk.com";

const adminApiBaseUrl = "https://mybar-admin-be.onrender.com"


// http://thp-admin-be-env.eba-pejytbmb.ap-southeast-2.elasticbeanstalk.com/

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
};


// MEMBER (auth; apiProcessor should attach the Bearer automatically,
// if not, add headers: { Authorization: `Bearer ${token}` } here)
export const createBookingApi = async (payload) => {
  return apiProcessor({
    url: `${apiBaseUrl}/api/v1/booking`,
    method: "post",
    payload,
    showToast: true,
  });
};

export const createMemberBookingApi = async (payload) => {
  return apiProcessor({
    url: `${apiBaseUrl}/api/v1/booking/members`, // ✅ member route
    method: "post",
    payload, // date, time, guests, allergies, notes (identity read from token)
    showToast: true,
        isPrivateCall: true, 
    
  });
};

// ---- Prefill current user (auth) ----
export const getMeApi = async (payload) => {
  return apiProcessor({
    url: `${apiBaseUrl}/api/v1/users/me`,
    method: "get",
    payload,
  });
};

// list my bookings (auth)
export const getMyBookingsApi = async (payload) => {
  return apiProcessor({
    url: `${apiBaseUrl}/api/v1/booking/members/me`,
    method: "get",
    payload,
    isPrivateCall: true,        
    
  });
};

// deleting or canceling the events

export const cancelMyBookingApi = async (_id, payload)=> {
  const obj = {
    url: `${apiBaseUrl}/api/v1/booking/members/${_id}/cancel`,
    method: "patch",
    payload,
    showToast: true,
  };
  return apiProcessor(obj);
};
//fetching the menu
export const getAllMenuItemsApi = async () => {
  const obj = {
    url: adminApiBaseUrl + "/api/v1/menu",
    method: "get"
  };
  return apiProcessor(obj);
};



//fetching the events
export const getAllEventItemsApi = async () => {
  const obj = {
    url: adminApiBaseUrl + "/api/v1/event/public",
    method: "get",
    isPublic: true
  };
  return apiProcessor(obj);
};


// getting the rewards
export const getMyRewardsApi = async () => {
  const obj = {
    url: `${apiBaseUrl}/api/v1/rewards/me`,
    method: "get",
    isPrivateCall: true,
  };
  return apiProcessor(obj);
};