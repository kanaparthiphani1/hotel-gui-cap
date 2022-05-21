import React, { Component } from "react";
import { Row, Col, Container } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import UserService from "../services/user.service";
import Usermenu from "./Sidenav/UserMenu";
import AddGuest from "./Guest/AddGuest";
import ViewGuest from "./Guest/ViewGuest";
import AddBooking from "./Booking/AddBooking";
import ViewBooking from "./Booking/ViewBooking";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {

    return (

      <div style={{
        backgroundColor: "#CAC6D2",
        backgroundSize: "cover",
        minHeight: "100vh",

      }}>
        <Router>
          <div className="" style={{paddingTop:"20px"}}>
          <ToastContainer />
          </div>
 
          <Container style={{paddingBottom:"50px"}}>
            <Row>
              <Col md={3}>
                <Usermenu />
              </Col>
              <Col md={9}>
                <Route path="/add-booking" component={AddBooking} exact />
                <Route path="/updateBooking/:id" component={AddBooking} exact />
                <Route path="/view-bookings" component={ViewBooking} exact />
              </Col>
            </Row>
          </Container>
        </Router>
      </div>
    );
  }
}
