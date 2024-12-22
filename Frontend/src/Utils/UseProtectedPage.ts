import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authStore from "../Redux/AuthState";
import notifyService from "../Services/NotifyService";

// custom hook for protecting pages from unauthorized access.
// hook get if access is for admin only or not.
// if no logged user or not admin - display error message and navigate user.
function useProtectedPage(isAdmin = false) {
    const navigate = useNavigate();

    useEffect(() => {
        // get logged user:
        let loggedUser = authStore.getState().user;
        // if no logged user - navigate to login:
        if (!loggedUser) {
            notifyService.error('Please Login');
            navigate('/login');
        } else //if logged user is not admin - return to vacations:
            if (isAdmin && loggedUser.roleId !== 1) {
                notifyService.error('You\'re not an admin!');
                navigate('/vacations');
            }
    }, []);
}

export default useProtectedPage;