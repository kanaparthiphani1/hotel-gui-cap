import React, { Component } from "react";
import UserService from "../services/user.service";
import { Col, Container, Row } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import Moderatormenu from "./Sidenav/ModeratorMenu";

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import AddRoom from "./Room/AddRoom";
import AddEmployee from "./Employee/AddEmployee";
import ViewEmployee from "./Employee/ViewEmployee";
import ViewRooms from "./Room/ViewRooms";
import UpdateRoom from "./Room/UpdateRoom";


export default class BoardModerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getModeratorBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
     
    );
  }

  render() {
    return (
      <div style={{
        background:`url('https://www.pngkey.com/png/detail/137-1376908_background-body-form-background-image-png.png') no-repeat`,
        backgroundSize:"cover",
        height:"100vh",
        fontFamily: `'Source Code Pro', monospace`
      }}>
        <Router>
        <ToastContainer />
        <Container>
        <header>
          <h1 className="text-center">Manager Desk</h1>
        </header>
        <hr />
        <Row>
          <Col md={3}>
          <Moderatormenu />
          </Col>
          <Col md={9}>
            <Route path="/add-room" component={AddRoom}  exact/>
            <Route path="/view-rooms" component={ViewRooms}  exact/>
            <Route path="/updateRoom/:roomNum" component={AddRoom}  exact/>
            <Route path="/add-employee" component={AddEmployee}  exact/>
            <Route path="/updateStaff/:code" component={AddEmployee}  exact/>
            <Route path="/view-employees" component={ViewEmployee}  exact/>
            <hr />
          </Col>
        </Row>
        </Container>
        </Router>
      </div>
    );
  }
}
