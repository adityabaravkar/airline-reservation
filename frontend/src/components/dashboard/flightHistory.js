import React, { Component } from "react";
import "../search/Card.css";
import Button from '@mui/material/Button';
import axios from "axios";
import { Authentication } from "./../../services";
import { API_ENDPOINT } from "../../data";
export default class FlightHistory extends Component {

    constructor(props) {
        super(props);
    
        this.instance = axios.create({
          baseURL: API_ENDPOINT,
          timeout: 1000,
          headers: { Authorization: Authentication.bearerToken },
        });
      }
     cancelBooking = (bookingId) => {
         console.log(bookingId);
        this.instance
      .post("/booking/cancelBooking", { bookingId: bookingId })
      .then((response) => {
        if(response.status === 200){
            alert("Cancelled");
        }
      })
      .catch(error =>{
        console.log(error);
    });
    }

  render() {
    return (
      <div>
        <div class="property-card sugar-card card">
          <div class="row card-row">
            <div class="col-md-4 card-thumbnail">
              <img src="/card-image.png" alt="Flight" class="w-100 h-100" />
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
                {console.log(this.props.flight)}
                <div className="row">
                  
                    <h5 class="card-property-title">
                      Departure From: {this.props.flight.departureFrom}
                    </h5>
                  
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
                          per person
                        </span>
                      </span>
                     
                    </div>
                  </div>
                </div>
                
              </div>
              <Button variant="outlined" color="error" onClick = {() => this.cancelBooking(this.props.flight._id)}>
                Cancel booking
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}
