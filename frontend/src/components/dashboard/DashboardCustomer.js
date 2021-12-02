import React, { Component } from "react";
import "./DashboardCustomer.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Authentication } from "./../../services";
import { API_ENDPOINT, HOME } from "../../data";
import GlobalNavbar from "../common/GlobalNavbar.js";
import Card from "../search/Card";

export default class DashboardCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingList: [],
      pager: {},
    };

    this.instance = axios.create({
      baseURL: API_ENDPOINT,
      timeout: 1000,
      headers: { Authorization: Authentication.bearerToken },
    });
  }
  componentDidMount() {
    this.instance
      .post("/booking/fetch", { customerId: Authentication.userId })
      .then((response) => {
        this.setState({
          bookingList: response.data.payLoad,
          pager: response.data.pager,
        });
      });
  }
  handlePageChange(page) {
    this.instance
      .post("/booking/fetch", { customerId: Authentication.userId, page })
      .then((response) => {
        this.setState({
          propertyList: response.data.payLoad,
          pager: response.data.pager,
        });
      });
  }

  render() {
    var details;
    try {
      details = this.state.bookingList.map((booking) => {
        return <Card flight={booking}></Card>;
      });
    } catch (error) {
      details = "No bookings to show.";
    }
    const pagination = () => {
      if (!this.state) return;
      if (!this.state.pager) return;
      if (!this.state.pager.page) return;

      const page = this.state.pager.page;
      const pages = this.state.pager.pages;
      return (
        <div>
          <nav aria-label="...">
            <ul className="pagination">
              {page <= 1 || pages === 1 ? (
                <li className="page-item disabled">
                  <span className="page-link">Previous</span>
                </li>
              ) : (
                <li className="page-item">
                  <a
                    href="#ignore"
                    className="page-link"
                    onClick={() => this.handlePageChange(page - 1)}
                  >
                    Previous
                  </a>
                </li>
              )}

              {page === pages || pages === 1 ? (
                <li className="page-item disabled">
                  <span className="page-link">Next</span>
                </li>
              ) : (
                <li className="page-item">
                  <a
                    href="#ignore"
                    className="page-link"
                    onClick={() => this.handlePageChange(page + 1)}
                  >
                    Next
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      );
    };

    return (
      <div class="traveler-dashboard">
        <div className="traveler-dashboard-nav-bar">
          <GlobalNavbar></GlobalNavbar>
        </div>
        <div className="container">
          <div className="traveler-dashboard-wrapper">
            <div class="row">
              <div class="mx-auto">
                <div class="list-property">
                  <Link to={HOME}>
                    <button class="btn list-property-button">
                      Search New Flight
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-2"></div>
              <div class="col-8">
                <div class="dashboard-listing-text">
                  <h4 className="p-1">Booking History</h4>
                  <hr></hr>
                </div>
                <div class="dashboard-listing">{details}</div>
              </div>
            </div>
            <div class="row">
              <div class="col-2"></div>
              <div class="col-8">
                <div className="search-pagination">{pagination()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
