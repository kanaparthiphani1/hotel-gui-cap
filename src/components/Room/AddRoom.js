import { Fragment, useState } from "react"
import { Form ,FormGroup,Label,Input,Container,Card } from "reactstrap"
import React from "react"
import { Button } from "reactstrap"
import axios from "axios"
import ROOM_URL from '../../services/Room';
import { toast } from "react-toastify"
import './addRoom.css'


const AddRoom = () => {


  const [room, setRoom] = useState({
    roomNo:'',roomType:'',
    price:500,
    availability:true
  });
  //Form Handler Function
  const handleForm=(e)=>{
    console.log(room);
    postDatatoServer(room);
    e.preventDefault();
  };

  //Creating function to Post data on server
  const postDatatoServer=(data)=>{
    axios.post(`http://localhost:8003/api/v3/room`,data).then(
      (response)=>{
        console.log(response);
        console.log("Success");
        toast.info("Room Has been Added Successfully");
        setRoom({roomNo:'',roomType:'',price:500,
          availability:true})
      },
      (error)=>{
        console.log(error);
        console.log("Error");
        toast.warning("ERROR! Something Went Wrong");
      }
    )
  };

    return (
        <Fragment>
          <Card className="card-ad">
        <h2 className="text-center my=3">Input Room Details </h2>
        <hr />
        <Form onSubmit={handleForm}>
        <FormGroup>
        <Label for="roomId">Room Num</Label>
        <Input type="text" value={room.roomNo} name="roomId" id="roomId" placeholder="Enter Room Num to Assign Room ID" autoComplete="off"
        onChange={ (e) => {
          setRoom({...room, roomNo:e.target.value})}}
        />
      </FormGroup>
      <FormGroup row>
        <Label for="roomType" sm={2}>Room Type</Label>
          <Input type="select" value={room.roomType}  name="roomType" id="roomType"
          onChange={ (e) => {
            setRoom({...room, roomType:e.target.value})}}
          >
            <option>Select</option>
            <option>Standard</option>
            <option>Deluxe</option>
            <option>Executive</option>
            <option>Suite</option>
            <option>Presidential</option>
          </Input>
      </FormGroup>
      
      <Container className="text-center">
      <Button type="submit" color="success">Add Room</Button>
      <Button type="reset" color="warning ml-3">Clear</Button>
      </Container>
        </Form>
        </Card>
    </Fragment>
    ) 
}

export default AddRoom;