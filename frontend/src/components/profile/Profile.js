import React, { Component } from "react";
import { Authentication } from "../../services";
import axios from "axios";
import {
  API_ENDPOINT,
  UPDATE_USER,
  FETCH_USER_DETAILS,
  LOGIN_CUSTOMER,
  LOGIN_EMPLOYEE,
} from "../../data";
import GlobalNavbar from "../navbar/GlobalNavbar.js";
import "./Profile.css";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Authentication.userId,
      fname: "",
      lname: "",
      email: "",
      phoneNumber: "",
      address: "",
      displayMessage: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.instance = axios.create({
      baseURL: API_ENDPOINT,
      timeout: 1000,
      headers: { Authorization: Authentication.bearerToken },
    });
  }

  componentDidMount() {
    this.instance
      .get(FETCH_USER_DETAILS + "/" + Authentication.userId)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const userDetails = response.data;
          this.setState({
            fname: userDetails.fname,
            lname: userDetails.lname,
            email: userDetails.email,
            phoneNumber: userDetails.phoneNumber,
            address: userDetails.address,
          });
        } else {
          console.log(response.data.errors);
        }
      })
      .catch((error) => {
        console.error("[PROFILE] Error occured, redirecting to Login page.");
        if (Authentication.type === "EMPLOYEE") {
          Authentication.logout();
          this.props.history.push(LOGIN_EMPLOYEE);
        } else {
          Authentication.logout();
          this.props.history.push(LOGIN_CUSTOMER);
        }
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
      displayMessage: "",
    });
  }

  handleSubmit() {
    const requestBody = this.state;
    this.instance
      .post(UPDATE_USER, requestBody)
      .then((response) => {
        console.log(response);
        if (response.status === 202 || response.status === 200) {
          console.log("User updated successfully");
          this.setState({
            displayMessage: "User details updated successfully.",
          });
        } else {
        }
      })
      .catch((error) => {
        console.error("[PROFILE] Error occured, redirecting to Login page.");
        if (Authentication.type === "EMPLOYEE") {
          Authentication.logout();
          this.props.history.push(LOGIN_EMPLOYEE);
        } else {
          Authentication.logout();
          this.props.history.push(LOGIN_CUSTOMER);
        }
      });
  }

  render() {
    return (
      <div>
        <GlobalNavbar></GlobalNavbar>
        <div className="container profile">
          <div className="profile-wrapper">
            <div className="row profile-header">
              <div className="col-12">
                <div className="profile-content-contianer">
                  <div className="profile-content-contianer-wrapper">
                    <div class="profile-content-contianer-header">
                      <h3>
                        <span className="profile-content-container-header-title">
                          <strong>Profile Details</strong>
                        </span>
                      </h3>
                      <hr></hr>
                    </div>
                    <div className="profile-content-contianer-body">
                      {/* First Name and Last Name */}
                      <div className="row">
                        <div className="col-6">
                          <div class="profile-fields">
                            <div className="input-group profile-content-input-group">
                              <input
                                className="profile-content-input-text-box form-control"
                                type="text"
                                placeholder="First name"
                                name="fname"
                                value={this.state.fname || ""}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div class="profile-fields">
                            <div className="input-group profile-content-input-group">
                              <input
                                className="profile-content-input-text-box form-control"
                                type="text"
                                placeholder="Last name"
                                name="lname"
                                value={this.state.lname || ""}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Email and Phone Number */}
                      <div className="row">
                        <div className="col-6">
                          <div class="profile-fields">
                            <div className="input-group profile-content-input-group">
                              <input
                                className="profile-content-input-text-box form-control"
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={this.state.email || ""}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div class="profile-fields">
                            <div className="input-group profile-content-input-group">
                              <input
                                className="profile-content-input-text-box form-control"
                                type="text"
                                placeholder="Phone Number"
                                name="phoneNumber"
                                value={this.state.phoneNumber || ""}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Address */}
                      <div className="row">
                        <div className="col-12">
                          <div class="profile-fields">
                            <div className="input-group profile-content-input-group">
                              <input
                                className="profile-content-input-text-box form-control"
                                type="text"
                                placeholder="Address"
                                name="address"
                                value={this.state.address || ""}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr></hr>
                    </div>
                    <div className="profile-content-contianer-footer">
                      <div class="row">
                        <div class="col-6">
                          <span class="profile-content-contianer-footer-text">
                            {this.state.displayMessage}
                          </span>
                        </div>
                        <div class="col-6">
                          <button
                            onClick={this.handleSubmit}
                            class="btn btn-default profile-content-contianer-footer-button"
                            label="Update"
                          >
                            <span class="profile-content-contianer-footer-button-text">
                              Update Profile
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
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
