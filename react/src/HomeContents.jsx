import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlackTshirt from "./assets/blackTShirt.png";
import GrayTshirt from "./assets/GreyTShirt.png";
import RedTshirt from "./assets/RedTShirt.png";
import YellowTshirt from "./assets/YellowTShirt.png";
import PinkTshirt from "./assets/PinkTShirt.png";
import GreenTshirt from "./assets/GreenTShirt.png";
import MaroonTshirt from "./assets/MaroonTShirt.png";
import OrangeTshirt from "./assets/OrangeTShirt.png";
import PurpleTshirt from "./assets/PurpleTShirt.png";
import RoyalTshirt from "./assets/RoyalTShirt.png";
import WhiteTshirt from "./assets/WhiteTShirt.png";
import { Outlet, Link } from "react-router-dom";

function HomeContents() {
  const [firstName, setFirstName] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const orderProduct = (productId) => {
    if (productId != 0) {
      const data = { id: productId };
      fetch("/api/setCurrentProduct.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            navigate("/order");
          }
        })
        .catch((error) => console.error(error));
    }
    else {
      navigate("/customOrder");
    }
  };

  const currentColor = (product) => {
    const tShirtMap = {
      "Black": BlackTshirt,
      "Gray": GrayTshirt,
      "Yellow": YellowTshirt,
      "Pink": PinkTshirt,
      "Green": GreenTshirt,
      "Maroon": MaroonTshirt,
      "Orange": OrangeTshirt,
      "Purple": PurpleTshirt,
      "Red": RedTshirt,
      "Royal": RoyalTshirt,
      "White": WhiteTshirt
    }
    const regex = /\S+/;
    let firstWord = product.tColors.match(regex)[0];
    return(tShirtMap[firstWord]);
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
                    <button onClick={() => orderProduct(product.product_id)} className="orderProducts">
                    <div className="fullDesign">
                    <img
                      src={currentColor(product)}
                      alt="Home Team Creativity Logo"
                      className="tshirt"
                    />
                    <img
                      src={"api/images/" + product.filename}
                      alt={product.filename}
                      className="design"
                    />
                  </div>
                  <p>{product.product_name}</p>
                  <p>{"$" + product.price}</p>
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
