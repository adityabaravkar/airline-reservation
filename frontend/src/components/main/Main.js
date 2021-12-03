import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../home/Home.js";
import LoginCustomer from "../login/LoginCustomer.js";
import Logout from "../logout/Logout.js";
import SignupCustomer from "../signup/SignupCustomer.js";
import Profile from "../profile/Profile.js";
import { Authentication } from "../../services";
import { LOGIN_CUSTOMER, LOGIN_EMPLOYEE } from "../../data";
import NotFound from "../common/NotFound.js";
import LoginEmployee from "../login/LoginEmployee.js";
import SignupEmployee from "../signup/SignupEmployee.js";
import AddFlight from "../flight/AddFlight.js";
import Search from "../search/Search.js";
import FlightDetails from "../flight/FlightDetails.js";
import DashboardCustomer from "../dashboard/DashboardCustomer.js";
import DashboardEmployee from "../dashboard/DashboardEmployee.js";

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

          <Route path="/login-employee" component={LoginEmployee} />
          <Route path="/signup-employee" component={SignupEmployee} />

          <CustomerPrivateRoute path="/customer/profile" component={Profile} />
          <CustomerPrivateRoute path="/customer/search" component={Search} />
          <CustomerPrivateRoute path="/flight" component={FlightDetails} />
          <CustomerPrivateRoute
            path="/customer/dashboard"
            component={DashboardCustomer}
          />

          <EmployeePrivateRoute
            path="/employee/flight/add"
            component={AddFlight}
          />
          <EmployeePrivateRoute
            path="/employee/dashboard"
            component={DashboardEmployee}
          />
          <EmployeePrivateRoute path="/employee/profile" component={Profile} />

          <Route component={NotFound} />
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

const EmployeePrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Authentication.isUserLoggedIntoEmployeeMode() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: LOGIN_EMPLOYEE,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
