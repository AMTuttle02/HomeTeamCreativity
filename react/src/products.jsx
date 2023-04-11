import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import tshirt from "./assets/blackTShirt.png";

function Products() {
  const [products, setProducts] = useState([]);
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
export default Products;
