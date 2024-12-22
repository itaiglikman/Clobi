import {
  AttachMoney,
  Description,
  TravelExplore,
  Upload,
} from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import noImage from "../../../Assets/Images/no-image.jpg";
import ClockModel from "../../../../Models/ClockModel";
import notifyService from "../../../../Services/NotifyService";
import ClocksService from "../../../../Services/ClocksService";
import useProtectedPage from "../../../../Utils/UseProtectedPage";
import useTitle from "../../../../Utils/UseTitle";
import "./AddClock.css";
import authService from "../../../../Services/AuthService";
import UserModel from "../../../../Models/UserModel";
import germanyTimeService from "../../../../Services/GermanyTimeService";

function AddClock(): JSX.Element {
  useTitle("Add");

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    getValues,
    watch,
  } = useForm<ClockModel>();
  const navigate = useNavigate();

    // custom hook for protecting pages from unauthorized access.
  // hook get boolean if access is for admin only or not.
  // if no logged user or not admin - display error message and navigate user.
  useProtectedPage(true);

  const [users, setUsers] = useState<UserModel[]>([]);
  const [totalHours, setTotalHours] = useState<number>(0);

  useEffect(() => {
    // Fetch users from authService
    async function fetchUsers() {
      try {
        const users = await authService.getAllUsers();
        setUsers(users);
      } catch (err) {
        notifyService.error(err);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    // watch for changes in clockIn and clockOut fields and calculate total hours:
    const subscription = watch((value, { name }) => {
      // check which field was changed:
      if (name === "clockIn" || name === "clockOut") {
        const clockIn = new Date(value.clockIn).getTime();
        const clockOut = new Date(value.clockOut).getTime();
        // if both fields are valid - calculate total hours:
        if (clockIn && clockOut && !isNaN(clockIn) && !isNaN(clockOut)) {
          const diff = (clockOut - clockIn) / (1000 * 60 * 60);
          setTotalHours(diff);
        } else setTotalHours(0);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // on submit send new vacation to db:
  async function send(clock: ClockModel): Promise<void> {
    try {
      // send new clock to db and update global state:
      await ClocksService.addClock(clock);

      notifyService.success("New clock has been added!");
      navigate("/home");
    } catch (err) {
      notifyService.error(err);
    }
  }

  return (
    <div className="AddClock">
      <form onSubmit={handleSubmit(send)}>
        {/* header: */}
        <Typography variant="h4" className="formHeader">
          Add CLock
        </Typography>

        {/* User Id Select: */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="userId-label">Employee</InputLabel>
          <Select
            onChange={(e) => console.log(e.target.value)}
            labelId="userId-label"
            label="User"
            {...register("userId", ClockModel.userIdValidation)}
            error={!!errors.userId}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={!!errors.userId}>
            {errors.userId?.message}
          </FormHelperText>
        </FormControl>

        {/* Clock In Field: */}
        <TextField
          label="Clock In date and time"
          type="datetime-local"
          {...register("clockIn", ClockModel.clockInValidation)}
          className={errors.clockIn ? "errorInput" : ""}
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.clockIn} //Check for errors
          helperText={errors.clockIn?.message}
        />

        {/* Clock Out Field: */}
        <TextField
          label="Clock Out date and time"
          type="datetime-local"
          {...register("clockOut", ClockModel.clockOutValidation(getValues))}
          className={errors.clockOut ? "errorInput" : ""}
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.clockOut} //Check for errors
          helperText={errors.clockOut?.message}
        />

        {/* Total Hours Field (Read-Only) */}
        <TextField
          label="Total Hours"
          value={totalHours !== 0 ? totalHours.toFixed(2) : ""}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          margin="normal"
        />

        {/* image Field: */}
        {/* <div className="imageContainer"> */}
        {/* displayed image: */}
        {/* <img src={displayedImage} className={!!errors.image ? "displayedImageWithError" : "displayedImage"} />
                    <input //only input can have accept property
                        type="file"
                        accept="image/*"
                        className="displayedImageInput"
                        id="displayed-image-input"
                        {...register("image", ClockModel.imageValidation)} // react-form-hook option to connect to model.
                        onChange={getImageOnUpload}//set uploaded image state.
                    />
                    <FormHelperText className={`errorText ${errors.image ? 'visible' : ''}`} >
                        {errors.image?.message}
                    </FormHelperText> */}
        {/* image upload button: */}
        {/* <label htmlFor="displayed-image-input" className="imageUploadButton">
                        <Button component="span" variant="contained" >
                            <Upload />
                        </Button>
                    </label>
                </div> */}

        {/* send button: */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#60BD92",
            "&:hover": { backgroundColor: "#388e3c" },
          }}
        >
          Save
        </Button>
      </form>
    </div>
  );
}

export default AddClock;
