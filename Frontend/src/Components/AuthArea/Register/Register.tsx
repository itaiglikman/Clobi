import { Email, Password, Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormHelperText, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import useTitle from "../../../Utils/UseTitle";
import "./Register.css";

function Register(): JSX.Element {

    useTitle("Register");

    // formState: helps handling errors
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();

    const navigate = useNavigate();

    // state for showing password button:
    const [showPassword, setShowPassword] = useState(false);

    // on show click:
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    // prevent loose focus from password field on mouse-down:
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // on submit - save user to back and global state:
    async function saveUser(user: UserModel): Promise<void> {
        try {
            // save user and log-in:
            await authService.register(user);
            notifyService.success(`Welcome ${user.firstName}! You've successfully registered!`);
            navigate("/home");
        } catch (err) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register">
            <form onSubmit={handleSubmit(saveUser)}>

                {/* header: */}
                <Typography variant="h4" className="formHeader">Register</Typography>

                {/* First Name field: */}
                <TextField label="First Name"
                    type="text"
                    title="first name"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <Person />
                            </InputAdornment>
                    }}
                    {...register("firstName", UserModel.firstNameValidation)} // react-form-hook option to connect to model.
                    error={Boolean(errors.firstName)} /> {/* Check for errors.*/}
                <FormHelperText className={`errorText ${errors.firstName ? 'visible' : ''}`}> {/* display errors */}
                    {errors.firstName?.message}
                </FormHelperText>

                {/* Last Name field: */}
                <TextField label="Last Name"
                    type="text"
                    title="last name"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <Person />
                            </InputAdornment>
                    }}
                    {...register("lastName", UserModel.lastNameValidation)} // react-form-hook option to connect to model.
                    error={Boolean(errors.lastName)} /> {/* Check for errors.*/}
                <FormHelperText className={`errorText ${errors.lastName ? 'visible' : ''}`}> {/* display errors */}
                    {errors.lastName?.message}
                </FormHelperText>

                {/* Email field: */}
                <TextField label="Email"
                    type="email"
                    title="email"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <Email />
                            </InputAdornment>
                    }}
                    {...register("email", UserModel.emailValidation)} // react-form-hook option to connect to model.
                    error={Boolean(errors.email)} /> {/* Check for errors.*/}
                <FormHelperText className={`errorText ${errors.email ? 'visible' : ''}`}> {/* display errors */}
                    {errors.email?.message}
                </FormHelperText>

                {/* Password field: */}
                <TextField label={<Password />}
                    type={showPassword ? 'text' : 'password'}
                    title="password"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register("password", UserModel.passwordValidation)} // react-form-hook option to connect to model.
                    error={Boolean(errors.password)} // Check for errors.
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end"> {/* password visibility button */}
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                    }} />
                <FormHelperText className={`errorText ${errors.password ? 'visible' : ''}`}> {/* display errors */}
                    {errors.password?.message}
                </FormHelperText>

                {/* send: */}
                <Button type="submit" variant="contained"
                    sx={{ backgroundColor: "#60BD92", "&:hover": { backgroundColor: "#388e3c" } }} >
                    Register
                </Button>

                {/* login link: */}
                <Typography variant="caption">
                    Already registered? What are you doing here? <NavLink to={"/login"}>Login</NavLink>
                </Typography>

            </form>
        </div>
    );
}

export default Register;
