import React, { Component } from "react";
import { Authentication } from "../../services";
import { HOME } from "../../data";
export default class Logout extends Component {
  constructor(props) {
    super(props);
    Authentication.logout();
    this.props.history.push(HOME);
  }
  render() {
    return <div></div>;
  }
}
