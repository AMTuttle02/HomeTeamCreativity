import React, { useState, useEffect } from "react";
import tshirt from "./assets/blackTShirt.png";
import { Link } from "react-router-dom";
import cart from "./assets/cart.png";

function Cart() {
  const [userId, setUserId] = useState("");
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.userId);
      });
  }, []);

  useEffect(() => { 
    fetch("/api/getOrder.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setOrder(data);
    });
  }, []);

  useEffect(() => { 
    fetch("/api/getCart.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setProducts(data);
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
            <h1 className="ItemCount"> {products.length} item(s)</h1>
          </div>
        </div>
        <br />

        <div className="CartPage" />
          
            {products.map((product) => (
              <div key={product.product_id}>
                <div className="row">
                  <div className="productSide">
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
                    </div>
                  </div>
                  <div className="productSide">
                    <br />
                    <h2> <b> {product.product_name} </b></h2> 
                    <h2> Style: {product.product_type} </h2>
                    <h2> Size: {product.size} </h2>
                    <h2> Color: {product.color} </h2>
                  </div>
                  <div className="productSide">
                    <br />
                    <h2>$ {product.price * product.product_quantity} </h2>
                    <br /><br /><br /><br /><br /><br /><br />
                    <h2> Qty: {product.product_quantity} </h2>
                  </div>
                  <div className="productSide">
                    <br /><br /><br /><br /><br /><br />
                    <h2>$ {product.price * product.product_quantity}</h2>
                  </div>
                  <div className="CartPage" />
                </div>
              </div>
            ))}
          <br/>
          <div className = "CheckoutButtonPlacement">
            <h1> Total: {order.total_cost}</h1>
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
