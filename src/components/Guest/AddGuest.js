import React, { Component } from 'react';
import { Form ,FormGroup,Label,Input,Container,Card,Button } from "reactstrap"
import { Fragment } from 'react';
import axios from 'axios';
import { toast } from "react-toastify"

class AddGuest extends Component {
    constructor(props){
        super(props);
        this.state = this.initialState;
        this.guestChange = this.guestChange.bind(this);
        this.addGuest = this.addGuest.bind(this);
    };

    initialState = {
        code:'',company:'',name:'',mailid:'',gender:'',address:'',phone_number:''
    };

    componentDidMount() {
        const code = +this.props.match.params.code;
        if(code) {
            this.findGuestByCode(code);
        };
    };

    findGuestByCode = (code) => {
        axios.get("https://0114-49-204-77-246.ngrok.io/guest/api/findguest/" +code)
            .then(response => {
                if(response.data != null){
                    this.setState({
                        code: this.state.code,
                        company: this.state.company,
                        name: this.state.name,
                        mailid: this.state.mailid,
                        gender: this.state.gender,
                        address: this.state.address,
                        phone_number: this.state.phone_number
                    });
                }
            }).catch((error) => {
                console.error("Error -"+error);
            });
    }

    resetGuest = () => {
        this.setState(() => this.initialState);
    };

    addGuest = event => {
        event.preventDefault();

        const guest = {
            code: this.state.code,
            company: this.state.company,
            name: this.state.name,
            mailid: this.state.mailid,
            gender: this.state.gender,
            address: this.state.address,
            phone_number: this.state.phone_number
        };
        axios.post("https://0114-49-204-77-246.ngrok.io/guest/api/newGuest",guest)
        .then(response => {
            if(response.data != null){
                this.setState(this.initialState);
                toast.success("Guest  Saved Successfully.");
            }
        });
    };

    guestChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    guestList = () => {
        return this.props.history.push("/view-guests");
    };
    
    render() {
        const {code, company, name, mailid, gender, address, phone_number} = this.state;

        return (
            <Fragment>
                <Card>
                    <h2 className="text-center">Input Guest Details </h2>
                    <hr />
                    <Form onSubmit={this.addGuest} onReset={this.resetGuest} id="guestFormId">
                        <FormGroup>
                        <Label for="code">Guest Id</Label>
                        <Input type="text" name="code" id="code" placeholder="Enter Guest Code" autoComplete="off"
                         value={code}
                         onChange={this.guestChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="company">Company Name</Label>
                        <Input type="text" name="company" id="company" placeholder="Enter Guests Company" autoComplete="off"
                        value={company}
                        onChange={this.guestChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="name">Guest Full Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Enter Guest Name" autoComplete="off"
                        value={name}
                        onChange={this.guestChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="mailid">Mail ID</Label>
                        <Input type="text" name="mailid" id="mailid" placeholder="Enter Guest Mail ID" autoComplete="off"
                        value={mailid}
                        onChange={this.guestChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="gender">Gender</Label>
                        <Input type="select" name="gender" id="gender"
                        value={gender}
                        onChange={this.guestChange}
                        >
                        <option>Select</option>
                        <option>Female</option>
                        <option>Male</option>
                        </Input>
                        </FormGroup>
                        <FormGroup>
                        <Label for="address">Address</Label>
                        <Input type="text" name="address" id="address" placeholder="Enter Guest Address" autoComplete="off"
                        value={address}
                        onChange={this.guestChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="phone_number">Guest Phone Number</Label>
                        <Input type="text" name="phone_number" id="phone_number" placeholder="Enter Guest Mobile NUmber" autoComplete="off"
                        value={phone_number}
                        onChange={this.guestChange}/>
                        </FormGroup>
                        <Container className="text-center">
                        <Button type="submit" color="success">Add Guest</Button>
                        <Button type="reset" color="warning ml-3">Clear</Button>
                        <Button type="button" color="secondary ml-3" onClick={this.guestList.bind()}>Guest  List</Button>
                        </Container>
                    </Form>
                </Card>
            </Fragment>
        );
    }
}

export default AddGuest;