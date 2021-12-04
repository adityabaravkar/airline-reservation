import React, { Component } from "react";
import "../search/Card.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { Authentication } from "./../../services";
import { API_ENDPOINT } from "../../data";

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
export default class FlightHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
        open : false,
    }

    this.instance = axios.create({
      baseURL: API_ENDPOINT,
      timeout: 1000,
      headers: { Authorization: Authentication.bearerToken },
    });
  }

  handleOpen = () => {
    this.setState({
        open : !(this.state.open),
    })
  }
  cancelBooking = (bookingId) => {
    console.log(bookingId);
    this.instance
      .post("/booking/cancelBooking", {
        bookingId: bookingId,
        customerId: Authentication.userId,
        flightId: this.props.flight.flightId,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Booking successfully Cancelled");
          this.props.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
              <Button
                variant="outlined"
                color="error"
                onClick={() => this.cancelBooking(this.props.flight._id)}
              >
                Cancel booking
              </Button>

              <Button
                variant="outlined"
                
                onClick={() => this.handleOpen()}
              >
                Update booking
              </Button>
              <Modal
        open={this.state.open}
        onClose={() => this.handleOpen()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h3>Select Row and Seat number</h3>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Row
        </InputLabel>
        <NativeSelect
          defaultValue={"B"}
          inputProps={{
            name: 'row',
            id: 'uncontrolled-native',
          }}
          value={this.state.row}
                    onChange={this.confirmRow}
        >
          <option value={"A"}>A</option>
          <option value={"B"}>B</option>
          <option value={"C"}>C</option>
          <option value={"D"}>D</option>
          <option value={"E"}>E</option>
          <option value={"F"}>F</option>
        </NativeSelect>
      </FormControl>
               
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Seat No
                  </InputLabel>
                  <NativeSelect
                    defaultValue={6}
                    inputProps={{
                      name: 'seatNo',
                      id: 'uncontrolled-native',
                    }}
                    value={this.state.seat}
                    onChange={this.confirmSeat}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </NativeSelect>
                  
                </FormControl>
                <Button variant="contained" color="success" onClick = {() => this.updateSeat(this.props.flight._id)}>
                Update
              </Button>
        </Box>
      </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
