
/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  sensorActions.js (Inference.js)

Brief:  It contain all action creator related to sensor(Inference) page.

Project: Pixel Sensor

Release version: version 1.0.0

Release Date: Dec 14, 2022

Auther: Mohak Tripathi

Whats New: Everything.
 ..........................*/

import {
  SENSOR_REQUEST,
  SENSOR_SUCCESS,
  SENSOR_FAIL,
  GET_SENSOR_REQUEST,
  GET_SENSOR_SUCCESS,
  GET_SENSOR_FAIL,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
} from "../constants/sensorConstants";

import axios from "axios";

export const sensorRegister = (sensorValue) => async (dispatch, getState) => {
  try {
 

    dispatch({
      type: SENSOR_REQUEST,
    });

   
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    };


    const data1 = {
      overlap_threshold: sensorValue.occupancy_sensitivity, //name incruguency
      confidence_threshold: sensorValue.confidence_threshold,
      resolution: {
        width: sensorValue.width,
        height: sensorValue.height,
      },
      people_count_degree: sensorValue.degree,
      model_input_resolution: sensorValue.model_input_threshold,
      iou_threshold: sensorValue.iou_threshold,
      sleep_time: sensorValue.sleep_time
    };

    axios.defaults.withCredentials = true;

    const { data } = await axios.post(
      `http://192.168.10.25:8080/api/config/sensor`, 
      data1,
      config
    );

    dispatch({ type: SENSOR_SUCCESS, payload: data });

    //localStorage.setItem("sensorInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: SENSOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,

    });
  }
};

export const sensorGetInfo = () => async (dispatch, getState) => {


  try {
    dispatch({
      type: GET_SENSOR_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Cookie: `jwt=${userInfo.jwt}`,
        
      },
    };

    const { data } = await axios.get(
      `http://192.168.10.25:8080/api/config/sensor`, {withCredentials: true},
      config
    );


    dispatch({ type: GET_SENSOR_SUCCESS, payload: data });
    localStorage.setItem("getSensorInfo", JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: GET_SENSOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};


// Clear Success
export const clearSuccess = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SUCCESS ,
  });
};





