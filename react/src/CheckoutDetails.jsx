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
    const [location, setLocation] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [notCustomOrder, setNotCustomOrder] = useState(1);
    const [locationError, setLocationError] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [processingFee, setProcessingFee] = useState(0);
    const [tax, setTax] = useState(0);
    
    const handleValidation = () => {
        if (!first || !last) {
            setNameError("Please provide a first and last name.");
            return false;
        }
        else if (!email) {
            setNameError("");
            setEmailError("Please provide an email.");
            return false;
        }
        else if (shipping && (address == "" || city == "" || state == "" || zip == "")) {
            setNameError("");
            setEmailError("");
            setLocationError("Please provide a shipping address.");
            return false;
        }
        else if (location == "") {
            setNameError("");
            setEmailError("");
            setLocationError("Please provide a drop off location.");
            return false;
        }
        else {
            return true;
        }
    }

    const payNow = () => {
        if (handleValidation()) {
            let dbLocation = location;
            if (shipping) {
                dbLocation = address + " " + city + ", " + state + " " + zip;
            }

            let oID = 0;
            if (localStorage.getItem("oID")) {
                oID = localStorage.getItem("oID");
            }
            else if (userId) {
                oID = 0;
            }
            fetch("/api/updateOrderInfo.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ first, last, email, shipping, dbLocation, order_id: oID}),
            })
            .then((response) => response.json())
            .then((data) => {
                // If the email and password are valid, redirect to the homepage
                if (data) {
                    window.location.href = "/api/stripeCheckout.php";
                }
            });
        }
    };

    const payLater = () => {
        if (handleValidation()) {
            let dbLocation = location;
            if (shipping) {
                dbLocation = address + " " + city + ", " + state + " " + zip;
            }

            let oID = 0;
            if (localStorage.getItem("oID")) {
                oID = localStorage.getItem("oID");
            }
            else if (userId) {
                oID = 0;
            }
            fetch("/api/updateOrderInfo.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ first, last, email, shipping, dbLocation, order_id: oID}),
            })
            .then((response) => response.json())
            .then((data) => {
                // If the email and password are valid, redirect to the homepage
                if (data) {
                    window.location.href = "/api/checkoutNoPay.php";
                }
            });
        }
    };

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
            if (data[i].product_id == 0) {
                setNotCustomOrder(0);
            }
        }
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

    useEffect(() => {
        setLocationError("");
        setNameError("");
        setEmailError("");
    }, [shipping, paying, first, last, email]);

    useEffect(() => {
        if (!notCustomOrder) {
            setProcessingFee((0.00).toFixed(2));
            setTax(0);
        }
        else if (!paying) {
            setProcessingFee((0.00).toFixed(2));
            setTax((order.total_cost * 0.0725).toFixed(2));
        }
        else {
            setProcessingFee((order.total_cost * 0.029 + 0.31).toFixed(2));
            let temp = (order.total_cost * 1 + (order.total_cost * 0.029 + 0.31)).toFixed(2);
            // sales tax
            setTax((temp * 0.0725).toFixed(2));
        }
    }, [paying, notCustomOrder, order])

    const [customHighTotal, setCustomHighTotal] = useState(0);
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

    const onlineTotalCost = (subtotal) => {
        let total = (subtotal * 1 + tax * 1 + processingFee * 1);
        return (total);
    }

  return (
    <div className="CheckoutDetails">
        <div className="mycart">
            <br />
            <div className="container">
                <h3>Checkout Details</h3>
                <div className="row">
                    <div className="split50">
                        <label>First Name</label>
                        <input type="text" id="first" name="first" defaultValue={first} onChange={(event) => setFirst(event.target.value)} />
                    </div>
                    <div className="split50">
                        <label>Last Name</label>
                        <input type="text" id="last" name="last" defaultValue={last} onChange={(event) => setLast(event.target.value)} />
                    </div>
                </div>
                <div className="red">
                    {nameError}
                </div>
                <label> Email</label>
                <div className="red">
                    {emailError}
                </div>
                <input type="text" id="email" name="email" defaultValue={email} onChange={(event) => setEmail(event.target.value)} />
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
                        <div className="red">
                            {locationError}
                        </div>
                        <input type="text" id="adr" name="address" placeholder="542 W. 15th Street" onChange={(event) => setAddress(event.target.value)}/>
                        <label> City</label>
                        <input type="text" id="city" name="city" placeholder="New York" onChange={(event) => setCity(event.target.value)}/>

                        <div className="row">
                            <div className="split50">
                                <label>State</label>
                                <input type="text" id="state" name="state" placeholder="NY" onChange={(event) => setState(event.target.value)}/>
                            </div>
                            <div className="split50">
                                <label>Zip</label>
                                <input type="text" id="zip" name="zip" placeholder="10001" onChange={(event) => setZip(event.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="split50">
                                <p style={{color: 'red'}}>Total varies depending on shipping cost.</p>
                                <p style={{color: 'red'}}>Total will be sent via email.</p>
                                <p><a href="/payLater">Learn More</a></p>
                            </div>
                            <div className="split50">
                                <div className="RightAlign">
                                    <p> Subtotal: ${order.total_cost}{!notCustomOrder ? <> - ${(order.total_cost * 1 +customHighTotal).toFixed(2)}</>:<div/>}</p>
                                    <p> Shipping: TBD</p>
                                    <p> Online Processing Fee: $0.00</p>
                                    <p> Estimated Tax: TBD</p>
                                    <h3> Total: ${order.total_cost}{!notCustomOrder ? <> - ${(order.total_cost * 1 +customHighTotal).toFixed(2)}</>:<div/>}</h3>
                                    <h3> Due Now: $0.00</h3>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className = "PaymentButtonPlacement">
                            <button className="PaymentButton" onClick={payLater}>
                            Complete Order
                            </button>
                        </div>
                    </div>
                : 
                    <div>
                        <br />
                        <label> Location</label>
                        <div className="red">
                            {locationError}
                        </div>
                        <input type="text" id="adr" name="address" placeholder="Iberia Dollar General" onChange={(event) => setLocation(event.target.value)}/>
                        {notCustomOrder ?
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
                        : 
                            <div />
                        }
                        
                        {paying && notCustomOrder ?
                            <div>
                                <div className="row">
                                    <div className="split50">
                                    </div>
                                    <div className="split50">
                                        <div className="RightAlign">
                                            <p> Subtotal: ${order.total_cost}</p>
                                            <p> Shipping: $0.00</p>
                                            <p> Online Processing Fee: ${processingFee}</p>
                                            <p> Estimated Tax: ${tax}</p>
                                            <h3> Total: ${onlineTotalCost(order.total_cost).toFixed(2)}</h3>
                                            <h3> Due Now: ${onlineTotalCost(order.total_cost).toFixed(2)}</h3>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <div className = "PaymentButtonPlacement">
                                    <button className="PaymentButton" onClick={payNow}>
                                    Go To Payment
                                    </button>
                                </div>
                            </div>
                        :
                            <div className="row">
                                {notCustomOrder ?
                                    <div className="split50">
                                    </div>
                                :
                                    <div className="split50">
                                        <p style={{color: 'red'}}>Total Cost May Vary Based On Custom Mockup.</p>
                                        <p><a href="/payLater">Learn More</a></p>
                                    </div>
                                }
                                <div className="split50">
                                    <div className="RightAlign">
                                        <p> Subtotal: ${order.total_cost} {!notCustomOrder ? <> - ${(order.total_cost * 1 +customHighTotal).toFixed(2)}</>:<div/>} </p>
                                        <p> Shipping: $0.00</p>
                                        <p> Online Processing Fee: $0.00</p>
                                        {notCustomOrder ? 
                                            <div>
                                                <p> Estimated Tax: ${(order.total_cost * 0.0725).toFixed(2)}</p>
                                                <h3> Total: {onlineTotalCost(order.total_cost).toFixed(2)}</h3>
                                                <h3> Due Now : $0.00</h3>
                                            </div>
                                        :
                                            <div>
                                                <p> Estimated Tax: TBD</p>
                                                <h3> Total: ${order.total_cost} - ${(order.total_cost * 1 +customHighTotal).toFixed(2)}</h3>
                                                <h3> Due Now: $0.00</h3>
                                            </div>
                                        }
                                    </div>
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
    </div>
  );
}
export default CheckoutDetails;