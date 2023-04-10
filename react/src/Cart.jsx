import React, { useState, useEffect } from "react";
import tshirt from "./assets/blackTShirt.png";
import { Link } from "react-router-dom";
import cart from "./assets/cart.png";

function Cart() {
    return (
      <div className="mycart">
        <br/>
        
        <div className="RetunShopping">
      
        <p>
            <Link to="/products">
              Continue Shopping
            </Link>
          </p>
        
        </div>
        <div className="ItemCount">
        <h1> item(s)</h1>
        </div>
        
       <center>
        <img src={cart} alt="Cart Image" className="cart"/>
          <div className="CartFont">
          <h1>My Cart</h1>
          </div> 
         <img src={cart} alt="Cart Image" className="cart"/>
         </center>


        <div className="CartPage"></div>
         <div className="row">
        <div className="side">
        <div className="fullDesign">
          <img
            src={tshirt}
            alt="Home Team Creativity Logo"
            className="tshirt"
          />
        
        </div>
        </div>
        </div>
        <div className="CartPage"></div>
        <br/>
        <div className = "CheckoutButtonPlacement">
        <div className="userCheckout"> 
          <p>
            <Link to="/payment" className="CheckoutButton">
              Check Out
            </Link>
          </p>
        </div>
        </div>
      </div>
    );

}
export default Cart;
