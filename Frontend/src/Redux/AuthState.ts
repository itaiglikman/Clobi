import {jwtDecode} from "jwt-decode";
import { createStore } from "redux";
import UserModel from "../Models/UserModel";

//1. global state:
export class AuthState {
    public token: string = null; //JWT
    public user: UserModel = null; // set to null because in the beginning no logged user.

    // use constructor for access to storage:
    public constructor() {
        // on load/refresh extract the user from session storage:
        this.token = sessionStorage.getItem("token");
        if (this.token)
            this.user = jwtDecode<{ user: UserModel }>(this.token).user;
    }
}

// 2.action type:
export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

// 3. action:
export interface AuthAction {
    type: AuthActionType;// Wanted action type from the given options.
    payload?: string;// Wanted info type from the given options - the token.
}

// 4. Reducer (invoked by redux library):
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    let newState = { ...currentState }; //Duplicate the global state.

    // Change the duplicated global state according to the action:
    switch (action.type) {

        case AuthActionType.Register: // Payload is JWT token (string) containing user.
        case AuthActionType.Login: // Payload is JWT token (string) containing user.
            newState.token = action.payload;
            // for extracting the token: npm i jwt-decode 
            newState.user = jwtDecode<{ user: UserModel }>(newState.token).user;

            // save the user in the storage for keeping it signed-in on refresh 
            sessionStorage.setItem("token", newState.token);
            sessionStorage.setItem("user", JSON.stringify(newState.user));
            break;

        case AuthActionType.Logout: //no payload. reset global state and storage.
            newState.user = null;
            newState.token = null;
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");

            break;
    }
    return newState;
}

// 5. store:
let authStore = createStore(authReducer);
export default authStore;

