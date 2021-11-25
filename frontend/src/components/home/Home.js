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
      <li className="nav-item dropdown nav-non-btn">
        <button
          className="button-link nav-link custom-nav-link dropdown-toggle"
          id="navbarDropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Login
        </button>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to={LOGIN_CUSTOMER}>
            Customer Login
          </Link>
          <Link className="dropdown-item" to={LOGIN_EMPLOYEE}>
            Employee Login
          </Link>
        </div>
      </li>
    );

    const user_code = (
      <Link to={CUSTOMER_PROFILE}>
        <li className="nav-item nav-non-btn">
          <button className="button-link nav-link custom-nav-link">
            {userName}
          </button>
        </li>
      </Link>
    );

    return (
      <div>
        <header>
          <div className="banner box-shadow">
            <nav className="navbar navbar-expand-lg navbar-light">
              <Link className="navbar-brand" to="/">
                <img
                  className="logo-image"
                  alt="Airlines"
                  src="/logo.png"
                ></img>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item active nav-non-btn">
                    <span className="flag-icon flag-icon-us flag-icon-squared"></span>
                  </li>
                  {userName === "" ||
                  userName === undefined ||
                  userName === null
                    ? login_code
                    : user_code}
                  <li className="nav-item dropdown nav-non-btn">
                    <button className="button-link nav-link custom-nav-link disabled dropdown-toggle">
                      Help
                    </button>
                  </li>
                </ul>
              </div>

              <Link className="navbar-brand float-right" to={LOGOUT}>
                <img
                  className="logout-image"
                  alt="Logout"
                  src="/logout.png"
                ></img>
              </Link>
            </nav>

            <div className="container-fluid">
              <div className="Poster">
                <div className="PosterCover">
                  <div className="PosterData">
                    <h1 className="Title">
                      <span className="Title">Search Flights</span>
                    </h1>

                    <div className="row searchEngine">
                      <form className="searchEngineForm form-inline">
                        <div className="search-engine-input col-lg-4">
                          <div className="input-group ">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text border-right-0"
                                id="basic-addon1"
                              >
                                <i className="icon ion-ios-map"></i>
                              </span>
                            </div>
                            <input
                              className="search-engine-input-text-box form-control border-left-0"
                              placeholder="From where?"
                              type="text"
                              name="origin"
                              value={this.state.origin || ""}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="search-engine-input col-lg-4">
                          <div className="input-group ">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text border-right-0"
                                id="basic-addon1"
                              >
                                <i className="icon ion-ios-map"></i>
                              </span>
                            </div>
                            <input
                              className="search-engine-input-text-box form-control border-left-0"
                              placeholder="Where to?"
                              type="text"
                              name="destination"
                              value={this.state.destination || ""}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="search-engine-input col-lg-3">
                          <div className="input-group ">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text border-right-0"
                                id="basic-addon3"
                              >
                                <i className="icon ion-ios-calendar"></i>
                              </span>
                            </div>
                            <input
                              className="search-engine-input-text-box form-control border-left-0"
                              name="date"
                              type="text"
                              title="MM/dd/yyyy"
                              placeholder="When?"
                              value={this.state.date || ""}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="search-engine-input col-lg-1 ">
                          <button
                            type="submit"
                            className="btn btn-primary search-engine-button"
                            onClick={this.handleSubmit}
                          >
                            Search
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="Feature">
                    <ul className="Feature">
                      <li className="Feature">
                        <strong className="Feature">
                          Your whole vacation starts here
                        </strong>
                        <span className="Feature">
                          Choose a flight from the world's best selection
                        </span>
                      </li>
                      <li className="Feature">
                        <strong className="Feature">
                          Book and fly with confidence
                        </strong>
                        <span className="Feature">
                          Secure payments, peace of mind
                        </span>
                      </li>
                      <li className="Feature">
                        <strong className="Feature">
                          Your journey your way
                        </strong>
                        <span className="Feature">
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
