import React, { useState, useEffect } from "react";
import tshirt from "./assets/blackTShirt.png";
import transparentTshirt from "./assets/transparentTshirt.png";
import transparentLongSleeve from "./assets/transparentLongSleeve.png";
import transparentCrewneck from "./assets/transparentCrewneck.png";
import transparentHoodie from "./assets/transparentHoodie.png";
import black from "./assets/black.png";
import red from "./assets/red.png";
import yellow from "./assets/yellow.png";
import blue from "./assets/blue.png";

function Order() {
  return (
    <div className="Order">
      <div className="row">
        <div className="orderSide">
          <div className="orderFullDesign">
            <img
            src={tshirt}
            alt="Home Team Creativity Logo"
            className="orderTshirt"
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
          <h3>Price calculated after selections</h3>
          <h1>Style: Short Sleeve T-Shirt</h1>
          <div class="typeOptionRow">
            <img
                src={transparentTshirt}
                alt="Home Team Creativity Logo"
                className="shirtOptions"
            />
            <img
                src={transparentLongSleeve}
                alt="Home Team Creativity Logo"
                className="shirtOptions"
            />
            <img
                src={transparentCrewneck}
                alt="Home Team Creativity Logo"
                className="shirtOptions"
            />
            <img
                src={transparentHoodie}
                alt="Home Team Creativity Logo"
                className="shirtOptions"
            />
          </div>
          <br />
          <h1>Color: Black</h1>
          <div class="typeOptionRow">
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
          <h1>Size: Adult Medium</h1>
          <div class="typeOptionRow">
            <p className="size">YOUTH:</p>
            <p className="size">Small</p>
            <p className="size">Medium</p>
            <p className="size">Large</p>
            <p className="size">X-Large</p>
          </div>
          <div class="typeOptionRow">
            <p className="size">ADULT:</p>
            <p className="size">Small</p>
            <p className="size">Medium</p>
            <p className="size">Large</p>
            <p className="size">X-Large</p>
            <p className="size">XX-Large</p>
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
