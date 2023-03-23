import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import logo from "./assets/logo.png";
import cart from "./assets/cart.png";

function Homepage() {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.first_name);
      });
  }, []);

  let Login = 'Login';

  if (firstName) {
    Login = 'Log Out';
  }

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
          <Link to="login">
            {Login}
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
      <footer>
        <br/>
        <h1>Thank you for supporting small businesses!</h1>
      </footer>
    </div>
  );
}
export default Homepage;