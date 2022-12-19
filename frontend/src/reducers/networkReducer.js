
/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  networkReducer.js

Brief:  It contains reducers related to network page. 

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
  CLEAR_ERRORS_ETHERNET,
  CLEAR_SUCCESS_ETHERNET,
  CLEAR_SUCCESS_NTP,
  CLEAR_ERRORS_NTP,

} from "../constants/networkConstants";




export const wifiCredNetworkReducer = (state = {}, action) => {
  switch (action.type) {
    case WIFICRED_NETWORK_REQUEST:
      return { ...state, loading: true };

    case WIFICRED_NETWORK_SUCCESS:
      return {
        loading: false,
        success: true,
        wifiCredNetworkInfo: action.payload,
      };

    case WIFICRED_NETWORK_FAIL:
      return { loading: false, error: action.payload };

      
      case CLEAR_ERRORS_CRED :
        return {
          ...state,
          error: null,
        };

        case CLEAR_SUCCESS_CRED :
          return {
            ...state,
            success: false,
          };

    default:
      return state;
  }
};

export const wifiNetworkReducer = (state = {}, action) => {
  switch (action.type) {
    case WIFI_NETWORK_REQUEST:
      return { ...state, loading: true };

    case WIFI_NETWORK_SUCCESS:
      return { loading: false, success: true, wifiNetworkInfo: action.payload };

    case WIFI_NETWORK_FAIL:
      return { loading: false, error: action.payload };

      case  CLEAR_ERRORS_CRED_WIFI_NET:
        return {
          ...state,
          error: null,
        };

        case  CLEAR_SUCCESS_CRED_WIFI_NET :
          return {
            ...state,
            success: false,
          };

    default:
      return state;
  }
};



export const ntpNetworkReducer = (state = {}, action) => {
  switch (action.type) {
    case NTP_NETWORK_REQUEST:
      return { ...state, loading: true };

    case NTP_NETWORK_SUCCESS:

      return { loading: false, success: true, ntpNetworkInfo: action.payload };

    case NTP_NETWORK_FAIL:
      return { loading: false, error: action.payload };

      case  CLEAR_ERRORS_NTP:
        return {
          ...state,
          error: null,
        };

        case  CLEAR_SUCCESS_NTP:
          return {
            ...state,
            success: false,
          };


    default:
      return state;
  }
};

export const ethernetNetworkReducer = (state = {}, action) => {
  switch (action.type) {
    case ETHERNET_NETWORK_REQUEST:
      return { ...state, loading: true };

    case ETHERNET_NETWORK_SUCCESS:
      return {
        loading: false,
        success: true,
        ethernetNetworkInfo: action.payload,
      };

    case ETHERNET_NETWORK_FAIL:
      return { loading: false, error: action.payload };

      case  CLEAR_ERRORS_ETHERNET:
        return {
          ...state,
          error: null,
        };

        case  CLEAR_SUCCESS_ETHERNET :
          return {
            ...state,
            success: false,
          };

    default:
      return state;
  }
};




// export const getAdminSSIDReducer = (state = {}, action) => {
//   switch (action.type) {
//     case AP_MODE_SSID_REQUEST:
//       return { ...state, loading: true };

//     case AP_MODE_SSID_SUCCESS:
//       return { loading: false, success: true, getAdminSSIDInfo: action.payload };

//     case AP_MODE_SSID_FAIL:
//       return { loading: false, error: action.payload };

//     default:
//       return state;
//   }
// };

export const getNetworkInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_NETWORK_INFO_REQUEST:
      return { ...state, loading: true };

    case GET_NETWORK_INFO_SUCCESS:
      return { loading: false, success: true, getAllNetworkInfo: action.payload };

    case GET_NETWORK_INFO_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getNTPInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_NTP_REQUEST :
      return { ...state, loading: true };

    case GET_NTP_SUCCESS:
      return { loading: false, success: true, getNTPInfoVal: action.payload };

    case GET_NTP_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

