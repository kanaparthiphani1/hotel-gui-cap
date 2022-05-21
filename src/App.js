import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import FooterComponent from "./components/FooterComponent";
import Otp from "./components/otp.component";
import { ToastContainer } from "react-toastify";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    console.log("User in app.js : ",user);
    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark " 
        style={{
          backgroundColor:"black",
          height: "80px"
        }}>
          
          <div className="navbar-nav">
            <li>
              <Link to={"/home"} className="nav-link " >
               <img src="/images/logo.png" className="logo"/>
              </Link>
            </li>

            {showAdminBoard && (
              <li className="nav-item" style={{display:"flex",justifyContent:"center",alignItems:"center",color:"#CAC6D2",fontWeight:"bolder"}}>
                <Link to={"/admin"} className="nav-link">
                <font color="#CAC6D2"><b>Admin-Board</b></font>
                </Link>
              </li>
            )}

            {currentUser && (
              <li style={{display:"flex",justifyContent:"center",alignItems:"center",color:"#CAC6D2",fontWeight:"bolder"}}>
                <Link to={"/user"} className="nav-link">
                <font color="#CAC6D2"><b>Book Now</b></font>
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item" style={{display:"flex",justifyContent:"center",alignItems:"center",color:"#CAC6D2",fontWeight:"bolder"}}>
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item" style={{display:"flex",justifyContent:"center",alignItems:"center",color:"#CAC6D2",fontWeight:"bolder"}}>
                <a href="/login" className="nav-link" onClick={this.logOut}>
                <font color="#CAC6D2"><b>Log Out</b></font>
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item" style={{display:"flex",justifyContent:"center",alignItems:"center",color:"#CAC6D2",fontWeight:"bolder"}}>
                <Link to={"/login"} className="nav-link">
                <font color="#CAC6D2"><b>Login</b></font>
                </Link>
              </li>

              <li className="nav-item" style={{display:"flex",justifyContent:"center",alignItems:"center",color:"#CAC6D2",fontWeight:"bolder"}}>
                <Link to={"/register"} className="nav-link">
                <font color="#CAC6D2"><b>Sign Up</b></font>
                </Link>
              </li>
            </div>
          )}
        </nav>

        
        <ToastContainer />
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/otp" component={Otp} />
          </Switch>
        
        <div>
        <FooterComponent />
        </div>
      </div>
    );
  }
}

export default App;
