import React, { useState,useEffect } from "react";
import "./index.css";
import tshirt from "./assets/blackTShirt.png";
import design from "./assets/designOne.png";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:80/PHP/products.php')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="Products">
      <h1>Products</h1>
      <p>For custom apparel, send us a message</p>
      <div className="productsTable">
        <div className="productsTr">
          <div className="productsTd">
            {products.map(product => (
              <div className="fullDesign">
              <img src={tshirt} alt="Home Team Creativity Logo" className="tshirt"/>
              <img src={"src/assets/" + product.filename} alt={product.filename} className="design"/>
              <p>{product.title}</p>
              <br />
              <p>{"$" + product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Products;
