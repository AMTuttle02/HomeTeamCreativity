import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

function CheckoutDetails() {
    const [userId, setUserId] = useState("");
    const [order, setOrder] = useState([]);
    const [addedItems, setAddedItems] = useState(0);

    const checkout = (order) => {
        if (order['total_cost'] > 0) {
          window.location.href="/api/stripeCheckout.php";
        }
    }

    useEffect(() => { 
        fetch("/api/getOrder.php")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setOrder(data);
        });
    }, []);

    useEffect(() => {
        fetch("/api/session.php")
        .then((response) => response.json())
        .then((data) => {
            setUserId(data.userId);
        });
    }, []);

    useEffect(() => { 
        fetch("/api/totalItems.php")
        .then((response) => response.json())
        .then((data) => {
          setAddedItems(data["SUM(product_quantity)"]);
        })
    }, []);

  return (
    <div className="CheckoutDetails">
        <div className="mycart">
            {userId ?
            <div>
                <br/>
                <br/>
                <div className="row">
                    <div className = "PaymentButtonPlacement">
                        <h1 className="ItemCount"> Total: ${order.total_cost}</h1>
                        <br/>
                        <button onClick={() => checkout(order)} className="CheckoutButton">
                        Continue To Payment
                        </button>
                    </div>
                </div>
                <br/>
                <br />
                <br />
                </div>
            :
            <div>
                <center>
                <br/>
                <h1>Sorry, you must be logged in to checkout.</h1>
                <br />
                <Link to="/login" className="addToCart">
                    Login Here
                </Link>
                </center>
            </div>
            }
        </div>
    </div>
  );
}
export default CheckoutDetails;