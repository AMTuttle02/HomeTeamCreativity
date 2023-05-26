import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

function CheckoutDetails() {
    const [userId, setUserId] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [order, setOrder] = useState([]);
    const [email, setEmail] = useState("");
    const [shipping, setShipping] = useState(0);

    const checkout = (e) => {
        e.prevent_default;
        window.location.href="/api/stripeCheckout.php";
    }

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
                <form onSubmit={checkout}>
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
                            </div>
                        : 
                            <div>
                                <br />
                                <label> Location</label>
                                <input type="text" id="adr" name="address" placeholder="Iberia Dollar General" />
                            </div>
                        }
                    
                        <div className = "PaymentButtonPlacement">
                            <h1 className="ItemCount"> Total: ${order.total_cost}</h1>
                            <br/>
                            <button type="submit" className="CheckoutButton">
                            Continue To Payment
                            </button>
                        </div>
                    </div>
                </form>
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