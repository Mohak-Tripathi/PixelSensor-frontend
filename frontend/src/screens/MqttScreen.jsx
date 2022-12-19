
/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  MqttScreen.jsx

Brief:  It contains ui of Mqtt page.

Project: Pixel Sensor

Release version: version 1.0.0

Release Date: Dec 14, 2022

Auther: Mohak Tripathi

Whats New: Everything.
 ..........................*/

import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Box,
  Typography
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader"

import {clearErrorsMqttCert, getmqttCert, mqttSavedataAction, mqttRegisterAction, mqttProtocolCertAction, clearErrorsMQTT, clearSuccessMQTT, clearErrorsMQTTCert, clearSuccessMQTTCert } from "../actions/mqttActions"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useAlert } from 'react-alert'
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';


const MqttScreen = () => {

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

  // const [reset, setReset] = useState("");
  const [fileData, setFileData] = useState()

  const [protocol, setProtocol] = useState("");


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();


  const userLogin = useSelector((state) => {
    return state.userLogin;
  });


  const { userInfo } = userLogin;


  useLayoutEffect(() => {
    if (!userInfo) {
      navigate("/")
    }
    dispatch(mqttSavedataAction())
    dispatch(getmqttCert())
 
  }, [userInfo, dispatch, navigate])


  const mqttSavedata = useSelector((state) => {
    return state.mqttSavedata;
  });


  const { mqttDefaultInfo, loading } = mqttSavedata;


  const  getMqttCert = useSelector((state) => {
    return state.getMqttCert;
  });


  const {getmqttProtocolInfo, loading:mqttCertLoading, error: mqttCertificateError } =  getMqttCert;


  const mqttRegister = useSelector((state) => {
    return state.mqttRegister;
  });


  const { error: errorMQTT, success: successMQTT } = mqttRegister;

  const mqttProtocolCert = useSelector((state) => {
    return state.mqttProtocolCert;
  });


  const { error: errorMQTTCert, success: successMQTTCert } = mqttProtocolCert;





  let initialValues;

  if (mqttDefaultInfo) {
    initialValues = {

      broker: mqttDefaultInfo.broker,
      port: mqttDefaultInfo.port,
      topic: mqttDefaultInfo.topic,
      health_topic: mqttDefaultInfo.health_topic,
      mqtt_user_name: mqttDefaultInfo.mqtt_user_name,
      mqtt_password: mqttDefaultInfo.mqtt_password,
      // ca: mqttDefaultInfo.ca
      // mqtt_certificate: mqttDefaultInfo.port,
      // certificate_file: mqttDefaultInfo.port,
    };
  }
  else {
    initialValues = {
      broker: "",
      port: "",
      topic: "",
      health_topic: "",
      mqtt_user_name: "",
      mqtt_password: "",
      // ca: ""
      // mqtt_certificate: "",
      // certificate_file: "",
    };
  }




  const validationSchema = Yup.object().shape({
    broker: Yup.string().required("Required"),
    port: Yup.number().typeError("port should be number").required("Required"),
    topic: Yup.string().required("Required"),
    health_topic: Yup.string().required("Required"),
    // mqtt_user_name: Yup.string()
    //   .min(5, "Minimum characters should be 5")
    //   .required("Required"),
    // mqtt_password : Yup.string()
    //   .min(8, "Minimum characters should be 8")
    //   // .matches(
    //   //   passwordRegExp,
    //   //   "Password must have one upper, lower case, number, special symbol"
    //   // )
    //   .required("Required"),
    // mqtt_certificate: Yup.string().required("Required"),
    // certificate_file: Yup.string().required("Required")
  });


  const onSubmit = (values, props) => {

    dispatch(mqttRegisterAction(values))

  };
  // const resetButtonClick = (e) => {
  //   // console.log(e.target.value)
  //   setReset(e.target.value);
  // };

  // const resetButtonDispatch = (e) => {
  //   dispatch(mqttReset())
  // }


  const fileChangeHandler = (e) => {

    console.log(e.target.files[0], "ch")
    setFileData(e.target.files[0]);
  };


  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Handle File Data from the state Before Sending
    const data = new FormData();

    data.set("mqtt_cert_file", fileData);

    // console.log(data.get("mqtt_cert_file"), "datacheck")

    dispatch(mqttProtocolCertAction(data))


  };


  const handleChangeProtocol = (e) => {
    setProtocol(e.target.value);
  };



    let initialValuesMqttCert 

    if (getmqttProtocolInfo) {
      initialValuesMqttCert  = {
  
        ca:  getmqttProtocolInfo
      };
    }
    else {
      initialValuesMqttCert  = {
     
        ca: ""
      };
    }
  
    useEffect(() => {

      if (errorMQTT) {
        alert.error("MQTT Configurartion failed")
        dispatch(clearErrorsMQTT())
      }
  
      if (successMQTT) {
        alert.success("MQTT Configurartion saved")
        dispatch(clearSuccessMQTT())
      }
      if (errorMQTTCert) {
        alert.error("MQTT SSL file upload failed")
        dispatch(clearErrorsMQTTCert())
      }
  
      if (successMQTTCert) {
        alert.success("MQTT SSL file upload successful")
        dispatch(clearSuccessMQTTCert())
      }
  
      if (mqttCertificateError) {
        alert.error("MQTT SSL file Name unable to fetch")
        dispatch(clearErrorsMqttCert())
      }
   
  
    }, [errorMQTT, successMQTT, dispatch, alert, errorMQTTCert, successMQTTCert, mqttCertificateError])



  return (
    <>

      {loading && mqttCertLoading ? (<Loader />) : (
        <Grid>
          <Paper
            style={{ maxWidth: 950, padding: "30px 33px", margin: "30px auto" }}
            elevation={20}
          >


                   {/* <Typography
                      variant='caption'
                      color='blue'
                      component='p'
                    >
                      MQTT Certificate
                    </Typography> */}
                    {/* <form onSubmit={onSubmitHandler}>
                      <input type="file" onChange={fileChangeHandler} />
                      <Grid xs={12} item>
                        {/* <button type="submit">Submit File</button> */}
                    {/* <Box textAlign='right'>
                        <Button
                          variant='contained'
                          type='submit'
                          sx={{ mt: 1, mb: 2 }}
                          size='small'
                        >

                          Submit File
                        </Button>
                        </Box> */}
                    {/* </Grid> */}
                    {/* </form> */}

            <Box>
 
              <Typography
                className='sectionHeading'
                // variant='h5'
                component='p'
                gutterBottom
              >
                MQTT connection parameters, should be configured by the commissioning team once the product is deployed.
              </Typography>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(props) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid xs={12} item>
                        <Typography
                          variant='body2'
                          color='grey'
                          component='p'
                          gutterBottom
                        >
                          Configure MQTT broker and port
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid xs={6} item>
                            <Typography
                              variant='caption'
                              color='blue'
                              component='p'
                            >
                              Broker
                            </Typography>
                            <LightTooltip title="Sets the broker to which MQTT data is published." placement="top-end">
                            <Field
                              as={TextField}
                              placeholder='Enter Broker'
                              name='broker'
                              // label='Broker'
                              type='number'
                              variant='standard'
                              fullWidth
                              size='small'
                              required
                              error={
                                props.errors.broker && props.touched.broker
                              }
                              helperText={<ErrorMessage name='broker' />}
                            />
                               </LightTooltip>
                            {/* </Tooltip> */}
                          </Grid>

                          <Grid xs={6} item>
                            <Typography
                              variant='caption'
                              color='blue'
                              component='p'
                            >
                              Port
                            </Typography>
                            <LightTooltip title="Sets the port of the broker to which MQTT data is published." placement="top-end">
                            <Field
                              as={TextField}
                              placeholder='Enter Port'
                              name='port'
                              // label='Enter Port'
                              variant='standard'
                              type='number'
                              size='small'
                              fullWidth
                              required
                              error={props.errors.port && props.touched.port}
                              helperText={<ErrorMessage name='port' />}
                            />
                                  </LightTooltip>
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* ------- */}

                      <Grid xs={12} item>
                        <Typography
                          variant='body2'
                          color='grey'
                          component='p'
                          gutterBottom
                        >
                          Configure the topics to publish the data
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid xs={6} item>
                            <Typography
                              variant='caption'
                              color='blue'
                              component='p'
                            >
                              Occupancy/People Count Topic
                            </Typography>
                            <LightTooltip title="Set the topic where the Occupancy & People count data is published."  placement="top-end">
                            <Field
                              as={TextField}
                              placeholder='Enter people count'
                              name='topic'
                              // label='Occupancy/People Count'
                              variant='standard'
                              fullWidth
                              size='small'
                              required
                              error={
                                props.errors.topic &&
                                props.touched.topic
                              }
                              helperText={<ErrorMessage name='topic' />}
                            />
                                  </LightTooltip>
                          </Grid>

                          <Grid xs={6} item>
                            <Typography
                              variant='caption'
                              color='blue'
                              component='p'
                            >
                              Device Health Topic
                            </Typography>
                            <LightTooltip title="Set the topic where the device health packet is published." placement="top-end">
                            <Field
                              as={TextField}
                              placeholder='Enter device health'
                              name='health_topic'
                              // label='Device Health'
                              variant='standard'
                              size='small'
                              fullWidth
                              required
                              error={
                                props.errors.health_topic &&
                                props.touched.health_topic
                              }
                              helperText={<ErrorMessage name='health_topic' />}
                            />
                                </LightTooltip>
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* 
                  --------- */}

                      <Grid xs={12} item>
                        <Typography
                          variant='body2'
                          color='grey'
                          component='p'
                          gutterBottom
                        >
                          Configure the User name and password
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid xs={6} item>
                            <Typography
                              variant='caption'
                              color='blue'
                              component='p'
                            >
                              mqtt_user_name
                            </Typography>
                            <LightTooltip title="Set the user name for mqtt communication." placement="top-end">
                            <Field
                              as={TextField}
                              placeholder='Enter mqtt_user_name'
                              name='mqtt_user_name'
                              // label='mqtt_user_name'
                              variant='standard'
                              fullWidth
                              size='small'
                              required
                              error={
                                props.errors.mqtt_user_name && props.touched.mqtt_user_name
                              }
                              helperText={<ErrorMessage name='mqtt_user_name' />}
                            />
                                </LightTooltip>
                          </Grid>

                          <Grid xs={6} item>
                            <Typography
                              variant='caption'
                              color='blue'
                              component='p'
                            >
                              Password
                            </Typography>
                            <LightTooltip title="Set the password for mqtt." placement="top-end">
                            <Field
                              as={TextField}
                              placeholder='Enter Password'
                              name='mqtt_password'
                              // label='Password'
                              variant='standard'
                              fullWidth
                              size='small'
                              type='password'
                              required
                              error={
                                props.errors.mqtt_password && props.touched.mqtt_password
                              }
                              helperText={<ErrorMessage name='mqtt_password ' />}
                            />
                            </LightTooltip>
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* ---------- */}

                      {/* <Grid xs={12} item>
                        <Typography
                          variant='body2'
                          color='grey'
                          component='p'
                          gutterBottom
                        >
                          Configure SSL Certificate for MQTT
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid xs={6} item>
                            <Typography
                              variant='caption'
                              color='blue'
                              component='p'
                            >
                              certficate file for mqtt communication
                            </Typography>
                            <TextField
                              placeholder='Submit MQTT certificate'
                              name='mqtt_certificate'
                              // label='MQTT certificate'
                              variant='standard'
                              fullWidth
                              size='small'
                              required
                              error={
                                props.errors.mqtt_certificate &&
                                props.touched.mqtt_certificate
                              }
                              helperText={
                                <ErrorMessage name='mqtt_certificate' />
                              }
                            />
                          </Grid>

                          <Grid xs={6} item>
                            <Typography
                              variant='caption'
                              color='blue'
                              component='p'
                            >
                              MQTT Certificate File
                            </Typography>
                            <TextField
                              placeholder='Enter MQTT certificate File'
                              name='certificate_file'
                              // label='MQTT certificate File'
                              variant='standard'
                              fullWidth
                              size='small'
                              required
                              error={
                                props.errors.certificate_file &&
                                props.touched.certificate_file
                              }
                              helperText={
                                <ErrorMessage name='certificate_file' />
                              }
                            />
                          </Grid>
                        </Grid> */}


                      {/* </Grid> */}


                    </Grid>
                    <Box textAlign='right'>
                      <Button
                        variant='outlined'

                        type='submit'
                        sx={{ mt: 3, mb: 3, minWidth: "170px" }}
                        size='small'
                      >
                        {" "}
                        Save
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>


            {/* New Addition here */}

            <Box>


              <Grid xs={12} item>
                <Typography
                  variant='body2'
                  color='grey'
                  component='p'
                  gutterBottom
                  sx={{ mb:3 }}
                >
                  Configure Mqtt Certificate (Select MQTT Protocol)
                </Typography>
                <Grid container spacing={1}>
                  <Grid xs={4} item>

                    <Box>
                      <form >
                        <FormControl variant='standard' sx={{ minWidth: 150 }}>
                          <InputLabel id='demo-simple-select-standard-label'>
                            Select Protocol
                          </InputLabel>
                          <Select
                            //   labelId="demo-simple-select-standard-label"
                            //   id="demo-simple-select-standard"
                            value={protocol}
                            onChange={handleChangeProtocol}
                            label='Select MQTT Protocol'
                          >
                            <MenuItem value=''>
                            </MenuItem>
                            <MenuItem value={"TCP"}> MQTT/TCP</MenuItem>
                            <MenuItem value={"TLS"}>     MQTT/TLS </MenuItem>

                          </Select>
                        </FormControl>
      
                      </form>
                    </Box>
             
                  </Grid>

                  <Grid xs={4} item>


            





                  <Formik
                initialValues={initialValuesMqttCert}
                // validationSchema={validationSchemaOne}
                // onSubmit={onSubmitOne}
                enableReinitialize
              >
                {(props) => (
                  <Form noValidate>
                    <Grid container spacing={1}>
    

                      {/* <Grid xs={12} item> */}
                    
                        <Grid container spacing={1}>
                          <Grid xs={10} item>
                            <Typography
                              variant='caption'
                              color='blue'
                              component='p'
                            >
                              Mqtt Certifucation File
                            </Typography>

                            <Field
                              as={TextField}
                              // placeholder='Enter SSID'
                              name='ca'
                              variant='standard'
                              fullWidth
                              onChange={props.handleChange}
                       
                              // values={ props.initialValuesMqttCert.ca}

                              // required
                              // value={getAllNetworkInfo.wifi_cred_ssid ? getAllNetworkInfo.wifi_cred_ssid : ""}
                            
                            />
                          </Grid>

              
                        </Grid>
                      {/* </Grid> */}


                      {/* ---------- */}

                      {/* <Grid xs={12} item>
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
                      </Grid> */}
                    </Grid>
                  </Form>
                )}
              </Formik>

</Grid>
                  {protocol === "TLS" && (
                    <Grid xs={4} item>
                      <Typography
                        variant='caption'
                        color='blue'
                        component='p'
                      >
                        MQTT Certificate
                      </Typography>
                      <form onSubmit={onSubmitHandler} encType='multipart/form-data'>
                        <input type="file" onChange={fileChangeHandler} name="fileData" required />
                        <Grid xs={12} item>

                          <Box textAlign='right'>
                            <Button
                              variant='outlined'
                              type='submit'
                              sx={{ mt: 3, mb: 3, minWidth: "170px" }}

                              size='small'
                            >

                              Submit File
                            </Button>
                          </Box>
                        </Grid>
                      </form>
                    </Grid>

                  )}


                </Grid>
              </Grid>

            </Box>


            {/* --RESET MQTT------- */}
            {/* 
            <Box>
              {/* <CardContent> */}
            {/* <Typography
                className='sectionHeading'
                // variant='h5'
                component='p'
                gutterBottom
              >
                MQTT RESET 
              </Typography>

              <form>
                <Grid container spacing={1}>
                  <Grid xs={12} item>
                    <Typography
                      variant='body2'
                      color='purple'
                      component='p'
                      gutterBottom
                    >
                      Reset the Mqtt Settings
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid xs={6} item>
                        <Typography variant='caption' color='grey' component='p'>
                          Resets MQTT certificate, user name and password
                        </Typography> */}
            {/* <TextField
                          placeholder='Type YES if reset is needed'
                          label='Type YES'
                          variant='standard'
                          fullWidth
                          size='small'
                          required
                          onChange={resetButtonClick}
                        /> */}
            {/* </Grid>
                    </Grid>


                    <Box textAlign='right'>
                      <Button
                        variant='outlined'
                        type='submit'
                        sx={{ mt: 3, mb: 3, minWidth: "170px" }}
                        size='small'
                        // disabled={reset !== "YES"}
                        onClick={resetButtonDispatch}
                      >
                        {" "}
                        RESET
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>  */}
          </Paper>
        </Grid>
      )}

    </>
  );


  
};



export default MqttScreen;


