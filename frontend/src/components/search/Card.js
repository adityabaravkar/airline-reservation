import React, { Component } from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
    };
  }
  render() {
    return (
      <div>
        <div class="property-card sugar-card card">
          <div class="row card-row">
            <div class="col-md-4 card-thumbnail">
              <img src={this.state.image} alt="Flight" class="w-100 h-100" />
            </div>
            <div class="col-md-8 px-3">
              <div class="card-block property-card-wrapper px-3">
                <div className="row card-hype">
                  <small>
                    <div class="card-hype-popular">Popular</div>Viewed{" "}
                    {Math.round(Math.random() * 500) + 50} times in the last 48
                    hours
                  </small>
                </div>
                <div className="row">
                  <Link
                    to={{
                      pathname: "/flight/details",
                      state: this.props.flight,
                    }}
                  >
                    <h5 class="card-property-title">
                      Departure From: {this.props.flight.departureFrom}
                    </h5>
                  </Link>
                </div>
                <div className="row">
                  <div class="card-property-detail">
                    <div class="card-property-type">
                      Arrival At: {this.props.flight.arrivalAt}
                    </div>
                    <div class="card-property-type">
                      Date:{" "}
                      {new Date(this.props.flight.departureDate).toDateString()}
                    </div>
                    <div class="card-property-type">
                      ${this.props.flight.price}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div class="card-property-footer">
                    <span class="card-property-footer-rating">
                      <strong>Wonderful!</strong>&nbsp;&nbsp;<span>4.8/5</span>
                    </span>
                    <div class="card-property-footer-price">
                      <span class="card-property-footer-price-text">
                        <strong>
                          <span class="card-property-footer-price-value">
                            $&nbsp;{this.props.flight.price}&nbsp;
                          </span>
                        </strong>
                        <span class="card-property-footer-price-unit">
                          per seat
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
