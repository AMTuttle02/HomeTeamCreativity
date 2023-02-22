import React, { useState, useEffect } from "react";
import Login from "./login";
import Products from "./products";
import logo from "./assets/logo.png";

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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:80/PHP/server.php')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const [isProductsPage, setIsProductsPage] = useState(false);

  const handleProductsButton = () => {
    setIsProductsPage(true);
    setIsLoginPage(false);
  }

  const [isLoginPage, setIsLoginPage] = useState(false);

  const handleLoginButton = () => {
    setIsLoginPage(true);
    setIsProductsPage(false);
  }

  const handleHomepageButton = () => {
    setIsLoginPage(false);
    setIsProductsPage(false);
  }

  let state;

  if (isLoginPage) {
    state = <Login />
  }
  else if (isProductsPage) {
    state = <Products />
  }
  else {
    state = <Index />
  }

  return (
    <div className="HomePage">
      <div className="App">
        <div className="navbar">
        <button onClick={handleHomepageButton} className="homepageButton">
          <img src={logo} alt="Home Team Creativity Logo" className="logo"/>
          </button>
          <button onClick={handleProductsButton} className="headerButton">Products</button>
          <a href="#">How It Works</a>
          <a href="#">About Us</a>
          <button onClick={handleLoginButton} className="headerButton">Login/Sign Up</button>
        </div>
      </div>
      {state}
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Homepage;
