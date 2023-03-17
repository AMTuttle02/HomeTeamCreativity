import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import logo from "./assets/logo.png";
import cart from "./assets/cart.png";

function Homepage() {

  return (
    <div className="HomePage">
      <div className="App">
        <div className="navbar">
          <Link to="/">
              <img src={logo} alt="Home Team Creativity Logo" className="logo"/>
          </Link>
          <Link to="products">
            Products
          </Link>
          <Link to="howitworks">
            How It Works
          </Link>
          <Link to="about">
            About Us
          </Link>
          <Link to="useraccess">
            Login
          </Link>
          <form action="/search" method="get" id="search-form">
            <input type="text" placeholder="Search..." name="query"/>
          </form>
          <Link to="/">
              <img src={cart} alt="Cart" className="cart"/>
          </Link>
        </div>
      </div>
      <Outlet/>
    </div>
  );
}

export default Homepage;
