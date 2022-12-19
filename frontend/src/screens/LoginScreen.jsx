
/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  LoginScreen.jsx

Brief:  It contains ui of Login page.

Project: Pixel Sensor

Release version: version 1.0.0

Release Date: Dec 14, 2022

Auther: Mohak Tripathi

Whats New: Everything.
 ..........................*/


import React from "react";
import { Grid, Paper, Avatar, TextField, Button, Box } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import { useEffect } from "react";
//import { useCookies } from "react-cookie";
// import Loader from "../components/Loader"
import { useAlert } from 'react-alert'

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import { login, clearErrors } from "../actions/userActions";

const LoginScreen = () => {

  const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

  const initialValues = {
    username: "",
    password: "",
  }



  const validationSchema = Yup.object().shape({
    username: Yup.string().min(5, "Minimum characters should be 5").required("Required"),
    password: Yup.string().min(8, "Minimum characters should be 8")
      .matches(passwordRegExp, "Password must have one upper, lower case, number, special symbol")
      .required("Required")

  })
 // const [cookies, setCookie] = useCookies(["jwt"]); //removeCookie

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();


  const userLogin = useSelector((state) => {
    return state.userLogin;
  });


  const { userInfo, error} = userLogin;


  useEffect(() => {
  
      if (error && error.response && error.response.status === 400) {
        alert.error("Wrong username or Password")
        dispatch(clearErrors())
      }
  
  

    if (userInfo && userInfo.user.role === "Production") {
      navigate("/admin");
      //setCookie("jwt", userInfo.jwt, { path: "/" });

    }
    else if (userInfo && userInfo.user.role === "Support") {
      navigate("/service");

    }
    else if (userInfo && userInfo.user.role === "Demo") {
      navigate("/dashboard");

    }

  
  }, [userInfo, navigate, dispatch, error, alert]); //setcookie


  const onSubmit = (values, props) => {
    const { username, password } = values;
    dispatch(login(username, password));

    // setInterval(()=>{
    //   props.resetForm()
    // }, 2000)

  };


  return (
    <>
      <Grid>
        <Box
          component='img'
          className='imageContainer'
          alt='Flamencotech'
          src='/logo.png'
        />

        <Paper elevation={6} className='paperStyle'>
          <Grid align='center' sx={{ mb: 4 }}>
            <Avatar className='avatarStyle'>
              <LockPersonOutlinedIcon />{" "}
            </Avatar>

            <h1> Sign In</h1>
          </Grid>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(props) => (
              <Form noValidate>

                <Field as={TextField}
                  sx={{ mt: 1.5 }}
                  label='username'
                  name='username'
                  placeholder='Enter username'
                  margin='dense'
                  variant='outlined'
                  color='secondary'
                  fullWidth
                  required
                  error={props.errors.username && props.touched.username}
                  helperText={<ErrorMessage name="username" />}


                />
                < Field as={TextField}
                  sx={{ mt: 1.5 }}
                  label='password'
                  name="password"
                  placeholder="Enter password"
                  type='password'
                  margin='dense'
                  variant='outlined'
                  color='secondary'
                  fullWidth
                  required
                  error={props.errors.password && props.touched.password}
                  helperText={<ErrorMessage name="password" />}

                />
                <Button
                  sx={{ mt: 4 }}
                  type='submit'
                  variant='contained'
                  fullWidth
                >
                  {" "}
                  Submit{" "}
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </>
  );
};

export default LoginScreen;

