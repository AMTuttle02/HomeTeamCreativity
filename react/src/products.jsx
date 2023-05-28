import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
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

function Products() {
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
  

  useEffect(() => {
    fetch("/api/products.php")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      });
  }, []);

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

  return (
    <div className="Products">
      <h1>Products</h1>
      <p>
        For custom apparel,{" "}
        <a href="https://linktr.ee/hometeamcreativity" target="_blank">send us a message!</a>
      </p>
      <div className="productsTable">
        <div className="productsTr">
          <div className="productsTd">
            {products.map((product) => (
              <div key={product.product_id}>
                {/* You can use this div for order page and cart page */}
                <div className="fullDesign">
                <button onClick={() => orderProduct(product.product_id)} className="orderProducts">
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
                  <p>{product.product_name}</p>
                  <p>{"$" + product.price}</p>
                  </button>
                </div>
                {/* To here */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Products;
