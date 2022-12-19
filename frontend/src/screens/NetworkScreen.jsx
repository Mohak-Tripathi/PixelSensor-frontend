
/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  NetworkScreen.jsc

Brief:  It contains ui of network page.

Project: Pixel Sensor

Release version: version 1.0.0

Release Date: Dec 14, 2022

Auther: Mohak Tripathi

Whats New: Everything.
 ..........................*/


import React, { useLayoutEffect } from "react";
import { Grid, Paper, TextField, Button, Box, Typography } from "@mui/material";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ntpNetworkAction,
  wifiCredNetworkAction,
  wifiNetworkAction,
  ethernetNetworkAction,
  getNetworkInfoAction,
  getNTPInfoAction,
  clearErrorsCred,
  clearSuccessCred,
  clearErrorsStaticIpWifi,
  clearSuccessStaticIpWifi,
  clearErrorsStaticIpEthernet,
  clearSuccessStaticIpEthernet,
  clearErrorsNTP,
  clearSuccessNTP


} from "../actions/networkAction"

import Loader from "../components/Loader"
import { useEffect } from "react";
import { useAlert } from 'react-alert';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';


const NetworkScreen = () => {


  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));


  const passwordRegExp =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();


  const userLogin = useSelector((state) => {
    return state.userLogin;
  });

  const { userInfo } = userLogin;



  useLayoutEffect(() => {
    if (!userInfo) {
      navigate("/")
    }

    dispatch(getNetworkInfoAction())
    dispatch(getNTPInfoAction())


  }, [dispatch, navigate, userInfo])



  const getNetworkInfo = useSelector((state) => {
    return state.getNetworkInfo
  })

  const { loading: getNetworkInfoLoader, getAllNetworkInfo } = getNetworkInfo;


  const getNTPInfo = useSelector((state) => {
    return state.getNTPInfo
  })

  const { loading: getNTPInfoLoader, getNTPInfoVal } = getNTPInfo;


  let initialValuesOne;

  if (getAllNetworkInfo) {
    initialValuesOne = {
      SSID: getAllNetworkInfo.wifi_cred_ssid,
      password: getAllNetworkInfo.wifi_cred_pass
    }
  } else {

    initialValuesOne = {
      SSID: ".",
      password: "."
    }

  }


  const validationSchemaOne = Yup.object().shape({
    SSID: Yup.string().required("Required"),
    password: Yup.string()
      .min(8, "Minimum characters should be 8")
      .matches(
        passwordRegExp,
        "Password must have one upper, lower case, number, special symbol"
      )
      .required("Required"),
  });


  const onSubmitOne = (values) => {
    dispatch(wifiCredNetworkAction(values))

  };


  let initialValuesTwo;

  if (getAllNetworkInfo) {

    initialValuesTwo = {
      static_ip: getAllNetworkInfo.static_ip_wifi,
      gateway_ip: getAllNetworkInfo.static_ip_wifi_pass
    };
  } else {

    initialValuesTwo = {
      static_ip: ".",
      gateway_ip: "."
    };

  }



  const validationSchemaTwo = Yup.object().shape({
    static_ip: Yup.string().required("Required"),
    gateway_ip: Yup.string().required("Required"),
  });

  const onSubmitTwo = (values, props) => {
    dispatch(wifiNetworkAction(values))
  };

  const initialValuesThree = {
    static_ip_ethernet: getAllNetworkInfo ? getAllNetworkInfo.static_ip_eth : ".",
    gateway_ip_ethernet: getAllNetworkInfo ? getAllNetworkInfo.static_ip_eth_pass : ".",
  };

  const validationSchemaThree = Yup.object().shape({
    static_ip_ethernet: Yup.string().required("Required"),
    gateway_ip_ethernet: Yup.string().required("Required"),
  });

  const onSubmitThree = (values) => {
    dispatch(ethernetNetworkAction(values))

  };

  const initialValuesFour = {
    ntp_server: getNTPInfo ? getNTPInfoVal : "."
  };

  const validationSchemaFour = Yup.object().shape({
    ntp_server: Yup.string().required("Required"),
  });

  const onSubmitFour = (value) => {
    dispatch(ntpNetworkAction(value))
  };






  const wifiCredNetwork = useSelector((state) => {
    return state.wifiCredNetwork;
  });


  const { error: errorWifiCred, success: successWifiCred } = wifiCredNetwork;

  const wifiNetwork = useSelector((state) => {
    return state.wifiNetwork;
  });


  const { error: errorWifiStaticIpWifi, success: successWifiStaticIpWifi } = wifiNetwork;

  const ethernetNetwork = useSelector((state) => {
    return state.ethernetNetwork;
  });


  const { error: errorWifiStaticIpEthernet, success: successWifiStaticIpEthernet } = ethernetNetwork;


  const ntpNetwork = useSelector((state) => {
    return state.ntpNetwork;
  });


  const { error: errorNtp, success: successNtp } = ntpNetwork;




  useEffect(() => {

    if (errorWifiCred) {
      alert.error("WIFI credentials failed to save")
      dispatch(clearErrorsCred())
    }
    if (successWifiCred) {
      alert.success("WIFI credentials saved")
      dispatch(clearSuccessCred())

    }
    if (errorWifiStaticIpWifi) {
      alert.error("Static IP for Wifi Interface is failed")
      dispatch(clearErrorsStaticIpWifi())
    }
    if (successWifiStaticIpWifi) {
      alert.success("Static IP for Wifi Interface is succeessful")
      dispatch(clearSuccessStaticIpWifi())

    }
    if (errorWifiStaticIpEthernet) {
      alert.error("Static IP for Ethernet Interface is failed")
      dispatch(clearErrorsStaticIpEthernet())
    }
    if (successWifiStaticIpEthernet) {
      alert.success("Static IP for Ethernet Interface is succeeful")
      dispatch(clearSuccessStaticIpEthernet())

    }



    if (errorNtp) {
      alert.error("NTP configuration failed")
      dispatch(clearErrorsNTP())
    }

    if (successNtp) {
      alert.success("NTP configuration successful")
      dispatch(clearSuccessNTP())
    }
    

  }, [dispatch, errorNtp, successNtp, alert, errorWifiCred, successWifiCred, errorWifiStaticIpWifi, successWifiStaticIpWifi, errorWifiStaticIpEthernet, successWifiStaticIpEthernet])


  return (

    <>

      {getNetworkInfoLoader && getNTPInfoLoader ? <Loader /> : (

        <Grid>
          <Paper
            style={{ maxWidth: 950, padding: "30px 33px", margin: "25px auto" }}
            elevation={20}
          >

            <Box>
              <Typography
                className='sectionHeading'
                // variant='h5'
                component='p'
                gutterBottom
              >
                Network connection parameters(Wi-Fi STA mode, Ethernet, AP Mode, NTP Sync ), should be configured by the commissioning team once the product is deployed.
              </Typography>

              <Formik
                initialValues={initialValuesOne}
                validationSchema={validationSchemaOne}
                onSubmit={onSubmitOne}
                enableReinitialize
              >
                {(props) => (
                  <Form noValidate>
                    <Grid container spacing={2}>
                      {/* ------- */}

                      <Grid xs={12} item>
                        <Typography
                          variant='body2'
                          color='grey'
                          component='p'
                          gutterBottom
                        >
                          Configure the WIFI credentials of your wifi router
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid xs={6} item>
                            <Typography
                              variant='caption'
                              color='blue'
                              component='p'
                            >
                              SSID
                            </Typography>
                            {/* <LightTooltip title="Sets the SSID of the WiFi network." placement="top-end"> */}

                            <Field
                              as={TextField}
                              placeholder='Enter SSID'
                              name='SSID'
                              variant='standard'
                              fullWidth
                              onChange={props.handleChange}
                              values={props.initialValues.SSID}

                              required
                              // value={getAllNetworkInfo.wifi_cred_ssid ? getAllNetworkInfo.wifi_cred_ssid : ""}
                              error={props.errors.SSID && props.touched.SSID}
                              helperText={<ErrorMessage name='SSID' />}
                            />
                                {/* </LightTooltip> */}
                          </Grid>

                          <Grid xs={6} item>
                            <Typography
                              variant='caption'
                              color='blue'
                              component='p'
                            >
                              Password
                            </Typography>
                            {/* <LightTooltip title="Sets the password for the WiFi network." placement="top-end"> */}
                            <Field
                              as={TextField}
                              placeholder='Enter Password'
                              name='password'
                              // label='Device Health'
                              variant='standard'
                              // onChange={props.handleChange}
                              // value={props.values.password}

                              // value={getAllNetworkInfo.wifi_cred_pass ? getAllNetworkInfo.wifi_cred_pass : ""}
                              fullWidth
                              required
                              type='password'

                              // error={
                              //   props.errors.password && props.touched.password
                              // }
                              helperText={<ErrorMessage name='password' />}
                            />
    {/* </LightTooltip> */}
                          </Grid>
                        </Grid>
                      </Grid>


                      {/* ---------- */}

                      <Grid xs={12} item>
                        <Box textAlign='right'>
                          <Button
                            variant='outlined'
                            type='submit'
                            sx={{ mt: 0.5, mb: 0.5, minWidth: "170px" }}
                            size='small'
                          >
                 
                            Save
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>

              {/* ---------------------------------------        */}

              <Formik
                initialValues={initialValuesTwo}
                validationSchema={validationSchemaTwo}
                onSubmit={onSubmitTwo}
                enableReinitialize
              >
                {(props) => (
                  <Form>
                    <Grid container spacing={2}>
                      {/* ------- */}

                      <Grid xs={12} item>
                        <Typography
                          variant='body2'
                          color='grey'
                          component='p'
                          gutterBottom
                        >
                          Configure the Static IP for Wifi Interface (CIDR Format)
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid xs={6} item>
                            <Typography
                              variant='caption'
                              color='blue'
                              component='p'
                            >
                              Static IP
                            </Typography>
                            {/* <LightTooltip title="Sets the static IP to the device." placement="top-end"> */}
                            <Field
                              as={TextField}
                              placeholder='Enter static_ip'
                              name='static_ip'
                              variant='standard'
                              fullWidth
                              required
                              error={
                                props.errors.static_ip && props.touched.static_ip
                              }
                              helperText={<ErrorMessage name='static_ip' />}
                            />
                      {/* </LightTooltip> */}
                          </Grid>

                          <Grid xs={6} item>
                            <Typography
                              variant='caption'
                              color='blue'
                              component='p'
                            >
                              Gateway IP
                            </Typography>
                            {/* <LightTooltip title="Sets the gateway IP to which device is connected." placement="top-end"> */}
                            <Field
                              as={TextField}
                              placeholder='Enter Gateway IP'
                              name='gateway_ip'
                              // label='Device Health'
                              variant='standard'
                              fullWidth
                              required
                              error={
                                props.errors.gateway_ip &&
                                props.touched.gateway_ip
                              }
                              helperText={<ErrorMessage name='gateway_ip' />}
                            />
                          {/* </LightTooltip> */}
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* ---------- */}

                      <Grid xs={12} item>
                        <Box textAlign='right'>
                          <Button
                            variant='outlined'
                            type='submit'
                            sx={{ mt: 0.5, mb: 0.5, minWidth: "170px" }}
                            size='small'
                          >
                            {" "}
                            Save
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>

              {/* ------------------- */}

              <Formik
                initialValues={initialValuesThree}
                validationSchema={validationSchemaThree}
                onSubmit={onSubmitThree}
                enableReinitialize
              >
                {(props) => (
                  <Form>
                    <Grid container spacing={2}>
                      {/* ------- */}

                      <Grid xs={12} item>
                        <Typography
                          variant='body2'
                          color='grey'
                          component='p'
                          gutterBottom
                        >
                          Configure the Static IP for Ethernet Interface (CIDR Format)
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid xs={6} item>
                            <Typography
                              variant='caption'
                              color='blue'
                              component='p'
                            >
                              Static IP
                            </Typography>
                            {/* <LightTooltip title="Sets the static IP to the device." placement="top-end"> */}
                            <Field
                              as={TextField}
                              placeholder='Enter static_ip'
                              name='static_ip_ethernet'
                              variant='standard'
                              fullWidth
                              required
                              error={
                                props.errors.static_ip_ethernet &&
                                props.touched.static_ip_ethernet
                              }
                              helperText={
                                <ErrorMessage name='static_ip_ethernet' />
                              }
                            />
                          {/* </LightTooltip> */}
                          </Grid>

                          <Grid xs={6} item>
                            <Typography
                              variant='caption'
                              color='blue'
                              component='p'
                            >
                              Gateway IP
                            </Typography>
                            {/* <LightTooltip title="Sets the gateway IP to which device is connected."  placement="top-end"> */}
                            <Field
                              as={TextField}
                              placeholder='Enter Gateway IP'
                              name='gateway_ip_ethernet'
                              // label='Device Health'
                              variant='standard'
                              // type='password'
                              fullWidth
                              required
                              error={
                                props.errors.gateway_ip_ethernet &&
                                props.touched.gateway_ip_ethernet
                              }
                              helperText={
                                <ErrorMessage name='gateway_ip_ethernet' />
                              }
                            />
                            {/* </LightTooltip> */}
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* ---------- */}
                      <Grid xs={12} item>
                        <Box textAlign='right'>
                          <Button
                            variant='outlined'
                            type='submit'
                            sx={{ mt: 0.5, mb: 0.5, minWidth: "170px" }}
                            size='small'
                          >
                            {" "}
                            Save
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>

              <Formik
                initialValues={initialValuesFour}
                validationSchema={validationSchemaFour}
                onSubmit={onSubmitFour}
                enableReinitialize
              >
                {(props) => (
                  <Form>
                    <Grid container spacing={2}>
                      {/* ------- */}
                      <Grid xs={12} item>
                        <Typography
                          variant='body2'
                          color='grey'
                          component='p'
                          gutterBottom
                        >
                          Configure the NTP Server
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid xs={6} item>
                            <Typography
                              variant='caption'
                              color='blue'
                              component='p'
                            >
                              NTP Server Address
                            </Typography>
                            <LightTooltip title="Sets the NTP server for system." placement="top-end">
                            <Field
                              as={TextField}
                              placeholder='Enter NTP Server'
                              name='ntp_server'
                              variant='standard'
                              fullWidth
                              required
                              error={
                                props.errors.ntp_server &&
                                props.touched.ntp_server
                              }
                              helperText={<ErrorMessage name='ntp_server' />}
                            />
                        </LightTooltip>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid xs={12} item>
                        <Box textAlign='right'>
                          <Button
                            variant='outlined'
                            type='submit'
                            sx={{ mt: 0.5, mb: 0.5, minWidth: "170px" }}
                            size='small'
                          >
                            Save
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Box>

          </Paper>
        </Grid>
      )}

    </>
  );
};

export default NetworkScreen;
