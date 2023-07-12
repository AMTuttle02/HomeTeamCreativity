import React, { useEffect, useState } from "react";
import blackTshirt from "./assets/blackTShirt.png";
import blackLongSleeve from "./assets/blackLongSleeve.png";
import blackCrewneck from "./assets/blackCrewneck.png";
import blackHoodie from "./assets/blackHoodie.png";
import grayTshirt from "./assets/GreyTShirt.png";
import grayLongSleeve from "./assets/GreyLongSleeve.png";
import grayCrewneck from "./assets/GreyCrewneckSS.png";
import grayHoodie from "./assets/GreyHoodie.png";
import RedTshirt from "./assets/RedTShirt.png";
import RedLongSleeve from "./assets/RedLongSleeve.png";
import RedHoodie from "./assets/RedHoodie.png";
import YellowTshirt from "./assets/YellowTShirt.png";
import PinkTshirt from "./assets/PinkTShirt.png";
import GreenTshirt from "./assets/GreenTShirt.png";
import MaroonTshirt from "./assets/MaroonTShirt.png";
import OrangeTshirt from "./assets/OrangeTShirt.png";
import PurpleTshirt from "./assets/PurpleTShirt.png";
import RoyalTshirt from "./assets/RoyalTShirt.png";
import RoyalLongSleeve from "./assets/RoyalLongSleeve.png";
import NavyTshirt from "./assets/NavyTShirt.png";
import NavyLongSleeve from "./assets/NavyLongSleece.png";
import NavyHoodie from "./assets/NavyHoodie.png";
import WhiteTshirt from "./assets/WhiteTShirt.png";
import WhiteLongSleeve from "./assets/WhiteLongSleeve.png";
import WhiteCrewneck from "./assets/WhiteCrewneckSS.png";
import WhiteHoodie from "./assets/WhiteHoodie.png";
import { useNavigate } from "react-router-dom";

function setType(type, color) {
    if (type == "Crewneck Sweatshirt") {
      if (color == "Black") {
        return blackCrewneck;
      }
      else if (color == "Gray") {
        return grayCrewneck;
      }
      else if (color == "White") {
        return WhiteCrewneck;
      }
    }
    else if (type == "Hooded Sweatshirt") {
      if (color == "Black") {
        return blackHoodie;
      }
      else if (color == "Gray") {
        return grayHoodie;
      }
      else if (color == "White") {
        return WhiteHoodie;
      }
      else if (color == "Red") {
        return RedHoodie;
      }
      else if (color == "Navy") {
        return NavyHoodie;
      }
    }
    else if (type == "Long Sleeve T-Shirt") {
      if (color == "Black") {
        return blackLongSleeve;
      }
      else if (color == "Gray") {
        return grayLongSleeve;
      }
      else if (color == "White") {
        return WhiteLongSleeve;
      }
      else if (color == "Navy") {
        return NavyLongSleeve;
      }
      else if (color == "Red") {
        return RedLongSleeve;
      }
      else if (color == "Royal") {
        return RoyalLongSleeve;
      }
    }
    else {
      if (color == "Black") {
        return blackTshirt;
      }
      else if (color == "Gray") {
        return grayTshirt;
      }
      else if (color == "White") {
        return WhiteTshirt;
      }
      else if (color == "Yellow") {
        return YellowTshirt;
      }
      else if (color == "Pink") {
        return PinkTshirt;
      }
      else if (color == "Green") {
        return GreenTshirt;
      }
      else if (color == "Maroon") {
        return MaroonTshirt;
      }
      else if (color == "Orange") {
        return OrangeTshirt;
      }
      else if (color == "Purple") {
        return PurpleTshirt;
      }
      else if (color == "Red") {
        return RedTshirt;
      }
      else if (color == "Royal") {
        return RoyalTshirt;
      }
      else if (color == "Navy") {
        return NavyTshirt;
      }
    }
  }

function Dashboard() {
  const navigate = useNavigate();

  const logout = (e) => {
    fetch("/api/logout.php")
    .then((response) => response.json())
    .then((data) => {
      window.location.href='/loggedout';
    })
  }

  const completeOrder = (order) => {
    fetch("/api/completeOrder.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({order}),
        })
    .then((response) => response.json())
    .then((data) => {
        window.location.reload();
    });
  }

  const upload = (e) => {
    navigate("/upload");
  }

  const [firstName, setFirstName] = useState("");
  const [admin, setAdmin] = useState(0);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.first_name);
      });
  }, []);

  useEffect(() => {
    fetch("/api/admin.php")
      .then((response) => response.json())
      .then((data) => {
        setAdmin(data.admin);
      });
    fetch("/api/allOrders.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        });
    fetch("/api/allProducts.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
        })
          .then((response) => response.json())
          .then((data) => {
            setProducts(data);
            console.log(data);
          });
  }, []);

  const setPrice = (price, type, size) => {
    price = price * 1;
    if (type == "Crewneck Sweatshirt") {
      price += 8;
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large") {
        price += 2;
      }
    }
    else if (type == "Hooded Sweatshirt") {
      price += 12;
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large") {
        price += 2;
      }
    }
    else if (type == "Long Sleeve T-Shirt") {
      price += 4;
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large") {
        price += 2;
      }
    }
    else {
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large") {
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

  if (admin) {
    return (
      <div className='Dashboard'>
        <br />
        <div className="dashboardContainer">
            <div className="row">
                <div className="dashUpload">
                    <button type="signUpButton" onClick={upload}>Upload Designs</button>
                </div>
                <div className="dashName">
                    <h1>Hello {firstName}!</h1>
                </div>
                <div className="dashLogOut">
                    <button type="signUpButton" onClick={logout}>Log Out</button>
                </div>
            </div>
            <br />
            <div className="BlackLine" />
            {orders.map((order) => (
              <div key={order.order_id}>
                <br />
                <div className="row">
                    <div className="dashUpload">
                        <h3>Order No. {order.order_id}</h3>
                    </div>
                    <div className="dashName">
                        <h3>Name: {order.first_name} {order.last_name}</h3>
                    </div>
                    <div className="dashLogOut">
                        <button type="signUpButton" onClick={() => completeOrder(order.order_id)}>Complete Order</button>
                    </div>
                </div>
                <br />
                <div className="row">
                    {order.shipped ?
                        <div className="dashUpload">
                            <h3>Shipping: </h3>
                            <p>{order.location}</p>
                        </div>
                    :
                        <div className="dashUpload">
                            <h3>Location: </h3>
                            <p>{order.location}</p>
                        </div>
                    }
                    {order.paid ? 
                        <div className="dashName">
                            <h3>Total: {order.total_cost}</h3>
                            <h3>Paid!</h3>
                        </div>
                    :
                    <div className="dashName">
                            <h3>Total: {order.total_cost}</h3>
                            <h3>Pay Later</h3>
                        </div>
                    }
                    <div className="dashLogOut">
                        <h3>Email: </h3>
                        <p>{order.email}</p>
                    </div>
                </div>
                <br />
                {products.map((product) => {
                    if (product.order_id === order.order_id) {
                        return (
                            <div key={product.product_id}>
                              {product.product_id ?
                                <div className="cartProductRow">
                                  <div className="productsCell">
                                      <div className="fullDesign">
                                      <img
                                          src={setType(product.product_type, product.color)}
                                          alt="Home Team Creativity Logo"
                                          className="tshirt"
                                      />
                                      <img
                                          src={"api/images/" + product.filename}
                                          alt={product.filename}
                                          className="design"
                                      />
                                      </div>
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
                                    <h2>$ {setPrice(product.price, product.product_type, product.size) * product.product_quantity}</h2>
                                    <br />
                                    <br />
                                    <h2> 
                                        Qty: 
                                        {product.product_quantity} 
                                    </h2>
                                  </div>
                                  <div className="productsCell">
                                  <br /><br /><br /><br /><br /><br />
                                  <h2>$ {setPrice(product.price, product.product_type, product.size) * product.product_quantity}</h2>
                                  </div>
                                </div>
                              :
                                <div className="cartProductRow">
                                    <div className="productsCell">
                                        <div className="fullDesign">
                                        <img
                                            src={setType(product.product_type, product.color)}
                                            alt="Home Team Creativity Logo"
                                            className="tshirt"
                                        />
                                        <img
                                            src={"api/images/" + determineDesign(product.color)}
                                            alt={product.filename}
                                            className="design"
                                        />
                                        </div>
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
                                      <h2>$ {setPrice(product.price, product.product_type, product.size) * product.product_quantity}+</h2>
                                      <br />
                                      <br />
                                      <h2> 
                                          Qty: 
                                          {product.product_quantity} 
                                      </h2>
                                    </div>
                                    <div className="productsCell">
                                    <br /><br /><br /><br /><br /><br />
                                    <h2>$ {setPrice(product.price, product.product_type, product.size) * product.product_quantity}+</h2>
                                    </div>
                                  </div>
                                }
                                <br />
                                <h3> 
                                  <b>Custom Details: </b>
                                  {product.product_details} 
                                </h3>
                                <br />
                            </div>
                        );
                    }
                    return null;

                })}
                
                <div className="BlackLine" />
              </div>
              ))}
        </div>
      </div>
    );
  }
  else {
  }
}
export default Dashboard;