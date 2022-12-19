
/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  dashboardReducer.js

Brief:  It contains reducers related to dashboard page. 

Project: Pixel Sensor

Release version: version 1.0.0

Release Date: Dec 14, 2022

Auther: Mohak Tripathi

Whats New: Everything.
 ..........................*/


import { 

   DESK_OCCUPANCY_DASH_FAIL, 
   DESK_OCCUPANCY_DASH_REQUEST, 
   DESK_OCCUPANCY_DASH_SUCCESS, 
   PEOPLE_COUNT_DASH_FAIL,
    PEOPLE_COUNT_DASH_REQUEST, 
    PEOPLE_COUNT_DASH_SUCCESS, 
    TIME_STAMP_DASH_FAIL, 
    TIME_STAMP_DASH_REQUEST,
    TIME_STAMP_DASH_SUCCESS} from "../constants/dashboardConstants"


export const peopleCountDashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case PEOPLE_COUNT_DASH_REQUEST:
      return { ...state, loading: true };

    case PEOPLE_COUNT_DASH_SUCCESS:
      return { loading: false, success: true, peopleCountDashInfo: action.payload };

    case PEOPLE_COUNT_DASH_FAIL:
      return { loading: false, error: action.payload };



    default:
      return state;
  }
};




export const deskOccupancyDashboardReducer = (state = { deskOccupancyDashInfo: {}}, action) => {
  switch (action.type) {
    case DESK_OCCUPANCY_DASH_REQUEST:
      return { ...state, loading: true };

    case DESK_OCCUPANCY_DASH_SUCCESS:
      return { loading: false, success: true, deskOccupancyDashInfo: action.payload };

    case DESK_OCCUPANCY_DASH_FAIL:
      return { loading: false, error: action.payload };


    default:
      return state;
  }
};


export const timeStampDashboardReducer = (state = { timeStampDashInfo: {}}, action) => {
  switch (action.type) {
    case TIME_STAMP_DASH_REQUEST:
      return { ...state, loading: true };

    case TIME_STAMP_DASH_SUCCESS:
      return { loading: false, success: true,  timeStampDashInfo: action.payload };

    case TIME_STAMP_DASH_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};