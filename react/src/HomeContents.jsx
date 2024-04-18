import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DisplayProduct from "./DisplayProduct";
import { Outlet, Link } from "react-router-dom";

function HomeContents() {
  const [firstName, setFirstName] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const orderProduct = (productId) => {
    if (productId != 0) {
      navigate("/order/" + productId);
    }
    else {
      navigate("/customOrder");
    }
  };

  const getPrice = (price, style) => {
    if (style === "tshirt") {
      return ((price * 1 + 0));
    }
    else if (style === "longsleeve") {
      return ((price * 1 + 4));
    }
    else if (style === "crewneck") {
      return ((price * 1 + 8));
    }
    else if (style === "hoodie") {
      return ((price * 1 + 12)); 
    }
  }

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
      <div className="HomeRow">
        <div className="homeSide">
          <div className="orderLinks">
            <br /><br /><br />
            <Link to='/order' className="OrderButton">ORDER NOW</Link>
            <br /><br /><br /><br /><br />
            <Link to='/about' className="OrderButton">ABOUT US</Link>
            <br /><br /><br /><br /><br />
            <Link to="https://linktr.ee/hometeamcreativity" target="_blank" className="OrderButton">CONTACT US</Link>
          </div>
        </div>
        <div className="homeMain">
          <h2>Featured Products</h2>
          <br />
          <div className="productsRow">
            {products.map((product) => (
              <div key={product.filename} className="homeProductsCell">
                <div className="productDetails">
                  <button onClick={() => orderProduct(product.product_id)} className="magnify">
                  <DisplayProduct product={product} />
                  <p>{product.product_name}</p>
                  <p>{"$" + (getPrice(product.price, product.default_style)).toFixed(2)}</p>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default HomeContents;
