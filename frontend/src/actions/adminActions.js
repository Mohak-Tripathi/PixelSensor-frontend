/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  adminActions.js

Brief:  It contain all action creator related to admin page.

Project: Pixel Sensor

Release version: version 1.0.0

Release Date: Dec 14, 2022

Auther: Mohak Tripathi

Whats New: Everything.
 ..........................*/



import {
  VARIANT_REQUEST,
  VARIANT_SUCCESS,
  VARIANT_FAIL,
  AP_MODE_SSID_PASS_REQUEST,
  AP_MODE_SSID_PASS_SUCCESS,
  AP_MODE_SSID_PASS_FAIL,
  CLEAR_ERRORS_VARIANT,
  CLEAR_SUCCESS_VARIANT,
  CLEAR_ERRORS_SSID_PASS,
  CLEAR_SUCCESS_SSID_PASS,
  GET_VARIANT_REQUEST,
  GET_VARIANT_SUCCESS,
  GET_VARIANT_FAIL,
  CLEAR_ERRORS_GET_VARIANT ,
  AP_MODE_SSID_REQUEST,
  AP_MODE_SSID_SUCCESS,
  AP_MODE_SSID_FAIL,
  AP_MODE_REQUEST,
  AP_MODE_SUCCESS,
  AP_MODE_FAIL,
  CLEAR_ERRORS_APMODE,
  CLEAR_SUCCESS_APMODE
} from "../constants/adminConstants";
import axios from "axios";




export const getVariantAction = () => async (dispatch) => {
  try {
    dispatch({
      type:   GET_VARIANT_REQUEST,
    });


    const { data } = await axios.get(`http://192.168.10.25:8080/api/config/variant`,{withCredentials: true});

    dispatch({ type:   GET_VARIANT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type:   GET_VARIANT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
 
    });
  }
};


export const variantAction = (variant) => async (dispatch) => {
  try {
    dispatch({
      type: VARIANT_REQUEST,
    });


    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`http://192.168.10.25:8080/api/config/variant`, { variantData: variant }, { withCredentials: true }, config);

    dispatch({ type: VARIANT_SUCCESS, payload: data });
    // localStorage.setItem("variantInfo", JSON.stringify(variant));

  } catch (error) {
    dispatch({
      type: VARIANT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};


export const apModeSsidPassAction = (passwordObject) => async (dispatch) => {


  dispatch({
    type: AP_MODE_SSID_PASS_REQUEST,
  });
  const { ap_mode_ssid_pas } = passwordObject;

  var data = JSON.stringify({
    "ap_mode_ssid_pas": ap_mode_ssid_pas 
  });

  var config = {
    method: 'post',
    url: 'http://192.168.10.25:8080/api/config/apmodessidpass',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      dispatch({ type: AP_MODE_SSID_PASS_SUCCESS, payload: response.data });
    })
    .catch(function (error) {


      dispatch({
        type: AP_MODE_SSID_PASS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,

      });
    });




};


export const clearErrorsVariant = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_VARIANT,
  });
};


export const clearErrorsGetVariant = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_GET_VARIANT,
  });
};

export const clearSuccessVariant = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SUCCESS_VARIANT,
  });
};

export const clearErrorsSSID = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_SSID_PASS,
  });
};


export const clearSuccessSSID = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SUCCESS_SSID_PASS,
  });
};




//Done
export const getAdminSSID = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: AP_MODE_SSID_REQUEST,
    });


    const { data } = await axios.get(
      `http://192.168.10.25:8080/api/config/getApModeSsid`, {withCredentials: true}
    );

    dispatch({ type: AP_MODE_SSID_SUCCESS, payload: data });
    // localStorage.setItem("getAdminSSIDInfo", JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: AP_MODE_SSID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,

    });
  }
};




//Done
export const adminAction = (adminvalue) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AP_MODE_REQUEST,
    });

   

    // var data1 = JSON.stringify({
    //   "apmodeSsidValue": adminvalue
    // });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };


    const { data } = await axios.post(
      `http://192.168.10.25:8080/api/config/apModeSsid`, 
      adminvalue, {withCredentials: true}, 
      config
    );

    dispatch({ type: AP_MODE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AP_MODE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};


export const clearErrorsAPMODE= () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_APMODE,
  });
};



export const clearSuccessAPMODE = () => async (dispatch) => {
  
  dispatch({
    type: CLEAR_SUCCESS_APMODE,
  });
};

