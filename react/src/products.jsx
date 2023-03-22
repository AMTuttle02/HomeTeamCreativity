import React, { useState, useEffect } from "react";
import "./index.css";
import tshirt from "./assets/blackTShirt.png";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products.php")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="Products">
      <h1>Products</h1>
      <p>
        For custom apparel,{" "}
        <a href="mailto:hometeamcreativity@gmail.com">send us a message!</a>
      </p>
      <div className="productsTable">
        <div className="productsTr">
          <div className="productsTd">
            {products.map((product) => (
              <div key={product.filename}>
                {/* You can use this div for order page and cart page */}
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
