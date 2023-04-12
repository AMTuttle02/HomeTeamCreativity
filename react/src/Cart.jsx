import React, { useState, useEffect } from "react";
import tshirt from "./assets/blackTShirt.png";
import { Link } from "react-router-dom";
import cart from "./assets/cart.png";

function Cart() {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.userId);
      });
  }, []);

    return (
      <div className="mycart">
        {userId ?
        <div>
          <br/>
          <div className="row">
            <div className="cartSide">
              <Link to="/products" className="ReturnShopping">
                Continue Shopping
              </Link>
            </div>
            <div className="cartMain">
              <div className="row">
                <div className="myCartSide">
                  <img src={cart} alt="Cart Image" className="cart"/>
                </div>
                <div className="myCartMain">
                  <h1>My Cart</h1>
                </div> 
                <div className="myCartSide">
                  <img src={cart} alt="Cart Image" className="cart"/>
                </div>
              </div>
            </div>
            <div className="cartSide">
              <h1 className="ItemCount"> item(s)</h1>
            </div>
          </div>
          <br />

          <div className="CartPage" />
          <div className="row">
            <div className="productSide">
              <div className="fullDesign">
                <img
                  src={tshirt}
                  alt="Home Team Creativity Logo"
                  className="tshirt"
                />
              </div>
            </div>
            <div className="productSide">
              <br />
              <h2> <b> Product Name </b></h2> 
              <h2> Style: </h2>
              <h2> Size: </h2>
              <h2> Color: </h2>
            </div>
            <div className="productSide">
              <br />
              <h2>$</h2>
              <br /><br /><br /><br /><br /><br /><br />
              <h2>Qty: </h2>
            </div>
            <div className="productSide">
              <br /><br /><br /><br /><br /><br />
              <h2>$20.00</h2>
            </div>
          </div>
          <div className="CartPage" />

          <br/>
          <div className = "CheckoutButtonPlacement">
            <h1> Total: </h1>
            <div className="CartPage" />
            <br/>
            <Link to="/payment" className="CheckoutButton">
              Check Out
            </Link>
          </div>
          <br/>
          <br />
          <br />
        </div>
        :
        <div>
          <center>
            <br/>
            <h1>Sorry, you must be logged in to view your cart.</h1>
            <br />
            <Link to="/login" className="addToCart">
              Login Here
            </Link>
          </center>
        </div>
        }
      </div>
    );

}
export default Cart;
