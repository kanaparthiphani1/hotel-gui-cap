import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { toast } from "react-toastify"
import './viewbookings.css'

import axios from 'axios';
import { Link } from 'react-router-dom';


class ViewBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            role:''
        };

    };

    componentDidMount() {
        const user = localStorage.getItem("user")
        if(JSON.parse(user).roles.includes("ROLE_RECEPTIONIST")){
            this.setState({...this.state,role:'recep'},this.getAllBookingsRecep())
            
        }
        else if(JSON.parse(user).roles.includes("ROLE_ADMIN")){
            this.setState({...this.state,role:'admin'},this.getAllBookingsRecep())
        }
        else{
            this.setState({...this.state,role:'user'},this.getallbookings())
            
        }
        
    };

    getallbookings() {
        axios.get(`http://localhost:8004/api/v2/booking/customer/${localStorage.getItem("userId")}`)
            .then(response => response.data)
            .then(data => {
                this.setState({ bookings: data })
            });
    };

    getAllBookingsRecep(){
        axios.get(`http://localhost:8004/api/v2/booking`)
            .then(response => response.data)
            .then(data => {
                this.setState({ bookings: data })
            });
    }

    deleteBooking = (id) => {
        axios.delete("http://localhost:8004/api/v2/booking/" + id)
            .then(response => {
                if (response.data != null) {
                    // alert("Booking Deleted Successfully.");
                    toast.success("Booking has been Cancelled Successfully, Refund will be processed");
                    this.getallbookings();
                }
            });
    };

    checkDisablity = checkin => {

        console.log(checkin);
        return new Date() > new Date(checkin);

    }

    render() {
        const {role}=this.state
        return (
            <div className='booking-data-cont'>
                <h2 className="text-center"> Booking Data </h2>
                <hr />
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>

                                {role==='recep' && <th>Name</th>}
                                <th>CheckIn</th>
                                <th>CheckOut</th>

                                <th>No. of Guests</th>
                                <th>Room No.</th>
                                <th>Price</th>
                                <th>Payment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.bookings.length === 0 ?
                                <tr>
                                    <td colSpan="8">No Booking Has bee Made.</td>
                                </tr> :
                                this.state.bookings.map(
                                    bookings =>
                                        <tr>
{(role==='recep'||role==='admin') && <td>{bookings.userName}</td>}
                                            <td>{bookings.checkin}</td>
                                            <td>{bookings.checkout}</td>

                                            <td>{bookings.numOfGuests}</td>
                                            <td>{bookings.roomId}</td>
                                            <td>{bookings.finalPrice}</td>
                                            
                                            <td>{bookings.approvalStatus}</td>

                                            <td>
                                                <ButtonGroup>

                                                    <Button disabled={this.checkDisablity(bookings.checkin)} color="secondary" onClick={this.deleteBooking.bind(this, bookings.id)}>Cancel</Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>

                    </table>

                </div>
            </div>
        );
    }
}

export default ViewBooking;