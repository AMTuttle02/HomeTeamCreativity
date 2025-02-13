import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cart from "../assets/cart.png";
import DisplayProduct from "../products/DisplayProduct";
import { GetProductPriceWithSize } from "../products/GetProductPriceWithSize";
import DisplayProductDetails from "../products/DisplayProductDetails";
import "./cart.css";

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

  // delete product from cart
  const deleteFromCart = (product, order) => {
    fetch("/api/cart/deleteFromCart.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        order_id: order.order_id, 
        product_id: product.product_id, 
        quantity: product.product_quantity, 
        color: product.color,
        product_type: product.product_type,
        size: product.size,
        price: GetProductPriceWithSize(product.price, product.product_type, product.size) * product.product_quantity,
        product_details: product.product_details})
    })
    .then((response) => response.json())
    .then((data) => {
      if (data == 1) {
        window.location.href='/cart';
      }
    })
  }

  // increase quantity of a product in cart
  const increaseQuantity = (product, productId, quantity, price, style, color, size, product_details) => {
    fetch("/api/cart/increaseQuantity.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        order_id: order.order_id, 
        product_id: product.product_id, 
        quantity: product.product_quantity, 
        color: product.color,
        product_type: product.product_type,
        size: product.size,
        price: GetProductPriceWithSize(product.price, product.product_type, product.size),
        product_details: product.product_details}),
    })
    .then((response) => response.json())
    .then((data) => {
      if (productId == 0) {
        const temp = customHighTotal;
        setCustomHighTotal(temp + 6);
      }
      window.location.reload();
    })

    order['total_cost'] *= 1;
    order['total_cost'] += (price * 1);
    setAddedItems((addedItems * 1) + 1);
    setProducts(prevData => {
      const updatedData = prevData.map(product => {
        if (product.product_id === productId && product.product_type === style && product.color === color && product.size === size && product.product_details === product_details) {
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

  // decrease quantity of a product in cart
  const decreaseQuantity = (product, productId, quantity, price, style, color, size, product_details) => {
    if (quantity > 1) {
      fetch("/api/cart/decreaseQuantity.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          order_id: order.order_id, 
          product_id: product.product_id, 
          quantity: product.product_quantity, 
          color: product.color,
          product_type: product.product_type,
          size: product.size,
          price: GetProductPriceWithSize(product.price, product.product_type, product.size),
          product_details: product.product_details}),
      })
      .then((response) => response.json())
      .then((data) => {
        if (productId == 0) {
          const temp = customHighTotal;
          setCustomHighTotal(temp - 6);
        }
        window.location.reload();
      })

      order['total_cost'] *= 1;
      order['total_cost'] -= (price * 1);
      setAddedItems(addedItems - 1);
    }
    setProducts(prevData => {
      const updatedData = prevData.map(product => {
        if (product.product_id === productId && product.product_type === style && product.color === color && product.size === size && quantity > 1 && product.product_details === product_details) {
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

  // show confirmation message before removing product from cart
  const confirmDelete = (product) => {
    setDeleteProduct(product);
    setShowConfirmation(true);
  }

  // close enlarged product view
  const handleOutsideClick = (event) => {
    if (!event.target.closest('.fullDesign')) {
      setEnlarge(false);
    }
  };

  // enlarge product view
  const confirmEnlarge = (product) => {
    setEnlargeProduct(product);
    setEnlarge(true);
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
        <div className="whiteLine" />
      </div>
      {products.map((product) => (
        <div key={[product.product_id, product.product_type, product.size, product.color, product.product_details]}>
          <DisplayProductDetails order={order} product={product} active={1} />
          <div className="default-width">
            <div className="whiteLine" />
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
          <div className="whiteLine" />
          <br/>
          <button onClick={() => checkout(order)} className="default-button">
            Check Out
          </button>
        </div>
      </div>
    </div>
  );

}
export default Cart;
