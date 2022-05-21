import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { toast } from "react-toastify"
import './viewEmployee.css'

import axios from 'axios';
import { Link } from 'react-router-dom';

class ViewEmployee extends Component {

    constructor(props){
        super(props);
        this.state = {
            employees : []
        };
    }

    componentDidMount(){
        this.getallemployees();
    }

    getallemployees(){
        axios.get("http://localhost:8001/api/test/recepCount")
        .then(response => response.data)
        .then(data => {
            this.setState({employees: data})
        });
    };

    deleteEmployee = (code) => {
        axios.delete("http://localhost:8002/api/v1/staff/" +code)
        .then(response => {
            if(response.data != null){
                alert("Employee Deleted Successfully.");
                toast.warning("Employee Has been Deleted Successfully");
                this.setState({
                    employees: this.state.employees.filter(employees => employees.code != code)
                });
            }
        });
    };


    render() {
        return (
            <div className='viewEmployee'>
                <h2 className="text-center"> Employee Data </h2>
                <hr />
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                           
                                <th>Username</th>
                                
                                <th>Email</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.length ===0 ?
                                <tr>
                                    <td colSpan="8">No Employee Available.</td>
                                </tr>:
                                this.state.employees.map(
                                    employees =>
                                    <tr key ={employees.id}>
                                        <td>{employees.username}</td>
                                       
                                        <td>{employees.email}</td>
                                        
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

export default ViewEmployee;