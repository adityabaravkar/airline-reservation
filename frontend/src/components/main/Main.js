import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../home/Home.js";
import LoginCustomer from "../login/LoginCustomer.js";
import Logout from "../logout/Logout.js";
import SignupCustomer from "../signup/SignupCustomer.js";

export default class Main extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/signup-customer" element={<SignupCustomer />} />
          <Route path="/login-customer" element={<LoginCustomer />} />
          <Route exact path="/logout" element={<Logout />} />
        </Routes>
      </div>
    );
  }
}
