import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import cart from "./assets/cart.png";
import DisplayProduct from "./DisplayProduct";

function Cart() {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);
  const [addedItems, setAddedItems] = useState(0);
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [customHighTotal, setCustomHighTotal] = useState(0);
  const [deleteProduct, setDeleteProduct] = useState("");
  const [enlarge, setEnlarge] = useState(false);
  const [enlargeProduct, setEnlargeProduct] = useState(false);
  const [userId, setUserId] = useState("");

  const checkout = (order) => {
    if (order['total_cost'] > 0) {
      navigate("/checkout");
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
      window.location.reload();
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
        window.location.reload();
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
    let oID = 0;
    if (localStorage.getItem("oID")) {
      oID = localStorage.getItem("oID");
    }
    else if (userId) {
      oID = 0;
    }
    else {
      setOrder({total_cost: 0});
    }
    fetch("/api/getOrder.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: oID
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      setOrder(data);
    });
  }, []);

  useEffect(() => {
    let oID = 0;
    if (localStorage.getItem("oID")) {
      oID = localStorage.getItem("oID");
    }
    else if (userId) {
      oID = 0;
    }
    fetch("/api/getCart.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: oID
      }),
    })
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
    let oID = 0;
    if (localStorage.getItem("oID")) {
      oID = localStorage.getItem("oID");
    }
    else if (userId) {
      oID = 0;
    }
    fetch("/api/totalItems.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: oID
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data["SUM(product_quantity)"]) {
        setAddedItems(data["SUM(product_quantity)"]);
      }
      else {
        setAddedItems(0);
      }
    })
  }, []);


  const confirmDelete = (product) => {
    setDeleteProduct(product);
    setShowConfirmation(true);
  }

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.fullDesign')) {
      setEnlarge(false);
    }
  };

  const confirmEnlarge = (product) => {
    setEnlargeProduct(product);
    setEnlarge(true);
  }
  
  return (
    <div className="mycart">
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
            <h1 className="ItemCount"> ${(order.total_cost * 1).toFixed(2)}
                                      {customHighTotal ? 
                                        <>
                                        {' '}- ${(order.total_cost * 1 + customHighTotal).toFixed(2)}
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
              <div className="customProduct">
                <div className="cartProductRow">
                  <div className="productsCell">
                    <button 
                      className="magnify"
                      onClick={() => confirmEnlarge(product)}>
                        {console.log(product)}
                      <DisplayProduct product={product} />
                    </button>
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
                    <h2>${(setPrice(product.price, product.product_type, product.size)).toFixed(2)} </h2>
                    <br /><br />
                    <h2> 
                      Qty: <button onClick={() => decreaseQuantity(product, product.product_id, product.product_quantity, setPrice(product.price, product.product_type, product.size), product.product_type, product.color, product.size).toFixed(2)}>-</button>
                      {product.product_quantity} 
                      <button onClick={() => increaseQuantity(product, product.product_id, product.product_quantity, setPrice(product.price, product.product_type, product.size), product.product_type, product.color, product.size).toFixed(2)}>+</button>
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
                    <h2>${(setPrice(product.price, product.product_type, product.size) * product.product_quantity).toFixed(2)}</h2>
                  </div>
                </div>
                <br />
                <h3 className="margin"> 
                  <b>Custom Details: </b>
                  {product.product_details} 
                  {product.customerFilename && 
                    <span>
                      <br />
                      This product includes an uploaded image: {product.customerFilename}
                    </span>
                  }
                </h3>
                <br />
              </div>
            :
              <div className="customProduct">
                <div className="cartProductRow">
                  <div className="productsCell">
                    <button 
                          className="magnify"
                          onClick={() => confirmEnlarge(product)}>
                      <DisplayProduct product={product} />
                    </button>
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
                    <h2>${(setPrice(product.price, product.product_type, product.size)).toFixed(2)} - ${(setPrice(product.price, product.product_type, product.size) + 6).toFixed(2)}</h2>
                    <br /><br />
                    <h2> 
                      Qty: <button onClick={() => decreaseQuantity(product, product.product_id, product.product_quantity, (setPrice(product.price, product.product_type, product.size)).toFixed(2), product.product_type, product.color, product.size)}>-</button>
                      {product.product_quantity} 
                      <button onClick={() => increaseQuantity(product, product.product_id, product.product_quantity, (setPrice(product.price, product.product_type, product.size)).toFixed(2), product.product_type, product.color, product.size)}>+</button>
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
                    <h2>${(setPrice(product.price, product.product_type, product.size) * product.product_quantity).toFixed(2)} - ${((setPrice(product.price, product.product_type, product.size) + 6) * product.product_quantity).toFixed(2)}</h2>
                  </div>
                </div>
                <br />
                <h3 className="margin"> 
                  <b>Custom Details: </b>
                  {product.product_details} 
                  {product.customerFilename && 
                    <span>
                      <br />
                      This product includes an uploaded image: {product.customerFilename}
                    </span>
                  }
                </h3>
                <br />
              </div>
            }
            {enlarge && enlargeProduct === product &&
              <div className="confirmation-modal" onClick={handleOutsideClick}>
                <div className="orderItem-dialog">
                  <span className="close-button" onClick={() => setEnlarge(false)}>&times;</span>
                  <DisplayProduct product={product} />
                </div>
              </div>
            }
            <div className="CartPage" />
          </div>
        ))}
      <br/>
      <div className = "FinalCheckoutButtonPlacement">
        <h1> Subtotal: ${(order.total_cost * 1).toFixed(2)}
                        {customHighTotal ? 
                        <>
                        {' '}- ${(order.total_cost * 1 + customHighTotal).toFixed(2)}
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
  );

}
export default Cart;
