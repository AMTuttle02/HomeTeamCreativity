import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import cart from "./assets/cart.png";
import blackTshirt from "./assets/blackTShirt.png";
import blackLongSleeve from "./assets/blackLongSleeve.png";
import blackCrewneck from "./assets/blackCrewneck.png";
import blackHoodie from "./assets/blackHoodie.png";
import grayTshirt from "./assets/GreyTShirt.png";
import grayLongSleeve from "./assets/GreyLongSleeve.png";
import grayCrewneck from "./assets/GreyCrewneckSS.png";
import grayHoodie from "./assets/GreyHoodie.png";
import RedTshirt from "./assets/RedTShirt.png";
import RedLongSleeve from "./assets/RedLongSleeve.png";
import RedHoodie from "./assets/RedHoodie.png";
import YellowTshirt from "./assets/YellowTShirt.png";
import PinkTshirt from "./assets/PinkTShirt.png";
import GreenTshirt from "./assets/GreenTShirt.png";
import MaroonTshirt from "./assets/MaroonTShirt.png";
import OrangeTshirt from "./assets/OrangeTShirt.png";
import PurpleTshirt from "./assets/PurpleTShirt.png";
import RoyalTshirt from "./assets/RoyalTShirt.png";
import RoyalLongSleeve from "./assets/RoyalLongSleeve.png";
import NavyTshirt from "./assets/NavyTShirt.png";
import NavyLongSleeve from "./assets/NavyLongSleece.png";
import NavyHoodie from "./assets/NavyHoodie.png";
import WhiteTshirt from "./assets/WhiteTShirt.png";
import WhiteLongSleeve from "./assets/WhiteLongSleeve.png";
import WhiteCrewneck from "./assets/WhiteCrewneckSS.png";
import WhiteHoodie from "./assets/WhiteHoodie.png";


function setType(type, color) {
  if (type == "Crewneck Sweatshirt") {
    if (color == "Black") {
      return blackCrewneck;
    }
    else if (color == "Gray") {
      return grayCrewneck;
    }
    else if (color == "White") {
      return WhiteCrewneck;
    }
  }
  else if (type == "Hooded Sweatshirt") {
    if (color == "Black") {
      return blackHoodie;
    }
    else if (color == "Gray") {
      return grayHoodie;
    }
    else if (color == "White") {
      return WhiteHoodie;
    }
    else if (color == "Red") {
      return RedHoodie;
    }
    else if (color == "Navy") {
      return NavyHoodie;
    }
  }
  else if (type == "Long Sleeve T-Shirt") {
    if (color == "Black") {
      return blackLongSleeve;
    }
    else if (color == "Gray") {
      return grayLongSleeve;
    }
    else if (color == "White") {
      return WhiteLongSleeve;
    }
    else if (color == "Navy") {
      return NavyLongSleeve;
    }
    else if (color == "Red") {
      return RedLongSleeve;
    }
    else if (color == "Royal") {
      return RoyalLongSleeve;
    }
  }
  else {
    if (color == "Black") {
      return blackTshirt;
    }
    else if (color == "Gray") {
      return grayTshirt;
    }
    else if (color == "White") {
      return WhiteTshirt;
    }
    else if (color == "Yellow") {
      return YellowTshirt;
    }
    else if (color == "Pink") {
      return PinkTshirt;
    }
    else if (color == "Green") {
      return GreenTshirt;
    }
    else if (color == "Maroon") {
      return MaroonTshirt;
    }
    else if (color == "Orange") {
      return OrangeTshirt;
    }
    else if (color == "Purple") {
      return PurpleTshirt;
    }
    else if (color == "Red") {
      return RedTshirt;
    }
    else if (color == "Royal") {
      return RoyalTshirt;
    }
    else if (color == "Navy") {
      return NavyTshirt;
    }
  }
}

function Cart() {
  const [userId, setUserId] = useState("");
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);
  const [addedItems, setAddedItems] = useState(0);
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [customHighTotal, setCustomHighTotal] = useState(0);
  const [deleteProduct, setDeleteProduct] = useState("");

  const checkout = (order) => {
    if (order['total_cost'] > 0) {
      navigate("/checkout");
      //window.location.href="/api/stripeCheckout.php";
    }
  }

  const setPrice = (price, type, size) => {
    price = price * 1;
    if (type == "Crewneck Sweatshirt") {
      price += 8;
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large" || size == "Adult XXX-Large") {
        price += 2;
      }
    }
    else if (type == "Hooded Sweatshirt") {
      price += 12;
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large" || size == "Adult XXX-Large") {
        price += 2;
      }
    }
    else if (type == "Long Sleeve T-Shirt") {
      price += 4;
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large" || size == "Adult XXX-Large") {
        price += 2;
      }
    }
    else {
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large" || size == "Adult XXX-Large") {
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
        color: product.color,
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

  const increaseQuantity = (product, productId, quantity, price, style, color, size) => {
    fetch("/api/increaseQuantity.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        order_id: order.order_id, 
        product_id: product.product_id, 
        quantity: product.product_quantity, 
        color: product.color,
        product_type: product.product_type,
        size: product.size,
        price: setPrice(product.price, product.product_type, product.size)}),
    })
    .then((response) => response.json())
    .then((data) => {
      if (productId == 0) {
        const temp = customHighTotal;
        setCustomHighTotal(temp + 6);
        console.log(customHighTotal);
      }
    })

    order['total_cost'] *= 1;
    order['total_cost'] += (price * 1);
    setAddedItems((addedItems * 1) + 1);
    setProducts(prevData => {
      const updatedData = prevData.map(product => {
        if (product.product_id === productId && product.product_type === style && product.color === color && product.size === size) {
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

  const decreaseQuantity = (product, productId, quantity, price, style, color, size) => {
    if (quantity > 1) {
      fetch("/api/decreaseQuantity.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          order_id: order.order_id, 
          product_id: product.product_id, 
          quantity: product.product_quantity, 
          color: product.color,
          product_type: product.product_type,
          size: product.size,
          price: setPrice(product.price, product.product_type, product.size)}),
      })
      .then((response) => response.json())
      .then((data) => {
        if (productId == 0) {
          const temp = customHighTotal;
          setCustomHighTotal(temp - 6);
          console.log(customHighTotal);
        }
      })

      order['total_cost'] *= 1;
      order['total_cost'] -= (price * 1);
      setAddedItems(addedItems - 1);
    }
    setProducts(prevData => {
      const updatedData = prevData.map(product => {
        if (product.product_id === productId && product.product_type === style && product.color === color && product.size === size && quantity > 1) {
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

  const determineDesign = (color) => {
    if (color == 'Yellow' || color == 'Gray' || color == 'White') {
      return ('customDesignBlack.png')
    }
    else {
      return ('customDesign.png')
    }
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
      setOrder(data);
    });
  }, []);

  useEffect(() => { 
    fetch("/api/getCart.php")
    .then((response) => response.json())
    .then((data) => {
      setProducts(data);
      console.log(data);
      let total = 0;
      for (let i = 0; i < data.length; ++i) {
        console.log(data[i].product_id);
        if (data[i].product_id == 0) {
          total += (6 * data[i].product_quantity)
        }
      }
      setCustomHighTotal(total);
    });
  }, []);

  useEffect(() => { 
    fetch("/api/totalItems.php")
    .then((response) => response.json())
    .then((data) => {
      setAddedItems(data["SUM(product_quantity)"]);
    })
  }, []);


  const confirmDelete = (product) => {
    setDeleteProduct(product);
    setShowConfirmation(true);
  }
  
  return (
    <div className="mycart">
      {userId ?
      <div>
        <br/>
        <div className="cartRow">
          <div className="cartSide">
            <Link to="/products" className="ReturnShopping">
              Continue Shopping
            </Link>
          </div>
          <div className="cartMain">
            <div className="cartRow">
              <div className="myCartSide">
                <img src={cart} alt="Cart Image" className="cartImg"/>
              </div>
              <div className="myCartMain">
                <h1>My Cart</h1>
              </div> 
              <div className="myCartSide">
                <img src={cart} alt="Cart Image" className="cartImg"/>
              </div>
            </div>
          </div>
            <div className="cartSideItem">
              <h1 className="ItemCount"> ${order.total_cost * 1}
                                        {customHighTotal ? 
                                          <>
                                          {' '}- ${order.total_cost * 1 + customHighTotal}
                                          </> : <div />}</h1>
              <h1 className="ItemCount"> {addedItems} item(s)</h1>
            </div>
          <div className="cartSideCheckout">
            <div className = "CheckoutButtonPlacement">
              <br/>
              <button onClick={() => checkout(order)} className="CheckoutButton">
                Check Out
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="CartPage" />
          {products.map((product) => (
            <div key={[product.product_id, product.product_type, product.size, product.color]}>
              {product.product_id ?
                <div className="cartProductRow">
                  <div className="productsCell">
                    <div className="fullDesign">
                      <img
                        src={setType(product.product_type, product.color)}
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
                  <div className="productsCell">
                    <br />
                    <h2> <b> {product.product_name} </b></h2> 
                    <h2> Style: {product.product_type} </h2>
                    <h2> Size: {product.size} </h2>
                    <h2> Color: {product.color} </h2>
                  </div>
                  <div className="productsCell">
                    <br />
                    <h2>${setPrice(product.price, product.product_type, product.size)} </h2>
                    <br /><br />
                    <h2> 
                      Qty: <button onClick={() => decreaseQuantity(product, product.product_id, product.product_quantity, setPrice(product.price, product.product_type, product.size), product.product_type, product.color, product.size)}>-</button>
                      {product.product_quantity} 
                      <button onClick={() => increaseQuantity(product, product.product_id, product.product_quantity, setPrice(product.price, product.product_type, product.size), product.product_type, product.color, product.size)}>+</button>
                    </h2>
                    <br /><br />
                    <h2>
                      <button onClick={() => confirmDelete(product)} className="CartRemoveProductButton">
                        Delete
                      </button>
                    </h2>
                  </div>
                  {showConfirmation && deleteProduct === product &&
                    <div className="confirmation-modal">
                      <div className="confirmation-dialog">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to remove "{product.product_name}" from your cart?</p>
                        <div className="confirmation-buttons">
                          <button onClick={() => setShowConfirmation(false)}>Cancel</button>
                          <button onClick={() => deleteFromCart(product, order)} className="delete-button">Delete</button>
                        </div>
                      </div>
                    </div>
                  }
                  <div className="productsCell">
                    <br /><br /><br /><br /><br /><br />
                    <h2>${setPrice(product.price, product.product_type, product.size) * product.product_quantity}</h2>
                  </div>
                </div>
              :
                <div className="customProduct">
                  <div className="cartProductRow">
                    <div className="productsCell">
                      <div className="fullDesign">
                        <img
                          src={setType(product.product_type, product.color)}
                          alt="Home Team Creativity Logo"
                          className="tshirt"
                        />
                        <img
                          src={"api/images/" + determineDesign(product.color)}
                          alt={product.filename}
                          className="design"
                        />
                      </div>
                    </div>
                    <div className="productsCell">
                      <br />
                      <h2> <b> {product.product_name} </b></h2> 
                      <h2> Style: {product.product_type} </h2>
                      <h2> Size: {product.size} </h2>
                      <h2> Color: {product.color} </h2>
                    </div>
                    <div className="productsCell">
                      <br />
                      <h2>${setPrice(product.price, product.product_type, product.size)} - ${setPrice(product.price, product.product_type, product.size) + 6}</h2>
                      <br /><br />
                      <h2> 
                        Qty: <button onClick={() => decreaseQuantity(product, product.product_id, product.product_quantity, setPrice(product.price, product.product_type, product.size), product.product_type, product.color, product.size)}>-</button>
                        {product.product_quantity} 
                        <button onClick={() => increaseQuantity(product, product.product_id, product.product_quantity, setPrice(product.price, product.product_type, product.size), product.product_type, product.color, product.size)}>+</button>
                      </h2>
                      <br /><br />
                      <h2>
                        <button onClick={() => confirmDelete(product)} className="CartRemoveProductButton">
                          Delete
                        </button>
                      </h2>
                    </div>
                    {showConfirmation && deleteProduct === product &&
                      <div className="confirmation-modal">
                        <div className="confirmation-dialog">
                          <h3>Confirm Delete</h3>
                          <p>Are you sure you want to remove "{product.product_name}" from your cart?</p>
                          <div className="confirmation-buttons">
                            <button onClick={() => setShowConfirmation(false)}>Cancel</button>
                            <button onClick={() => deleteFromCart(product, order)} className="delete-button">Delete</button>
                          </div>
                        </div>
                      </div>
                    }
                    <div className="productsCell">
                      <br /><br /><br /><br /><br /><br />
                      <h2>${setPrice(product.price, product.product_type, product.size) * product.product_quantity} - ${(setPrice(product.price, product.product_type, product.size) + 6) * product.product_quantity}</h2>
                    </div>
                  </div>
                  <br />
                  <h3 className="margin"> 
                    <b>Custom Details: </b>
                    {product.product_details} 
                  </h3>
                  <br />
                </div>
              }
              <div className="CartPage" />
            </div>
          ))}
        <br/>
        <div className = "FinalCheckoutButtonPlacement">
          <h1> Subtotal: ${order.total_cost * 1}
                          {customHighTotal ? 
                          <>
                          {' '}- ${order.total_cost * 1 + customHighTotal}
                          </> : <div />}</h1>
          <div className="CartPage" />
          <br/>
          <button onClick={() => checkout(order)} className="FinalCheckoutButton">
            Check Out
          </button>
        </div>
        <br/>
        <br />
        <br />
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
