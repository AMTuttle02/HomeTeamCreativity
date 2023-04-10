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
       
       <center>
        <img src={cart} alt="Cart Image" className="cart"/>
          <div className="CartFont">
          <h1>My Cart</h1>
          </div> 
         <img src={cart} alt="Cart Image" className="cart"/>
         </center>

        <div className="ItemCount">
        <h2> item(s)</h2>
        </div>
        
         
        <div className="CartPage"></div>
         <div className="row">
        <div className="side">
        <div className="fullDesign">
          <img
            src={tshirt}
            alt="Home Team Creativity Logo"
            className="tshirt"
          />
          {/*
          <img
            src={"api/images/" + product.filename}
            alt={product.filename}
            className="design"
          />
          <p><b>{product.product_name}</b></p>
          <div className="CartPage"> </div>
          <p>{"Qty:"}</p>
          <p>{"Total: $" + product.price}</p>
          */}
        </div>
        </div>
        </div>
        <div className="CartPage"></div>
        <br/>
        <div className="userCheckout"> 
          <p>
            <Link to="/payment" className="CheckoutButton">
              Check Out
            </Link>
          </p>
        </div>
      </div>
    );

}
export default Cart;
