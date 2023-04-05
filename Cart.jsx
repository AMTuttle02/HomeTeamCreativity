import React, { useState, useEffect } from "react";
import "./index.css";
import tshirt from "./assets/blackTShirt.png";
import { Link } from "react-router-dom";
import cart from "./assets/cart.png";

function Cart() {
    return (
      <div className="mycart">
            <br/>
            <img src={cart} alt="Cart Image" />
            <h1>My Cart</h1>
            <img src={cart} alt="Cart Image" />
            <style>
                hr.solid {border-top:white;} 
            </style>
                <div className="fullDesign">
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

                  <style>hr.solid {border-top:white;} </style>

                  <p>{"$" + product.price}</p>
                  <style>hr.solid {border-top:white;} </style>

                </div>
            <div className="userCheckout"> 
            <p>
            <Link to="/payment" className="checkoutButton">
                Check Out
            </Link>
            </p>
            </div>
            <Outlet />
      </div>
    );

}
export default Cart;
