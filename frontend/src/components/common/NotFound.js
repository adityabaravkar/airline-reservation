import React, { Component } from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

class NotFound extends Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div className="page-not-found">
          <h1 className="title">404</h1>
          <div className="desc">The Page you're looking for was not found.</div>
          <Link to="/">
            <button className="go-back-btn btn btn-primary" type="button">
              Go to Home Page
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default NotFound;
