import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "../../data/environment";
import { Authentication } from "./../../services";
import { LOGIN } from "../../data";
import Navbar from "../common/Navbar.js";
import { EMPLOYEE_SIGNUP } from "../../data/";
import "./LoginEmployee.css";

export default class LoginEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value, message: "" });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value, message: "" });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const requestBody = {
      email: this.state.email,
      password: this.state.password,
      type: "EMPLOYEE",
    };
    axios.post(API_ENDPOINT + LOGIN, requestBody).then((response) => {
      Authentication.setUserDetails(response.data.data);
      if (response.data.error === 0) {
        this.setState({ message: "" });
        Authentication.setAuthData(
          response.data.userId,
          response.data.token,
          "EMPLOYEE"
        );
        this.props.history.push("/");
      } else {
        this.setState({ message: response.data.data });
      }
    });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div className="login-employee-page-wrapper">
          <div className="container login-employee-body h-100">
            <div className="row">
              <div class="col-1 mx-auto"></div>
              <div class="col-4 mx-auto">
                <div class="login-employee-decorator-image">
                  <img
                    className="employee-image"
                    alt="American Airlines"
                    src="/employee-login.jpeg"
                  ></img>
                </div>
              </div>

              <div className="login-employee-wraper col-4 mx-auto">
                <div className="login-employee-form">
                  <div className="login-employee-form-heading">
                    <p className="login-employee-form-heading-title">
                      Employee login
                    </p>
                  </div>
                  <div className="login-employee-form-footer">
                    <form onSubmit={this.handleSubmit}>
                      <div className="input-group login-employee-input-group">
                        <input
                          className="login-employee-input-text-box form-control"
                          type="text"
                          placeholder="Email address"
                          name="email"
                          value={this.state.email || ""}
                          onChange={this.handleEmailChange}
                        />
                      </div>

                      <div className="input-group login-employee-input-group">
                        <input
                          className="login-employee-input-text-box form-control"
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={this.state.password || ""}
                          onChange={this.handlePasswordChange}
                        />
                      </div>

                      <div className="input-group login-employee-input-group">
                        {this.state.message}
                      </div>

                      <div className="input-group login-employee-input-group">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg btn-block login-employee-button"
                        >
                          Login
                        </button>
                      </div>

                      <div className="signin-hr">
                        <span className="text-center"></span>
                      </div>
                      <div className="input-group login-employee-input-group">
                        <span>
                          New User?{" "}
                          <Link
                            to={EMPLOYEE_SIGNUP}
                            style={{ color: "#2a6ebb" }}
                          >
                            {" "}
                            Sign Up
                          </Link>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-1 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }
}
