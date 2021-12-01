import React, { Component } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../data/environment";

import Navbar from "../common/Navbar.js";
import "./SignupEmployee.css";
import { LOGIN_EMPLOYEE } from "../../data/";
import { Link } from "react-router-dom";

export default class SignupEmployee extends Component {
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

  handleSubmit(e) {
    e.preventDefault();
    const requestBody = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      role: "EMPLOYEE",
    };
    axios
      .post(API_ENDPOINT + "/auth/register", requestBody)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          this.props.history.push(LOGIN_EMPLOYEE);
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          message: "Account could not be created, try different Email Id",
        });
      });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div className="signup-page-wrapper">
          <div className="container signup-body h-100">
            <div className="row">
              <div className="signup-body-title">
                <h1 className="signup-body-title-head">Employee Sign up</h1>
                <p className="signup-body-title-body">
                  Already have an account?{" "}
                  <Link to={LOGIN_EMPLOYEE}>Log in</Link>
                </p>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="signup-wraper col-5 mx-auto">
                <div className="signup-form">
                  <div className="signup-form-heading">
                    <p>{this.state.message}</p>
                  </div>
                  <div className="signup-form-footer">
                    <form onSubmit={this.handleSubmit}>
                      <div className="row">
                        <div className="col signup-input-inline-left">
                          <div className="input-group signup-input-group ">
                            <input
                              className="signup-input-text-box form-control"
                              type="text"
                              placeholder="First Name"
                              name="first"
                              value={this.state.fname || ""}
                              onChange={this.handleFnameChange}
                            />
                          </div>
                        </div>
                        <div className="col signup-input-inline-right">
                          <div className="input-group signup-input-group">
                            <input
                              className="signup-input-text-box form-control"
                              type="text"
                              placeholder="Last Name"
                              name="last"
                              value={this.state.lname || ""}
                              onChange={this.handleLnameChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-group signup-input-group">
                          <input
                            className="signup-input-text-box form-control"
                            type="text"
                            placeholder="Email address"
                            name="email"
                            value={this.state.email || ""}
                            onChange={this.handleEmailChange}
                          />
                        </div>

                        <div className="input-group signup-input-group">
                          <input
                            className="signup-input-text-box form-control"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={this.state.password || ""}
                            onChange={this.handlePasswordChange}
                          />
                        </div>

                        <div className="input-group signup-input-group">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg btn-block signup-button"
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
