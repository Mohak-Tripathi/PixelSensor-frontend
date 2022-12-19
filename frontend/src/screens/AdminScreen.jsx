
/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  AdminScreen.jsx

Brief:  It contains ui of admin page. 

Project: Pixel Sensor

Release version: version 1.0.0

Release Date: Dec 14, 2022

Auther: Mohak Tripathi

Whats New: Everything.
 ..........................*/



import React, { useEffect } from "react";
import { Grid, Paper, TextField, Button, Box, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { variantAction } from "../actions/adminActions"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAdminSSID, adminAction, clearErrorsAPMODE,
  clearSuccessAPMODE,
  apModeSsidPassAction,
  getVariantAction,
  clearErrorsVariant,
  clearSuccessVariant,
  clearErrorsSSID,
  clearSuccessSSID
} from "../actions/adminActions"
import { useAlert } from 'react-alert'
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import Loader from "../components/Loader"



const AdminScreen = () => {


  const [variant, setVariant] = React.useState("");
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


  const variantData = useSelector((state) => {
    return state.variant;
  });

  const { success: variantSuccess, error: variantFail } = variantData;

  const getVariantData = useSelector((state) => {
    return state.getVariant;
  });

  const { getVariantInfo } = getVariantData;

  const apModessidPass = useSelector((state) => {
    return state.apModessidPass;
  });

  const { success: apModessidPassSuccess, error: apModessidPassFail } = apModessidPass;


  const admin = useSelector((state) => {
    return state.admin;
  });


  const { error: errorAdmin, success: successAdmin } = admin;



  useEffect(() => {
    // const userData= JSON.parse(sessionStorage.getItem('userInfo'));
  
     if (!userInfo) {

      navigate("/")
    }


    dispatch(getVariantAction())
    dispatch(getAdminSSID())

    if (getVariantInfo) {
      setVariant(getVariantInfo)
    }

    if (variantSuccess) {
      alert.success("variant configuration saved")
      dispatch(clearSuccessVariant())
    }

    if (variantFail) {
      alert.error("variant configuration failed")
      dispatch(clearErrorsVariant())
    }


    if (apModessidPassSuccess) {
      alert.success("ap mode ssid password saved")
      dispatch(clearSuccessSSID())
    }

    if (apModessidPassFail) {
      alert.error("ap mode ssid password failed")
      dispatch(clearErrorsSSID())
    }

    if (errorAdmin) {
      alert.error("Apmode SSID failed")
      dispatch(clearErrorsAPMODE())
    }
    if (successAdmin) {
      alert.success("Apmode SSID Saved")
      dispatch(clearSuccessAPMODE())
    }


  }, [errorAdmin, successAdmin, dispatch, navigate, userInfo, variantSuccess, variantFail, alert, getVariantInfo, apModessidPassSuccess, apModessidPassFail]);

  const getAdmin = useSelector((state) => {
    return state.getAdmin
  })

  const { loading: getAdminLoader, getAdminSSIDInfo } = getAdmin;


  const initialValues = {
    ap_mode_ssid_pas: ""
  }


  const validationSchema = Yup.object().shape({

    ap_mode_ssid_pas: Yup.string()
      .min(8, "Minimum characters should be 8")
      .matches(
        passwordRegExp,
        "Password must have one upper, lower case, number, special symbol"
      )
      .required("Required"),
  });


  const onSubmit = (values) => {
    dispatch(apModeSsidPassAction(values))

  };

  const handleChange = (e) => {
    setVariant(e.target.value);
  };


  const chooseVariant = (e) => {
    e.preventDefault()
    dispatch(variantAction(variant))
  }

  let initialValuesFive = {
    ap_mode_ssid: getAdminSSID ? getAdminSSIDInfo : "."

  }


  const validationSchemaFive = Yup.object().shape({
    ap_mode_ssid: Yup.string().required("Required"),
  });


  const onSubmitFive = (values, props) => {
    dispatch(adminAction(values));
  };


  return (
    <>

      {getAdminLoader ? <Loader /> : (
        <Grid>
          <Paper
            style={{
              maxWidth: 950,
              minHeight: 400,
              padding: "30px 33px",
              margin: "25px auto",
            }}
            elevation={20}
          >

            <Box>
              <Typography
                className='sectionHeading'
                // variant='h6'
                component='p'
                gutterBottom
              >
                One time settings for the device, should be configured by the production team before the product is shipped from factory.
              </Typography>
              <Box>
                {/* <Typography
                  // variant='caption'
                  color='blue'
                  component='p'
                // style={{ fontSize: "50px" }}
                >
                  Choose Variant
                </Typography> */}
                <Typography
                          variant='body2'
                          color='blue'
                          component='p'
                          gutterBottom
                        >
                        Choose Variant
                        </Typography>
              </Box>

              <Box>
                <form onSubmit={chooseVariant}>
                  <FormControl variant="standard" sx={{ m: 0.5, minWidth: 175 }} size="small">
                    {/* <InputLabel id='demo-simple-select-standard-label'>
                      Variant
                    </InputLabel> */}
                    <Select
                      //   labelId="demo-simple-select-standard-label"
                      //   id="demo-simple-select-standard"
                      value={variant}
                      onChange={handleChange}
                       label='variant'
                    >
                      <MenuItem value=''>
                      </MenuItem>
                      <MenuItem value={"MQTT"}>IP Variant (MQTT variant)</MenuItem>
                      <MenuItem value={"ZIGBEE"}>
                        Non IP variant  (Zigbee Variant ){" "}
                      </MenuItem>
                      {/* <MenuItem value={"STANDALONE"}>
                      Standalone variant{" "}
                    </MenuItem> */}
                    </Select>
                  </FormControl>

                  {/* {loading ? <Loader /> : ( */}

                  <Box textAlign='right'>

                    <Button
                      sx={{ mt: 1.5, mb: 2.5, minWidth: "170px" }}
                      type='submit'
                      variant='outlined'
                      size="small"
                    >

                      SAVE
                    </Button>


                  </Box>
                  {/* )} */}

                </form>
              </Box>
            </Box>




            <Box>
              {/* <Typography
    className='sectionHeading'
    // variant='h5'
    component='p'
    gutterBottom
  >
    Admin Description
  </Typography> */}

              <Formik
                initialValues={initialValuesFive}
                validationSchema={validationSchemaFive}
                onSubmit={onSubmitFive}
                enableReinitialize
              >
                {(props) => (
                  <Form>
                    <Grid container spacing={2}>
                      {/* ------- */}

                      <Grid xs={12} item>
                        <Typography
                          variant='body2'
                          color='blue'
                          component='p'
                          gutterBottom
                        >
                          Set AP Mode SSID
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid xs={3} item>
                            {/* <Typography
                              variant='caption'
                              color='blue'
                              component='p'
                            >
                              SSID
                            </Typography> */}
                             <LightTooltip title="Sets the NEW SSID for AP Mode" placement="top-end">
                            <Field
                              as={TextField}
                              placeholder='Enter SSID'
                              name='ap_mode_ssid'
                              variant='standard'
                              fullWidth
                              required
                              error={
                                props.errors.ap_mode_ssid &&
                                props.touched.ap_mode_ssid
                              }
                              helperText={<ErrorMessage name='ap_mode_ssid' />}
                            />
                                     </LightTooltip>
                    
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
            </Box>




            <Box>


              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
              >
                {(props) => (
                  <Form>
                    <Grid container spacing={2}>
                      {/* ------- */}

                      <Grid xs={12} item>
                        {/* <Typography
                          variant='body2'
                          color='grey'
                          component='p'
                          gutterBottom
                        >
                          Set AP Mode SSID Password
                        </Typography> */}
                             <Typography
                          variant='body2'
                          color='blue'
                          component='p'
                          gutterBottom
                        >
                   Set AP Mode SSID Password
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid xs={3} item>
                            {/* <Typography
                              variant='caption'
                              color='blue'
                              component='p'
                            >
                              SSID Password
                            </Typography> */}
                             <LightTooltip title="Sets the new password to application." placement="top-end">
                                  
                            <Field
                              as={TextField}
                              placeholder='Enter SSID Password'
                              name='ap_mode_ssid_pas'
                              variant='standard'
                              fullWidth
                              required
                              type="password"
                              error={
                                props.errors.ap_mode_ssid_pas &&
                                props.touched.ap_mode_ssid_pas
                              }
                              helperText={<ErrorMessage name='ap_mode_ssid_pas' />}
                            />
                      </LightTooltip>
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* ---------- */}

                      <Grid xs={12} item>

                        <Box textAlign='right'>
                          <Button
                            variant='outlined'
                            type='submit'
                            // sx={{ mt: 1, mb: 2 }}
                            sx={{ mt: 1.5, mb: 2.5, minWidth: "170px" }}
                            size='small'
                          >
                            SAVE
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

export default AdminScreen;
