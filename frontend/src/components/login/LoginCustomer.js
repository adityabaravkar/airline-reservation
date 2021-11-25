import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "../../data/environment";
import { Authentication } from "./../../services";
import { LOGIN, HOME } from "../../data";
import Navbar from "../navbar/Navbar.js";
import "./LoginCustomer.css";
import { CUSTOMER_SIGNUP } from "../../data/";

export default class LoginCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
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

  componentDidMount() {
    document.title = "American Airlines :: Login";
  }

  handleSubmit(e) {
    e.preventDefault();
    const requestBody = {
      email: this.state.email,
      password: this.state.password,
      type: "CUSTOMER",
    };
    axios.post(API_ENDPOINT + LOGIN, requestBody).then((response) => {
      if (!response.data.errors) {
        Authentication.setUserDetails(response.data.user);
        this.setState({ message: "" });
        Authentication.setAuthData(
          response.data.user.id,
          response.data.token,
          "CUSTOMER"
        );
        this.props.history.push(HOME);
      } else {
        this.setState({ message: response.data.message });
      }
    });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div class="login-page-wrapper">
          <div class="container login-body h-100">
            <div class="row">
              <div class="login-body-title">
                <h1 class="login-body-title-head">Log in</h1>
                <p class="login-body-title-body">
                  Need an account? <Link to={CUSTOMER_SIGNUP}>Sign Up</Link>
                </p>
              </div>
            </div>
            <div class="row align-items-center h-100">
              <div class="login-wraper col-4 mx-auto">
                <div class="login-form">
                  <div class="login-form-heading">
                    <p class="login-form-heading-title">Account login</p>
                  </div>
                  <div class="login-form-footer">
                    <form onSubmit={this.handleSubmit}>
                      <div class="input-group login-input-group">
                        <input
                          class="login-input-text-box form-control"
                          type="text"
                          placeholder="Email address"
                          name="email"
                          value={this.state.email || ""}
                          onChange={this.handleEmailChange}
                        />
                      </div>

                      <div class="input-group login-input-group">
                        <input
                          class="login-input-text-box form-control"
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={this.state.password || ""}
                          onChange={this.handlePasswordChange}
                        />
                      </div>

                      <div className="input-group login-input-group">
                        {this.state.message}
                      </div>
                      <div class="input-group login-input-group">
                        <button
                          type="submit"
                          class="btn btn-primary btn-lg btn-block login-button"
                        >
                          Login
                        </button>
                      </div>
                    </form>
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
