
/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  networkAction.js

Brief:  It contain all action creator related to network page.

Project: Pixel Sensor

Release version: version 1.0.0

Release Date: Dec 14, 2022

Auther: Mohak Tripathi

Whats New: Everything.
 ..........................*/


import {
  NTP_NETWORK_REQUEST,
  NTP_NETWORK_SUCCESS,
  NTP_NETWORK_FAIL,
  ETHERNET_NETWORK_REQUEST,
  ETHERNET_NETWORK_SUCCESS,
  ETHERNET_NETWORK_FAIL,
  WIFI_NETWORK_REQUEST,
  WIFI_NETWORK_SUCCESS,
  WIFI_NETWORK_FAIL,
  WIFICRED_NETWORK_REQUEST,
  WIFICRED_NETWORK_SUCCESS,
  WIFICRED_NETWORK_FAIL,
 
  GET_NETWORK_INFO_REQUEST,
  GET_NETWORK_INFO_SUCCESS,
  GET_NETWORK_INFO_FAIL,
  GET_NTP_REQUEST,
  GET_NTP_SUCCESS,
  GET_NTP_FAIL,
  CLEAR_ERRORS_CRED,
  CLEAR_SUCCESS_CRED,
  CLEAR_ERRORS_CRED_WIFI_NET,
  CLEAR_SUCCESS_CRED_WIFI_NET,
  CLEAR_SUCCESS_ETHERNET,
  CLEAR_ERRORS_ETHERNET,
  CLEAR_ERRORS_NTP,
  CLEAR_SUCCESS_NTP,

} from "../constants/networkConstants";

import axios from "axios";

//Done
export const wifiCredNetworkAction = (wificredvalue) => async (dispatch) => {
    try {
      dispatch({
        type: WIFICRED_NETWORK_REQUEST,
      });


      const config = {
        headers: {
          "Content-Type": "application/json"
        },
      };

      const { data } = await axios.post(`http://192.168.10.25:8080/api/wifi/cred`,  wificredvalue, {withCredentials: true}, config);

      dispatch({ type: WIFICRED_NETWORK_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: WIFICRED_NETWORK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,

      });
    }
  };



//Done

export const wifiNetworkAction = (wifivalue) => async (dispatch) => {
  try {
    dispatch({
      type: WIFI_NETWORK_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",

      },
    };

    const { data } = await axios.post(`http://192.168.10.25:8080/api/wifi/staticipwifi`,   wifivalue, {withCredentials: true}, config);

    dispatch({ type: WIFI_NETWORK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: WIFI_NETWORK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,

    });
  }
};



export const getNTPInfoAction =
  () => async (dispatch) => {
    try {
      dispatch({
        type: GET_NTP_REQUEST,
      });



      const { data } = await axios.get(`http://192.168.10.25:8080/api/config/getNtpServer`, {withCredentials: true});

      dispatch({ type: GET_NTP_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_NTP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,

      });
    }
  };


//Done
export const ethernetNetworkAction = (ethernetvalue) => async (dispatch) => {
    try {
      dispatch({
        type: ETHERNET_NETWORK_REQUEST,
      });


      const config = {
        headers: {
          "Content-Type": "application/json"
        },
      };

      const { data } = await axios.post(`http://192.168.10.25:8080/api/wifi/staticipeth`,  ethernetvalue, {withCredentials: true}, config);

      dispatch({ type: ETHERNET_NETWORK_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ETHERNET_NETWORK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,

      });
    }
  };

  //Done
export const ntpNetworkAction = (ntpvalue) => async (dispatch) => {

  dispatch({
    type: NTP_NETWORK_REQUEST,
  });

  var data1 = JSON.stringify({
    "ntpServer": ntpvalue
  });

  var config = {
    method: 'post',
    url: 'http://192.168.10.25:8080/api/config/ntpServer',
    headers: {
      'Content-Type': 'application/json',

    },
    data: data1
  };

  axios.defaults.withCredentials = true;

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      dispatch({ type: NTP_NETWORK_SUCCESS, payload: response.data });

    })
    .catch(function (error) {
      console.log(error);
      dispatch({ type: NTP_NETWORK_FAIL, payload: error });
    });


  // try {


  //   dispatch({
  //     type: NTP_NETWORK_REQUEST,
  //   });



  //   var data1 = JSON.stringify({
  //     "ntpServer": ntpvalue
  //   });


  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //   };

  //   const { data } = await axios.post(
  //     `http://192.168.10.25:8080/api/config/ntpServer`,
  //     data1,
  //   );

  //   dispatch({ type: NTP_NETWORK_SUCCESS, payload: data });
  // } catch (error) {
  //   dispatch({
  //     type: NTP_NETWORK_FAIL,
  //     payload:
  //       error.response && error.response.data.message
  //         ? error.response.data.message
  //         : error.message,

  //   });
  // }
};




//Done
export const getNetworkInfoAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_NETWORK_INFO_REQUEST,
    });


    const { data } = await axios.get(
      `http://192.168.10.25:8080/api/wifi/nwk`, {withCredentials: true}
    );

    dispatch({ type: GET_NETWORK_INFO_SUCCESS, payload: data });
    // localStorage.setItem("getAdminSSIDInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: GET_NETWORK_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,

    });
  }
};








export const clearErrorsCred = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_CRED,
  });
};



export const clearSuccessCred = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SUCCESS_CRED,
  });
};



export const clearErrorsStaticIpWifi = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_CRED_WIFI_NET,
  });
};



export const clearSuccessStaticIpWifi = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SUCCESS_CRED_WIFI_NET,
  });
};


export const clearErrorsStaticIpEthernet= () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_ETHERNET,
  });
};



export const clearSuccessStaticIpEthernet = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SUCCESS_ETHERNET,
  });
};


export const clearErrorsNTP= () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_NTP,
  });
};



export const clearSuccessNTP = () => async (dispatch) => {
  console.log("hello hayye")
  
  dispatch({
    type: CLEAR_SUCCESS_NTP,
  });
};





