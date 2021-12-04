import React, { Component } from "react";
import axios from "axios";
import { Authentication } from "./../../services";
import { API_ENDPOINT, LOGIN_EMPLOYEE, EMPLOYEE_DASHBOARD } from "../../data";
import GlobalNavbar from "../common/GlobalNavbar.js";
import "./AddFlight.css";
export default class AddFlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: Authentication.userId,
      departureFrom: "",
      arrivalAt: "",
      departureDate: "",
      arrivalDate: "",
      price: "",
      miles: "",
      percentComplete: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.instance = axios.create({
      baseURL: API_ENDPOINT,
      timeout: 1000,
      headers: { Authorization: Authentication.bearerToken },
    });
  }



  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    var count = 0;
    for (var member in this.state) {
      if (this.state[member] !== "") count++;
    }
    var percentDone = Math.floor((4 * (count - 2)) / 5) * 25;
    this.setState({
      [name]: value,
      percentComplete: percentDone,
    });
  }

  handleSubmit() {
    const requestBody = this.state;
    this.instance
      .post("/flight/create", requestBody)
      .then((response) => {
        if (!response.data.errors) {
          console.log("Flight created successfully");
          this.props.history.push(EMPLOYEE_DASHBOARD);
        } else {
        }
      })
      .catch((error) => {
        console.error("[ADD-FLIGHT] Error occured, redirecting to Login page.");
        Authentication.logout();
        this.props.history.push(LOGIN_EMPLOYEE);
      });
  }

  render() {
    return (
      <div>
        <GlobalNavbar></GlobalNavbar>
        <div className="container add-property-body">
          <div className="add-property-wrapper">
            <div className="row progress-row">
              <div className="col-lg-12">
                <span>Progress</span>
                <div class="progress  custom-progress-bar">
                  <div
                    className={"progress-bar w-" + this.state.percentComplete}
                    role="progressbar"
                  ></div>
                </div>
              </div>
            </div>
            <div className="row add-property-rows">
              <div className="col-3">
                <div
                  class="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a class="nav-link" href="#ignore" role="tab">
                    Welcome
                  </a>
                  <a
                    class="nav-link"
                    id="v-pills-location-tab"
                    data-toggle="pill"
                    href="#v-pills-location"
                    role="tab"
                  >
                    Location
                  </a>
                  <a
                    class="nav-link"
                    id="v-pills-availability-tab"
                    data-toggle="pill"
                    href="#v-pills-availability"
                    role="tab"
                  >
                    Dates
                  </a>
                  <a
                    class="nav-link"
                    id="v-pills-pricing-tab"
                    data-toggle="pill"
                    href="#v-pills-pricing"
                    role="tab"
                  >
                    Pricing
                  </a>
                </div>
              </div>
              <div className="col-8">
                <div class="tab-content" id="v-pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="v-pills-welcome"
                    role="tabpanel"
                  >
                    <h2>
                      <strong>Welcome! Add a flight!</strong>
                    </h2>
                    <h6>Just 3 steps remaining.</h6>
                  </div>
                  {/* Location Block */}
                  <div
                    class="tab-pane fade"
                    id="v-pills-location"
                    role="tabpanel"
                  >
                    <div className="list-property-content-contianer">
                      <div className="list-property-content-contianer-wrapper">
                        <div class="list-property-content-contianer-header">
                          <h3>
                            <span className="list-property-content-container-header-title">
                              <strong>
                                Add the departure and arrival locations of your
                                flight
                              </strong>
                            </span>
                          </h3>
                          <hr></hr>
                        </div>
                        <div className="list-property-content-contianer-body">
                          <div class="address">
                            <div class="list-property-content-contianer-body-title">
                              <span>Departure From:</span>
                            </div>
                            <div>
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box form-control"
                                  type="text"
                                  placeholder="Eg:- San Jose"
                                  name="departureFrom"
                                  value={this.state.departureFrom || ""}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div class="address">
                            <div class="list-property-content-contianer-body-title">
                              <span>Arrival At:</span>
                            </div>
                            <div>
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box form-control"
                                  type="text"
                                  placeholder="Eg:- Boston"
                                  name="arrivalAt"
                                  value={this.state.arrivalAt || ""}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                            </div>
                          </div>
                          <hr></hr>
                        </div>
                        <div class="list-property-content-contianer-header">
                          <h3>
                            <span className="list-property-content-container-header-title">
                              <strong>
                                Enter distance
                              </strong>
                              <div className="input-group list-property-content-input-group">
                              <input
                                className="list-property-content-input-text-box form-control"
                                type="text"
                                placeholder="Eg:- 300"
                                name="miles"
                                value={this.state.miles || ""}
                                onChange={this.handleInputChange}
                              />
                            </div>
                            </span>
                          </h3>
                          <hr></hr>
                        </div>
                        <div className="list-property-content-contianer-footer">
                          <div class="row">
                            <div class="col-6"></div>
                            <div class="col-6">
                              <button
                                class="btn btn-default list-property-content-contianer-footer-button"
                                label="Next"
                              >
                                <span class="list-property-content-contianer-footer-button-text">
                                  Next
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Dates Block */}
                  <div
                    class="tab-pane fade"
                    id="v-pills-availability"
                    role="tabpanel"
                  >
                    <div className="list-property-content-contianer">
                      <div className="list-property-content-contianer-wrapper">
                        <div class="list-property-content-contianer-header">
                          <h3>
                            <span className="list-property-content-container-header-title">
                              <strong>
                                Add the departure and arrival dates
                              </strong>
                            </span>
                          </h3>
                          <hr></hr>
                        </div>
                        <div className="list-property-content-contianer-body">
                          <div>
                            <div class="list-property-content-contianer-body-title-description">
                              <span>
                                Select a departure date and arrival date for the
                                flight.
                              </span>
                            </div>
                            <div>
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box form-control"
                                  type="text"
                                  placeholder="Departure Date (MM/DD/YYYY)"
                                  name="departureDate"
                                  value={this.state.departureDate || ""}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box form-control"
                                  type="text"
                                  placeholder="Arrival Date (MM/DD/YYYY)"
                                  name="arrivalDate"
                                  value={this.state.arrivalDate || ""}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                            </div>
                          </div>
                          <hr></hr>
                        </div>
                        <div className="list-property-content-contianer-footer">
                          <div class="row">
                            <div class="col-6">
                              <button
                                class="btn btn-default list-property-content-contianer-footer-button"
                                label="Back"
                              >
                                <span class="list-property-content-contianer-footer-button-text">
                                  Back
                                </span>
                              </button>
                            </div>
                            <div class="col-6">
                              <button
                                class="btn btn-default list-property-content-contianer-footer-button"
                                label="Next"
                              >
                                <span class="list-property-content-contianer-footer-button-text">
                                  Next
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Pricing Block */}
                  <div
                    class="tab-pane fade"
                    id="v-pills-pricing"
                    role="tabpanel"
                  >
                    <div className="list-property-content-contianer">
                      <div className="list-property-content-contianer-wrapper">
                        <div class="list-property-content-contianer-header">
                          <h3>
                            <span className="list-property-content-container-header-title">
                              <strong>How much do you want to charge?</strong>
                            </span>
                          </h3>
                          <hr></hr>
                        </div>
                        <div className="list-property-content-contianer-body">
                          <div>
                            <div class="list-property-content-contianer-body-title-description">
                              <span>
                                We recommend starting with a low price to get a
                                few bookings.
                              </span>
                            </div>
                            <div>
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box form-control"
                                  type="text"
                                  placeholder="Price"
                                  name="price"
                                  value={this.state.price || ""}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                            </div>
                          </div>
                          <hr></hr>
                        </div>
                        <div className="list-property-content-contianer-footer">
                          <div class="row">
                            <div class="col-6">
                              <button
                                class="btn btn-default list-property-content-contianer-footer-button"
                                label="Back"
                              >
                                <span class="list-property-content-contianer-footer-button-text">
                                  Back
                                </span>
                              </button>
                            </div>
                            <div class="col-6">
                              <button
                                onClick={this.handleSubmit}
                                class="btn btn-default list-property-content-contianer-footer-button"
                                label="Next"
                              >
                                <span class="list-property-content-contianer-footer-button-text">
                                  Submit
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
        </div>
      </div>
    );
  }
}
