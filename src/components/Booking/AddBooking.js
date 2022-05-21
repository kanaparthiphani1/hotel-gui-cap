import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Container, Card, Button } from "reactstrap"
import { Fragment } from 'react';
import axios from 'axios';
import { toast } from "react-toastify"
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';
import authService from '../../services/auth.service';

class AddBooking extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.bookingChange = this.bookingChange.bind(this);
        this.AddBooking = this.AddBooking.bind(this);
    };

    initialState = {
        approvalStatus: 'Success', checkin: '', checkout: '', feedGiven: '', finalPrice: "0", hotelid: "1092", numberOfGuests: "", roomId: "",   userId: localStorage.getItem("userId"), userName: (JSON.parse(localStorage.getItem('user')).roles.includes('ROLE_RECEPTIONIST') ||JSON.parse(localStorage.getItem('user')).roles.includes('ROLE_ADMIN'))?'':authService.getCurrentUser().username,
        bookingDate: new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) < 10 ? ('0' + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1)) + '-' + (new Date().getDate() )
    };

    componentDidMount() {
        const bookingId = +this.props.match.params.id;
        if (bookingId) {
            this.findBookingByCode(bookingId);
        };
    };

    findBookingByCode = (bookingId) => {
        axios.get("https://0114-49-204-77-246.ngrok.io/findbooking/" + bookingId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        approvalStatus: this.state.approvalStatus,
                        checkin: this.state.checkin,
                        checkout: this.state.checkout,
                        feedGiven: this.state.feedGiven,
                        finalPrice: this.state.finalPrice,
                        hotelid: this.state.hotelid,
                        numberOfGuests: this.state.numberOfGuests,
                        roomId: this.state.roomId,
                        userId: localStorage.getItem("userId"),

                        userName: authService.getCurrentUser()
                    });
                }
            }).catch((error) => {
                console.error("Error -" + error);
            });
    };

    resetBooking = () => {
        this.setState(() => this.initialState);
    };

    loadScript = src => {
        console.log("Scrip loaded");
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                console.log("trye");
                resolve(true)
            }
            script.onerror = () => {
                console.log("false");
                resolve(false);
            }
            console.log("Script ", script);

            document.body.appendChild(script)
        })
    }

    AddBooking = async (event) => {
        event.preventDefault();

        const res = await this.loadScript("https://checkout.razorpay.com/v1/checkout.js")


        const options = {
            key: 'rzp_test_09501dQg539kQ5',
            curreny: 'INR',
            amount: this.state.finalPrice * 100,
            name: 'Marriot',
            description: 'Thanks for Selecting us',
            image: './../images/logo.png',
            handler: (response) => {
                alert(response.razorpay_payment_id)
                this.createBooking()
            }
        }

        const paymenmtObj = new window.Razorpay(options)

        paymenmtObj.open()

    };

    createBooking = () => {
        const booking = {
            approvalStatus: this.state.approvalStatus,
            checkin: this.state.checkin,
            checkout: this.state.checkout,
            feedGiven: this.state.feedGiven,
            finalPrice: this.state.finalPrice,
            hotelid: this.state.hotelid,
            numOfGuests: this.state.numberOfGuests,
            roomId: this.state.roomId,
            userId: localStorage.getItem("userId"),
            userName: this.state.userName,
            bookingDate : this.state.bookingDate

        };
        axios.post("http://localhost:8004/api/v2/booking", booking)
            .then(response => {
                if (response.data != null) {
                    this.setState(this.initialState);
                    toast.info("Booking Has been Added Successfully.");
                }
            });
    }

    bookingChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    bookingList = () => {
        return this.props.history.push("/view-bookings");
    };


    handleEvent(event, picker) {
        console.log("handleEve");
        console.log(picker.startDate);
    }
    handleCallback = (start, end, label) => {
        console.log("handleCAll");
        console.log("start", start);

        console.log("end ", end);
        console.log("Start ", start._d.getFullYear() + '-' + (start._d.getMonth() + 1) + '-' + (start._d.getDate()));
        //+'-'+start._d.getMonth+1+'-'+start._d.getDate()-1);
        const diffTime = Math.abs(end._d - start._d);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
console.log("diff ",diffDays); 
        this.setState({
            ...this.state,
            checkin: start._d.getFullYear() + '-' + ((start._d.getMonth() + 1) < 10 ? ('0' + (start._d.getMonth() + 1)) : (start._d.getMonth() + 1)) + '-' + (start._d.getDate() ),
            checkout: end._d.getFullYear() + '-' + ((end._d.getMonth() + 1) < 10 ? ('0' + (end._d.getMonth() + 1)) : (end._d.getMonth() + 1)) + '-' + (end._d.getDate()),
            finalPrice : 500*diffDays
            
        })
        
        console.log("label ", label);
    }

    onNumberOfGuestsChange=event=>{
        this.setState({...this.state,numberOfGuests:event.target.value})
    }

    onUserNameChange = event =>{
        this.setState({...this.state,userName:event.target.value})
    }

    render() {
        const { approvalStatus, checkin, checkout, feedGiven, finalPrice, hotelid, numberOfGuests, roomId, userId, userName } = this.state;

        return (
            <Fragment >
                <Card style={{ marginTop: "0px", backgroundColor: "rgba(255, 255, 255, 0.68)", borderRadius: "20px" }}>
                    <h2 className="text-center">Enter Booking Details</h2>
                    <hr />
                    <Form onSubmit={this.AddBooking} onReset={this.resetBooking} id="employeeFormID">
                        
                   {(JSON.parse(localStorage.getItem('user')).roles.includes('ROLE_RECEPTIONIST') ||JSON.parse(localStorage.getItem('user')).roles.includes('ROLE_ADMIN')) && <FormGroup>
                            <Label for="room_assign">Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Enter Name" autoComplete="off" required
                                value={userName}
                                onChange={this.onUserNameChange}
                            />
                        </FormGroup>}
                        
                        
                        <FormGroup>
                            <Label for="room_assign" style={{ marginRight: '300px' }}>Check In - Check Out</Label>
                            <DateRangePicker onEvent={this.handleEvent} onCallback={this.handleCallback}>
                                <input style={{ width: "300px" }} required />
                            </DateRangePicker>
                        </FormGroup>

                        <FormGroup>
                            <Label for="room_assign">Number of Guests</Label>
                            <Input type="text" name="numberOfGuests" id="room_assign" placeholder="Enter Number" autoComplete="off" required
                                value={numberOfGuests}
                                onChange={this.onNumberOfGuestsChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="room_assign">Price</Label>
                            <h1 style={{textAlign:'right'}}>{this.state.finalPrice} /-</h1>
                        </FormGroup>

                        <Container className="text-center">
                            <Button type="submit" color="success">Book & Pay</Button>
                            <Button type="reset" color="warning ml-3">Clear</Button>
                            <Button type="button" color="secondary ml-3" onClick={this.bookingList.bind()}>Booking List</Button>
                        </Container>
                    </Form>
                </Card>
            </Fragment>
        );
    }
}

export default AddBooking;