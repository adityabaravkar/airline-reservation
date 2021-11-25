import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../home/Home.js";
import LoginCustomer from "../login/LoginCustomer.js";
import Logout from "../logout/Logout.js";
import SignupCustomer from "../signup/SignupCustomer.js";
import Profile from "../profile/Profile.js";
import { Authentication } from "../../services";
import { LOGIN_CUSTOMER } from "../../data";

export default class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route path="/signup-customer" component={SignupCustomer} />
          <Route path="/login-customer" component={LoginCustomer} />
          <Route exact path="/logout" component={Logout} />

          <CustomerPrivateRoute path="/customer/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}

const CustomerPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Authentication.isUserLoggedIntoCustomerMode() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: LOGIN_CUSTOMER,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

/* const EmployeePrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Authentication.isUserLoggedIntoEmployeeMode() ? (
        <Component {...props} />
      ) : (
        <Navigate
          to={{
            pathname: LOGIN_EMPLOYEE,
            state: { from: props.location },
          }}
        />
      )
    }
  />
); */
