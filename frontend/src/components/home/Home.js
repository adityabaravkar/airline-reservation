import React, { Component } from "react";
import { Authentication } from "../../services";
import axios from "axios";
import {
  API_ENDPOINT,
  LOGIN_CUSTOMER,
  CUSTOMER_PROFILE,
  LOGOUT,
  LOGIN_EMPLOYEE,
  CUSTOMER_FLIGHT_SEARCH,
} from "../../data";
import { Link } from "react-router-dom";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: Authentication.userId,
      origin: "",
      destination: "",
      date: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.instance = axios.create({
      baseURL: API_ENDPOINT,
      timeout: 1000,
      headers: { token: Authentication.token },
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    this.props.history.push(CUSTOMER_FLIGHT_SEARCH, this.state);
  }

  componentDidMount() {
    document.title = "American Airlines";
  }

  render() {
    const authData = JSON.parse(Authentication.getUserDetails);

    var userName = null;
    if (authData) {
      userName = authData.fname + " " + authData.lname;
    }

    const login_code = (
      <li class="nav-item dropdown nav-non-btn">
        <button
          class="button-link nav-link custom-nav-link dropdown-toggle"
          id="navbarDropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Login
        </button>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link class="dropdown-item" to={LOGIN_CUSTOMER}>
            Customer Login
          </Link>
          <Link class="dropdown-item" to={LOGIN_EMPLOYEE}>
            Employee Login
          </Link>
        </div>
      </li>
    );

    const user_code = (
      <Link to={CUSTOMER_PROFILE}>
        <li class="nav-item nav-non-btn">
          <button class="button-link nav-link custom-nav-link">
            {userName}
          </button>
        </li>
      </Link>
    );

    return (
      <div>
        <header>
          <div class="banner box-shadow">
            <nav class="navbar navbar-expand-lg navbar-light">
              <Link class="navbar-brand" to="/">
                <img class="logo-image" alt="Airlines" src="/logo.png"></img>
              </Link>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="nav navbar-nav ml-auto">
                  <li class="nav-item active nav-non-btn">
                    <span class="flag-icon flag-icon-us flag-icon-squared"></span>
                  </li>
                  {userName === "" ||
                  userName === undefined ||
                  userName === null
                    ? login_code
                    : user_code}
                  <li class="nav-item dropdown nav-non-btn">
                    <button class="button-link nav-link custom-nav-link disabled dropdown-toggle">
                      Help
                    </button>
                  </li>
                </ul>
              </div>

              <Link class="navbar-brand float-right" to={LOGOUT}>
                <img class="logout-image" alt="Logout" src="/logout.png"></img>
              </Link>
            </nav>

            <div class="container-fluid">
              <div class="Poster">
                <div class="PosterCover">
                  <div class="PosterData">
                    <h1 class="Title">
                      <span class="Title">Search Flights</span>
                    </h1>

                    <div class="row searchEngine">
                      <form class="searchEngineForm form-inline">
                        <div class="search-engine-input col-lg-4">
                          <div class="input-group ">
                            <div class="input-group-prepend">
                              <span
                                class="input-group-text border-right-0"
                                id="basic-addon1"
                              >
                                <i class="icon ion-ios-map"></i>
                              </span>
                            </div>
                            <input
                              class="search-engine-input-text-box form-control border-left-0"
                              placeholder="Where to?"
                              type="text"
                              name="destination"
                              value={this.state.destination || ""}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div class="search-engine-input col-lg-4">
                          <div class="input-group ">
                            <div class="input-group-prepend">
                              <span
                                class="input-group-text border-right-0"
                                id="basic-addon1"
                              >
                                <i class="icon ion-ios-map"></i>
                              </span>
                            </div>
                            <input
                              class="search-engine-input-text-box form-control border-left-0"
                              placeholder="From where?"
                              type="text"
                              name="origin"
                              value={this.state.origin || ""}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div class="search-engine-input col-lg-3">
                          <div class="input-group ">
                            <div class="input-group-prepend">
                              <span
                                class="input-group-text border-right-0"
                                id="basic-addon3"
                              >
                                <i class="icon ion-ios-calendar"></i>
                              </span>
                            </div>
                            <input
                              class="search-engine-input-text-box form-control border-left-0"
                              name="endDate"
                              type="text"
                              placeholder="Depart"
                              value={this.state.date || ""}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div class="search-engine-input col-lg-1 ">
                          <button
                            type="submit"
                            class="btn btn-primary search-engine-button"
                            onClick={this.handleSubmit}
                          >
                            Search
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="Feature">
                    <ul class="Feature">
                      <li class="Feature">
                        <strong class="Feature">
                          Your whole vacation starts here
                        </strong>
                        <span class="Feature">
                          Choose a flight from the world's best selection
                        </span>
                      </li>
                      <li class="Feature">
                        <strong class="Feature">
                          Book and fly with confidence
                        </strong>
                        <span class="Feature">
                          Secure payments, peace of mind
                        </span>
                      </li>
                      <li class="Feature">
                        <strong class="Feature">Your journey your way</strong>
                        <span class="Feature">
                          More space, more privacy, no compromises
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
