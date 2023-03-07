import React, { useState, useEffect } from "react";
import Login from "./Login";
import Products from "./products";
import HowItWorks from "./howItWorks";
import About from "./aboutUs";
import logo from "./assets/logo.png";
import cart from "./assets/cart.png";

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
  const [isAboutPage, setisAboutPage] = useState(false);

  const handleAboutButton = () => {
    setisHowItWorksPage(false);
    setIsProductsPage(false);
    setIsLoginPage(false);
    setisAboutPage(true);
  }

  const [isHowItWorksPage, setisHowItWorksPage] = useState(false);

  const handleHowItWorksButton = () => {
    setisHowItWorksPage(true);
    setIsProductsPage(false);
    setIsLoginPage(false);
    setisAboutPage(false);
  }

  const [isProductsPage, setIsProductsPage] = useState(false);

  const handleProductsButton = () => {
    setIsProductsPage(true);
    setIsLoginPage(false);
    setisHowItWorksPage(false);
    setisAboutPage(false);
  }

  const [isLoginPage, setIsLoginPage] = useState(false);

  const handleLoginButton = () => {
    setIsLoginPage(true);
    setIsProductsPage(false);
    setisHowItWorksPage(false);
    setisAboutPage(false);
  }

  const handleHomepageButton = () => {
    setIsLoginPage(false);
    setIsProductsPage(false);
    setisHowItWorksPage(false);
    setisAboutPage(false);
  }

  let state;

  if (isLoginPage) {
    state = <Login />
  }
  else if (isProductsPage) {
    state = <Products />
  }
  else if (isHowItWorksPage) {
    state = <HowItWorks />
  }
  else if (isAboutPage) {
    state = <About />
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
          <button onClick={handleHowItWorksButton} className="headerButton">How It Works</button>
          <button onClick={handleAboutButton} className="headerButton">About Us</button>
          <button onClick={handleLoginButton} className="headerButton">Login/Sign Up</button>
          <form action="/search" method="get" id="search-form">
            <input type="text" placeholder="Search..." name="query"/>
          </form>
          <button onClick={handleHomepageButton} className="cartButton">
          <img src={cart} alt="Cart" className="cart"/>
          </button>
        </div>
      </div>
      {state}
    </div>
  );
}

export default Homepage;
