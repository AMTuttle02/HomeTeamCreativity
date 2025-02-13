import React, { useState, useEffect } from "react";
import DisplayProduct from "../products/DisplayProduct";
import { GetProductPriceWithSize } from "../products/GetProductPriceWithSize";

function DisplayProductDetails({ order, product, active }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState("");
  const [enlarge, setEnlarge] = useState(false);
  const [enlargeProduct, setEnlargeProduct] = useState(false);

  // remove product
  const removeProduct = () => {
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
        window.location.reload();
      }
    })
  }

  // increase quantity of a product in cart
  const increaseQuantity = () => {
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
      if (data) {
        window.location.reload();
      }
    })
  }

  // decrease quantity of a product in cart
  const decreaseQuantity = () => {
    if (product.product_quantity > 1) {
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
        if (data) {
          window.location.reload();
        }
      })
    }
  }

  // show confirmation message before removing product from cart
  const confirmDelete = () => {
    setShowConfirmation(true);
  }

  // close enlarged product view
  const handleOutsideClick = (event) => {
    if (!event.target.closest('.fullDesign')) {
      setEnlarge(false);
    }
  };

  // enlarge product view
  const confirmEnlarge = () => {
    setEnlarge(true);
  }

  return (
    <div className="DisplayProductDetails">
      <div className="mobileWrapRow">
        <div className="split25">
          <button 
            className="magnify"
            onClick={() => confirmEnlarge(product)}>
            <DisplayProduct product={product} />
          </button>
        </div>
        <div className="split25">
          <div className="cartProductDetails">
            <h2>
              <b>
                {product.product_name}
              </b>
            </h2>
            <h2> Style: {product.product_type} </h2>
            <h2> Size: {product.size} </h2>
            <h2> Color: {product.color} </h2>
          </div>
        </div>
        <div className="split25">
          <div className="cartProductPricing">
            {product.product_id != 0 ?
              <div>
                <h2>&nbsp;</h2>
                <h2>${(GetProductPriceWithSize(product.price, product.product_type, product.size)).toFixed(2)} </h2>
                <h2> 
                  Qty:&nbsp;
                  {active === 1 && 
                    <button onClick={() => decreaseQuantity()}>-</button>
                  }
                  &nbsp;
                  {product.product_quantity}
                  &nbsp;
                  {active === 1 && 
                    <button onClick={() => increaseQuantity()}>+</button>
                  }
                </h2>
              </div>
            :
              <div>
                <h2>&nbsp;</h2>
                <h2>${(GetProductPriceWithSize(product.price, product.product_type, product.size)).toFixed(2)} - ${(GetProductPriceWithSize(product.price, product.product_type, product.size) + 6).toFixed(2)}</h2>
                <h2> 
                  Qty:&nbsp;
                  {active === 1 && 
                    <button onClick={() => decreaseQuantity()}>-</button>
                  }
                  &nbsp;
                  {product.product_quantity}
                  &nbsp;
                  {active === 1 && 
                    <button onClick={() => increaseQuantity()}>+</button>
                  }
                </h2>
              </div>
            }
          </div>
          {active === 1 && 
            <div className="cartDeleteButton">
            <button onClick={() => confirmDelete()} className="delete-button">
              Remove From Cart
            </button>
            </div>
          }
        </div>
        <div className="split25">
          {product.product_id != 0 ?
            <div className="cartProductPricing">
              <h2>&nbsp;</h2>
              <h2>${(GetProductPriceWithSize(product.price, product.product_type, product.size) * product.product_quantity).toFixed(2)}</h2>
            </div>
            :
            <div className="cartProductPricing">
              <h2>&nbsp;</h2>
              <h2>${(GetProductPriceWithSize(product.price, product.product_type, product.size) * product.product_quantity).toFixed(2)} - ${((GetProductPriceWithSize(product.price, product.product_type, product.size) + 6) * product.product_quantity).toFixed(2)}</h2>
            </div>
          }
        </div>
      </div>
      <br />
      <div className="customDetails">
        <h3> 
          {product.product_details && 
            <span>
              Custom Details:&nbsp;{product.product_details} 
            </span>
          }
          {product.customerFilename && 
            <span>
              <br />
              This product includes an uploaded image: {product.customerFilename}
            </span>
          }
        </h3>
      </div>
      {showConfirmation &&
        <div className="confirmation-modal">
          <div className="confirmation-dialog">
            <h3>Remove From Cart</h3>
            <p>Are you sure you want to remove "{product.product_name}" from your cart?</p>
            <div className="confirmation-buttons">
              <button onClick={() => setShowConfirmation(false)} className="default-button">Cancel</button>
              <button onClick={() => removeProduct()} className="delete-button">Delete</button>
            </div>
          </div>
        </div>
      }
      {enlarge &&
        <div className="confirmation-modal" onClick={handleOutsideClick}>
          <div className="enlarge">
            <span className="close-button" onClick={() => setEnlarge(false)}>&times;</span>
            <DisplayProduct product={product} />
          </div>
        </div>
      }
    </div>
  );

}
export default DisplayProductDetails;
