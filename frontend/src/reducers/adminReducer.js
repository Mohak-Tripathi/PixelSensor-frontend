
/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  adminReducer.js

Brief:  It contains reducers related to admin page. 

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
    CLEAR_ERRORS_GET_VARIANT,
    AP_MODE_SSID_REQUEST,
    AP_MODE_SSID_SUCCESS,
    AP_MODE_SSID_FAIL,
    AP_MODE_REQUEST,
    AP_MODE_SUCCESS,
    AP_MODE_FAIL,
    CLEAR_ERRORS_APMODE,
    CLEAR_SUCCESS_APMODE
   } from "../constants/adminConstants";
  
  export const variantReducer = (state = {}, action) => {
    switch (action.type) {
      case VARIANT_REQUEST:
        return { ...state, loading: true };
  
      case VARIANT_SUCCESS:
        return { loading: false, success: true, variantInfo: action.payload };
  
      case VARIANT_FAIL:
        return { loading: false, error: action.payload };

        case CLEAR_ERRORS_VARIANT:
          return {
            ...state,
            error: null,
          };
    
        case CLEAR_SUCCESS_VARIANT:
          return {
            ...state,
            success: false,
          };
  
      default:
        return state;
    }
  };



  
  export const getVariantReducer = (state = {getVariantInfo: {}}, action) => {
    switch (action.type) {
      case GET_VARIANT_REQUEST:
        return { ...state, loading: true };
  
      case GET_VARIANT_SUCCESS:
        return { loading: false, success: true, getVariantInfo: action.payload };
  
      case GET_VARIANT_FAIL:
        return { loading: false, error: action.payload };

        case CLEAR_ERRORS_GET_VARIANT :
          return {
            ...state,
            error: null,
          };

  
      default:
        return state;
    }
  };


export const apModessidPassReducer = (state = {}, action) => {
    switch (action.type) {
      case  AP_MODE_SSID_PASS_REQUEST:
        return { ...state, loading: true };
  
      case  AP_MODE_SSID_PASS_SUCCESS:
        return { loading: false, success: true, apModeSSIDPassInfo: action.payload };
  
      case  AP_MODE_SSID_PASS_FAIL:
        return { loading: false, error: action.payload };


        case CLEAR_ERRORS_SSID_PASS :
          return {
            ...state,
            error: null,
          };
    
        case CLEAR_SUCCESS_SSID_PASS :
          return {
            ...state,
            success: false,
          };
  
  
      default:
        return state;
    }
  };
  
  

  export const getAdminSSIDReducer = (state = {}, action) => {
    switch (action.type) {
      case AP_MODE_SSID_REQUEST:
        return { ...state, loading: true };
  
      case AP_MODE_SSID_SUCCESS:
        return { loading: false, success: true, getAdminSSIDInfo: action.payload };
  
      case AP_MODE_SSID_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };


  
export const adminReducer = (state = {}, action) => {
  switch (action.type) {
    case AP_MODE_REQUEST:
      return { ...state, loading: true };

    case AP_MODE_SUCCESS:
      return { loading: false, success: true, adminInfo: action.payload };

    case AP_MODE_FAIL:
      return { loading: false, error: action.payload };

      case CLEAR_ERRORS_APMODE :
        return {
          ...state,
          error: null,
        };

        case CLEAR_SUCCESS_APMODE :
          return {
            ...state,
            success: false,
          };

    default:
      return state;
  }
};