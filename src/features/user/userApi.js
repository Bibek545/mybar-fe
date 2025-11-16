import { apiProcessor } from "../../services/api";

// const apiBaseUrl = "http://thp-be-env.eba-xy2dbsaa.ap-southeast-2.elasticbeanstalk.com"

 const apiBaseUrl = "https://mybar-be.onrender.com"
const userApiEP = apiBaseUrl + "/api/v1/user"


//CALL API PROCESSOR TO FETCH THE USER  
export const fetchUserAPI = async() => {
    const obj = {
        url: userApiEP + '/profile',
        method: "get",
        showToast: false,
        isPrivateCall: true,
    };

    const result = await apiProcessor(obj);
  return result; //always return otherwise it will throw error in destructuring


}