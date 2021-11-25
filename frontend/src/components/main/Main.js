import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../home/Home.js";
import LoginCustomer from "../login/LoginCustomer.js";
import Logout from "../logout/Logout.js";
import SignupCustomer from "../signup/SignupCustomer.js";

export default class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route path="/signup-customer" component={SignupCustomer} />
          <Route path="/login-customer" component={LoginCustomer} />
          <Route exact path="/logout" component={Logout}></Route>
        </Switch>
      </div>
    );
  }
}
