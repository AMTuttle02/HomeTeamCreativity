import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CheckoutDetails() {
    const [userId, setUserId] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [order, setOrder] = useState([]);
    const [email, setEmail] = useState("");
    const [shipping, setShipping] = useState(0);
    const [paying, setPaying] = useState(1);

    const payNow = () => {
        window.location.href = "/api/stripeCheckout.php";
    };

    const payLater = () => {
        window.location.href = "/api/checkout.php";
    };
      

    useEffect(() => { 
        fetch("/api/getOrder.php")
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          setOrder(data);
        });
    }, []);

    useEffect(() => {
        fetch("/api/session.php")
        .then((response) => response.json())
        .then((data) => {
            setUserId(data.userId);
            setFirst(data.first_name);
            setLast(data.last_name);
            setEmail(data.email);
        });
    }, []);

  return (
    <div className="CheckoutDetails">
        <div className="mycart">
            {userId ?
            <div>
                <br />
                <div className="container">
                    <h3>Checkout Details</h3>
                    <div className="row">
                        <div className="split50">
                            <label>First Name</label>
                            <input type="text" id="first" name="first" defaultValue={first} />
                        </div>
                        <div className="split50">
                            <label>Last Name</label>
                            <input type="text" id="last" name="last" defaultValue={last} />
                        </div>
                    </div>
                    <label> Email</label>
                    <input type="text" id="email" name="email" defaultValue={email} />
                    <br />
                    <br />
                    <div className="row">
                        <div className="split50Center">
                            <label>
                                <input type="radio" checked={shipping === 0} onChange={() => setShipping(0)}/> Pickup
                            </label>
                        </div>
                        <div className="split50Center">
                            <label>
                                <input type="radio" checked={shipping === 1} onChange={() => setShipping(1)}/> Shipping
                            </label>
                        </div>
                    </div>
                    {shipping ? 
                        <div>
                            <br />
                            <label> Address</label>
                            <input type="text" id="adr" name="address" placeholder="542 W. 15th Street" />
                            <label> City</label>
                            <input type="text" id="city" name="city" placeholder="New York" />

                            <div className="row">
                                <div className="split50">
                                    <label>State</label>
                                    <input type="text" id="state" name="state" placeholder="NY" />
                                </div>
                                <div className="split50">
                                    <label>Zip</label>
                                    <input type="text" id="zip" name="zip" placeholder="10001" />
                                </div>
                            </div>
                            <div>
                            <div className="RightAlign">
                                <p> Subtotal: ${order.total_cost}</p>
                                <p> Shipping: TBD</p>
                                <p> Discounts: $0.00</p>
                                <h3> Total : ${order.total_cost}+</h3>
                                <h3> Due Now : $0.00</h3>
                            </div>
                            <br/>
                            <div className = "PaymentButtonPlacement">
                                <button className="PaymentButton" onClick={payLater}>
                                Complete Order
                                </button>
                            </div>
                        </div>
                        </div>
                    : 
                        <div>
                            <br />
                            <label> Location</label>
                            <input type="text" id="adr" name="address" placeholder="Iberia Dollar General" />
                            <div className="row">
                                <div className="split50Center">
                                    <label>
                                    <input type="radio" checked={paying === 1} onChange={() => setPaying(1)}/> Pay Now
                                    </label>
                                </div>
                                <div className="split50Center">
                                    <label>
                                        <input type="radio" checked={paying === 0} onChange={() => setPaying(0)}/> Pay Later
                                    </label>
                                </div>
                            </div>
                            
                            {paying ?
                                <div>
                                    <div className="RightAlign">
                                        <p> Subtotal: ${order.total_cost}</p>
                                        <p> Shipping: $0.00</p>
                                        <p> Online Processing Fee: ${(order.total_cost * 0.029 + 0.31).toFixed(2)}</p>
                                        <p> Discounts: $0.00</p>
                                        <h3> Total : ${((order.total_cost * 1) + (order.total_cost * 0.029 + 0.31)).toFixed(2)}</h3>
                                    </div>
                                    <br/>
                                    <div className = "PaymentButtonPlacement">
                                        <button className="PaymentButton" onClick={payNow}>
                                        Go To Payment
                                        </button>
                                    </div>
                                </div>
                            :
                                <div>
                                    <div className="RightAlign">
                                        <p> Subtotal: ${order.total_cost}</p>
                                        <p> Shipping: 0.00</p>
                                        <p> Online Processing Fee: $0.00</p>
                                        <p> Discounts: $0.00</p>
                                        <h3> Total : ${order.total_cost}</h3>
                                        <h3> Due Now : $0.00</h3>
                                    </div>
                                    <br/>
                                    <div className = "PaymentButtonPlacement">
                                        <button className="PaymentButton" onClick={payLater}>
                                        Complete Order
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
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