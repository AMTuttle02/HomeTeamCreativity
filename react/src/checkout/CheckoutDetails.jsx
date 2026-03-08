import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import editIcon from "../assets/editIcon.svg";
import "./checkout.css";
import { GetProductPriceWithSize } from "../products/GetProductPriceWithSize";

function CheckoutDetails() {
    const [userId, setUserId] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [order, setOrder] = useState([]);
    const [email, setEmail] = useState("");
    const [shipping, setShipping] = useState(1);
    const [paying, setPaying] = useState(1);
    const [location, setLocation] = useState("");
    const DEFAULT_PICKUP_OPTIONS = [
        "Dollar General (OH-309, Iberia, OH)",
        "Northmor School (Galion, OH)",
        "St. Joseph Catholic Church (Galion, OH)",
        "St. Joseph Catholic School (Galion, OH)"
    ];
    const [pickupOptions, setPickupOptions] = useState(DEFAULT_PICKUP_OPTIONS);
    const [isAdmin, setIsAdmin] = useState(null);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [notCustomOrder, setNotCustomOrder] = useState(1);
    const [locationError, setLocationError] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [couponError, setCouponError] = useState("");
    const [processingFee, setProcessingFee] = useState(0);
    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState((0.00).toFixed(2));
    const [shippingCost, setShippingCost] = useState(0);
    const [shippingCalculated, setShippingCalculated] = useState(false);
    const [shippingOverlayVisible, setShippingOverlayVisible] = useState(false);
    const [forcePayLaterAfterShippingError, setForcePayLaterAfterShippingError] = useState(false);
    const [code, setCode] = useState("");
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [customHighTotal, setCustomHighTotal] = useState(0);
    const navigate = useNavigate();

    // API Calls
    useEffect(() => {
                // fetch admin status for showing edit button
                fetch("/api/admin/admin.php")
                    .then((response) => response.json())
                    .then((data) => setIsAdmin(data.admin))
                    .catch((err) => { console.error("Failed to fetch admin status", err); setIsAdmin(0); });

        let oID = 0;

        fetch("/api/admin/session.php")
        .then((response) => response.json())
        .then((data) => {
            setUserId(data.userId);
            setFirst(data.first_name);
            setLast(data.last_name);
            setEmail(data.email);

            if (data.userId) {
                oID = 0;
            }
        });
        
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

        fetch("/api/cart/getCart.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            order_id: oID
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            let total = 0;
            for (const element of data) {
                if (element.product_id == 0) {
                    setNotCustomOrder(0);
                    total += (6 * element.product_quantity);
                }
                setCustomHighTotal(total);
            }
        });

        // fetch pickup locations from static text (expects a semicolon-separated string)
        (async () => {
            try {
                const formData = new FormData();
                formData.append('page', 'checkout');
                formData.append('location', 'pickupLocations');
                        const resp = await fetch('/api/admin/getStaticText.php', {
                            method: 'POST',
                            body: formData,
                        });
                        const data = await resp.json();
                        let items = [];
                        if (Array.isArray(data)) {
                            if (data.every(d => typeof d === 'string')) {
                                items = data.map(s => s.trim()).filter(Boolean);
                            } else if (data.every(d => d && typeof d === 'object' && 'text' in d)) {
                                items = data.map(d => String(d.text).trim()).filter(Boolean);
                            } else {
                                items = data.map(d => String(d).trim()).filter(Boolean);
                            }
                        } else if (data && typeof data === 'object') {
                            if ('text' in data) {
                                items = String(data.text).split(';').map(s => s.trim()).filter(Boolean);
                            } else {
                                items = Object.values(data).map(v => String(v).trim()).filter(Boolean);
                            }
                        } else if (typeof data === 'string') {
                            items = data.split(';').map(s => s.trim()).filter(Boolean);
                        }

                        if (items.length > 0) {
                            items.sort((a,b) => a.localeCompare(b));
                            setPickupOptions(items);
                        } else {
                            setPickupOptions(DEFAULT_PICKUP_OPTIONS);
                        }
            } catch (err) {
                console.error('Failed to load pickup locations:', err);
                setPickupOptions(DEFAULT_PICKUP_OPTIONS);
            }
        })();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second
    
        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    const determineDiscount = async (discount) => {
        let orderTotal = order.total_cost;
        let finalAmount = 0.00;
        // New logic: coupon may have separate `categories` (top-level names or ids) and `subcategories` (ids)
        const couponCatRaw = (discount && discount.categories) ? discount.categories : '';
        const couponSubRaw = (discount && discount.subcategories) ? discount.subcategories : '';
        const isAll = (typeof couponCatRaw === 'string' && couponCatRaw.indexOf('All') !== -1) || couponCatRaw === 'All' || (typeof couponSubRaw === 'string' && couponSubRaw.indexOf('All') !== -1) || couponSubRaw === 'All';

        if (!isAll) {
            orderTotal = 0;
            let oID = localStorage.getItem("oID") || 0;

            // prepare coupon match lists
            let couponSubIds = [];
            let couponCatIds = [];
            let couponCatNames = [];

            // Normalize coupon subcategories and categories to support single id, semicolon lists, or legacy names
            if (couponSubRaw != null && String(couponSubRaw).trim() !== '') {
                couponSubIds = String(couponSubRaw).split(';').map(s => s.trim()).filter(Boolean);
            }
            if (couponCatRaw != null && String(couponCatRaw).trim() !== '') {
                const parts = String(couponCatRaw).split(';').map(s => s.trim()).filter(Boolean);
                const allNumeric = parts.length > 0 && parts.every(p => /^\d+$/.test(p));
                if (allNumeric) {
                    couponCatIds = parts;
                } else {
                    if (parts.length === 1 && parts[0].indexOf(' ') !== -1) {
                        couponCatNames = parts[0].split(' ').map(s => s.trim()).filter(Boolean);
                    } else {
                        couponCatNames = parts;
                    }
                }
            }

            try {
                const response = await fetch("/api/cart/getCart.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ order_id: oID }),
                });
                const data = await response.json();

                for (const element of data) {
                    const elemCatRaw = element.categories || '';
                    const elemSubRaw = element.subcategories || '';

                    let elemSubIds = [];
                    let elemCatIds = [];
                    let elemCatNames = [];

                    // Normalize element subcategories: accept single id or semicolon-separated ids
                    if (elemSubRaw != null && String(elemSubRaw).trim() !== '') {
                        elemSubIds = String(elemSubRaw).split(';').map(s => s.trim()).filter(Boolean);
                    }

                    // Normalize element categories: accept semicolon-separated ids, single numeric id, or legacy names
                    if (elemCatRaw != null && String(elemCatRaw).trim() !== '') {
                        const parts = String(elemCatRaw).split(';').map(s => s.trim()).filter(Boolean);
                        const allNumeric = parts.length > 0 && parts.every(p => /^\d+$/.test(p));
                        if (allNumeric) {
                            elemCatIds = parts;
                        } else {
                            // If a single part contains spaces, split into names; otherwise treat parts as names
                            if (parts.length === 1 && parts[0].indexOf(' ') !== -1) {
                                elemCatNames = parts[0].split(' ').map(s => s.trim()).filter(Boolean);
                            } else {
                                elemCatNames = parts;
                            }
                        }
                    }

                    let matched = false;

                    // match by subcategory ids first
                    if (!matched && couponSubIds.length > 0 && elemSubIds.length > 0) {
                        for (let cs of couponSubIds) {
                            if (elemSubIds.includes(cs)) { matched = true; break; }
                        }
                    }

                    // match by top-level category ids
                    if (!matched && couponCatIds.length > 0 && elemCatIds.length > 0) {
                        for (let cc of couponCatIds) {
                            if (elemCatIds.includes(cc)) { matched = true; break; }
                        }
                    }

                    // match by top-level category names (legacy)
                    if (!matched && couponCatNames.length > 0 && elemCatNames.length > 0) {
                        for (let cn of couponCatNames) {
                            if (elemCatNames.includes(cn)) { matched = true; break; }
                        }
                    }

                    if (matched) {
                        orderTotal += (GetProductPriceWithSize(element.price, element.product_type, element.size) * 1 * element.product_quantity);
                    }
                }
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        }
    
        if (discount.type === 'percent') {
            let percent = (discount.amount * 1) / 100;
            finalAmount = (orderTotal * 1 * percent).toFixed(2);
        } else if (discount.type === 'amount') {
            finalAmount = (discount.amount * 1).toFixed(2);
        }

        if (finalAmount * 1 > discount.maximum_allowed * 1) {
            finalAmount = (discount.maximum_allowed * 1).toFixed(2);
        }
        if (orderTotal * 1 < discount.minimum_required * 1) {
            finalAmount = 0;
        }

        if (finalAmount > 0) {
            setDiscount(finalAmount);
        } else {
            setCouponError("Sorry, that discount is invalid.");
            setDiscount((0.00).toFixed(2));
        }
    }; 

    const validateCoupon = () => {
        fetch("/api/coupon/getCoupon.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({code: code})
          })
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                // verify code is active by comparing Date objects (avoid locale-string comparison)
                const startDate = new Date(data.start_time);
                const endDate = data.end_time ? new Date(data.end_time) : null;
                if (!isNaN(startDate.getTime())) {
                    if (currentDateTime < startDate || (endDate && !isNaN(endDate.getTime()) && currentDateTime > endDate)) {
                        throw(new Error(data.start_time + " - " + data.end_time));
                    }
                }
                determineDiscount(data);
              }
            })
            .catch((error) => {
                console.log(error);
                setCouponError("Sorry, that discount is invalid.");
                setDiscount((0.00).toFixed(2));
            });
    }  

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
        else if (!shipping && location == "") {
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
            let total = (onlineTotalCost(order.total_cost)).toFixed(2);
            fetch("/api/order/updateOrderInfo.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ first, last, email, shipping, dbLocation, order_id: oID, total, discount, shippingCost}),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data > 0) {
                    fetch("/api/order/stripeCheckout.php")
                        .then((response) => response.json())
                        .then((data) => {
                            window.location.href = data.checkout;
                        });
                } else {
                    navigate("/500");
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
            const total = onlineTotalCost(order.total_cost).toFixed(2);
            fetch("/api/order/updateOrderInfo.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ first, last, email, shipping, dbLocation, order_id: oID, total, discount, shippingCost}),
            })
            .then((response) => response.json())
            .then((data) => {
                oID = data;
                const stripe = Math.floor(Math.random() * 100000) + 1;
                fetch("/api/order/createStripeKey.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ order_id: oID, stripe: stripe}),
                })
                .then((response) => response.json())
                .then((data) => {
                if (data > 0) {
                    window.location.href = "/ordercomplete/" + oID + "/0/" + stripe + "/1";
                } else {
                    navigate("/500");
                }
                });
            });
        }
    };

    const calculateShipping = async () => {
        // validate address fields minimally
        if (handleValidation == false) {
            return;
        }

        let dbLocation = address + " " + city + ", " + state + " " + zip;

        let oID = 0;
        if (localStorage.getItem("oID")) {
            oID = localStorage.getItem("oID");
        } else if (userId) {
            oID = 0;
        }

        try {
            const resp = await fetch('/api/order/getShippingEstimate.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ order_id: oID, dbLocation })
            });
            const data = await resp.json();
            if (data && data.shipping_cost) {
                setShippingCost(data.shipping_cost);
                setShippingCalculated(true);
                setForcePayLaterAfterShippingError(false);
            } else {
                setShippingOverlayVisible(true);
            }
        } catch (err) {
            console.error(err);
            setShippingOverlayVisible(true);
        }
    }

    useEffect(() => {
        setLocationError("");
        setNameError("");
        setEmailError("");
    }, [shipping, paying, first, last, email]);

    // reset shipping calculation whenever shipping method or address changes
    useEffect(() => {
        setShippingCalculated(false);
        setShippingCost(0);
        setDiscount((0.00).toFixed(2));
        setCode("");
    }, [paying, shipping, address, city, state, zip]);

    useEffect(() => {
        if (!notCustomOrder) {
            setProcessingFee((0.00).toFixed(2));
            setTax(0);
            return;
        }

        if (!paying) {
            setProcessingFee((0.00).toFixed(2));
            setTax((order.total_cost * 0.0725).toFixed(2));
            return;
        }

        // For online payments, include shipping in the processing fee when shipping is selected and calculated
        let base = (order.total_cost * 1 - discount * 1);
        if (shipping === 1 && shippingCalculated) {
            base += (parseFloat(shippingCost) || 0);
        }

        const proc = (base * 1 * 0.029 + 0.31);
        setProcessingFee(proc.toFixed(2));
        const temp = (base + proc);
        setTax((temp * 0.0725).toFixed(2));
    }, [paying, notCustomOrder, order, discount, shipping, shippingCalculated, shippingCost])

    const onlineTotalCost = (subtotal) => {
        let total = (subtotal * 1 - discount * 1 + shippingCost * 1 + tax * 1 + processingFee * 1);
        return (total);
    }

  return (
    <div className="CheckoutDetails">
        {shippingOverlayVisible && (
            <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999}} onClick={() => { setShippingOverlayVisible(false); setForcePayLaterAfterShippingError(true); setShippingCalculated(false); }}>
                <div style={{background: '#fff', padding: 20, borderRadius: 6, maxWidth: 600, width: '90%'}} onClick={(e) => e.stopPropagation()}>
                    <h3>Shipping Unavailable</h3>
                    <p>Shipping cannot be used for this address. Please contact admin@hometeamcreativity.com for more information.</p>
                    <div style={{textAlign: 'right'}}>
                        <button className="default-button" onClick={() => { setShippingOverlayVisible(false); setForcePayLaterAfterShippingError(true); setShippingCalculated(false); }}>OK</button>
                    </div>
                </div>
            </div>
        )}
        <div className="mycart">
            <br />
            <div className="container">
                <h3>Checkout Details</h3>
                <div className="containerRow">
                    <div className="mobileSplit45">
                        <label>First Name</label>
                        <input type="text" id="first" name="first" className="default-input" defaultValue={first} onChange={(event) => setFirst(event.target.value)} />
                    </div>
                    <div className="mobileSplit10" />
                    <div className="mobileSplit45">
                        <label>Last Name</label>
                        <input type="text" id="last" name="last" className="default-input" defaultValue={last} onChange={(event) => setLast(event.target.value)} />
                    </div>
                </div>
                <div className="red">
                    {nameError}
                </div>
                <label> Email</label>
                <div className="red">
                    {emailError}
                </div>
                <div className="containerRow">
                    <div className="mobileSplit100">
                        <input type="text" id="email" name="email" className="default-input" defaultValue={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                </div>
                <br /><br />
                <div className="containerRow">
                    <div className="split50">
                        <div className="center">
                            <div className="default-checkbox">
                                <input type="radio" checked={shipping === 1} onChange={() => setShipping(1)}/> Shipping
                            </div>
                        </div>
                    </div>
                    <div className="split50">
                        <div className="center">
                            <div className="default-checkbox">
                                <input type="radio" checked={shipping === 0} onChange={() => setShipping(0)}/> Pickup
                            </div>
                        </div>
                    </div>
                </div>
                {shipping ? 
                    <div>
                        <br />
                        <label>Street</label>
                        <div className="red">
                            {locationError}
                        </div>
                        <div className="containerRow">
                            <div className="mobileSplit100">
                                <input type="text" id="adr" name="address" placeholder="542 W. 15th Street" className="default-input" onChange={(event) => setAddress(event.target.value)}/>
                            </div>
                        </div>
                        <div className="containerRow">
                            <div className="mobileSplit40">
                                <label> City</label>
                                <input type="text" id="city" name="city" placeholder="New York" className="default-input" onChange={(event) => setCity(event.target.value)}/>
                            </div>
                            <div className="mobileSplit10"/>
                            <div className="mobileSplit30">
                                <label>State</label>
                                <input type="text" id="state" name="state" placeholder="NY" className="default-input" onChange={(event) => setState(event.target.value)}/>
                            </div>
                            <div className="mobileSplit10"/>
                            <div className="mobileSplit10">
                                <label>Zip</label>
                                <input type="text" id="zip" name="zip" placeholder="10001" className="default-input" onChange={(event) => setZip(event.target.value)}/>
                            </div>
                        </div>
                        <br/>
                    </div>
                : 
                    <div>
                        <br />
                        <label>Location</label>
                        <div className="red">
                            {locationError}
                        </div>
                        <div className="containerRow">
                            <div className="mobileSplit100">
                                    <select id="pickupLocation" name="pickupLocation" className="default-input" value={location} onChange={(event) => setLocation(event.target.value)}>
                                        <option value="">Select a pickup location</option>
                                        {pickupOptions && pickupOptions.length > 0 ? pickupOptions.map((opt, idx) => (
                                            <option key={idx} value={opt}>{opt}</option>
                                        )) : null}
                                    </select>
                                    {isAdmin > 0 && (
                                        <div style={{ marginTop: 8 }}>
                                            <Link to="/editPickupLocations" className="editLink">
                                                <img src={editIcon} alt="Edit Icon" className="editIcon" />
                                            </Link>
                                        </div>
                                    )}
                            </div>
                        </div>
                        <br /><br />
                    </div>
                }
                <div>
                    {notCustomOrder ?
                        <div className="containerRow">
                            <div className="split50">
                                <div className="center">
                                    <div className="default-checkbox">
                                        <input type="radio" checked={paying === 1} onChange={() => setPaying(1)}/> Pay Now
                                    </div>
                                </div>
                            </div>
                            <div className="split50">
                                <div className="center">
                                    <div className="default-checkbox">
                                        <input type="radio" checked={paying === 0} onChange={() => setPaying(0)}/> Pay Later
                                    </div>
                                </div>
                            </div>
                        </div>
                    : 
                        <div />
                    }
                    {paying && notCustomOrder ?
                        <div>
                            <div className="rightMobileCenter">
                                <div className="containerRow">
                                    <div className="mobileSplit50"/>
                                    <div className="mobileSplit50">
                                        <input type="text" className="couponCodeInput" placeholder="Discount Code" onChange={(event) => setCode(event.target.value)}></input>
                                        <button className="couponCodeButton" onClick={validateCoupon}>Apply</button>
                                    </div>
                                </div>
                                <div className="red">
                                    {couponError}
                                </div>
                                <p> Subtotal: ${order.total_cost}</p>
                                <p> Discount: ${discount}</p>
                                <p> Shipping: ${shippingCost.toFixed(2)}</p>
                                <p> Online Processing Fee: ${processingFee}</p>
                                <p> Estimated Tax: ${tax}</p>
                                <h3> Total: ${onlineTotalCost(order.total_cost).toFixed(2)}</h3>
                                <h3> Due Now: ${onlineTotalCost(order.total_cost).toFixed(2)}</h3>
                            </div>
                            <br/>
                            {shipping && !shippingCalculated && !forcePayLaterAfterShippingError ? (
                                <button className="default-button" onClick={calculateShipping}>Calculate Shipping Cost</button>
                            ) : !shipping || (shipping && shippingCalculated && !forcePayLaterAfterShippingError) ? (
                                <button className="default-button" onClick={payNow}>Pay Now</button>
                            ) : (
                                <button className="default-button">Currently Unavailable. Try Another Option Above</button>
                            )}
                        </div>
                    :
                        <div className="containerRow">
                            {notCustomOrder ?
                                <div className="mobileSplit50" />
                            :
                                <div className="mobileSplit50">
                                    <p style={{color: 'red'}}>Total Cost May Vary Based On Custom Mockup.</p>
                                    <p className="red">Total will be sent via email.</p>
                                </div>
                            }
                            <div className="mobileSplit50">
                                <div className="rightMobileCenter">
                                    <p> Subtotal: ${order.total_cost} {!notCustomOrder ? <> - ${(order.total_cost * 1 +customHighTotal).toFixed(2)}</>:<div/>} </p>
                                    <p> Shipping: {shipping ? "TBD" : (0).toFixed(2)}</p>
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
                            <div className="containerRow">
                                <button className="default-button" onClick={payLater}>Complete Order</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
  );
}
export default CheckoutDetails;