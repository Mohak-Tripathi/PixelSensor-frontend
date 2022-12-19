
/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  ServiceScreen.jsx

Brief:  It contains ui of service page.

Project: Pixel Sensor

Release version: version 1.0.0

Release Date: Dec 14, 2022

Auther: Mohak Tripathi

Whats New: Everything.
 ..........................*/


import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Paper, Button, Box, Typography, Grid, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { rebootVariant } from "../actions/serviceActions"
import Loader from "../components/Loader"
import { useAlert } from 'react-alert'


import {
  serviceConfigAction,
  serviceOccupancyAction,
  servicePeopleCountAction,
  servicePeopleCountOnBootAction,
  setServiceStatusAction,
  clearErrorsConfig,
  clearSuccessConfig,
  clearErrorsOccupancy,
  clearSuccessOccupancy,
  clearErrorsPeopleCount,
  clearSuccessPeopleCount,
  clearErrorsPeopleCountOnBoot,
  clearSuccessPeopleCountOnBoot,
  serviceAnalyzerAction,
  clearErrorsAnalyzer,
  clearSuccessAnalyzer 

} from "../actions/serviceActions";

const ServicesScreen = () => {

  const [reboot, setReboot] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();



  const userLogin = useSelector((state) => {
    return state.userLogin;
  });

  const { userInfo } = userLogin;


  const setConfigService = (value) => {
    dispatch(serviceConfigAction(value));
  };

  const setOccupancyService = (value) => {
    console.log(value);
    dispatch(serviceOccupancyAction(value));
  };

  const setPeopleCountService = (value) => {
    dispatch(servicePeopleCountAction(value));
  };

  const setPeopleCountServiceOnBoot = (value) => {
    dispatch(servicePeopleCountOnBootAction(value));
  };


  const setAnalyzerService = (value) => {

    dispatch(serviceAnalyzerAction(value));
  };


  const rebootButtonClick = (e) => {
    setReboot(e.target.value);
  };

  const rebootServerButton = () => {
    dispatch(rebootVariant())
    
    // setInterval(() => {
    //   setReboot("");
    // }, 2000);
  }


  const setServiceStatus = useSelector((state) => {
    return state.setServiceStatus;
  });



  const { success: serviceSuccess, setServiceStatusInfo } = setServiceStatus;


  let serviceStarted = false;

  if (serviceSuccess) {

    serviceStarted = setServiceStatusInfo[1].isActive || setServiceStatusInfo[2].isActive || setServiceStatusInfo[0].isActive || setServiceStatusInfo[3].isActive
  }


  const setConfig = useSelector((state) => {
    return state.setConfig;
  });


  const { error: setConfigError, success: setConfigSuccess, setConfigInfo } = setConfig;

  const setOccupancy = useSelector((state) => {
    return state.setOccupancy;
  });
  const { error: setOccupancyError, success: setOccupancySuccess, setOccupancyInfo } = setOccupancy;

  const setPeopleCount = useSelector((state) => {
    return state.setPeopleCount;
  });

  const { error: setPeopleCountError, success: setPeopleCountSuccess, setPeopleCountInfo } = setPeopleCount;


  const setPeopleCountOnBoot = useSelector((state) => {
    return state.setPeopleCountOnBoot;
  });

  const { error: setPeopleCountOnBootError, success: setPeopleCountOnBootSuccess, setPeopleCountOnBootInfo } = setPeopleCountOnBoot;

  const setAnalyzer = useSelector((state) => {
    return state.setAnalyzer;
  });

  const { error: AnalyzerError, success: AnalyzerSuccess, 
    setAnalyzerInfo} = setAnalyzer;



  useEffect(() => {


    if (!userInfo) {
      navigate("/");
    }

    if (setConfigError) {
      alert.error("Configuration service failed")
      dispatch(clearErrorsConfig())
    }

    if (setConfigSuccess && setConfigInfo === "start") {
      alert.success("Configuration service started")
      dispatch(clearSuccessConfig())
    }else if(setConfigSuccess && setConfigInfo === "stop"){
      alert.success("Configuration service stopped")
      dispatch(clearSuccessConfig())
    }


    if (setOccupancyError) {
      alert.error("Desk Occupancy service failed")
      dispatch(clearErrorsOccupancy())
    }

    if (setOccupancySuccess && setOccupancyInfo === "start") {
      alert.success("Desk Occupancy service started")
      dispatch(clearSuccessOccupancy())
    }
    else if(setOccupancySuccess && setOccupancyInfo === "stop"){
      alert.success("Desk Occupancy service stopped")
      dispatch(clearSuccessOccupancy())
    }
    else if(setOccupancySuccess && setOccupancyInfo === "enable"){
      alert.success("Desk Occupancy service enabled")
      dispatch(clearSuccessOccupancy())
    }
    else if(setOccupancySuccess && setOccupancyInfo === "disable"){
      alert.success("Desk Occupancy service disabled")
      dispatch(clearSuccessOccupancy())
    }

    if (setPeopleCountError) {
      alert.error("People Count service disabled")
      dispatch(clearErrorsPeopleCount())
    }

    if (setPeopleCountSuccess && setPeopleCountInfo === "start") {
      alert.success("People Count service started")
      dispatch(clearSuccessPeopleCount())
    }else if(setPeopleCountSuccess && setPeopleCountInfo === "stop"){
      alert.success("People Count service stopped")
      dispatch(clearSuccessPeopleCount())
    }

    if (setPeopleCountOnBootError) {
      alert.error("People Count service on boot service failed")
      dispatch(clearErrorsPeopleCountOnBoot())
    }

    if (setPeopleCountOnBootSuccess && setPeopleCountOnBootInfo=== "enable") {
      alert.success("PeopleCount service on boot enabled")
      dispatch(clearSuccessPeopleCountOnBoot())
    }else if(setPeopleCountOnBootSuccess && setPeopleCountOnBootInfo=== "disable"){
      alert.success("PeopleCount service on boot disabled")
      dispatch(clearSuccessPeopleCountOnBoot())
    }

    if (AnalyzerError) {
      alert.error("Analyzer service failed")
      dispatch(  clearErrorsAnalyzer())
    }
    if (AnalyzerSuccess && setAnalyzerInfo === "start") {
      alert.success("Analyzer service started")
      dispatch( clearSuccessAnalyzer())
    }else if(AnalyzerSuccess &&  setAnalyzerInfo === "stop"){
      alert.success("Analyzer service stopped")
      dispatch(clearSuccessAnalyzer())
    }
  


    else {
      dispatch(setServiceStatusAction())
    }


  }, [setOccupancyInfo, setPeopleCountInfo, AnalyzerError, AnalyzerSuccess, setAnalyzerInfo, setConfigInfo, setPeopleCountOnBootInfo,  userInfo, dispatch, navigate, serviceSuccess, setConfigError, setConfigSuccess, alert, setOccupancyError, setOccupancySuccess, setPeopleCountError, setPeopleCountSuccess, setPeopleCountOnBootError, setPeopleCountOnBootSuccess])

  // const openConfigButton = () =>{
  //   // <script language="JavaScript">
  //                             document.write(
  //                               '<a target="_blank" href="' +
  //                               window.location.protocol +
  //                               "//" +
  //                               window.location.hostname +
  //                               ':5000" >Open Configuration Tool</a>'
  //                             );
  //                           // </script>
  //                           <a target="_blank" href="https://www.w3schools.com">Visit W3Schools.com!</a>
  // }



  return (
    <>
      {serviceSuccess !== true ? <Loader /> : (

        <Paper
          style={{
            maxWidth: 950,
            minHeight: 450,
            padding: "30px 33px",
            margin: "25px auto",
          }}
          elevation={20}
        >


          <Typography
            className='sectionHeading'
            // variant='h5'
            component='p'
            gutterBottom
          >
            Quick buttons to start/stop service, service enable/disable on reboot, and reboot the device.
          </Typography>

          <TableContainer component={Paper}>
            <Table aria-label='simple table'>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <strong>Configuration</strong>
                  </TableCell>
                  <TableCell align='right'>
                    <Button
                      style={{ backgroundColor: "#39a339" }}
                      variant='contained'
                      // sx={{ mt: 0.5, mb: 1 }}
                      size='small'
                      onClick={() => setConfigService("start")}
                      // disabled={(setServiceStatusInfo[1].isActive || setServiceStatusInfo[2].isActive)  ? true : false}
                      disabled={serviceStarted}
                    >
                      Start
                    </Button>
                  </TableCell>
                  <TableCell align='left'>
                    <Button
                      style={{ backgroundColor: "red" }}
                      variant='contained'
                      // sx={{ mt: 1, mb: 2 }}
                      size='small'
                      onClick={() => setConfigService("stop")}
            
                      disabled={serviceStarted && !setServiceStatusInfo[0].isActive}

                    >
                      Stop
                    </Button>
                  </TableCell>

                  <TableCell align='right'>
                    <Button
                      variant='outlined'
                      // sx={{ mr:4 }}
                      size='small'
                      sx={{ minWidth: "130px" }}
                      disabled={serviceStarted && !setServiceStatusInfo[0].isActive}
                      // onClick={openConfigButton}
                    >
             
                      <a style={{textDecoration: "none", color: "#3f51b5"}} target="_blank" rel="noreferrer" href="http://192.168.10.25:5000">       OPEN CONFIG TOOL  </a>      
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <strong>Desk Occupancy</strong>
                  </TableCell>
                  <TableCell align='right'>
                    <Button
                      style={{ backgroundColor: "#39a339" }}
                      variant='contained'
                      // sx={{ mt: 0.5, mb: 1 }}
                      size='small'
                      onClick={() => setOccupancyService("start")}
         
                      disabled={serviceStarted}
                    >
                      Start
                    </Button>
                  </TableCell>
                  <TableCell align='left'>
                    <Button
                      style={{ backgroundColor: "red" }}
                      variant='contained'
                      // sx={{ mt: 1, mb: 2 }}
                      size='small'
                      onClick={() => setOccupancyService("stop")}
           
                      disabled={serviceStarted && !setServiceStatusInfo[1].isActive}
                    >
                      Stop
                    </Button>
                  </TableCell>

                  <TableCell align='right'>
                    <Button
                      variant='outlined'
                      sx={{ minWidth: "143px" }}
                      size='small'
                      onClick={() => setOccupancyService("enable")}

            
                      disabled={(serviceStarted && !setServiceStatusInfo[1].isActive) || setOccupancyInfo === "enable"}
                    >
                      ENABLE ON BOOT
                    </Button>
                  </TableCell>

                  <TableCell align='left'>
                    <Button
                      variant='outlined'
                      // sx={{ mt: 1, mb: 2 }}
                      sx={{ minWidth: "143px" }}
                      size='small'
                      onClick={() => setOccupancyService("disable")}

                      // disabled={setServiceStatusInfo[0].isActive ? true : false}
                      disabled={(serviceStarted && !setServiceStatusInfo[1].isActive) }
                      // || setOccupancyInfo === "disable"
                    >
                      DISABLE ON BOOT
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <strong>People Count</strong>
                  </TableCell>
                  <TableCell align='right'>
                    <Button
                      style={{ backgroundColor: "#39a339" }}
                      variant='contained'
                      // sx={{ mt: 0.5, mb: 1 }}
                      size='small'
                      onClick={() => setPeopleCountService("start")}
                      // disabled={setServiceStatusInfo[0].isActive  ? true : false}
                      disabled={serviceStarted}
                    >
                      Start
                    </Button>
                  </TableCell>
                  <TableCell align='left'>
                    <Button
                      style={{ backgroundColor: "red" }}
                      variant='contained'
                      // sx={{ mt: 1, mb: 2 }}
                      size='small'
                      onClick={() => setPeopleCountService("stop")}
                      // disabled={setServiceStatusInfo[0].isActive ? true : false}
                      // disabled={serviceStarted }
                      disabled={serviceStarted && !setServiceStatusInfo[2].isActive}
                    >
                      Stop
                    </Button>
                  </TableCell>

                  <TableCell align='right'>
                    <Button
                      variant='outlined'
                      // sx={{ mt: 1, mb: 2 }}
                      sx={{ minWidth: "143px" }}
                      size='small'
                      onClick={() => setPeopleCountServiceOnBoot("enable")}
                      // disabled={setServiceStatusInfo[0].isActive ? true : false}
                      // disabled={serviceStarted }
                      disabled={(serviceStarted && !setServiceStatusInfo[2].isActive) ||  setPeopleCountOnBootInfo=== "enable"}
                    >
                      ENABLE ON BOOT
                    </Button>
                  </TableCell>

                  <TableCell align='left'>
                    <Button
                      variant="outlined"
                      // sx={{ mt: 1, mb: 2 }}
                      sx={{ minWidth: "143px" }}
                      size='small'
                      onClick={() => setPeopleCountServiceOnBoot("disable")}
                      // disabled={setServiceStatusInfo[0].isActive ? true : false}
                      disabled={(serviceStarted && !setServiceStatusInfo[2].isActive)  }
                      // ||  (setPeopleCountOnBootInfo=== "disable" && !setPeopleCountInfo === "stop")
                    >
                      DISABLE ON BOOT
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <strong>Analyzer </strong>
                  </TableCell>
                  <TableCell align='right'>
                    <Button
                      style={{ backgroundColor: "#39a339" }}
                      variant='contained'
                      // sx={{ mt: 0.5, mb: 1 }}
                      size='small'
                      onClick={() => setAnalyzerService("start")}
               
                      disabled={serviceStarted}
                    >
                      Start
                    </Button>
                  </TableCell>
                  <TableCell align='left'>
                    <Button
                      style={{ backgroundColor: "red" }}
                      variant='contained'
                      // sx={{ mt: 1, mb: 2 }}
                      size='small'
                      onClick={() => setAnalyzerService("stop")}
                      // disabled={setServiceStatusInfo[0].isActive ? true : false}
                      //disabled={serviceStarted}
                      
                      disabled={serviceStarted && !setServiceStatusInfo[3].isActive}
                    >
                      Stop
                    </Button>
                  </TableCell>

                  {/* <TableCell align='right'>
                  <Button
                    variant='contained'
                    // sx={{ mt: 1, mb: 2 }}
                    size='small'
                    onClick={() =>   setAnalyzerService('enable')}
                  >
                    ENABLE ON BOOT
                  </Button>
                </TableCell> */}

                  {/* <TableCell align='left'>
                  <Button
                    variant='contained'
                    // sx={{ mt: 1, mb: 2 }}
                    size='small'
                    onClick={() =>   setAnalyzerService('disable')}
                  >
                    DISABLE ON BOOT
                  </Button>
                </TableCell> */}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>



          <Box>
            {/* <Typography
              className='sectionHeading'
              // variant='h5'
              component='p'
              gutterBottom
            >
              Reboot
            </Typography> */}

            <form >
              <Grid container spacing={1} sx={{ mt: 2}}>
                <Grid xs={12} item>
                  <Typography
                    variant='body2'
                    color='purple'
                    component='p'
                    gutterBottom
                  >
                    Reboot Device
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid xs={3} item>
                      {/* <Typography variant='caption' color='grey' component='p'>
                        Reboot the server
                      </Typography> */}
                      <TextField
                        placeholder='Type REBOOT if reboot is needed'
                        label='Type REBOOT'
                        variant='standard'
                        fullWidth
                        size='small'
                        required
                        onChange={rebootButtonClick}
                      />
                    </Grid>
                  </Grid>


                  <Box textAlign='right'>
                    <Button
                        variant='outlined'
                      type='submit'
                      sx={{ mt: 1.5, mb: 2.5, minWidth: "170px" }}
                      size='small'
                      disabled={reboot !== "REBOOT"}
                      onClick={rebootServerButton}
                    >
                      REBOOT
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>


     




        </Paper>
      )}

    </>
  );
};

export default ServicesScreen;
