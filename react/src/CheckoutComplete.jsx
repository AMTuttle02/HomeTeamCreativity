import React, { useEffect, useState } from "react";
import DisplayProduct from "./DisplayProduct";

function Checkout() {
  const [userId, setUserId] = useState("");
  const [products, setProducts] = useState([]);
  const [customHighTotal, setCustomHighTotal] = useState(0);
  const [enlarge, setEnlarge] = useState(false);
  const [enlargeProduct, setEnlargeProduct] = useState(false);

  useEffect(() => {
    let oID = 0;
    if (localStorage.getItem("oID")) {
        oID = localStorage.getItem("oID");
        localStorage.clear();
    }
    else if (userId) {
        oID = 0;
    }
    fetch("/api/recentOrderDetails.php")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        for (let i = 0; i < data.length; ++i) {
          if (data[i].product_id == 0) {
            const temp = customHighTotal;
            setCustomHighTotal(temp + (6 * data[i].product_quantity));
          }
        }
      });
  }, []);

  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.userId);
      });
  }, []);

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

  const determineDesign = (color) => {
    if (color == 'Yellow' || color == 'Gray' || color == 'White') {
      return ('customDesignBlack.png')
    }
    else {
      return ('customDesign.png')
    }
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
    <div className="Checkout">
        <div className="success">
          <h1>Thank you for placing an order!</h1>
          <br />
          <h1>We will reach out soon with an order confirmation and next steps.</h1>
          <br />
          <h1>Have a question? Feel Free To Reach Out <a href="https://linktr.ee/hometeamcreativity" target="_blank" className="white">Here</a></h1>
          <br/>
          <div className="CartPage" />
          <br />
          <div className="cartMain">
            <br />
            <h1>Order Details</h1>
          </div>
          <br />
          <div className="CartPage" />
            {products.map((product) => (
            <div key={product.product_id}>
              {product.product_id ?
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
                  <br />
                  <div className="productsCell">
                    <br /><br />
                    <h2>${(setPrice(product.price, product.product_type, product.size) * product.product_quantity).toFixed(2)}</h2>
                    <br /><br />
                    <h2> 
                      Qty:{' '}
                      {product.product_quantity} 
                    </h2>
                  </div>
                  <div className="productsCell">
                    <br /><br /><br /><br /><br /><br />
                    <h2>${(setPrice(product.price, product.product_type, product.size) * product.product_quantity).toFixed(2)}</h2>
                  </div>
                </div>
              :
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
                  <br />
                  <div className="productsCell">
                    <br /><br />
                    <h2>${setPrice(product.price, product.product_type, product.size).toFixed(2)} - ${(setPrice(product.price, product.product_type, product.size) * 1 +customHighTotal).toFixed(2)}</h2>
                    <br /><br />
                    <h2> 
                      Qty:{' '} 
                      {product.product_quantity} 
                    </h2>
                  </div>
                  <div className="productsCell">
                    <br /><br /><br /><br /><br /><br />
                    <h2>${(setPrice(product.price, product.product_type, product.size) * product.product_quantity).toFixed(2)} - ${(setPrice(product.price, product.product_type, product.size) * product.product_quantity * 1 +customHighTotal).toFixed(2)}</h2>
                  </div>
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
        </div>
    </div>
  );
}
export default Checkout;