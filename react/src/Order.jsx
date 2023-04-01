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
        <div className="main">
            <h1>Hi</h1>
        </div>
      </div>
    </div>
  );
}
export default Order;
