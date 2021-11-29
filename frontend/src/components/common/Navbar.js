import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { LOGOUT } from "../../data";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <header class="generic-navbar-header">
          <nav class="generic-navbar navbar navbar-expand-lg navbar-light">
            <Link class="generic-navbar-element" to="/">
              <img
                alt="American Airlines"
                class="logo-image"
                src="/logo.png"
              ></img>
            </Link>
            <Link
              class="generic-navbar-element navbar-brand ml-auto"
              to={LOGOUT}
            >
              <img alt="Logout" class="logout-image" src="/logout.png"></img>
            </Link>
          </nav>
        </header>
      </div>
    );
  }
}
