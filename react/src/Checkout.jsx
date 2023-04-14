import React, { useEffect, useState } from "react";
import tshirt from "./assets/blackTShirt.png";
import longSleeve from "./assets/blackLongSleeve.png";
import crewneck from "./assets/blackCrewneck.png";
import hoodie from "./assets/blackHoodie.png";
import { Link } from "react-router-dom";
import cart from "./assets/cart.png";

function setType(type) {
    if (type == "Crewneck Sweatshirt") {
      return crewneck;
    }
    else if (type == "Hooded Sweatshirt") {
      return hoodie;
    }
    else if (type == "Long Sleeve T-Shirt") {
      return longSleeve;
    }
    else {
      return tshirt;
    }
  }

function Checkout() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/previousOrder.php")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.userId);
        setName(data.first_name);
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

  return (
    <div className="Checkout">
      {userId ? 
        <div className="success">
            <h1>Thank you for placing an order!</h1>
            <br />
            <h1>We will reach out soon with order confirmation, payment details, and next steps.</h1>
            <br />
            <h1>Have a question? Feel Free to Reach Out <a href="" target="_blank">Here</a></h1>
            <br/>
            <div className="CartPage" />
            <br />
            <div className="cartMain">
                <br />
                <h1>{name}'s Order Details</h1>
            </div>
            <br />

            <div className="CartPage" />
                {products.map((product) => (
                <div key={product.product_id}>
                    <div className="row">
                    <div className="productSideLeft" />
                    <div className="productSide">
                        <div className="fullDesign">
                        <img
                            src={setType(product.product_type)}
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
                    <div className="productSide">
                        <br />
                        <h2> <b> {product.product_name} </b></h2> 
                        <h2> Style: {product.product_type} </h2>
                        <h2> Size: {product.size} </h2>
                        <h2> Color: {product.color} </h2>
                    </div>
                    {product.product_id ?
                        <div className="productSide">
                        <br />
                        <h2>$ {setPrice(product.price, product.product_type, product.size)} </h2>
                        <br /><br />
                        <h2> 
                            Qty: 
                            {product.product_quantity} 
                        </h2>
                        </div>
                        :
                        <div className="productSide">
                        <br />
                        <h2>$ {setPrice(product.price, product.product_type, product.size)}+ </h2>
                        <br /><br />
                        <h2> 
                            Qty: <button onClick={() => decreaseQuantity(product, product.product_id, product.product_quantity, setPrice(product.price, product.product_type, product.size))}>-</button>
                            {product.product_quantity} 
                            <button onClick={() => increaseQuantity(product, product.product_id, product.product_quantity, setPrice(product.price, product.product_type, product.size))}>+</button>
                        </h2>
                        </div>
                    }
                    {product.product_id ?
                        <div className="productSide">
                        <br /><br /><br /><br /><br /><br />
                        <h2>$ {setPrice(product.price, product.product_type, product.size) * product.product_quantity}</h2>
                        </div>
                    :
                    <div className="productSide">
                        <br /><br /><br /><br /><br /><br />
                        <h2>$ {setPrice(product.price, product.product_type, product.size) * product.product_quantity}+</h2>
                    </div>
                    }
                    <div className="CartPage" />
                    </div>
                </div>
                ))}
            <br/>
            </div>
      :
        <div>
            <center>
            <br/>
            <h1>Sorry, you must be logged in to view your order.</h1>
            <br />
            <Link to="/login" className="addToCart">
                Login Here
            </Link>
            </center>

        </div>
      }
    </div>
  );
}
export default Checkout;