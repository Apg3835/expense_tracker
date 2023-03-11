import { Avatar, Button, Stack, TextField, Typography } from "@mui/material";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSignInAction } from "../reducer/asyncAuthReducer";

const schema = yup.object({
  email: yup.string().email("email is not valid").required("email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(
      8,
      "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special character"
    ),

  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .min(
      8,
      "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userLogInData);

  useEffect(() => {
    if (userData !== undefined) {
      navigate("/signinform");
    }
  }, [userData]);
  const signUpButtonHandler = () => {
    navigate("/signupform");
  };
  const forgotPasswordFormHandler = () => {
    navigate("/forgotpasswordform");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(errors);
  const submitForm = (data) => {
    dispatch(userSignInAction(data));
    navigate("/")

    console.log(1, data);
  };
  const paperStyle = { padding: "30px 20px", width: 400, mrgin: "20px auto" };
  const headerStyle = { margin: 0 };
  return (
    <Grid align="center" sx={{ mt: 2 }}>
      <Paper elevation={50} style={paperStyle}>
        <Grid>
          <Avatar sx={{ backgroundColor: "red" }}>
            <AccountBoxIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign In</h2>
          <Typography variant="caption">
            Please fill this form to enter your account !
          </Typography>
          <hr />
        </Grid>
        <form onSubmit={handleSubmit(submitForm)}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            placeholder="Enter email"
            {...register("email", {
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
          />
          <p style={{ color: "red" }}>{errors.email?.message}</p>
          &nbsp;
          <TextField
            fullWidth
            label="Password"
            name="password"
            placeholder="Enter password"
            {...register("password", {
              required: "Required",
              pattern: {
                value:
                  /^(?=.*[0-9](?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{8,})$/,
                message: "invalid password",
              },
            })}
          />
          <p style={{ color: "red" }}>{errors.password?.message}</p>
          &nbsp;
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm password"
            {...register("confirmPassword", { required: "Required" })}
          />
          <p style={{ color: "red" }}>
            {errors.confirmPassword && "Passwords Should Match! "}
          </p>
          <Stack
            spacing={2}
            mt={1}
            justifyContent="space-between"
            direction="row"
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: 1 }}
            >
              SIGN IN
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ marginTop: 1 }}
              onClick={forgotPasswordFormHandler}
            >
              forgot password
            </Button>
          </Stack>
          <Grid sx={{ display: "flex" }}>
            <p>If you don't have any account ?</p>&nbsp;
            <p
              style={{ cursor: "pointer", color: "blue" }}
              onClick={signUpButtonHandler}
            >
              Click Here
            </p>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default SignInForm;
