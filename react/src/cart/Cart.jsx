import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cart from "../assets/cart.png";
import { GetProductPriceWithSize } from "../products/GetProductPriceWithSize";
import DisplayProductDetails from "../products/DisplayProductDetails";
import "./cart.css";

function Cart() {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);
  const [addedItems, setAddedItems] = useState(0);
  const navigate = useNavigate();
  const [customHighTotal, setCustomHighTotal] = useState(0);
  const [userId, setUserId] = useState("");

  // API Calls
  useEffect(() => {
    getSession();

    let oID = 0;
    if (localStorage.getItem("oID")) {
      oID = localStorage.getItem("oID");
    }

    getCart(oID);
    getTotalItems(oID);
  }, []);

  // Get Order based on userID
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
    fetch("/api/order/getOrder.php", {
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
  }, [userId]);

  // get userID
  const getSession = () => {
    fetch("/api/admin/session.php")
    .then((response) => response.json())
    .then((data) => {
      setUserId(data.userId);
    });
  }

  // get products in cart
  const getCart = (oID) => {
    fetch("/api/cart/getCart.php", {
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
      for (const product of data) {
        console.log(product.product_id);
        if (product.product_id == 0) {
          total += (6 * product.product_quantity)
        }
      }
      setCustomHighTotal(total);
    });
  }

  // get total number of items in cart
  const getTotalItems = (oID) => {
    fetch("/api/order/totalItems.php", {
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
    });
  }

  // proceed to checkout
  // TODO - lock cart until checkout session is complete
  const checkout = (order) => {
    if (order['total_cost'] > 0) {
      navigate("/checkout");
    }
  }

  // return to previous page
  const goBack = () => {
    if (localStorage.getItem('lastProductCategory')) {
      navigate(localStorage.getItem('lastProductCategory'));
    }
    else {
      navigate('/products');
    }
  };

  return (
    <div className="Cart">
      <br />
      <div className="fullContainer">
      <div className="noWrapRow">
        <div className="cartSide">
          <div className="split50">
            <button onClick={() => goBack()} className="default-button">
              Continue Shopping
            </button>
          </div>
          <div className="split50">
            <h1>&nbsp;{addedItems} item(s)</h1>
          </div>
        </div>
        <div className="cartMiddle">
          <div className="noWrapRow">
            <img src={cart} alt="Cart" className="cartImg"/>
            <h1>My Cart</h1>
            <img src={cart} alt="Cart" className="cartImg"/>
          </div>
        </div>
        <div className="cartSide">
          <div className="split50">
            <h1 className="inline"> 
              ${(order.total_cost * 1).toFixed(2)}
                {customHighTotal > 0 &&
                  <>
                    {' '}- ${(order.total_cost * 1 + customHighTotal).toFixed(2)}
                  </>
                }
            </h1>
          </div>
          <div className="split50">
            <button onClick={() => checkout(order)} className="default-button">
              Check Out
            </button>
          </div>
        </div>
      </div>
      <div className="default-width">
        <div className="blackLine" />
      </div>
      {products.map((product) => (
        <div key={[product.product_id, product.product_type, product.size, product.color, product.product_details]}>
          <DisplayProductDetails order={order} product={product} active={1} />
          <div className="default-width">
            <div className="blackLine" />
          </div>
        </div>
      ))}
      <div className="noWrapRow">
        <div className="split70" />
        <div className="split30">
          <div className="cartSubTotal">
            <h2> Subtotal: ${(order.total_cost * 1).toFixed(2)}
              {customHighTotal ? 
                <>
                {' '}- ${(order.total_cost * 1 + customHighTotal).toFixed(2)}
                </> 
              :
                <div />
              }
            </h2>
          </div>
          <div className="blackLine" />
          <br/>
          <button onClick={() => checkout(order)} className="default-button">
            Check Out
          </button>
        </div>
      </div>
      </div>
    </div>
  );

}
export default Cart;
