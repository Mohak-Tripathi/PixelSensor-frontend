
/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  serviceActions.js 

Brief:  It contain all action creator related to service page.

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
  SERVICE_ANALYZER_REQUEST,
  SERVICE_ANALYZER_SUCCESS,
  SERVICE_ANALYZER_FAIL,
  REBOOT_VARIANT_REQUEST,
  REBOOT_VARIANT_SUCCESS,
  REBOOT_VARIANT_FAIL,
  SERVICE_PEOPLECOUNT_SERVICE_ONBOOT_REQUEST,
  SERVICE_PEOPLECOUNT_SERVICE_ONBOOT_SUCCESS,
  SERVICE_PEOPLECOUNT_SERVICE_ONBOOT_FAIL,
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
import axios from "axios";


export const setServiceStatusAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_SERVICE_STATUS_REQUEST,
    });


    const { data } = await axios.get(
      `http://192.168.10.25:8080/api/service/status`, {withCredentials: true}
    );

    dispatch({ type: GET_SERVICE_STATUS_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: GET_SERVICE_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};




export const serviceConfigAction = (value) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SERVICE_CONFIG_REQUEST,
    });


    var data1 = {
      status: value,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `http://192.168.10.25:8080/api/service/config_service`, 
      data1,  {withCredentials: true}, 
      config
    );

    dispatch({ type: SERVICE_CONFIG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SERVICE_CONFIG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};




export const serviceOccupancyAction = (value) => async (dispatch) => {
  try {
    dispatch({
      type: SERVICE_OCCUPANCY_REQUEST,
    });


    var data1 = {
      status: value,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",

      },
    };

    const { data } = await axios.post(
      `http://192.168.10.25:8080/api/service/occupancy_service`,
      data1,  {withCredentials: true}, 
      config
    );

    dispatch({ type: SERVICE_OCCUPANCY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SERVICE_OCCUPANCY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const servicePeopleCountAction =
  (value) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SERVICE_PEOPLECOUNT_REQUEST,
      });


      var data1 = {
        status: value,
      };

      const config = {
        headers: {
          "Content-Type": "application/json"
        },
      };

      const { data } = await axios.post(
        `http://192.168.10.25:8080/api/service/people_count_service`,
        data1,  {withCredentials: true}, 
        config
      );

      dispatch({ type: SERVICE_PEOPLECOUNT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SERVICE_PEOPLECOUNT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


export const servicePeopleCountOnBootAction =
  (value) => async (dispatch) => {
    try {
      dispatch({
        type: SERVICE_PEOPLECOUNT_SERVICE_ONBOOT_REQUEST,
      });


      var data1 = {
        status: value,
      };

      const config = {
        headers: {
          "Content-Type": "application/json"
        },
      };

      const { data } = await axios.post(
        `http://192.168.10.25:8080/api/service/people_count_service_on_boot`,
        data1,  {withCredentials: true}, 
        config
      );

      dispatch({ type: SERVICE_PEOPLECOUNT_SERVICE_ONBOOT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SERVICE_PEOPLECOUNT_SERVICE_ONBOOT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


export const serviceAnalyzerAction = (value) => async (dispatch) => {
  try {
    dispatch({
      type: SERVICE_ANALYZER_REQUEST,
    });

    let data1 = {
      status: value,
    };


    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    };
  

    const { data } = await axios.post(
      `http://192.168.10.25:8080/api/service/analyzer_service`,
      data1,  {withCredentials: true}, 
      config
    ); //create backend

    dispatch({ type: SERVICE_ANALYZER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SERVICE_ANALYZER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const rebootVariant = (value) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REBOOT_VARIANT_REQUEST,
    });



    const data1 = {
      "command": "sudo reboot"
    };

    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    };

    const { data } = await axios.post(`http://192.168.10.25:8080/api/service/power_off`, data1, config);

    dispatch({ type: REBOOT_VARIANT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REBOOT_VARIANT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,

    });
  }
};


// Clear Errors
export const clearErrorsConfig = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_CONFIG,
  });
};


// Clear Success
export const clearSuccessConfig = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SUCCESS_CONFIG,
  });
};


// Clear Errors
export const clearErrorsOccupancy = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_OCCUPANCY,
  });
};


// Clear Success
export const clearSuccessOccupancy = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SUCCESS_OCCUPANCY,
  });
};


export const clearErrorsPeopleCount = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_PEOPLECOUNT,
  });
};



export const clearSuccessPeopleCount = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SUCCESS_PEOPLECOUNT,
  });
};

export const clearErrorsPeopleCountOnBoot = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_PEOPLEBOOT,
  });
};



export const clearSuccessPeopleCountOnBoot  = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SUCCESS_PEOPLEBOOT,
  });
};

// Clear Errors
export const clearErrorsAnalyzer = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_ANALYZER,
  });
};


// Clear Success
export const clearSuccessAnalyzer = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SUCCESS_ANALYZER,
  });
};




