import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../home/Home.js";

export default class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </div>
    );
  }
}
