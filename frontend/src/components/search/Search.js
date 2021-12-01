import React, { Component } from "react";
import { Authentication } from "../../services";
import axios from "axios";
import { API_ENDPOINT, LOGIN_CUSTOMER } from "../../data";
import GlobalNavbar from "../common/GlobalNavbar.js";
import "./Search.css";
import Card from "./Card";

export default class Search extends Component {
  constructor(props) {
    super(props);
    const searchData = props.location.state;
    this.state = {
      userId: Authentication.userId,
      departureFrom: searchData.departureFrom || "",
      arrivalAt: searchData.arrivalAt || "",
      departureDate: searchData.departureDate || "",
      flightList: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.instance = axios.create({
      baseURL: API_ENDPOINT,
      timeout: 1000,
      headers: { Authorization: Authentication.bearerToken },
    });
    this.handleSubmit();
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
    const requestBody = {
      userId: this.state.userId,
      departureFrom: this.state.departureFrom,
      arrivalAt: this.state.arrivalAt,
      departureDate: this.state.departureDate,
    };
    this.instance
      .post("/flight/fetch", requestBody)
      .then((response) => {
        if (response.data.errors) {
          console.log("Search was not completed");
        } else {
          this.setState({ flightList: response.data.payLoad });
        }
      })
      .catch((error) => {
        console.error("[SEARCH] Error occured");
        Authentication.logout();
        this.props.history.push(LOGIN_CUSTOMER);
      });
  }
  componentDidMount() {
    document.title = "American Airlines :: Flight search";
  }

  render() {
    let details = this.state.flightList.map((flight) => {
      /* flight["departureDate"] = this.state.departureDate; */
      return <Card flight={flight}></Card>;
    });

    return (
      <div>
        <GlobalNavbar></GlobalNavbar>
        <div className="container search">
          <div className="search-wrapper">
            <div className="row search-box justify-content-start">
              <div className="col-lg-3 search-box-col">
                <div class="search-box-fields">
                  <div className="input-group search-box-input-group">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text search-box-input-group-text-icon border-right-0"
                        id="basic-addon3"
                      >
                        <i class="icon ion-ios-map"></i>
                      </span>
                    </div>
                    <input
                      class="search-box-input-text-box form-control border-left-0"
                      name="departureFrom"
                      type="text"
                      placeholder="Departure From"
                      value={this.state.departureFrom || ""}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-2 search-box-col">
                <div class="search-box-fields">
                  <div className="input-group search-box-input-group">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text search-box-input-group-text-icon border-right-0"
                        id="basic-addon3"
                      >
                        <i class="icon ion-ios-calendar"></i>
                      </span>
                    </div>
                    <input
                      class="search-box-input-text-box form-control border-left-0"
                      name="arrivalAt"
                      type="text"
                      placeholder="Arrival At"
                      value={this.state.arrivalAt || ""}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-2 search-box-col">
                <div class="search-box-fields">
                  <div className="input-group search-box-input-group">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text search-box-input-group-text-icon border-right-0"
                        id="basic-addon3"
                      >
                        <i class="icon ion-ios-calendar"></i>
                      </span>
                    </div>
                    <input
                      class="search-box-input-text-box form-control border-left-0"
                      name="departureDate"
                      type="text"
                      placeholder="Departure Date"
                      value={this.state.departureDate || ""}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-2 search-box-col"></div>
              <div className="col-lg-1 search-box-col">
                <div class="search-box-fields">
                  <div className="input-group search-box-input-group">
                    <button
                      type="submit"
                      class="btn btn-primary search-box-button"
                      onClick={this.handleSubmit}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row add-property-rows">
              <div className="col-2"></div>
              <div className="col-8">{details}</div>
              <div className="col-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
