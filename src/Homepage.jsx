import React, { useState } from "react";
import Login from "./login"
import logo from "./logo.png"

function Index () {
    return (
      <div className="index">
        <div className="row">
          <div className="side">
            <h2>Order Now Button Here</h2>
          </div>
          <div className="main">
            <h2>Featured Products Here</h2>
          </div>
    </div>
      </div>
    );
}

function Homepage() {
    const [isLoginPage, setIsLoginPage] = useState(false);

    const handleLoginButton = () => {
        setIsLoginPage(true);
    }

    return (
        <div className="HomePage">
            <div className="App">
        <div className="navbar">
          <img src={logo} alt="Home Team Creativity Logo" className="logo"/>
          <a href="#">Products</a>
          <a href="#">How It Works</a>
          <a href="#">About Us</a>
          <button onClick={handleLoginButton} className="loginButton">Login/Sign Up</button>
        </div>
      </div>
            {isLoginPage ? (
                <Login /> 
            ) : (
                <Index />
            )}
        </div>

    );
}

export default Homepage;



