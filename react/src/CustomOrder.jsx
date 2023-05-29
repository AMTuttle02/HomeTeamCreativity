import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlackTshirt from "./assets/blackTShirt.png";
import BlackLongSleeve from "./assets/blackLongSleeve.png";
import BlackCrewneck from "./assets/blackCrewneck.png";
import BlackHoodie from "./assets/blackHoodie.png";
import GrayTshirt from "./assets/GreyTShirt.png";
import GrayLongSleeve from "./assets/GreyLongSleeve.png";
import GrayCrewneck from "./assets/GreyCrewneckSS.png";
import GrayHoodie from "./assets/GreyHoodie.png";
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
import transparentTshirt from "./assets/transparentTshirt.png";
import transparentLongSleeve from "./assets/transparentLongSleeve.png";
import transparentCrewneck from "./assets/transparentCrewneck.png";
import transparentHoodie from "./assets/transparentHoodie.png";
import black from "./assets/black.png";
import red from "./assets/red.png";
import yellow from "./assets/yellow.png";
import royal from "./assets/royal.png";
import gray from "./assets/gray.png";
import pink from "./assets/pink.png";
import green from "./assets/green.png";
import maroon from "./assets/maroon.png";
import orange from "./assets/orange.png";
import purple from "./assets/purple.png";
import white from "./assets/white.png";
import navy from "./assets/navy.png";

function Failed() {
  return (
    <div className="addedToCart">
      <h1>Sorry Item Could Not Be Added</h1>
      <h1>Only One Custom Design Item Per Order</h1>
      <h1>Review Your Cart Here!</h1>
    </div>
  );
}

function CustomOrder() {
  const [tshirt, setTshirt] = useState(BlackTshirt);
  const [crewneck, setCrewneck] = useState(BlackCrewneck);
  const [longSleeve, setLongSleeve] = useState(BlackLongSleeve);
  const [hoodie, setHoodie] = useState(BlackHoodie);
  const [currentColor, setCurrentColor] = useState("Black");
  const [tShirtColor, setTShirtColor] = useState("Black");
  const [longSleeveColor, setLongSleeveColor] = useState("Black");
  const [hoodieColor, setHoodieColor] = useState("Black");
  const [crewneckColor, setCrewneckColor] = useState("Black");
  const [currentStyle, setCurrentStyle] = useState("Short Sleeve T-Shirt");
  const [productType, setProductType] = useState({type: tshirt, description: "Short Sleeve T-Shirt", addedCost: 0});
  const [size, setSize] = useState({description: "Adult Medium", addedCost: 0});
  const [quantity, setQuantity] = useState(1);
  const [failed, setFailed] = useState(false);
  const [design, setDesign] = useState({
                                        id: 0, 
                                        filename: "customDesign.png", 
                                        productName: "Custom Design", 
                                        price: "16.00",
                                        tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
                                        lColors: "Black Gray Red Royal White Navy", 
                                        cColors: "Black Gray White", 
                                        hColors: "Black Gray Red White Navy"
                                      });
  const [userId, setUserId] = useState("");
  const [customDetails, setCustomDetails] = useState("");

  function handleOrderDetails(event) {
    setCustomDetails(event.target.value);
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    fetch("/api/addToCart.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        order_id: 100, 
        product_id: design.id, 
        quantity: quantity, 
        color: currentColor,
        product_type: productType.description,
        size: size.description,
        price: ((design.price * 1) + productType.addedCost + size.addedCost) * quantity,
        product_details: customDetails}),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data == 1) {
        window.location.href='/cart';
      }
      else {
        setFailed(true);
      }
    })
  };

  const changeColor = (e) => {
    if (e == gray) {
      if (design.tColors.includes("Gray")) {
        setTshirt(GrayTshirt);
        setTShirtColor("Gray");
      }
      if (design.cColors.includes("Gray")) {
        setCrewneck(GrayCrewneck);
        setCrewneckColor("Gray");
      }
      if (design.lColors.includes("Gray")) {
        setLongSleeve(GrayLongSleeve);
        setLongSleeveColor("Gray");
      }
      if (design.hColors.includes("Gray")) {
        setHoodie(GrayHoodie);
        setHoodieColor("Gray");
      }  
    }
    else if (e == black) {
      if (design.tColors.includes("Black")) {
        setTshirt(BlackTshirt);
        setTShirtColor("Black");
      }
      if (design.cColors.includes("Black")) {
        setCrewneck(BlackCrewneck);
        setCrewneckColor("Black");
      }
      if (design.lColors.includes("Black")) {
        setLongSleeve(BlackLongSleeve);
        setLongSleeveColor("Black");
      }
      if (design.hColors.includes("Black")) {
        setHoodie(BlackHoodie);
        setHoodieColor("Black");
      } 
    }
    else if (e == white) {
      if (design.tColors.includes("White")) {
        setTshirt(WhiteTshirt);
        setTShirtColor("White");
      }
      if (design.cColors.includes("White")) {
        setCrewneck(WhiteCrewneck);
        setCrewneckColor("White");
      }
      if (design.lColors.includes("White")) {
        setLongSleeve(WhiteLongSleeve);
        setLongSleeveColor("White");
      }
      if (design.hColors.includes("White")) {
        setHoodie(WhiteHoodie);
        setHoodieColor("White");
      } 
    }
    else if (e == navy) {
      if (design.tColors.includes("Navy")) {
        setTshirt(NavyTshirt);
        setTShirtColor("Navy");
      }
      if (design.lColors.includes("Navy")) {
        setLongSleeve(NavyLongSleeve);
        setLongSleeveColor("Navy");
      }
      if (design.hColors.includes("Navy")) {
        setHoodie(NavyHoodie);
        setHoodieColor("Navy");
      }
    }
    else if (e == red) {
      if (design.tColors.includes("Red")) {
        setTshirt(RedTshirt);
        setTShirtColor("Red");
      }
      if (design.lColors.includes("Red")) {
        setLongSleeve(RedLongSleeve);
        setLongSleeveColor("Red");
      }
      if (design.hColors.includes("Red")) {
        setHoodie(RedHoodie);
        setHoodieColor("Red");
      }
    }
    else if (e == royal) {
      if (design.tColors.includes("Royal")) {
        setTshirt(RoyalTshirt);
        setTShirtColor("Royal");
      }
      if (design.lColors.includes("Royal")) {
        setLongSleeve(RoyalLongSleeve);
        setLongSleeveColor("Royal");
      }
    }
    else if (e == yellow) {
      if (design.tColors.includes("Yellow")) {
        setTshirt(YellowTshirt);
        setTShirtColor("Yellow");
      }
    }
    else if (e == pink) {
      if (design.tColors.includes("Pink")) {
        setTshirt(PinkTshirt);
        setTShirtColor("Pink");
      }
    }
    else if (e == green) {
      if (design.tColors.includes("Green")) {
        setTshirt(GreenTshirt);
        setTShirtColor("Green");
      }
    }
    else if (e == maroon) {
      if (design.tColors.includes("Maroon")) {
        setTshirt(MaroonTshirt);
        setTShirtColor("Maroon");
      }
    }
    else if (e == orange) {
      if (design.tColors.includes("Orange")) {
        setTshirt(OrangeTshirt);
        setTShirtColor("Orange");
      }
    }
    else if (e == purple) {
      if (design.tColors.includes("Purple")) {
        setTshirt(PurpleTshirt);
        setTShirtColor("Purple");
      }
    }
  };

  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.userId);
      });
  }, []);

  useEffect(() => {
    if (currentStyle == "Short Sleeve T-Shirt") {
      if (size.description.includes("Youth") && tShirtColor == "Navy") {
        const tShirtMap = {
          "Black": BlackTshirt,
          "Gray": GrayTshirt,
          "Yellow": YellowTshirt,
          "Pink": PinkTshirt,
          "Green": GreenTshirt,
          "Maroon": MaroonTshirt,
          "Orange": OrangeTshirt,
          "Purple": PurpleTshirt,
          "Red": RedTshirt,
          "Royal": RoyalTshirt,
          "White": WhiteTshirt
        }
        setTShirtColor(design.tColors.split(" ")[0]);
        setTshirt(tShirtMap[design.tColors.split(" ")[0]]);
        setProductType({type: tshirt, description: "Short Sleeve T-Shirt", addedCost: 0});
        setCurrentColor(tShirtColor);
      }
      else {
        setProductType({type: tshirt, description: "Short Sleeve T-Shirt", addedCost: 0});
        setCurrentColor(tShirtColor);
      }
    }
    else if (currentStyle == "Crewneck Sweatshirt") {
      setProductType({type: crewneck, description: "Crewneck Sweatshirt", addedCost: 8});
      setCurrentColor(crewneckColor);
    }
    else if (currentStyle == "Long Sleeve T-Shirt") {
      setProductType({type: longSleeve, description: "Long Sleeve T-Shirt", addedCost: 4});
      setCurrentColor(longSleeveColor);
    }
    else if (currentStyle == "Hooded Sweatshirt") {
      setProductType({type: hoodie, description: "Hooded Sweatshirt", addedCost: 12});
      setCurrentColor(hoodieColor);
    }

    if (currentColor == "Navy" && size.description.includes("Youth") && currentStyle == "Short Sleeve T-Shirt") {
      setCurrentColor(design.tColors.split(" ")[0]);
      setProductType({type: BlackTshirt, description: "Short Sleeve T-Shirt", addedCost: 0});
    }
  }, [currentStyle, tShirtColor, longSleeveColor, crewneckColor, hoodieColor, size]);

  return (
    <div className="Order">
      <br />
      <h1 className="orderHeader">Order Summary</h1>
      <div className="orderRow">
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
              className="design"
            />
            <br /><br />
            <h3>{design.productName}</h3>
            <br />
            <p>Details:</p>
            <p>100% Cotton</p>
            <p>True To Size</p>
            <p>Regular Fit</p>
            <p>Wash Inside Out If Possible</p>
            <Link to='/returnpolicy'>Return Policy</Link>
            <br /><br /><br />
          </div>
        </div>
        {userId ?
          <div className="orderMain">
            <h3>Style Your Product With The Options Below</h3>
            <h3>Click <Link to="/order" className="customDesignButton">Here</Link> To Order a Previously Created Design</h3>
            <h1>Price: ${((design.price * 1) + productType.addedCost + size.addedCost) * quantity}+</h1>
            <h1>Type Your Desired Design Description Below</h1>
            <h3>Please Be As Descriptive As Possible</h3>
            <div className="customOrderBox">
              <textarea 
                onChange={handleOrderDetails}
                value={customDetails}
              />
            </div>
            <h1>Style: {currentStyle}</h1>
            <div className="typeOptionRow">
              <button 
                onClick={() => setCurrentStyle("Short Sleeve T-Shirt")}
                className="productTypes">
              <img
                src={transparentTshirt}
                alt="Home Team Creativity Logo"
                className="shirtOptions"
              />
              </button>
              <button 
                onClick={() => setCurrentStyle("Long Sleeve T-Shirt")}
                className="productTypes">
              <img
                src={transparentLongSleeve}
                alt="Home Team Creativity Logo"
                className="shirtOptions"
              />
              </button>
              <button 
                onClick={() => setCurrentStyle("Crewneck Sweatshirt")}
                className="productTypes">
              <img
                src={transparentCrewneck}
                alt="Home Team Creativity Logo"
                className="shirtOptions"
              />
              </button>
              <button 
                onClick={() => setCurrentStyle("Hooded Sweatshirt")}
                className="productTypes">
              <img
                src={transparentHoodie}
                alt="Home Team Creativity Logo"
                className="shirtOptions"
              />
              </button>
            </div>
            <br />
            <h1>Color: {currentColor}</h1>
            <div className="typeOptionRow">
              {design.tColors.includes("Black") && currentStyle == "Short Sleeve T-Shirt" ?
              <button 
                onClick={() => changeColor(black)}
                className="productTypes">
                <img
                  src={black}
                  alt="Black"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.lColors.includes("Black") && currentStyle == "Long Sleeve T-Shirt" ?
              <button 
                onClick={() => changeColor(black)}
                className="productTypes">
                <img
                  src={black}
                  alt="Black"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.cColors.includes("Black") && currentStyle == "Crewneck Sweatshirt" ?
              <button 
                onClick={() => changeColor(black)}
                className="productTypes">
                <img
                  src={black}
                  alt="Black"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.hColors.includes("Black") && currentStyle == "Hooded Sweatshirt" ?
              <button 
                onClick={() => changeColor(black)}
                className="productTypes">
                <img
                  src={black}
                  alt="Black"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.tColors.includes("Gray") && currentStyle == "Short Sleeve T-Shirt" ?
              <button 
                onClick={() => changeColor(gray)}
                className="productTypes">
                <img
                  src={gray}
                  alt="Gray"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.lColors.includes("Gray") && currentStyle == "Long Sleeve T-Shirt" ?
              <button 
                onClick={() => changeColor(gray)}
                className="productTypes">
                <img
                  src={gray}
                  alt="Gray"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.cColors.includes("Gray") && currentStyle == "Crewneck Sweatshirt" ?
              <button 
                onClick={() => changeColor(gray)}
                className="productTypes">
                <img
                  src={gray}
                  alt="Gray"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.hColors.includes("Gray") && currentStyle == "Hooded Sweatshirt" ?
              <button 
                onClick={() => changeColor(gray)}
                className="productTypes">
                <img
                  src={gray}
                  alt="Gray"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.tColors.includes("White") && currentStyle == "Short Sleeve T-Shirt" ?
              <button 
                onClick={() => changeColor(white)}
                className="productTypes">
                <img
                  src={white}
                  alt="White"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.lColors.includes("White") && currentStyle == "Long Sleeve T-Shirt" ?
              <button 
                onClick={() => changeColor(white)}
                className="productTypes">
                <img
                  src={white}
                  alt="White"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.cColors.includes("White") && currentStyle == "Crewneck Sweatshirt" ?
              <button 
                onClick={() => changeColor(white)}
                className="productTypes">
                <img
                  src={white}
                  alt="White"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.hColors.includes("White") && currentStyle == "Hooded Sweatshirt" ?
              <button 
                onClick={() => changeColor(white)}
                className="productTypes">
                <img
                  src={white}
                  alt="White"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.tColors.includes("Navy") && currentStyle == "Short Sleeve T-Shirt" && !size.description.includes("Youth")?
              <button 
                onClick={() => changeColor(navy)}
                className="productTypes">
                <img
                  src={navy}
                  alt="Navy"
                  className="colorOptions"
                />
              </button> 
              : <div /> }
              {design.lColors.includes("Navy") && currentStyle == "Long Sleeve T-Shirt" ?
              <button 
                onClick={() => changeColor(navy)}
                className="productTypes">
                <img
                  src={navy}
                  alt="Navy"
                  className="colorOptions"
                />
              </button> 
              : <div /> }
              {design.hColors.includes("Navy") && currentStyle == "Hooded Sweatshirt" ?
              <button 
                onClick={() => changeColor(navy)}
                className="productTypes">
                <img
                  src={navy}
                  alt="Navy"
                  className="colorOptions"
                />
              </button> 
              : <div /> }
              {design.tColors.includes("Royal") && currentStyle == "Short Sleeve T-Shirt" ?
              <button 
                onClick={() => changeColor(royal)}
                className="productTypes">
                <img
                  src={royal}
                  alt="Royal"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.lColors.includes("Royal") && currentStyle == "Long Sleeve T-Shirt" ?
              <button 
                onClick={() => changeColor(royal)}
                className="productTypes">
                <img
                  src={royal}
                  alt="Royal"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.tColors.includes("Red") && currentStyle == "Short Sleeve T-Shirt" ?
              <button 
                onClick={() => changeColor(red)}
                className="productTypes">
                <img
                  src={red}
                  alt="Red"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.lColors.includes("Red") && currentStyle == "Long Sleeve T-Shirt" ?
              <button 
                onClick={() => changeColor(red)}
                className="productTypes">
                <img
                  src={red}
                  alt="Red"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.hColors.includes("Red") && currentStyle == "Hooded Sweatshirt" ?
              <button 
                onClick={() => changeColor(red)}
                className="productTypes">
                <img
                  src={red}
                  alt="Red"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.tColors.includes("Maroon") && currentStyle == "Short Sleeve T-Shirt" ?
              <button 
                onClick={() => changeColor(maroon)}
                className="productTypes">
                <img
                  src={maroon}
                  alt="Maroon"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.tColors.includes("Yellow") && currentStyle == "Short Sleeve T-Shirt" ?
              <button 
                onClick={() => changeColor(yellow)}
                className="productTypes">
                <img
                  src={yellow}
                  alt="Yellow"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.tColors.includes("Pink") && currentStyle == "Short Sleeve T-Shirt" ?
              <button 
                onClick={() => changeColor(pink)}
                className="productTypes">
                <img
                  src={pink}
                  alt="Pink"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.tColors.includes("Green") && currentStyle == "Short Sleeve T-Shirt" ?
              <button 
                onClick={() => changeColor(green)}
                className="productTypes">
                <img
                  src={green}
                  alt="Green"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.tColors.includes("Orange") && currentStyle == "Short Sleeve T-Shirt" ?
              <button 
                onClick={() => changeColor(orange)}
                className="productTypes">
                <img
                  src={orange}
                  alt="Orange"
                  className="colorOptions"
                />
              </button>
              : <div /> }
              {design.tColors.includes("Purple") && currentStyle == "Short Sleeve T-Shirt" ?
              <button 
                onClick={() => changeColor(purple)}
                className="productTypes">
                <img
                  src={purple}
                  alt="Purple"
                  className="colorOptions"
                />
              </button>
              : <div /> }
            </div>
            <br />
            <h1>Size: {size.description}</h1>
            <div className="typeOptionRow">
              <p className="size">YOUTH:</p>
              <button 
                onClick={() => setSize({description: "Youth Small", addedCost: -2})}
                className="productTypes">
                <p className="size">Small</p>
              </button>
              <button 
                onClick={() => setSize({description: "Youth Medium", addedCost: -2})}
                className="productTypes">
                <p className="size">Medium</p>
              </button>
              <button 
                onClick={() => setSize({description: "Youth Large", addedCost: -2})}
                className="productTypes">
                <p className="size">Large</p>
              </button>
              <button 
                onClick={() => setSize({description: "Youth X-Large", addedCost: -2})}
                className="productTypes">
                <p className="size">X-Large</p>
              </button>
            </div>
            <div className="typeOptionRow">
              <p className="size">ADULT:</p>
              <button 
                onClick={() => setSize({description: "Adult Small", addedCost: 0})}
                className="productTypes">
                <p className="size">Small</p>
              </button>
              <button 
                onClick={() => setSize({description: "Adult Medium", addedCost: 0})}
                className="productTypes">
                <p className="size">Medium</p>
              </button>
              <button 
                onClick={() => setSize({description: "Adult Large", addedCost: 0})}
                className="productTypes">
                <p className="size">Large</p>
              </button>
              <button 
                onClick={() => setSize({description: "Adult X-Large", addedCost: 0})}
                className="productTypes">
                <p className="size">X-Large</p>
              </button>
              <button 
                onClick={() => setSize({description: "Adult XX-Large", addedCost: 2})}
                className="productTypes">
                <p className="size">XX-Large</p>
              </button>
            </div>
            <br />
            <h1>Quantity: {" "}
              <button 
                className="quantity"
                onClick={() => decreaseQuantity()}>
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
              <h1>Price: ${((design.price * 1) + productType.addedCost + size.addedCost) * quantity}</h1>
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
export default CustomOrder;
