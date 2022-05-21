import React, { Component } from "react";
import './profile.css'
import { Redirect } from "react-router-dom";
import { Button, Card, CardBody, CardGroup, CardImg, CardSubtitle, CardText, CardTitle, UncontrolledCarousel } from "reactstrap";
import AuthService from "../services/auth.service";
import { FaRegHandshake } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { BiLike } from "react-icons/bi";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div style={{
        //background:`url('https://www.pngkey.com/png/detail/137-1376908_background-body-form-background-image-png.png') no-repeat`,
        minHeight: "100vh",
        fontFamily: `'Source Code Pro', monospace`,
        backgroundColor: "black"
      }}>
        <UncontrolledCarousel
          className="carousel"
          items={[
            {
              altText: '',
              caption: '',
              key: 1,
              src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            },
            {
              altText: '',
              caption: '',
              key: 2,
              src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80'
            },
            {
              altText: '',
              caption: '',
              key: 3,
              src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940'
            }
          ]}
        />
        <div className="">
          {(this.state.userReady) ?
            <div className="loer-body">
              <div className="card-group-head">
                <h1>Why Choose Us?</h1>
              </div>
              <div className="card-groups">
                <div className="card1">
                  <div className="card-upper">
                    <FaRegHandshake className="card-logo"/>
                  </div>
                  <div className="card-lower">
                    <h1 className="card-head">
                      Commitment to Work
                    </h1>
                    <p className="card-para">
                    Eiusmod id id nulla proident in labore tempor culpa quis.
                    </p>
                  </div>
                </div>
                <div className="card1">
                  <div className="card-upper">
                    <BsPeople className="card-logo"/>
                  </div>
                  <div className="card-lower">
                  <h1 className="card-head">
                      Solid Teamwork
                    </h1>
                    <p className="card-para">
                    Eiusmod id id nulla proident in labore tempor culpa quis.
                    </p>
                  </div>
                </div>
                <div className="card1">
                  <div className="card-upper">
                    <BiLike className="card-logo"/>
                  </div>
                  <div className="card-lower">
                  <h1 className="card-head">
                      Standard of Excellence
                    </h1>
                    <p className="card-para">
                    Eiusmod id id nulla proident in labore tempor culpa quis.
                    </p>
                  </div>
                </div>
              </div>
              {/* <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p> */}
              {/* <p>
                <strong>Id:</strong>{" "}
                {currentUser.id}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {currentUser.email}
              </p>
              <strong>Authorities:</strong>
              <ul>
                {currentUser.roles &&
                  currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
              </ul> */}
            </div> : null}
        </div>
      </div>
    );
  }
}
