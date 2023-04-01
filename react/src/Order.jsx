import React, { useState, useEffect } from "react";
import tshirt from "./assets/blackTShirt.png";

function Order() {
  return (
    <div className="Order">
      <div className="row">
        <div className="orderSide">
          <div className="orderFullDesign">
            <img
            src={tshirt}
            alt="Home Team Creativity Logo"
            className="orderTshirt"
            />
            <br /><br />
            <h3>Product Name</h3>
            <br />
            <p>Details:</p>
            <p>100% Cotton</p>
            <p>True To Size</p>
            <p>Regualr Fit</p>
            <p>Wash Inside Out if possible</p>
            <a href=''>Return Policy</a>
          </div>
        </div>
        <div className="orderMain">
          <h3>Price calculated after selections</h3>
          <h1>Style: Short Sleeve T-Shirt</h1>
          <h1>Add Images Here</h1>
          <h1>And Here</h1>
          <h1>And Here</h1>
          <h1>Color: Black</h1>
          <h1>Add color options here</h1>
          <br />
          <h1>Size: Adult Medium</h1>
          <h1>Add Youth Size Options here</h1>
          <h1>Add Adult Size Options here</h1>
          <h1>Quantity: 1</h1>
          <center>
          <button>Add to Cart</button>
          <h1>Price: $20.00</h1>
          </center>
        </div>
      </div>
    </div>
  );
}
export default Order;
