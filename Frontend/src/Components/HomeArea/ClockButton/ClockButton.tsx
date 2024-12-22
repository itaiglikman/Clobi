import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import ClockModel, {
  INewClockIN,
  INewClockOut,
} from "../../../Models/ClockModel";
import UserModel from "../../../Models/UserModel";
import authStore from "../../../Redux/AuthState";
import ClocksService from "../../../Services/ClocksService";
import germanyTimeService from "../../../Services/GermanyTimeService";
import notifyService from "../../../Services/NotifyService";
import { useNavigate } from "react-router-dom";

function ClockButton(): JSX.Element {
  const [user, setUser] = useState<UserModel>(); //logged user
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
  const [lastClock, setLastClock] = useState<ClockModel>();
  const navigate = useNavigate();

  useEffect(() => {
    // set logged user by current global state:
    const loggedUser: UserModel = authStore.getState().user;
    setUser(loggedUser);

    // get last clock for logged user and set isClockedIn:
    ClocksService.getLastClock(loggedUser?.id)
      .then((clock: ClockModel) => {
        console.log("useEffect lastClock", clock);
        setLastClock(clock);
        setIsClockedIn(clock && clock?.clockOut ? false : true);
      })
      .catch((err) => {
        notifyService.error(err);
        console.log(err.message);
        // on unauthorized request - send to login page:
        // if (err.response.status === 401) navigate("/login");
      });

    // subscribe for user log changes:
    const authUnsubscribe = authStore.subscribe(() => setUser(loggedUser));

    return authUnsubscribe;
  }, []);

  const handleClock = async () => {
    try {
      const currentTime = await germanyTimeService.germanyTime();
      //   console.log("Current Time:", currentTime.toLocaleString());
      //   console.log("lastClock", lastClock);
      isClockedIn
        ? await handleClockOut(currentTime)
        : await handleClockIn(currentTime);
      setIsClockedIn(!isClockedIn);
    } catch (err) {
      notifyService.error("Failed to record clock in/out");
    }
  };

  async function handleClockIn(currentTime: Date) {
    const ClockIn: INewClockIN = {
      userId: user.id,
      clockIn: currentTime.toLocaleString(),
    };
    console.log("thanks for clocking in", ClockIn);
    const newClockIn = await ClocksService.addClock(ClockIn);
    console.log("handleClockIn newClockIn", newClockIn);
  }

  async function handleClockOut(currentTime: Date) {
    const ClockOut: INewClockOut = {
      id: lastClock.id,
      userId: user.id,
      clockOut: currentTime.toLocaleString(),
    };
    const newClockOut = await ClocksService.patchClockOut(ClockOut);
    console.log("thanks for clocking out", newClockOut);
  }

  return (
    <Button
      variant="contained"
      color={isClockedIn ? "secondary" : "primary"}
      onClick={handleClock}
      sx={{ fontSize: "1.5rem", padding: "1rem 2rem", margin: "2rem" }}
    >
      {isClockedIn ? "Clock Out" : "Clock In"}
    </Button>
  );
}

export default ClockButton;

// function ClockButton(): JSX.Element {
//   const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
//   const [user, setUser] = useState<UserModel>(); //logged user
//   const [lastClock, setLastClock] = useState<ClockModel>();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // set logged user by current global state:
//     const loggedUser = authStore.getState().user;
//     setUser(loggedUser);
//     console.log("loggedUser", loggedUser);
//     // get last clock for logged user and set isClockedIn:
//     ClocksService.getLastClock(loggedUser?.id)
//       .then((clock: ClockModel) => {
//         setLastClock(clock);
//         setIsClockedIn(clock.clockOut ? false : true);
//       })
//       .catch((err) => {
//         notifyService.error(err);
//         // on unauthorized request - send to login page:
//         // if (err.response.status === 401) navigate("/login");
//       });

//     // subscribe for user log changes:
//     const authUnsubscribe = authStore.subscribe(() => setUser(loggedUser));

//     return authUnsubscribe;
//   }, []);

//   const handleClock = async () => {
//     try {
//       const currentTime = await germanyTimeService.germanyTime();
//       console.log("Current Time:", currentTime.toLocaleString());

//       if (isClockedIn) await handleClockOut(currentTime);
//       else await handleClockIn(currentTime);

//       // toggle clocked in state
//       setIsClockedIn(!isClockedIn);
//     } catch (err) {
//       notifyService.error("Failed to record clock in/out");
//     }
//   };

//   async function handleClockIn(currentTime: Date) {
//     // console.log("check isClockedIn user:", user);
//     const clockData: INewClockIN = {
//       userId: user?.id,
//       clockIn: currentTime?.toLocaleString(),
//     };

//     console.log("handleClockIn clockData", clockData);

//     const clockedInTime = await ClocksService.addClock(clockData);
//     notifyService.success("Stated work at: " + clockedInTime.clockIn);
//   }

//   async function handleClockOut(currentTime: Date) {
//     console.log("lastClock", lastClock);

//     const clockData: INewClockOut = {
//       id: lastClock?.id,
//       userId: user?.id,
//       clockOut: currentTime?.toLocaleString(),
//     };

//     console.log("handleClockOut clockData", clockData);

//     const clockedOut = await ClocksService.patchClockOut(clockData);
//     console.log("handleClockOut clockedOut", clockedOut);
//     notifyService.success("Ended work at: " + clockedOut.clockOut);
//   }

//   return (
//     <Button
//       variant="contained"
//       color={isClockedIn ? "secondary" : "primary"}
//       onClick={handleClock}
//       sx={{ fontSize: "1.5rem", padding: "1rem 2rem", margin: "2rem" }}
//     >
//       {isClockedIn ? "Clock Out" : "Clock In"}
//     </Button>
//   );
// }

// export default ClockButton;
