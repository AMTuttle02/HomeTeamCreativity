import React, { useState, useEffect } from "react";
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
import designOne from "./assets/designOne.png";

function Order() {
  const [productType, setProductType] = useState({type: tshirt, description: "Short Sleeve T-Shirt"});
  const [size, setSize] = useState("Adult Medium");

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
              src={designOne}
              alt="Test"
              className="orderDesign"
            />
            <br /><br />
            <h3>Product Name</h3>
            <br />
            <p>Details:</p>
            <p>100% Cotton</p>
            <p>True To Size</p>
            <p>Regualr Fit</p>
            <p>Wash Inside Out if possible</p>
            <a href=''>Return Policy</a>
          </div>
        </div>
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
          <h1>Quantity: 1</h1>
          <center>
          <button>Add to Cart</button>
          <h1>Price: $20.00</h1>
          </center>
        </div>
      </div>
    </div>
  );
}
export default Order;
