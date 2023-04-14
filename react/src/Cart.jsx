import React, { useState, useEffect } from "react";
import tshirt from "./assets/blackTShirt.png";
import longSleeve from "./assets/blackLongSleeve.png";
import crewneck from "./assets/blackCrewneck.png";
import hoodie from "./assets/blackHoodie.png";
import { Link } from "react-router-dom";
import cart from "./assets/cart.png";


function setType(type) {
  if (type == "Crewneck Sweatshirt") {
    return crewneck;
  }
  else if (type == "Hooded Sweatshirt") {
    return hoodie;
  }
  else if (type == "Long Sleeve T-Shirt") {
    return longSleeve;
  }
  else {
    return tshirt;
  }
}

function Cart() {
  const [userId, setUserId] = useState("");
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);
  const [addedItems, setAddedItems] = useState(0);

  const setPrice = (price, type, size) => {
    price = price * 1;
    if (type == "Crewneck Sweatshirt") {
      price += 8;
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large") {
        price += 2;
      }
    }
    else if (type == "Hooded Sweatshirt") {
      price += 12;
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large") {
        price += 2;
      }
    }
    else if (type == "Long Sleeve T-Shirt") {
      price += 4;
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large") {
        price += 2;
      }
    }
    else {
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large") {
        price += 2;
      }
    }
    return price;
  }

  const deleteFromCart = (product, order) => {
    fetch("/api/deleteFromCart.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        order_id: order.order_id, 
        product_id: product.product_id, 
        quantity: product.product_quantity, 
        color: "Black",
        product_type: product.product_type,
        size: product.size,
        price: setPrice(product.price, product.product_type, product.size) * product.product_quantity}),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data == 1) {
        window.location.href='/cart';
      }
    })
  }

  const increaseQuantity = (productId, quantity, price) => {
    order['total_cost'] *= 1;
    order['total_cost'] += (price * 1);
    setAddedItems(addedItems + 1);
    setProducts(prevData => {
      const updatedData = prevData.map(product => {
        if (product.product_id === productId) {
          return {
            ...product,
            product_quantity: quantity + 1
          }
        } else {
          return product;
        }
      })
      return updatedData;
    })
  }

  const decreaseQuantity = (productId, quantity, price) => {
    if (quantity > 1) {
      order['total_cost'] *= 1;
      order['total_cost'] -= (price * 1);
    }
    setProducts(prevData => {
      const updatedData = prevData.map(product => {
        if (product.product_id === productId && quantity > 1) {
          return {
            ...product,
            product_quantity: quantity - 1
          }
        } else {
          return product;
        }
      })
      return updatedData;
    })
  }

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
          <div className="cartSideItem">
            <h1 className="ItemCount"> Total: ${order.total_cost}</h1>
            <h1 className="ItemCount"> {products.length + addedItems} item(s)</h1>
          </div>
          <div className="cartSideCheckout">
            <div className = "CheckoutButtonPlacement">
              <br/>
              <Link to="/payment" className="CheckoutButton">
                Check Out
              </Link>
            </div>
          </div>
        </div>
        <br />

        <div className="CartPage" />
            {products.map((product) => (
              <div key={product.product_id}>
                <div className="row">
                  <div className="productSideLeft" />
                  <div className="productSide">
                    <div className="fullDesign">
                      <img
                        src={setType(product.product_type)}
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
                  {product.product_id ?
                    <div className="productSide">
                      <br />
                      <h2>$ {setPrice(product.price, product.product_type, product.size)} </h2>
                      <br /><br />
                      <h2> 
                      
                        Qty: <button onClick={() => decreaseQuantity(product.product_id, product.product_quantity, setPrice(product.price, product.product_type, product.size))}>-</button>
                        
                        {product.product_quantity} 
                        <button onClick={() => increaseQuantity(product.product_id, product.product_quantity, setPrice(product.price, product.product_type, product.size))}>+</button>
                      </h2>
                      <br /><br />
                      <h2>
                        <button onClick={() => deleteFromCart(product, order)} className="noDisplay">
                          Delete
                        </button>
                      </h2>
                    </div>
                    :
                    <div className="productSide">
                      <br />
                      <h2>$ {setPrice(product.price, product.product_type, product.size)}+ </h2>
                      <br /><br />
                      <h2> Qty: {product.product_quantity} </h2>
                      <br /><br />
                      <h2>
                        <button onClick={() => deleteFromCart(product, order)} className="noDisplay">
                          Delete
                        </button>
                      </h2>
                    </div>
                  }
                  {product.product_id ?
                    <div className="productSide">
                      <br /><br /><br /><br /><br /><br />
                      <h2>$ {setPrice(product.price, product.product_type, product.size) * product.product_quantity}</h2>
                    </div>
                  :
                  <div className="productSide">
                    <br /><br /><br /><br /><br /><br />
                    <h2>$ {setPrice(product.price, product.product_type, product.size) * product.product_quantity}+</h2>
                  </div>
                  }
                  <div className="CartPage" />
                </div>
              </div>
            ))}
          <br/>
          <div className = "CheckoutButtonPlacement">
            <h1> Total: ${order.total_cost}</h1>
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
