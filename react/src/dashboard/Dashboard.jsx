import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayProductDetails from "../products/DisplayProductDetails";

function Dashboard() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [admin, setAdmin] = useState(0);
  const [orders, setOrders] = useState([]);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [products, setProducts] = useState([]);

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

  const escapeCSV = (str) => {
    if (str === null || str === undefined) return '""';
    return '"' + String(str).replace(/"/g, '""') + '"';
  }

  const exportOrdersCSV = () => {
    const headers = ['Order ID','Order Date','First Name','Last Name','Email','Location','Status','Paid','Shipped','Total Cost','Products'];
    const rows = [headers.join(',')];
    orders.forEach(order => {
      const prods = products.filter(p => p.order_id === order.order_id)
        .map(p => {
          const name = p.product_name || (p.product_id === 0 ? 'Custom' : 'Unknown');
          const qty = p.product_quantity || '';
          const details = [p.product_type, p.size, p.color, p.product_details].filter(Boolean).join(' ');
          return `${qty}x ${name}${details ? ' (' + details + ')' : ''} [id:${p.product_id}]`;
        }).join(' | ');
      const row = [order.order_id, order.order_date, order.first_name, order.last_name, order.email, order.location, order.status, order.paid, order.shipped, order.total_cost, prods].map(escapeCSV).join(',');
      rows.push(row);
    });
    const csv = rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
  const displayedOrders = showAllOrders ? orders : orders.filter(o => o.status === 'processing');

  const formatUTCToLocal = (utcString) => {
    if (!utcString) return '';
    let s = String(utcString);
    // If MySQL DATETIME like 'YYYY-MM-DD HH:MM:SS', treat as UTC by appending 'Z'
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(s)) {
      s = s.replace(' ', 'T') + 'Z';
    } else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(s)) {
      // If 'YYYY-MM-DDTHH:MM:SS' without timezone, append Z
      s = s + 'Z';
    }
    const d = new Date(s);
    if (isNaN(d.getTime())) return utcString;
    return d.toLocaleString();
  }

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
        <div className="gap" />
        {admin > 0 &&
          <div className="row">
            <div className="mobileSplit20">
              <div className="default-width">
                <button className="default-button" onClick={() => navigate("/upload")}>Upload Designs</button>
              </div>
            </div>
            <div className="gap" />
            <div className="mobileSplit20">
              <div className="default-width">
                <button className="default-button" onClick={() => navigate("/categories")}>Edit Categories</button>
              </div>
            </div>
            <div className="mobileSplit20">
              <div className="default-width">
                <button className="default-button" onClick={() => setShowAllOrders(prev => !prev)}>{showAllOrders ? 'Show Processing Orders' : 'View All Orders'}</button>
              </div>
            </div>
            <div className="gap" />
            <div className="mobileSplit20">
              <div className="default-width">
                <button className="default-button" onClick={() => navigate("/costcalculator")}>Cost Calculator</button>
              </div>
            </div>
            <div className="gap" />
            <div className="mobileSplit20">
              <div className="default-width">
                <button className="default-button" onClick={() => navigate("/coupons")}>Manage Coupons</button>
              </div>
            </div>
            <div className="mobileSplit20">
              <div className="default-width">
                <button className="default-button" onClick={exportOrdersCSV}>Export Orders</button>
              </div>
            </div>
          </div>
        }
        <br />
        <div className="default-width">
        <div className="blackLine" />
        </div>
        {displayedOrders.map((order) => (
          <div key={order.order_id}>
            <br />
            {admin > 0 && order.status !== 'complete' &&
              <div className="row">
                <div className="mobileSplit33" />
                <div className="mobileSplit33">
                  <button className="default-button" onClick={() => completeOrder(order.order_id)}>Complete Order</button>
                </div>
                <div className="mobileSplit33" />
              </div>
            }
            <div className="row">
                <div className="mobileSplit33">
                  <h3 className="mobileCenter">Order No. {order.order_id}</h3>
                </div>
                <div className="mobileSplit33">
                  <h3 className="center">Name: {order.first_name} {order.last_name}</h3>
                </div>
                <div className="mobileSplit33">
                    <h3 className="rightMobileCenter">
                      {order.status === 'processing' && <span>Status: Processing</span>}
                      {order.status === 'active' && <span>Status: Active</span>}
                      {order.status === 'complete' && <span>Status: Complete</span>}
                    </h3>
                  </div>
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
            <div className="row">
              <div className="mobileSplit33">
                <h3 className="mobileCenter">Order Date: {formatUTCToLocal(order.order_date)}</h3>
              </div>
              <div className="mobileSplit33" />
              <div className="mobileSplit33" />
            </div>
            {products.map((product) => {
              if (product.order_id === order.order_id) {
                return (
                  <span>
                    <DisplayProductDetails order={order} product={product} active={0} />
                  </span>
                );
              }
              return null;
            })}
            <div className="default-width">
              <div className="blackLine" />
            </div>
          </div>
          ))}
        </div>
    </div>
  );
}
export default Dashboard;