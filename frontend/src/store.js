
/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  Store.js

Brief:  configure redux store, also contain rootreducer and initial State. 
Note=> Not used "REDUX-TOOLKIT" => Intended to use in next version. 

Project: Pixel Sensor

Release version: version 1.0.0

Release Date: Dec 14, 2022

Auther: Mohak Tripathi

Whats New: Everything.
 ..........................*/

import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import thunk from "redux-thunk";

import { userLoginReducer } from "./reducers/userReducer";
import {
  mqttRegisterReducer,
  mqttResetReducer,
  mqttSavedataReducer,
  mqttProtocolCertReducer ,
  getMqttCertReducer
} from "./reducers/mqttReducer";


import {
  setConfigReducer,
  setOccupancyReducer,
  setPeopleCountReducer,
  setAnalyzerReducer,
  setPeopleCountServiceOnBootReducer,
  rebootReducer,
  setServiceStatusReducer
} from "./reducers/serviceReducer";


import { sensorReducer, getSensorReducer } from "./reducers/sensorReducer";

import { variantReducer , 
  apModessidPassReducer,  
  getVariantReducer, 
  getAdminSSIDReducer,
   adminReducer } from "./reducers/adminReducer";

import {
  ntpNetworkReducer,
  getNTPInfoReducer,
  ethernetNetworkReducer,
  wifiNetworkReducer,
  wifiCredNetworkReducer,
  getNetworkInfoReducer
} from "./reducers/networkReducer";

import {peopleCountDashboardReducer, deskOccupancyDashboardReducer,  timeStampDashboardReducer} from "./reducers/dashboardReducer"


const rootreducer = combineReducers({
  userLogin: userLoginReducer,
  mqttRegister: mqttRegisterReducer,
  mqttReset: mqttResetReducer,
  mqttSavedata: mqttSavedataReducer,
  getMqttCert: getMqttCertReducer,
  setConfig: setConfigReducer,
  setOccupancy: setOccupancyReducer,
  setPeopleCount: setPeopleCountReducer,
  setPeopleCountOnBoot: setPeopleCountServiceOnBootReducer,
  setAnalyzer: setAnalyzerReducer,
  reboot: rebootReducer,
  sensor: sensorReducer,
  getSensor: getSensorReducer,
  variant: variantReducer,
  getVariant:  getVariantReducer,
  ntpNetwork: ntpNetworkReducer,
  getNTPInfo: getNTPInfoReducer,
  ethernetNetwork: ethernetNetworkReducer,
  wifiNetwork: wifiNetworkReducer,
  wifiCredNetwork: wifiCredNetworkReducer,
  admin: adminReducer,
  getAdmin: getAdminSSIDReducer,
  getNetworkInfo: getNetworkInfoReducer,
  setServiceStatus: setServiceStatusReducer,
  apModessidPass: apModessidPassReducer,
  mqttProtocolCert: mqttProtocolCertReducer,
  peopleCountDashboard: peopleCountDashboardReducer,
  deskOccupancyDashboard: deskOccupancyDashboardReducer,
  timeStampDashboard:  timeStampDashboardReducer
  // getSaveMqttdata: getSaveMqttdataReducer

});


const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  const getSensorInfoFromStorage = localStorage.getItem("getSensorInfo") 
  ? JSON.parse(localStorage.getItem("getSensorInfo"))
  : null;

  const getAdminSSIDInfoFromStorage = localStorage.getItem("getAdminSSIDInfo") 
  ? JSON.parse(localStorage.getItem("getAdminSSIDInfo"))
  : null;

  const variantInfoFromStorage = localStorage.getItem("variantInfo") 
  ? JSON.parse(localStorage.getItem("variantInfo"))
  : null;

  
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  getSensor: { getSensorInfo: getSensorInfoFromStorage},  // check if storing properly?
getAdmin: { getAdminSSIDInfo :getAdminSSIDInfoFromStorage},
variant: { variantInfo:  variantInfoFromStorage},

};

const middleware = [thunk];

const store = createStore(
  rootreducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
