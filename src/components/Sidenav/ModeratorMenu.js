import React from "react"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ListGroup, ListGroupItem } from "reactstrap";

const Moderatormenu=()=>{

    const msg = ()=>{
        toast.success("Rooms Has been loaded successfully");
    }
    return(

        <ListGroup>
            <Link className="list-group-item list-group-item-action" tag="a" to="/add-room" action>
                Add Rooms
            </Link>
            <Link className="list-group-item list-group-item-action" tag="a" to="/view-rooms" onClick={msg} action>
                View Rooms
            </Link>
            <Link className="list-group-item list-group-item-action" tag="a" to="/add-employee" action>
                Add Employee
            </Link>
            <Link className="list-group-item list-group-item-action" tag="a" to="/view-employees" action>
                View Employees
            </Link>
        </ListGroup>

    )
}

export default Moderatormenu;