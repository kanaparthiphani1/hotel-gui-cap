import React from "react"
import { Link } from "react-router-dom";
import { ListGroup } from "reactstrap";

const Usermenu=()=>{
    return(

        <ListGroup>
            <Link className="list-group-item list-group-item-action" tag="a" to="/add-booking" action>
                Make Reservation
            </Link>
            <Link className="list-group-item list-group-item-action" tag="a" to="/view-bookings" action>
                View All Reservation
            </Link>
            {/* <Link className="list-group-item list-group-item-action" tag="a" to="#!" action>
                Issue Bill
            </Link> */}
        </ListGroup>

    )
}

export default Usermenu;