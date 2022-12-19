
/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  userActions.js 

Brief:  It contain all action creator related to user page.

Project: Pixel Sensor

Release version: version 1.0.0

Release Date: Dec 14, 2022

Auther: Mohak Tripathi

Whats New: Everything.
 ..........................*/


import {
  CLEAR_ERRORS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOGOUT_FAIL
} from "../constants/userConstants";
import axios from "axios";
import CryptoJS from "crypto-js";

export const login = (name, password) => async (dispatch) => {

  // var data = {
  //   "username": "Admin",
  //   "password": "a2d87b62deb0786961622c001f8c80bc"
  // };


  // var config = {
  //   method: 'post',
  //   url: 'http://192.168.10.25:8080/login?username=Admin&password=Pixelft@12345&showPwdChkbox=on',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     "Access-Control-Allow-Credentials": true,
  //     Cookie: 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNjY2ODczOTU2LCJleHAiOjE2NjY4Nzc1NTZ9.wBOIDy153oMKZa0SP8U0eQMlUqC16rdUjGNjotb5vsg'
  //   },
  //   data: data
  // };
  // axios.defaults.withCredentials = true;



  // axios(config)
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));
  //     dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
  //      localStorage.setItem("userInfo", JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });


    dispatch({
      type: USER_LOGIN_REQUEST
    })


  const hashedPwd = CryptoJS.MD5(name + password).toString();


  var data = {
    "username": name,
    "password": hashedPwd
  };
  

  var config = {
    method: 'post',
    url: `http://192.168.10.25:8080/login?username=${name}&password=${password}&showPwdChkbox=on`,
    headers: { 
       'Authorization': 'Bearer pixelSensorProject@fTIoTDev', 
      "Access-Control-Allow-Credentials": true,
      'Content-Type': 'application/json', 
      // 'Cookie': 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN1cHBvcnRfVXNlciIsImlhdCI6MTY2Nzc1NTg2NiwiZXhwIjoxNjY3NzU5NDY2fQ.B0Ln1I6gRU6Dm3GIIfq6tn0L-oOXgdkRG_GbgtxItbs'
    },
    data : data
  };
  
  axios.defaults.withCredentials = true;

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
   sessionStorage.setItem("userInfo", JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
    dispatch({ type: USER_LOGIN_FAIL, payload: error});
  });
  

  // try {
  //   dispatch({
  //     type: USER_LOGIN_REQUEST,
  //   });

  
  //   // 'Cookie': 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlByb2R1Y3Rpb25fVXNlciIsImlhdCI6MTY2Njg3MDcwOSwiZXhwIjoxNjY2ODc0MzA5fQ.Kaj1XMikd8JYaEais9033HMDKELR-JNhUVXwQPPA_Es'

  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Credentials": true,
  //     },
  //   };

  //   // "Access-Control-Allow-Credentials": true,

  //   const hashedPwd = CryptoJS.MD5(name + password).toString();

  //   // alert(hashedPwd, "check")

  //   var data1 = {
  //     "username": name,
  //     "password": hashedPwd
  //   };

  //   // "a2d87b62deb0786961622c001f8c80bc"

  //   // axios.defaults.withCredentials = true;

  //   const { data } = await axios.post(
  //     `http://192.168.10.25:8080/login?username=${name}&password=${password}&showPwdChkbox=on`, data1, config
  //   );

  //   dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  //   localStorage.setItem("userInfo", JSON.stringify(data));
  // } catch (error) {
  //   dispatch({
  //     type: USER_LOGIN_FAIL,
  //     payload:
  //       error.response && error.response.data.message
  //         ? error.response.data.message
  //         : error.message,
  //   });
  // }
};

// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("http://192.168.10.25:8080/me",  {withCredentials: true}); //give details of current logged in user.

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }

};


export const logout = () => async (dispatch) => {
  try {
    await axios.get("http://192.168.10.25:8080/api/config/logout", {withCredentials: true, keepalive: true });  
  

    //localStorage.removeItem('userInfo')
    localStorage.removeItem('getSensorInfo')
    localStorage.removeItem('getAdminSSIDInfo')
    localStorage.removeItem('variantInfo')
  // sessionStorage.removeItem('userInfo')
    



    dispatch({
      type: USER_LOGOUT
    });

  
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};




// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS ,
  });
};

