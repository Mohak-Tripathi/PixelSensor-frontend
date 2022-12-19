
/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  Navigation.jsx

Brief:  It contains navigation bar.

Project: Pixel Sensor

Release version: version 1.0.0

Release Date: Dec 14, 2022

Auther: Mohak Tripathi

Whats New: Everything.
 ..........................*/


import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button
} from "@mui/material";
import ChaletIcon from '@mui/icons-material/Chalet';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import SensorsIcon from '@mui/icons-material/Sensors';
import CellTowerIcon from '@mui/icons-material/CellTower';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
//  import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PieChartIcon from '@mui/icons-material/PieChart';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from "react-router-dom";
import { logout } from "../actions/userActions"


import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Navigation = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/")

  }




  
  const getVariantData = useSelector((state) => {
    return state.getVariant;
  });

  const { getVariantInfo } = getVariantData;



  const userLogin = useSelector((state) => {
    return state.userLogin;
  });


  const { userInfo } = userLogin;

  const NavLinkStyles = ({ isActive}) =>{
    return {
      color: "white",
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "underline" : "none"
    }
  }



  return (
    <AppBar position='static' >
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
          <ChaletIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>

          FLAMENCOTECH{" "}
        </Typography>

        <Stack direction='row' spacing={0.5}>


          {(userInfo && userInfo.user.role === "Production") && (
            <NavLink style={NavLinkStyles} to='/admin'>
            
              <Button color='inherit' startIcon={< AdminPanelSettingsIcon />} >
                Admin
              </Button>{" "}
            </NavLink>

          )}


          {userInfo && (userInfo.user.role === "Production" || userInfo.user.role === "Support") ? (

            <NavLink style={NavLinkStyles} to='/service'>
          
              <Button color='inherit' startIcon={<MiscellaneousServicesIcon />}>
                Services
              </Button>
            </NavLink>
          ) : null}




          {userInfo && userInfo.user.role === "Production" && (

            <NavLink style={NavLinkStyles} to='/inference'>
              {" "}
              <Button color='inherit' startIcon={<SensorsIcon />}> Inference </Button>{" "}
            </NavLink>
          )}


{/* className="navHeading" */}
          {userInfo && (userInfo.user.role === "Production" || userInfo.user.role === "Support") && (getVariantInfo  && getVariantInfo  === "MQTT") ? (
            <NavLink  style={NavLinkStyles} to='/mqtt'>
              {" "}
              <Button color='inherit' startIcon={< SettingsEthernetIcon />}> MQTT </Button>{" "}
            </NavLink>

          ) : null}

{/* className="navHeading" */}
          {userInfo && (userInfo.user.role === "Production" || userInfo.user.role === "Support") && (getVariantInfo  && getVariantInfo  === "MQTT")? (

            <NavLink  style={NavLinkStyles} to='/network'>
              {" "}
              <Button color='inherit' startIcon={< CellTowerIcon />} > Network </Button>{" "}
            </NavLink>

          ) : null}


          {/* <Link className="navHeading" to='/admin'>
            {" "}
            <Button color='inherit' startIcon ={< AdminPanelSettingsIcon/>}> Admin </Button>{" "}
          </Link> */}


          {/* <Link className="navHeading" to='/reboot'>
            {" "}
            <Button color='inherit' startIcon ={< RestartAltIcon />}> Reboot </Button>{" "}
          </Link> */}

{/* 
          {userInfo.user.role === "Production" || "Support" || "Demo" ? ( */}

            <NavLink style={NavLinkStyles} to='/dashboard'>
              {" "}
              <Button color='inherit' startIcon={< PieChartIcon />}>
                Dashboard
              </Button>{" "}
            </NavLink>


          {/* ) : null} */}


          <NavLink className="navHeading" to='/'>
            {" "}
            <Button color='inherit' startIcon={< LogoutIcon />} onClick={logoutHandler}> Logout </Button>{" "}
          </NavLink>


        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
