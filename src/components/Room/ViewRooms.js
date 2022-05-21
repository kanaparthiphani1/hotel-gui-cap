import { Button, ButtonGroup } from 'reactstrap';
import React, { Component } from 'react';
import { toast } from "react-toastify"
import axios from 'axios';
import { Link } from 'react-router-dom';
import './viewRoom.css'

class ViewRooms extends Component {
    constructor(props){
        super(props)
        this.state={
            rooms : []
        };
    }

    componentDidMount(){
      this.getRooms();  
    }

    getRooms(){
        axios.get("http://localhost:8003/api/v3/room")
        .then(response => response.data)
        .then((data)=>{
            this.setState({rooms: data})
        });
    };

    deleteRoom = (roomNo) => {
        console.log(roomNo)
        axios.delete(`http://localhost:8003/api/v3/room/${roomNo}`)
        .then(response => {
            if(response.data != null){
                toast.warning("Room Has been Deleted Successfully");
                this.getRooms()
            }
        });
    };

    render() {
        return (
            <div className='vew-room-cont'>
                <h2 className="text-center"> Room Data </h2>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>Room ID</th>
                                <th>Room Number</th>
                                <th>Room Type</th>
                                <th>Price</th>
                                <th>Availability</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.rooms.length ===0 ?
                                <tr>
                                    <td colSpan="7">No Rooms Available.</td>
                                </tr>:
                                this.state.rooms.map(
                                    room =>
                                    <tr key ={room.id}>
                                        <td>{room.id}</td>
                                        <td>{room.roomNo}</td>
                                        <td>{room.roomType}</td>
                                        <td>{room.price}</td>
                                        <td>{room.availability===true?'Available':'Filled'}</td>
                                        
                                        <td>
                                        <ButtonGroup>
                                       
                                        {/* <Button color="info">Update</Button>{ ''} */}
                                        <Button  color="secondary" onClick={this.deleteRoom.bind(this, room.id)}>Delete</Button>
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

export default ViewRooms;