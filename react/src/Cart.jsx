import React, { useState, useEffect } from "react";
import tshirt from "./assets/blackTShirt.png";
import { Link } from "react-router-dom";
import cart from "./assets/cart.png";

function Cart() {
    return (
      <div className="mycart">
        <br/>
        <center>
          <img src={cart} alt="Cart Image" className="cart"/>
          <h1>My Cart</h1>
          <img src={cart} alt="Cart Image" className="cart"/>
        </center>
        <div className="fullDesign">
          <img
            src={tshirt}
            alt="Home Team Creativity Logo"
            className="tshirt"
          <img
            src={"api/images/" + product.filename}
            alt={product.filename}
            className="design"
          />
          <p>{product.product_name}</p>

          <p>{"$" + product.price}</p>
          
        </div>
        <div className="userCheckout"> 
          <p>
            <Link to="/payment" className="checkoutButton">
              Check Out
            </Link>
          </p>
        </div>
      </div>
    );

}
export default Cart;
