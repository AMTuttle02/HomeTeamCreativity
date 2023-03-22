import React, { useState, useEffect } from "react";
import tshirt from "./assets/blackTShirt.png";
import { Outlet, Link } from "react-router-dom";

function HomeContents() {
  const [firstName, setFirstName] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.first_name);
      });
    fetch("/api/featuredProducts.php")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="index">
      {firstName ? <h1>Welcome Back {firstName}!</h1> : <h1><b>Welcome to Home Team Creativity!</b></h1>}
      <div className="row">
        <div className="side">
          <div className="orderLinks">
            <br /><br /><br />
            <Link to='/products' className="OrderButton">ORDER NOW</Link>
            <br /><br /><br /><br /><br />
            <Link to='/about' className="OrderButton">ABOUT US</Link>
            <br /><br /><br /><br /><br />
            <Link to='mailto:hometeamcreativity@gmail.com' className="OrderButton">CONTACT US</Link>
          </div>
        </div>
        <div className="main">
          <h2>Featured Products</h2>
          <div className="productsTable">
            <div className="productsTdHomepage">
              {products.map((product) => (
                <div key={product.filename}>
                  <div className="fullDesign">
                    <img
                      src={tshirt}
                      alt="Home Team Creativity Logo"
                      className="tshirt"
                    />
                    <img
                      src={"src/assets/" + product.filename}
                      alt={product.filename}
                      className="design"
                    />
                    <p>{product.product_name}</p>
                    <p>{"$" + product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default HomeContents;
