import React, { Component } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../data/environment";

import Navbar from "../common/Navbar.js";
import "./SignupCustomer.css";
import { LOGIN_CUSTOMER } from "../../data/";
import { Link } from "react-router-dom";

export default class SignupCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      message: "",
    };
    this.handleFnameChange = this.handleFnameChange.bind(this);
    this.handleLnameChange = this.handleLnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFnameChange(event) {
    this.setState({ fname: event.target.value });
  }

  handleLnameChange(event) {
    this.setState({ lname: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  componentDidMount() {
    document.title = "American Airlines :: Signup";
  }

  handleSubmit(e) {
    e.preventDefault();
    const requestBody = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      type: "CUSTOMER",
    };
    axios
      .post(API_ENDPOINT + "/auth/register", requestBody)
      .then((response) => {
        if (response.status === 201) {
          this.setState({ message: "Registration successful!" });
        } else {
          this.setState({ message: response.data.message });
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          this.setState({ message: "Email address already in use!" });
        }
      });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div class="signup-page-wrapper">
          <div class="container signup-body h-100">
            <div class="row">
              <div class="signup-body-title">
                <h1 class="signup-body-title-head">Sign up</h1>
                <p class="signup-body-title-body">
                  Already have an account?{" "}
                  <Link to={LOGIN_CUSTOMER}>Log in</Link>
                </p>
              </div>
            </div>
            <div class="row align-items-center">
              <div class="signup-wraper col-5 mx-auto">
                <div class="signup-form">
                  <div class="signup-form-footer">
                    <form onSubmit={this.handleSubmit}>
                      <div class="row">
                        <div class="col signup-input-inline-left">
                          <div class="input-group signup-input-group ">
                            <input
                              class="signup-input-text-box form-control"
                              type="text"
                              placeholder="First Name"
                              name="first"
                              value={this.state.fname || ""}
                              onChange={this.handleFnameChange}
                            />
                          </div>
                        </div>
                        <div class="col signup-input-inline-right">
                          <div class="input-group signup-input-group">
                            <input
                              class="signup-input-text-box form-control"
                              type="text"
                              placeholder="Last Name"
                              name="last"
                              value={this.state.lname || ""}
                              onChange={this.handleLnameChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="input-group signup-input-group">
                          <input
                            class="signup-input-text-box form-control"
                            type="text"
                            placeholder="Email address"
                            name="email"
                            value={this.state.email || ""}
                            onChange={this.handleEmailChange}
                          />
                        </div>

                        <div class="input-group signup-input-group">
                          <input
                            class="signup-input-text-box form-control"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={this.state.password || ""}
                            onChange={this.handlePasswordChange}
                          />
                        </div>

                        <div class="input-group signup-input-group">
                          <button
                            type="submit"
                            class="btn btn-primary btn-lg btn-block signup-button"
                          >
                            Sign Me Up
                          </button>
                        </div>
                      </div>
                    </form>
                    {this.state.message}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
