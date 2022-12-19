/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  dashboardAction.js

Brief:  It contain all action creator related to DashBoard page.

Project: Pixel Sensor

Release version: version 1.0.0

Release Date: Dec 14, 2022

Auther: Mohak Tripathi

Whats New: Everything.
 ..........................*/

import { 
    // CLEAR_ERRORS_DESK_OCCUPANCY_DASH, 
    // CLEAR_ERRORS_PEOPLE_COUNT_DASH, 
    // CLEAR_SUCCESS_DESK_OCCUPANCY_DASH, 
    // CLEAR_SUCCESS_PEOPLE_COUNT_DASH, 
    DESK_OCCUPANCY_DASH_FAIL, DESK_OCCUPANCY_DASH_REQUEST, DESK_OCCUPANCY_DASH_SUCCESS, PEOPLE_COUNT_DASH_FAIL, PEOPLE_COUNT_DASH_REQUEST, PEOPLE_COUNT_DASH_SUCCESS, TIME_STAMP_DASH_FAIL, TIME_STAMP_DASH_REQUEST, TIME_STAMP_DASH_SUCCESS } from "../constants/dashboardConstants";

import axios from "axios";



export const peopleCountDashAction =
    () => async (dispatch) => {
        try {
            dispatch({
                type: PEOPLE_COUNT_DASH_REQUEST 
            });


            const { data } = await axios.get(`http://192.168.10.25:8080/api/service/people_count_dash`, { withCredentials: true });

            dispatch({ type:  PEOPLE_COUNT_DASH_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: PEOPLE_COUNT_DASH_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,

            });
        }
    };


    // export const clearErrorsPeopleCountDash = () => async (dispatch) => {
    //     dispatch({
    //       type: CLEAR_ERRORS_PEOPLE_COUNT_DASH,
    //     });
    //   };
      
      
    //   export const  clearSuccessPeopleCountDash = () => async (dispatch) => {
    //     dispatch({
    //       type: CLEAR_SUCCESS_PEOPLE_COUNT_DASH,
    //     });
    //   };
      




      
export const deskOccupancyDashAction =
() => async (dispatch) => {
    try {
        dispatch({
            type: DESK_OCCUPANCY_DASH_REQUEST 
        });


        const { data } = await axios.get(`http://192.168.10.25:8080/api/service/desk_occupancy_dash`, { withCredentials: true });

        dispatch({ type:  DESK_OCCUPANCY_DASH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DESK_OCCUPANCY_DASH_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,

        });
    }
};


      
export const timeStampDashAction =
() => async (dispatch) => {
    try {
        dispatch({
            type: TIME_STAMP_DASH_REQUEST
        });


        const { data } = await axios.get(`http://192.168.10.25:8080/api/service/time_stamp_dash`, { withCredentials: true });

        dispatch({ type:  TIME_STAMP_DASH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TIME_STAMP_DASH_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,

        });
    }
};


// export const clearErrorsDeskOccupancyDash = () => async (dispatch) => {
//     dispatch({
//       type: CLEAR_ERRORS_DESK_OCCUPANCY_DASH,
//     });
//   };
  
  
//   export const  clearSuccessDeskOccupancyDash = () => async (dispatch) => {
//     dispatch({
//       type: CLEAR_SUCCESS_DESK_OCCUPANCY_DASH,
//     });
//   };
