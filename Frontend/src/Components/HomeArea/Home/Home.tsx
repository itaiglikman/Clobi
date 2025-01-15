import { useEffect, useState } from "react";
import ClockButton from "../ClockButton/ClockButton";
import "./Home.css";
import UserModel from "../../../Models/UserModel";
import authStore from "../../../Redux/AuthState";

function Home(): JSX.Element {
  const [user, setUser] = useState<UserModel>(); //logged user

  useEffect(() => {
    // set logged user by current global state:
    const loggedUser: UserModel = authStore.getState().user;
    setUser(loggedUser);

    // subscribe for user log changes:
    const authUnsubscribe = authStore.subscribe(() => {
        // get updated user on changes and set it:
        const updatedUser = authStore.getState().user;
        setUser(updatedUser);
    });

    return authUnsubscribe;
  }, []);

  return (
    <div className="Home">
      <h2>Welcome to Clobi</h2>
      {user && <ClockButton user={user} />}
    </div>
  );
}

export default Home;
