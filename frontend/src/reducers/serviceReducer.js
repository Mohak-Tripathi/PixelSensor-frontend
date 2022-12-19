
/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  serviceReducer.js

Brief:  It contains reducers related to service page. 

Project: Pixel Sensor

Release version: version 1.0.0

Release Date: Dec 14, 2022

Auther: Mohak Tripathi

Whats New: Everything.
 ..........................*/


import {
  SERVICE_CONFIG_REQUEST,
  SERVICE_CONFIG_SUCCESS,
  SERVICE_CONFIG_FAIL,
  SERVICE_OCCUPANCY_REQUEST,
  SERVICE_OCCUPANCY_SUCCESS,
  SERVICE_OCCUPANCY_FAIL,
  SERVICE_PEOPLECOUNT_REQUEST,
  SERVICE_PEOPLECOUNT_SUCCESS,
  SERVICE_PEOPLECOUNT_FAIL,
  SERVICE_PEOPLECOUNT_SERVICE_ONBOOT_REQUEST,
  SERVICE_PEOPLECOUNT_SERVICE_ONBOOT_SUCCESS,
  SERVICE_PEOPLECOUNT_SERVICE_ONBOOT_FAIL,
  SERVICE_ANALYZER_REQUEST,
  SERVICE_ANALYZER_SUCCESS,
  SERVICE_ANALYZER_FAIL,
  REBOOT_VARIANT_REQUEST,
  REBOOT_VARIANT_SUCCESS,
  REBOOT_VARIANT_FAIL,
  GET_SERVICE_STATUS_REQUEST,
  GET_SERVICE_STATUS_SUCCESS,
  GET_SERVICE_STATUS_FAIL,
  CLEAR_ERRORS_CONFIG,
  CLEAR_SUCCESS_CONFIG,
  CLEAR_ERRORS_OCCUPANCY,
  CLEAR_SUCCESS_OCCUPANCY,
  CLEAR_ERRORS_PEOPLECOUNT,
  CLEAR_SUCCESS_PEOPLECOUNT,
  CLEAR_ERRORS_PEOPLEBOOT,
  CLEAR_SUCCESS_PEOPLEBOOT,
  CLEAR_ERRORS_ANALYZER,
  CLEAR_SUCCESS_ANALYZER

} from "../constants/serviceConstants";



export const setServiceStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SERVICE_STATUS_REQUEST:
      return { ...state, loading: true, isStarted: false };

    case GET_SERVICE_STATUS_SUCCESS:

      return { loading: false, success: true, setServiceStatusInfo: action.payload };

    case GET_SERVICE_STATUS_FAIL:
      return { loading: false, error: action.payload };

    // case CLEAR_ERRORS:
    //   return {
    //     ...state,
    //     error: null,
    //   };

    // case CLEAR_SUCCESS:
    //   return {
    //     ...state,
    //     isStarted: false,
    //   };

    default:
      return state;
  }
};


export const setConfigReducer = (state = {setConfigInfo: "" }, action) => {
  switch (action.type) {
    case SERVICE_CONFIG_REQUEST:
      return { ...state, loading: true };

    case SERVICE_CONFIG_SUCCESS:
      console.log("Reducer", action.payload);
      return { loading: false, success: true, setConfigInfo: action.payload };

    case SERVICE_CONFIG_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS_CONFIG :
      return {
        ...state,
        error: null,
      };

      case CLEAR_SUCCESS_CONFIG :
        return {
          ...state,
          success: false,
        };

    default:
      return state;
  }
};



export const setOccupancyReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_OCCUPANCY_REQUEST:
      return { ...state, loading: true };

    case SERVICE_OCCUPANCY_SUCCESS:
      return { loading: false, success: true, setOccupancyInfo: action.payload };

    case SERVICE_OCCUPANCY_FAIL:
      return { loading: false, error: action.payload };

  
    case CLEAR_ERRORS_OCCUPANCY :
      return {
        ...state,
        error: null,
      };

      case CLEAR_SUCCESS_OCCUPANCY :
        return {
          ...state,
          success: false,
        };

    default:
      return state;
  }

};


export const setPeopleCountReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_PEOPLECOUNT_REQUEST:
      return { ...state, loading: true };

    case SERVICE_PEOPLECOUNT_SUCCESS:
      return { loading: false, success: true, setPeopleCountInfo: action.payload };

    case SERVICE_PEOPLECOUNT_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS_PEOPLECOUNT :
      return {
        ...state,
        error: null,
      };

      case CLEAR_SUCCESS_PEOPLECOUNT :
        return {
          ...state,
          success: false,
        };

    default:
      return state;
  }

};

export const setPeopleCountServiceOnBootReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_PEOPLECOUNT_SERVICE_ONBOOT_REQUEST:
      return { ...state, loading: true };

    case SERVICE_PEOPLECOUNT_SERVICE_ONBOOT_SUCCESS:
      return { loading: false, success: true, setPeopleCountOnBootInfo: action.payload };

    case SERVICE_PEOPLECOUNT_SERVICE_ONBOOT_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS_PEOPLEBOOT :
      return {
        ...state,
        error: null,
      };

      case CLEAR_SUCCESS_PEOPLEBOOT :
        return {
          ...state,
          success: false,
        };
    default:
      return state;
  }

};


export const setAnalyzerReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_ANALYZER_REQUEST:
      return { ...state, loading: true };

    case SERVICE_ANALYZER_SUCCESS:
      return { loading: false, success: true, setAnalyzerInfo: action.payload };

    case SERVICE_ANALYZER_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS_ANALYZER :
      return {
        ...state,
        error: null,
      };

      case CLEAR_SUCCESS_ANALYZER :
        return {
          ...state,
          success: false,
        };

    default:
      return state;
  }

};


export const rebootReducer = (state = {}, action) => {
  switch (action.type) {
    case REBOOT_VARIANT_REQUEST:
      return { ...state, loading: true };

    case REBOOT_VARIANT_SUCCESS:
      return { loading: false, success: true, rebootInfo: action.payload };

    case REBOOT_VARIANT_FAIL:
      return { loading: false, error: action.payload };

    // case CLEAR_ERRORS:
    //   return {
    //     ...state,
    //     error: null,
    //   };

    // case CLEAR_SUCCESS:
    //   return {
    //     ...state,
    //     success: false,
    //   };

    default:
      return state;
  }
};



