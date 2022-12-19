/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  mqttAction.js

Brief:  It contain all action creator related to mqtt page.

Project: Pixel Sensor

Release version: version 1.0.0

Release Date: Dec 14, 2022

Auther: Mohak Tripathi

Whats New: Everything.
 ..........................*/


import {
  MQTT_REGISTER_REQUEST,
  MQTT_REGISTER_SUCCESS,
  MQTT_REGISTER_FAIL,
  MQTT_RESET_REQUEST,
  MQTT_RESET_SUCCESS,
  MQTT_RESET_FAIL,
  MQTT_SAVEDATA_SUCCESS,
  MQTT_SAVEDATA_FAIL,
  MQTT_SAVEDATA_REQUEST,
  MQTT_CERT_SUCCESS,
  MQTT_CERT_REQUEST,
  MQTT_CERT_FAIL,
  CLEAR_ERRORS_MQTT,
  CLEAR_SUCCESS_MQTT,
  CLEAR_ERRORS_MQTT_CERT,
  CLEAR_SUCCESS_MQTT_CERT,
  GET_MQTT_CERT_REQUEST,
  GET_MQTT_CERT_SUCCESS,
  GET_MQTT_CERT_FAIL,
  CLEAR_ERRORS_GET_MQTT_CERT


} from "../constants/mqttConstants";
import axios from "axios";

//Get request

export const mqttSavedataAction = () => async (dispatch) => {
  try {
    dispatch({
      type: MQTT_SAVEDATA_REQUEST,
    });


    const { data } = await axios.get(`http://192.168.10.25:8080/api/config/mqtt`,{withCredentials: true});

    dispatch({ type: MQTT_SAVEDATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MQTT_SAVEDATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const getmqttCert = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_MQTT_CERT_REQUEST,
    });


    const { data } = await axios.get(`http://192.168.10.25:8080/api/config/mqtt/cert`,{withCredentials: true});

    dispatch({ type: GET_MQTT_CERT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_MQTT_CERT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,

    });
  }
};


export const mqttRegisterAction = (mqtt) => async (dispatch) => {
  try {
    dispatch({
      type: MQTT_REGISTER_REQUEST,
    });


    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`http://192.168.10.25:8080/api/config/mqtt/params`, mqtt, {withCredentials: true}, config);

    dispatch({ type: MQTT_REGISTER_SUCCESS, payload: data });

   // localStorage.setItem("mqttInfo", JSON.stringify(data));
    
  } catch (error) {
    dispatch({
      type: MQTT_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      // payload: error.response,
    });
  }
};

//get request

export const mqttReset = () => async (dispatch) => {
  try {
    dispatch({
      type: MQTT_RESET_REQUEST,
    });


    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`http://192.168.10.25:8080/api/config/mqtt/reset`, {withCredentials: true}, config);

    dispatch({ type: MQTT_RESET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MQTT_RESET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,

    });
  }
};




export const mqttProtocolCertAction = (mqttProtocol) => async (dispatch) => {
  try {
    dispatch({
      type:   MQTT_CERT_REQUEST,
    });



    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(`http://192.168.10.25:8080/api/config/mqtt/cert`,  mqttProtocol, {withCredentials: true}, config);

    // 

    dispatch({ type:   MQTT_CERT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type:   MQTT_CERT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,

    });
  }
};


// Clear Errors
export const clearErrorsMQTT = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_MQTT,
  });
};


// Clear Success
export const clearSuccessMQTT = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SUCCESS_MQTT,
  });
};


export const clearErrorsMQTTCert = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_MQTT_CERT,
  });
};



export const clearSuccessMQTTCert = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SUCCESS_MQTT_CERT,
  });
};



// Clear Errors
export const clearErrorsMqttCert = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_GET_MQTT_CERT
  });
};
