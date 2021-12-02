import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Authentication } from "../../services/authentication.js";
import "./GlobalNavbar.css";
import {
  EMPLOYEE_PROFILE,
  CUSTOMER_PROFILE,
  LOGOUT,
} from "../../data/route.js";

export default class GlobalNavbar extends Component {
  render() {
    const address =
      Authentication.accountType === "employee"
        ? EMPLOYEE_PROFILE
        : CUSTOMER_PROFILE;
    return (
      <div>
        <header className="global-navbar-header">
          <nav className="global-navbar navbar">
            <div className="container">
              <div className="row">
                <div className="col-lg-2">
                  <Link className="global-navbar-element" to="/">
                    <img
                      alt="American Airlines"
                      className="global-navbar-logo"
                      src="/logo.png"
                    ></img>
                  </Link>
                </div>
                <div className="col-lg-7"></div>
                <div className="col-lg-2">
                  <Link to={address}>
                    <span className="global-navbar-element navbar-brand global-navbar-right-icon">
                      <svg
                        className="user-profile-picture"
                        width="81px"
                        height="81px"
                        viewBox="0 0 81 81"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          id="MVP"
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g transform="translate(-4.000000, -4.000000)">
                            <g transform="translate(4.000000, 4.000000)">
                              <g>
                                <mask id="mask-2" fill="white">
                                  <circle cx="40.5" cy="40.5" r="40.5"></circle>
                                </mask>
                                <circle
                                  cx="40.5"
                                  cy="40.5"
                                  r="40.5"
                                  fill="#353E44"
                                ></circle>
                                <path
                                  d="M48.776466,28.3505709 C48.9673306,24.1982998 45.331637,20.9508492 41.0825823,20.9508492 C36.8326011,20.9508492 33.145022,24.2262096 33.3886987,28.3505709 C33.4368781,29.1797646 34.242957,33.2834185 34.242957,33.2834185 C34.9082037,36.846881 37.3051301,39.861149 41.0825823,39.861149 C44.8591081,39.861149 47.2087816,36.8927973 47.9212812,33.2834185 C47.9212812,33.2834185 48.7384783,29.180665 48.776466,28.3505709"
                                  fill="#FFFFFF"
                                  opacity="0.824898098"
                                  mask="url(#mask-2)"
                                ></path>
                                <path
                                  d="M57.5226562,54.4043077 C57.5226562,54.4043077 50.2762854,56.7685453 40.7302734,56.7685453 C31.1842615,56.7685453 23.9378906,54.4043077 23.9378906,54.4043077 L24.7439695,47.94722 C25.082152,45.8368723 26.8545989,44.5125031 28.7938208,44.0749481 L40.7302734,41.7971411 L52.6602404,44.0614433 C54.6328173,44.5422137 56.3774684,45.8071618 56.7156509,47.9364162 L57.5226562,54.4043077 Z"
                                  fill="#FFFFFF"
                                  opacity="0.824898098"
                                  mask="url(#mask-2)"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <span className="user-profile-text">My Account</span>
                    </span>
                  </Link>
                </div>
                <div className="col-lg-1">
                  <Link to={LOGOUT}>
                    <i
                      className="global-navbar-element navbar-brand global-navbar-right-icon"
                      title="Logout"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        className="__web-inspector-hide-shortcut__"
                      >
                        <g fill="currentColor">
                          <rect x="1" y="1" width="4" height="4"></rect>
                          <rect x="9" y="1" width="4" height="4"></rect>
                          <rect x="17" y="1" width="4" height="4"></rect>
                          <rect x="1" y="9" width="4" height="4"></rect>
                          <rect x="9" y="9" width="4" height="4"></rect>
                          <rect x="17" y="9" width="4" height="4"></rect>
                          <rect x="1" y="17" width="4" height="4"></rect>
                          <rect x="9" y="17" width="4" height="4"></rect>
                          <rect x="17" y="17" width="4" height="4"></rect>
                        </g>
                      </svg>
                    </i>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}
