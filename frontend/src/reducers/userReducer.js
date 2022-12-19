
/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  userReducer.js

Brief:  It contains reducers related to user page. 

Project: Pixel Sensor

Release version: version 1.0.0

Release Date: Dec 14, 2022

Auther: Mohak Tripathi

Whats New: Everything.
 ..........................*/


import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  USER_LOGOUT,
  USER_LOGOUT_FAIL,
  CLEAR_ERRORS,
  
} from "../constants/userConstants";


export const userLoginReducer = (state = {}, action) => {

  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
      return { loading: true, success: false };

    case USER_LOGIN_SUCCESS:
      case LOAD_USER_SUCCESS:
      return { 
        ...state,
        loading: false, 
        success: true,
         userInfo: action.payload };


    case USER_LOGIN_FAIL:

      return {
        ...state,  
        loading: false, 
        userInfo: null, 
        error: action.payload };

      case LOAD_USER_FAIL :
        console.log(action.payload, "MRP")
        return {
            loading: false,
            success: false,
            // userInfo: null,
            error: action.payload
        }


    case USER_LOGOUT:
      return {
        loading: false,
        success: false,
        userInfo: null
      };

      case USER_LOGOUT_FAIL:
        return {
          ...state,
          error: action.payload
    
        };

        case CLEAR_ERRORS :
          return {
            ...state,
            error: null,
          };
    

    default:
      return state;
  }
};
