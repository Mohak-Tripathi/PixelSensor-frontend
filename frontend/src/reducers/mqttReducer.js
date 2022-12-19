
/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  mqttReducer.js

Brief:  It contains reducers related to mqtt page. 

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
  MQTT_SAVEDATA_REQUEST,
  MQTT_SAVEDATA_SUCCESS,
  MQTT_SAVEDATA_FAIL,
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


export const mqttSavedataReducer = (state = {}, action) => {
  switch (action.type) {
    case MQTT_SAVEDATA_REQUEST:
      return { ...state, loading: true };

    case MQTT_SAVEDATA_SUCCESS:
      return { loading: false, success: true, mqttDefaultInfo: action.payload };

    case MQTT_SAVEDATA_FAIL:
      return { loading: false, error: action.payload };


    default:
      return state;
  }
};

export const mqttRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case MQTT_REGISTER_REQUEST:
      return { ...state, loading: true };

    case MQTT_REGISTER_SUCCESS:
      return { loading: false, success: true, mqttInfo: action.payload };

    case MQTT_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS_MQTT:
      return {
        ...state,
        error: null,
      };

    case CLEAR_SUCCESS_MQTT:
      return {
        ...state,
        success: false,
      };


    default:
      return state;
  }
};

export const mqttResetReducer = (state = {}, action) => {
  switch (action.type) {
    case MQTT_RESET_REQUEST:
      return { loading: true };

    case MQTT_RESET_SUCCESS:
      return { loading: false, success: true, mqttInfo: action.payload };

    case MQTT_RESET_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};



export const mqttProtocolCertReducer = (state = {}, action) => {
  switch (action.type) {
    case MQTT_CERT_REQUEST:
      return { loading: true };

    case MQTT_CERT_SUCCESS:
      return { loading: false, success: true, mqttProtocol: action.payload };

    case MQTT_CERT_FAIL:
      return { loading: false, error: action.payload };

      case CLEAR_ERRORS_MQTT_CERT:
        return {
          ...state,
          error: null,
        };
  
      case CLEAR_SUCCESS_MQTT_CERT:
        return {
          ...state,
          success: false,
        };

    default:
      return state;
  }
};



export const getMqttCertReducer = (state = {getmqttProtocolInfo: {}}, action) => {
  switch (action.type) {
    case GET_MQTT_CERT_REQUEST:
      return { loading: true };

    case GET_MQTT_CERT_SUCCESS:
      return { loading: false, success: true, getmqttProtocolInfo: action.payload };

    case GET_MQTT_CERT_FAIL:
      return { loading: false, error: action.payload };

      case CLEAR_ERRORS_GET_MQTT_CERT:
        return {
          ...state,
          error: null,
        };
  

    default:
      return state;
  }
};