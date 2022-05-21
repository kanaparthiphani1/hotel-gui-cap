import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { toast } from "react-toastify"

import axios from 'axios';
import { Link } from 'react-router-dom';

class ViewGuest extends Component {

    constructor(props){
        super(props);
        this.state = {
            guests : []
        };
    }

    componentDidMount(){
        this.getllguests();
    }

    getllguests(){
        axios.get("https://0114-49-204-77-246.ngrok.io//guest/api/findAllguests")
        .then(response => response.data)
        .then(data => {
            this.setState({guests: data})
        });
    };

    
    deleteGuest = (code) => {
        axios.delete("https://0114-49-204-77-246.ngrok.io/guest/api/deleteguest/" +code)
        .then(response => {
            if(response.data != null){
                alert("Guest Deleted Successfully.");
                toast.warning("Guest Has been Deleted Successfully");
                this.setState({
                    guests: this.state.guests.filter(guests => guests.code != code)
                });
            }
        });
    };

    render() {
        return (
            <div>
            <h2 className="text-center"> Guests Data </h2>
            <hr />
            <div className="row">
                <table className="table table-striped table-bordered">

                    <thead>
                        <tr>
                            <th>Guest Id</th>
                            <th>Guest Company Name</th>
                            <th>Guest Fulll Name</th>
                            <th>Guest Mail ID</th>
                            <th>Guest Gender</th>
                            <th>Guest Address</th>
                            <th>Guest Phone Number</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.guests.length ===0 ?
                            <tr>
                                <td colSpan="8">No Guests Available.</td>
                            </tr>:
                            this.state.guests.map(
                                guests =>
                                <tr key ={guests.id}>
                                    <td>{guests.code}</td>
                                    <td>{guests.company}</td>
                                    <td>{guests.name}</td>
                                    <td>{guests.mailid}</td>
                                    <td>{guests.gender}</td>
                                    <td>{guests.address}</td>
                                    <td>{guests.phone_number}</td>
                                    <td>
                                    <ButtonGroup>
                                    <Link to={"updateGuest/"+guests.code}  className="btn btn-primary">Update</Link>{''}
                                    {/* <Button color="info">Update</Button> */}
                                    <Button color="secondary" onClick={this.deleteGuest.bind(this, guests.code)}>Delete</Button>
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

export default ViewGuest;