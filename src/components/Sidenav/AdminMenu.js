import React from "react"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ListGroup, ListGroupItem } from "reactstrap";
import './adminMenu.css'

const AdminMenu=()=>{

    const msg = ()=>{
        toast.success("Rooms Has been loaded successfully");
    }
    return(

        <ListGroup className="">
            <Link className="list-group-item card-ada list-group-item-action" tag="a" to="/add-room" action>
                Add Rooms
            </Link>
            <Link className="list-group-item card-ada list-group-item-action" tag="a" to="/view-rooms"  action>
                View Rooms
            </Link>
            <Link className="list-group-item card-ada list-group-item-action" tag="a" to="/add-employee" action>
                Add Employee
            </Link>
            <Link className="list-group-item card-ada list-group-item-action" tag="a" to="/view-employees" action>
                View Employees
            </Link>
        </ListGroup>

    )
}

export default AdminMenu;