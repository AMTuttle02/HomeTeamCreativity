import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import tshirt from "./assets/blackTShirt.png";

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

  if (result) {
  return (
        <div className="Products">
        <h1>Products</h1>
        <p>
            For custom apparel,{" "}
            <a href="https://linktr.ee/hometeamcreativity" target="_blank">send us a message!</a>
        </p>
        <p>Too Generic? Try using key words instead!</p>
        <div className="productsTable">
            <div className="productsTr">
            <div className="productsTd">
                {result.map((product) => (
                <div key={product.filename}>
                    {/* You can use this div for order page and cart page */}
                    <div className="fullDesign">
                        <button onClick={() => orderProduct(product.product_id)} className="orderProducts">
                        <img
                            src={tshirt}
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
