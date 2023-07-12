import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

function SearchResults() {
  const { state } = useLocation();
  const { result } = state;
  const navigate = useNavigate();

  const orderProduct = (productId) => {
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

  if (result) {
    console.log(result);
    return (
      <div className="Products">
      <h1>Products</h1>
      <p>
          For custom apparel,{" "}
          <a href="https://linktr.ee/hometeamcreativity" target="_blank">send us a message!</a>
      </p>
      <p>Too Generic? Try using key words instead!</p>
      <div className="productsRow">
        {result.map((product) => (
          <div key={product.filename} className="productsCell">
            {/* You can use this div for order page and cart page */}
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
            {/* To here */}
          </div>
          ))}
        </div>
      </div>
    );
  }
  else {
    return (
        <div className="NoResults">
            <h1>Products</h1>
            <p>
                For custom apparel,{" "}
                <a href="https://linktr.ee/hometeamcreativity" target="_blank">send us a message!</a>
            </p>
            <h1>Sorry, No Results Found. Try a broader search.</h1>
        </div>
    );
  }
}

export default SearchResults;
