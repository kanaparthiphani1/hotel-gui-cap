import React, { Component } from 'react';
import { Form ,FormGroup,Label,Input,Container,Card,Button } from "reactstrap"
import { Fragment } from 'react';
import axios from 'axios';
import { toast } from "react-toastify"



class AddEmployee extends Component {
    constructor(props){
        super(props);
        this.state = this.initialState;
        this.employeeChange = this.employeeChange.bind(this);
        this.addEmployee = this.addEmployee.bind(this);
    };

    initialState = {
        email:'',username:'',password:'',roles:['rec']
    };

    componentDidMount() {
        const employeeId = +this.props.match.params.code;
        if(employeeId) {
            this.findEmployeeByCode(employeeId);
        };
    };

    findEmployeeByCode = (employeeId) => {
        axios.get("http://localhost:8002/api/v1/staff" +employeeId)
            .then(response => {
                if(response.data != null){
                    this.setState({
                        email: this.state.email,
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                    });
                }
            }).catch((error) => {
                console.error("Error -"+error);
            });
    }

    resetEmployee = () => {
        this.setState(() => this.initialState);
    };

    addEmployee = event => {
        
        event.preventDefault();

        const employee = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.username+'@'+this.state.roles[0],
            roles:this.state.roles
        };
        console.log(employee);
        axios.post("http://localhost:8001/api/auth/signup",employee)
        
        .then(response => {
            console.log("dddd");
            if(response.data != null){
                this.setState(this.initialState);
                toast("Employee Saved Successfully.");
            }
        });
    };

    employeeChange = event => {
        this.setState({
            ...this.state,
            [event.target.name]:event.target.value
        });
    };

    employeeList = () => {
        return this.props.history.push("/view-employees");
    };

    render() {
        const {email,username,password,roles} = this.state;


        return (
            <Fragment>
                <Card style={{borderRadius:'20px'}}>
                <h2 className="text-center">Input Employee Details</h2>
                <hr />
                <Form onSubmit={this.addEmployee} onReset={this.resetEmployee} id="employeeFormID">
                    <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" id="code" placeholder="Enter employee name" autoComplete="off" required
                    value={username}
                    onChange={this.employeeChange}
                    />
                    </FormGroup>
                
                    
                    <FormGroup>
                    <Label for="email">Employee Mail ID</Label>
                    <Input type="text" name="email" id="email" placeholder="Enter Employee Mail ID" autoComplete="off" required
                    value={email}
                    onChange={this.employeeChange}
                    />
                    </FormGroup>
                        <Container className="text-center">
                        <Button type="submit" color="success">Add Employee</Button>
                        <Button type="reset" color="warning ml-3">Clear</Button>
                        <Button type="button" color="secondary ml-3" onClick={this.employeeList.bind()}>Employee List</Button>
                        </Container>
                    </Form>
                </Card>
            </Fragment>
        );
    }
}

export default AddEmployee;