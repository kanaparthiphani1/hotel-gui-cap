import React, { Component } from "react";
import { Col, Container, Row } from 'reactstrap';

import UserService from "../services/user.service";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminMenu from "./Sidenav/AdminMenu";

import AddRoom from "./Room/AddRoom";
import AddEmployee from "./Employee/AddEmployee";
import ViewEmployee from "./Employee/ViewEmployee";
import ViewRooms from "./Room/ViewRooms";
import UpdateRoom from "./Room/UpdateRoom";
import './admin-board.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import Axios from "axios";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      bookings: [],
      data: [],
      rooms: [],
      roomChartData: []
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      // error => {
      //   this.setState({
      //     content:
      //       (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //       error.message ||
      //       error.toString()
      //   });
      // }
    );

    this.getAllBookingsRecep();
    this.getAllRoomsData()

  }

  groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  createData = () => {
    console.log("DATAA", this.state.bookings);
    console.log("Group by ", this.groupBy(this.state.bookings, 'bookingDate'));

    const tempdata = this.groupBy(this.state.bookings, 'bookingDate')
    const realData = []
    for (const [key, value] of Object.entries(tempdata)) {
      realData.push({ 'date': key, 'bookings': value.length })
    }
    console.log("Real data : ", realData);
    this.setState({ ...this.state, data: realData })
  }

  createRoomData = () => {
    console.log("RoomData : ", this.state.rooms);
    const tempdata = this.groupBy(this.state.rooms, 'availability');
    console.log(tempdata);
    const realData = []
    for (const [key, value] of Object.entries(tempdata)) {
      realData.push({ 'date': key === 'true' ? 'Available' : 'Filled', 'bookings': value.length })
    }
    console.log("Real data : ", realData);
    this.setState({ ...this.state, roomChartData: realData })
  }

  getAllBookingsRecep = () => {
    Axios.get(`http://localhost:8004/api/v2/booking`)
      .then(response => response.data)
      .then(data => {
        this.setState({ bookings: data }, this.createData)
      });
  }

  getAllRoomsData = () => {
    Axios.get(`http://localhost:8003/api/v3/room`)
      .then(response => response.data)
      .then(data => {
        this.setState({ rooms: data }, this.createRoomData)
      });
  }

  DataFormatter = (number) => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  render() {
    return (
      <>
        <div className="cont-outer">
          <h1> Bookings Stats  </h1>
          <ResponsiveContainer className="cont" width="80%" height={500} >
            <BarChart
              data={this.state.data}
              margin={{
                top: 5,
              }}
            >
              <XAxis
                dataKey="date"
                tick={{
                  stroke: "gray",
                  strokeWidth: 1,
                }}
              />
              <YAxis
                tickFormatter={this.DataFormatter}
                tick={{
                  stroke: "gray",
                  strokeWidth: 0,
                }}
              />
              <Tooltip />
              <Legend
                wrapperStyle={{
                  padding: 10,
                }}
              />
              <Bar dataKey="bookings" name="Bookings" fill="#fd7f0e" barSize="10%" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="pieChart-cont">
          <h1>Rooms Stats</h1>
          <ResponsiveContainer className="cont" width="35%" height={300}>
            <PieChart>
              <Pie
                cx="70%"
                cy="40%"
                data={this.state.roomChartData}
                startAngle={0}
                endAngle={360}
                innerRadius="0%"
                outerRadius="70%"
                dataKey="bookings"
              >
                <Cell name="Filled" fill="#fecba6" />
                <Cell name="Available" fill="#b3d23f" />

              </Pie>
              <Tooltip />
              <Legend
                iconType="circle"
                layout="vertical"
                verticalAlign="middle"
                align="right"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{
          // background:`url('https://www.pngkey.com/png/detail/137-1376908_background-body-form-background-image-png.png') no-repeat`,
          // backgroundSize:"cover",
          minHeight: "100vh",
          padding:'20px',
          color:'rgb(241, 161, 1)x',
          backgroundColor: "black",
          fontFamily: `'Source Code Pro', monospace`
        }}>




          <Router>
            <ToastContainer />
            <header>
              <h1 className="text-center" style={{color:"rgb(241, 161, 1)"}}>Admin Desk</h1>
            </header>
            <hr />
            <Row>
              <Col md={3}>
                <AdminMenu className="card-ad"/>
              </Col>
              <Col md={9}>
                <Route path="/add-room" component={AddRoom} exact />
                <Route path="/view-rooms" component={ViewRooms} exact />
                <Route path="/updateRoom/:roomNum" component={AddRoom} exact />
                <Route path="/add-employee" component={AddEmployee} exact />
                <Route path="/updateStaff/:code" component={AddEmployee} exact />
                <Route path="/view-employees" component={ViewEmployee} exact />
                <hr />
              </Col>
            </Row>
          </Router>
        </div>
      </>
    );
  }
}
