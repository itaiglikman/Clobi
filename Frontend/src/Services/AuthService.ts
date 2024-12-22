import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import authStore, { AuthAction, AuthActionType } from "../Redux/AuthState";
// import { VacationActionType, vacationStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";

class AuthService {

    // register new user:
    public async register(user: UserModel): Promise<void> {
        // send new user to backend:
        // on register - the back will send back a token string with specific expiration.
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // extract the token:
        const token = response.data;

        // send token to global state:
        const action: AuthAction = { type: AuthActionType.Register, payload: token };
        authStore.dispatch(action);
    }

    // login existing user:
    public async login(credentials: CredentialsModel): Promise<void> {

        // send credentials to backend:
        // on login - the back will send back a token string with specific expiration.
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // extract the token:
        const token = response.data;

        // send token to global state:
        const action: AuthAction = { type: AuthActionType.Login, payload: token };
        authStore.dispatch(action);
    }

    // logout existing user:
    public async logout(): Promise<void> {
        // call logout in global state:
        const action: AuthAction = { type: AuthActionType.Logout };
        authStore.dispatch(action);
        // reset vacations global state on user logout:
        // vacationStore.dispatch({ type: VacationActionType.SetVacations, payload: [] });
    }

    public async getAllUsers(): Promise<UserModel[]> {
        const response = await axios.get<UserModel[]>(appConfig.usersUrl);
        const users = response.data;
        console.log("auth service getAllUsers-->", users);
        return users;
    }
}

const authService = new AuthService();

export default authService;