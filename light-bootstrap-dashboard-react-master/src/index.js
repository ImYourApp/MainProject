/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/css/custum.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './assets/css/yourApp.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
//리덕스 가져오기
import { createStore } from 'redux';
// createStore : state값을 저장시키는 역활
import { Provider } from 'react-redux';
import AdminLayout from "layouts/Admin.js";
import Notifications from "views/alert";
import LoginRoute from "views/Login";
import JoinRoute from "views/Join";
const root = ReactDOM.createRoot(document.getElementById("root"));
function reducer(currentState, action) {
  if (currentState === undefined) {
    return {
      alertCount: 0,
      addReport: '',
      chart1_power:''

    };
  }
  if (action.type == 'alertCount') {
    currentState.alertCount++;
  }

  if (action.type == 'chart1') {
    const list = '';
    console.log('chart1 리덕스'+action.chart1_power);

    currentState.chart1_power= list;
    console.log('chart1 리덕스'+list);
    // currentState.chart1_time= action.chart1_time
  }

  if (action.type == 'addReport') {
    // if (currentState.addReport.length < 5) {
      console.log(action.addText);
      currentState.addReport= currentState.addReport +','+action.addText;
      console.log(currentState.addReport);
    // }

  }
  return { ...currentState };
}

const store = createStore(reducer);

root.render(
  <Provider store={store}>
    <Notifications />
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        {/* <Redirect from="/" to="/admin/dashboard" /> */}
        <Route path="/join" render={(props) => <JoinRoute />} />
        <Route path="/" render={(props) => <LoginRoute />} />
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  </Provider>
);
