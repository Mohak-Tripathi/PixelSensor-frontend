
/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  Index.js

Brief:  connected "redux store" to app, configure react-alert and browser router (for routing)

Project: Pixel Sensor

Release version: version 1.0.0

Release Date: Dec 14, 2022

Auther: Mohak Tripathi

Whats New: Everything.
 ..........................*/

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider as ReduxProvider } from "react-redux";
import store from "./store.js"

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";

// React Alert
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";



const options = {
  timeout: 3000,
  position: positions.TOP_RIGHT,
  transition: transitions.SCALE,
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        {/* <CookiesProvider> */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        {/* </CookiesProvider> */}
      </AlertProvider>
    </ReduxProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
