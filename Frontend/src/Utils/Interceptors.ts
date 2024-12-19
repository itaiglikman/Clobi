// import axios from "axios";
// import authStore from "../Redux/AuthState";

// // Use create() in index.tsx!!!

// class Interceptors {

//     // create app interceptors:
//     public create(): void {

//         // registering to the request interceptor:
//         // requestObject contains data sent with any request.
//         // check any request from db - if contains the necessary permissions:
//         axios.interceptors.request.use(requestObjects => {
//             if (authStore.getState().token)//Check if the request obj has a token.
//                 // If true: add it to the requestObject:
//                 requestObjects.headers.Authorization = "Bearer " + authStore.getState().token;

//             return requestObjects;
//         });
//     }
// }

// const interceptors = new Interceptors();
// export default interceptors;
export default {};
