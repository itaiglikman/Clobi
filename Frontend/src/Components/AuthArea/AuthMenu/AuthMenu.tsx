import { LogIn, LogOut, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authStore from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate();

    //use redux:
    useEffect(() => {
        // get the current state of user log and subscribe for changes:
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => setUser(authStore.getState().user));
        // on killing the component - stop listening for log changes:
        return unsubscribe;
    }, []);

    function fullName() {
        let fullName = user.firstName + " " + user.lastName;
        return fullName;
    }

    // logout user:
    function logoutMe(): void {
        authService.logout();
        notifyService.success("Bye " + user.firstName + "! You're logged-out");
        navigate("/home");
    }

    return (
        <div className="AuthMenu">

            <span className="fullName"> {user ? fullName() : "Hello Guest"} </span>

            {/* if user is not logged in: */}
            {!user &&
                <>
                    <NavLink to={"/login"} title="login"><LogIn /></NavLink>
                    <NavLink to={"/register"} title="register"><UserPlus /></NavLink>
                </>
            }

            {/* if user is logged in: */}
            {user &&
                <NavLink to={"/home"} onClick={logoutMe} title="logout"><LogOut /></NavLink>
            }

        </div>
    );
}

export default AuthMenu;
