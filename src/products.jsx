import React, { useState } from "react";
import "./index.css";
import tshirt from "./assets/blackTShirt.png";
import design from "./assets/designOne.png";

function Products() {

  return (
    <div className="Products">
      <h1>Products</h1>
      <p>For custom apparel, send us a message</p>
      <div className="productsTable">
        <div className="productsTr">
          <div className="productsTd">
            <div className="fullDesign">
              <img src={tshirt} alt="Home Team Creativity Logo" className="tshirt"/>
              <img src={design} alt="Home Team Creativity Logo" className="design"/>
              <p>Product Title</p>
              <br />
              <p>Product Price</p>
            </div>
            <div className="fullDesign">
              <img src={tshirt} alt="Home Team Creativity Logo" className="tshirt"/>
              <img src={design} alt="Home Team Creativity Logo" className="design"/>
              <p>Product Title</p>
              <br />
              <p>Product Price</p>
            </div>
            <div className="fullDesign">
              <img src={tshirt} alt="Home Team Creativity Logo" className="tshirt"/>
              <img src={design} alt="Home Team Creativity Logo" className="design"/>
              <p>Product Title</p>
              <br />
              <p>Product Price</p>
            </div>
            <div className="fullDesign">
              <img src={tshirt} alt="Home Team Creativity Logo" className="tshirt"/>
              <img src={design} alt="Home Team Creativity Logo" className="design"/>
              <p>Product Title</p>
              <br />
              <p>Product Price</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Products;
