import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import tshirt from "./assets/blackTShirt.png";
import longSleeve from "./assets/blackLongSleeve.png";
import crewneck from "./assets/blackCrewneck.png";
import hoodie from "./assets/blackHoodie.png";
import transparentTshirt from "./assets/transparentTshirt.png";
import transparentLongSleeve from "./assets/transparentLongSleeve.png";
import transparentCrewneck from "./assets/transparentCrewneck.png";
import transparentHoodie from "./assets/transparentHoodie.png";
import black from "./assets/black.png";
import red from "./assets/red.png";
import yellow from "./assets/yellow.png";
import blue from "./assets/blue.png";

function Added() {
  return (
    <div className="addedToCart">
      <h1>Item Added To Cart</h1>
      <h1>Go To Cart Here!</h1>
    </div>
  );
}

function Failed() {
  return (
    <div className="addedToCart">
      <h1>Sorry Item Could Not Be Added</h1>
      <h1>Is this already in there?</h1>
      <h1>Check Your Cart</h1>
    </div>
  );
}


function Order() {
  const [productType, setProductType] = useState({type: tshirt, description: "Short Sleeve T-Shirt"});
  const [size, setSize] = useState("Adult Medium");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [design, setDesign] = useState({id: 1, filename: "designOne.png", productName: "Be Like Friends", price: "16.00"});
  const [userId, setUserId] = useState("");

  const addToCart = () => {
    fetch("/api/addToCart.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        order_id: 100, 
        product_id: design.id, 
        quantity: quantity, 
        color: "Black",
        product_type: productType.description,
        size: size,
        product_details: "No Custom Details"}),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data == 1) {
        setFailed(false);
        setAdded(true);
      }
      else {
        setAdded(false);
        setFailed(true);
      }
    })
  };

  useEffect(() => {
    fetch("/api/singleProduct.php")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data.product_id);
          setDesign({id: data.product_id, filename: data.filename, productName: data.product_name, price: data.price});
        }
      });
  }, []);

  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.userId);
      });
  }, []);

  return (
    <div className="Order">
      <br />
      <h1 className="orderHeader">Order Summary</h1>
      <div className="row">
        <div className="orderSide">
          <div className="orderFullDesign">
            <img
            src={productType.type}
            alt="Home Team Creativity Logo"
            className="tshirt"
            />
            <img
              src={"api/images/" + design.filename}
              alt={design.productName}
              className="orderDesign"
            />
            <br /><br />
            <h3>{design.productName}</h3>
            <br />
            <p>Details:</p>
            <p>100% Cotton</p>
            <p>True To Size</p>
            <p>Regualr Fit</p>
            <p>Wash Inside Out if possible</p>
            <a href=''>Return Policy</a>
          </div>
        </div>
        {userId ?
          <div className="orderMain">
            <h3>Design Your Product With The Options Below</h3>
            <h1>Style: {productType.description}</h1>
            <div className="typeOptionRow">
              <button 
                onClick={() => setProductType({type: tshirt, description: "Short Sleeve T-Shirt"})}
                className="productTypes">
              <img
                src={transparentTshirt}
                alt="Home Team Creativity Logo"
                className="shirtOptions"
              />
              </button>
              <button 
                onClick={() => setProductType({type: longSleeve, description: "Long Sleeve T-Shirt"})}
                className="productTypes">
              <img
                src={transparentLongSleeve}
                alt="Home Team Creativity Logo"
                className="shirtOptions"
              />
              </button>
              <button 
                onClick={() => setProductType({type: crewneck, description: "Crewneck Sweatshirt"})}
                className="productTypes">
              <img
                src={transparentCrewneck}
                alt="Home Team Creativity Logo"
                className="shirtOptions"
              />
              </button>
              <button 
                onClick={() => setProductType({type: hoodie, description: "Hooded Sweatshirt"})}
                className="productTypes">
              <img
                src={transparentHoodie}
                alt="Home Team Creativity Logo"
                className="shirtOptions"
              />
              </button>
            </div>
            <br />
            <h1>Color: Black</h1>
            <div className="typeOptionRow">
              <img
                  src={black}
                  alt="Home Team Creativity Logo"
                  className="colorOptions"
              />
              <img
                  src={red}
                  alt="Home Team Creativity Logo"
                  className="colorOptions"
              />
              <img
                  src={yellow}
                  alt="Home Team Creativity Logo"
                  className="colorOptions"
              />
              <img
                  src={blue}
                  alt="Home Team Creativity Logo"
                  className="colorOptions"
              />
            </div>
            <br />
            <h1>Size: {size}</h1>
            <div className="typeOptionRow">
              <p className="size">YOUTH:</p>
              <button 
                onClick={() => setSize("Youth Small")}
                className="productTypes">
                <p className="size">Small</p>
              </button>
              <button 
                onClick={() => setSize("Youth Medium")}
                className="productTypes">
                <p className="size">Medium</p>
              </button>
              <button 
                onClick={() => setSize("Youth Large")}
                className="productTypes">
                <p className="size">Large</p>
              </button>
              <button 
                onClick={() => setSize("Youth X-Large")}
                className="productTypes">
                <p className="size">X-Large</p>
              </button>
            </div>
            <div className="typeOptionRow">
              <p className="size">ADULT:</p>
              <button 
                onClick={() => setSize("Adult Small")}
                className="productTypes">
                <p className="size">Small</p>
              </button>
              <button 
                onClick={() => setSize("Adult Medium")}
                className="productTypes">
                <p className="size">Medium</p>
              </button>
              <button 
                onClick={() => setSize("Adult Large")}
                className="productTypes">
                <p className="size">Large</p>
              </button>
              <button 
                onClick={() => setSize("Adult X-Large")}
                className="productTypes">
                <p className="size">X-Large</p>
              </button>
              <button 
                onClick={() => setSize("Adult XX-Large")}
                className="productTypes">
                <p className="size">XX-Large</p>
              </button>
            </div>
            <br />
            <h1>Quantity: {" "}
              <button 
                className="quantity"
                onClick={() => setQuantity(quantity - 1)}>
                -
              </button>
              {" "}{quantity}{" "}
              <button
                className="quantity"
                onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </h1>
            <center>
              <br />
              <button
                className="addToCart"
                onClick={() => addToCart()}>
                Add to Cart
              </button>
              <br /><br />
              <h1>Price: ${design.price * quantity}</h1>
              { added && <Added /> }
              { failed && <Failed /> }
            </center>
          </div>
          :
          <div className="orderMain">
            <h1>Sorry, you must be logged in to add items to your cart.</h1>
            <br />
            <Link to="/login" className="addToCart">
              Login Here
            </Link>
          </div>
        }
      </div>
    </div>
  );
}
export default Order;
