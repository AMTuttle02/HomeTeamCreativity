import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisplayProductDetails from "../products/DisplayProductDetails";

function Checkout() {
  const [products, setProducts] = useState([]);
  const [customHighTotal, setCustomHighTotal] = useState(0);
  const { orderId, paid, stripe } = useParams();

  // API Calls
  useEffect(() => {
    const checkout = () => {
      fetch("/api/order/checkout.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({orderId, paid, stripe}),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data === 1) {
          getDetails();
        }
      });
    }

    const getDetails = () => {
      let oID = 0;
      if (localStorage.getItem("oID")) {
          oID = localStorage.getItem("oID");
          localStorage.clear();
      }
      fetch("/api/order/recentOrderDetails.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({orderId}),
      })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        for (const element of data) {
          if (element.product_id == 0) {
            const temp = customHighTotal;
            setCustomHighTotal(temp + (6 * element.product_quantity));
          }
        }
      });
    }

    if (orderId && paid && stripe) {
      checkout();
    }
  }, [orderId, paid, stripe]);

  return (
    <div className="CheckoutComplete">
      <br />
        <div className="fullContainer">
          <div className="center">
            <h1>Thank you for placing an order!</h1>
            <h3>We will reach out soon with an order confirmation and next steps.</h3>
            <h3>Have a question? Feel Free To Reach Out <a href="https://linktr.ee/hometeamcreativity" target="_blank" className="white">Here</a></h3>
            <h1>Order Details</h1>
          </div>
          <div className="default-width">
            <div className="blackLine"/>
          </div>
          {products.map((product) => (
            <div key={[product.product_id, product.product_type, product.size, product.color, product.product_details]}>
              <DisplayProductDetails order={orderId} product={product} active={0} />
            </div>
          ))}
          <br/>
        </div>
    </div>
  );
}
export default Checkout;