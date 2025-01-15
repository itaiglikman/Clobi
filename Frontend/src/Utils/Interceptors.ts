import axios from "axios";
import authStore from "../Redux/AuthState";

// Use create() in index.tsx!!!

class Interceptors {

    // create app interceptors:
    public create(): void {

        // registering to the request interceptor:
        // requestObject contains data sent with any request.
        // check any request from db - if contains the necessary permissions:
        axios.interceptors.request.use(requestObjects => {
            // timezonedb will fail with the token so exclude this request:
            if(requestObjects.url?.includes("timezonedb.com")) return requestObjects;
            //Check if the request obj has a token.
            if (authStore.getState().token)
                // If true: add it to the requestObject:
                requestObjects.headers.Authorization = "Bearer " + authStore.getState().token;
            
            // Add Content-Type header for JSON payloads:
            // if (["POST", "PUT", "PATCH"].includes(requestObjects.method?.toUpperCase()))
            //     requestObjects.headers["Content-Type"] = "application/json";
            
            return requestObjects;
        });
    }
}

const interceptors = new Interceptors();
export default interceptors;

