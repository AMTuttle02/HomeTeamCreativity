import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayProduct from "../products/DisplayProduct";
import "./dashboard.css";
import { GetProductPriceWithSize } from "../products/GetProductPriceWithSize";
import DisplayProductDetails from "../products/DisplayProductDetails";

function Dashboard() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [admin, setAdmin] = useState(0);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [enlarge, setEnlarge] = useState(false);
  const [enlargeProduct, setEnlargeProduct] = useState(false);

  // API Calls
  useEffect(() => {
    fetch("/api/admin/session.php")
    .then((response) => response.json())
    .then((data) => {
      setFirstName(data.first_name);
      setAdmin(data.admin);
    });

    fetch("/api/order/allOrders.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
      })
    .then((response) => response.json())
    .then((data) => {
      setOrders(data);
    });

    fetch("/api/product/allProducts.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
      })
    .then((response) => response.json())
    .then((data) => {
      setProducts(data);
    });
  }, []);

  // Logout
  const logout = () => {
    fetch("/api/login/logout.php")
    .then((response) => response.json())
    .then(() => {
      // Need this redirect to update cart icon. Cannot use navigate
      window.location.href = '/loggedout';
    })
  }

  // Remove order from admin dashboard
  const completeOrder = (order) => {
    fetch("/api/order/completeOrder.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({order}),
        })
    .then((response) => response.json())
    .then(() => {
        window.location.reload();
    });
  }

  // Close enlarged image
  const handleOutsideClick = (event) => {
    if (!event.target.closest('.fullDesign')) {
      setEnlarge(false);
    }
  };

  // Enlarge image
  const confirmEnlarge = (product) => {
    setEnlargeProduct(product);
    setEnlarge(true);
  }

  // Checks if custom item exists in order
  const isCustom = (order) => {
    for(const element of products) {
      if (element.order_id === order && element.product_id === 0) {
        return true;
      }
    }
    return false;
  }

  // High end total of custom product
  const findHighEndCost = (order) => {
    let total = order.total_cost * 1;
    for(const element of products) {
      if (element.order_id === order.order_id && element.product_id === 0) {
        total += (6 * element.product_quantity);
      }
    }
    return total.toFixed(2);
  }

  // Cost data should be exported to its own file (onlineTotalCost & taxCost)
  const onlineTotalCost = (subtotal) => {
    let taxableTotal = (subtotal * 1 + (subtotal * 0.029 + 0.31) * 1)
    let total = taxCost(taxableTotal);
    return ((total *1).toFixed(2));
  }
  const taxCost = (subtotal) => {
    let tax = (subtotal * 0.0725);
    let total = ((subtotal * 1) + tax).toFixed(2);
    return (total);
  }

  // Return to last products page
  const goBack = () => {
    if (localStorage.getItem('lastProductCategory')) {
      navigate(localStorage.getItem('lastProductCategory'));
    }
    else {
      navigate('/products');
    }
  };

  return (
    <div className='Dashboard'>
      <br />
      <div className="fullContainer">
        <div className="row">
          <div className="mobileSplit20">
            <div className="default-width">
              <button className="default-button" onClick={() => goBack()}>Continue Shopping</button>
            </div>
          </div>
          <div className="mobileSplit20" />
          <div className="mobileSplit20">
            <h1 className="center">Hello {firstName}!</h1>
          </div>
          <div className="mobileSplit20" />
          <div className="mobileSplit20">
            <div className="default-width">
              <button className="default-button" onClick={logout}>Log Out</button>
            </div>
          </div>
        </div>
        {admin > 0 &&
          <div className="row">
            <div className="mobileSplit20">
              <div className="default-width">
                <button className="default-button" onClick={() => navigate("/upload")}>Upload Designs</button>
              </div>
            </div>
            <div className="mobileSplit20">
              <div className="default-width">
                <button className="default-button" onClick={() => navigate("/categories")}>Edit Categories</button>
              </div>
            </div>
            <div className="mobileSplit20" />
            <div className="mobileSplit20">
              <div className="default-width">
                <button className="default-button" onClick={() => navigate("/costcalculator")}>Cost Calculator</button>
              </div>
            </div>
            <div className="mobileSplit20">
              <div className="default-width">
                <button className="default-button" onClick={() => navigate("/coupons")}>Manage Coupons</button>
              </div>
            </div>
          </div>
        }
        <br />
        <div className="blackLine" />
        {orders.map((order) => (
          <div key={order.order_id}>
            <br />
            <div className="row">
                <div className="mobileSplit33">
                  <h3 className="mobileCenter">Order No. {order.order_id}</h3>
                </div>
                <div className="mobileSplit33">
                  <h3 className="center">Name: {order.first_name} {order.last_name}</h3>
                </div>
                {admin > 0 ?
                  <div className="mobileSplit33">
                    <button className="default-button" onClick={() => completeOrder(order.order_id)}>Complete Order</button>
                  </div>
                :
                  <div className="mobileSplit33">
                    <h3 className="rightMobileCenter">
                      {order.status === 'processing' && <span>Status: Processing</span>}
                      {order.status === 'active' && <span>Status: Active</span>}
                      {order.status === 'complete' && <span>Status: Complete</span>}
                    </h3>
                  </div>
                }
            </div>
            {order.shipped > 0 ?
              <div className="row">
                <div className="mobileSplit33">
                    <h3 className="mobileCenter">Shipping: </h3>
                    <p className="mobileCenter">{order.location}</p>
                </div>
                <div className="mobileSplit33">
                  <h3 className="center">Total: ${isCustom(order.order_id) ? 
                              <span>{order.total_cost} - ${findHighEndCost(order)} </span>
                              :
                              <span>{order.total_cost}</span>
                              }</h3>
                  <h3 className="center">Pay Later</h3>
                </div>
                <div className="mobileSplit33">
                  <h3 className="right">Email: </h3>
                  <p>{order.email}</p>
                </div>
              </div>
            :
              <div className="row">
                <div className="mobileSplit33">
                  <h3 className="mobileCenter">Location: </h3>
                  <p className="mobileCenter">{order.location}</p>
                </div>
                {order.paid > 0 ?
                  <div className="mobileSplit33">
                    <h3 className="center">Total: ${onlineTotalCost(order.total_cost)}</h3>
                    <h3 className="center">Paid!</h3>
                  </div>
                : 
                  <div className="mobileSplit33">
                    <h3 className="center">Total: ${isCustom(order.order_id) ? 
                              <span>{order.total_cost} - ${findHighEndCost(order)} </span>
                              :
                              <span>{taxCost(order.total_cost)}</span>
                              }</h3>
                    <h3 className="center">Pay Later</h3>
                  </div>
                }
                <div className="mobileSplit33">
                  <h3 className="rightMobileCenter">Email: </h3>
                  <p className="rightMobileCenter">{order.email}</p>
                </div>
              </div>
            }
            {products.map((product) => {
              if (product.order_id === order.order_id) {
                return (
                  <span>
                    <div className="default-width">
                      <div className="blackLine" />
                    </div>
                    <DisplayProductDetails order={order} product={product} active={0} />
                  </span>
                );
              }
              return null;
            })}
            <div className="blackLine" />
          </div>
          ))}
      </div>
    </div>
  );
}
export default Dashboard;