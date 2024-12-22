import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormHelperText, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authStore from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import useTitle from "../../../Utils/UseTitle";
import "./Login.css";


function Login(): JSX.Element {

    useTitle("Login");

    // formState: helps handling errors
    const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>();

    const navigate = useNavigate();
    // state for showing password button:
    const [showPassword, setShowPassword] = useState(false);

    // on show click:
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    // prevent loose focus from password field on mouse-down:
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // check credentials and login user:
    async function logUser(credentials: CredentialsModel): Promise<void> {
        try {
            // activate back and auth global state with credentials:
            await authService.login(credentials);
            // get logged user info from global state:
            let user = authStore.getState().user;
            // send message for specific role:
            notifyService.success(user.roleId === 1 ? `Welcome Back Boss!` : `Welcome Back!`);
            navigate("/home");
        } catch (err) { notifyService.error(err) }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(logUser)}>

                {/* header: */}
                <Typography variant="h4" className="formHeader">Login</Typography>

                {/* email field: */}
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
                    {...register("email", CredentialsModel.emailValidation)} // react-form-hook option to connect to model.
                    error={Boolean(errors.email)} /> {/* Check for errors.*/}
                <FormHelperText className={`errorText ${errors.email ? 'visible' : ''}`}> {/* display errors */}
                    {errors.email?.message}
                </FormHelperText>

                {/* password field: */}
                <TextField label="Password"
                    type={showPassword ? 'text' : 'password'}
                    title="password"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register("password", CredentialsModel.passwordValidation)} // react-form-hook option to connect to model.
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
                    Login
                </Button>
                
                {/* register link: */}
                <Typography variant="caption">
                    Not register yet? What are you waiting for? <NavLink to={"/register"}>Register</NavLink>
                </Typography>

            </form>
        </div >
    );
}

export default Login;
