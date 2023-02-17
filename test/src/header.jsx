import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css"
import logo from "./logo.png"
import Login from "./login"

function goToLogin() {
    ReactDOM.render(
        <Login />
    );
  }

function Header() {
    return (
        <div className="App">
        <div className="navbar">
          <img src={logo} alt="Home Team Creativity Logo" className="logo"/>
          <a href="#">Products</a>
          <a href="#">How It Works</a>
          <a href="#">About Us</a>
          <button onClick={goToLogin} className="loginButton">Login/Sign Up</button>
        </div>
      </div>
    );
}
export default Header;