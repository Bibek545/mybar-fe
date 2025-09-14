// //all API call related to signup

// import { apiProcessor } from "./axiosHelper";

// const apiBaseUrl = "http://localhost:8000"
// const authApiEP = apiBaseUrl + "/api/v1/auth"

// //for signup or creating a new user
// export const signUpNewUserApi = async (payload)=> {
//    const obj = {
//     url: authApiEP + '/register',
//     method: "post",
//     payload,
//     showToast: true,
//    }

//    const result = await apiProcessor(obj);
//    console.log(result)
//    return result;
// }
//  // this is for thE login

// export const loginUserApi= async (payload) => {
//    const obj = {
//       url: authApiEP + '/login',
//       method: "post",
//       payload,
//         showToast: true,

//    }

//    const result = await apiProcessor(obj);
//    console.log(result)
//    return result;
// }

// //this is to verify the email

// export const activateUserApi =  async (payload) => {
//    const obj = {
//       url: authApiEP + '/verify-email',
//       method: "post",
//       payload,
//         showToast: true,
//    }
//    return await apiProcessor(obj);
// }