import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      <h1>Check Your Cart</h1>
      <h1>Is this already in there?</h1>
    </div>
  );
}

function Order() {
  const [tshirt, setTshirt] = useState(blackTshirt);
  const [crewneck, setCrewneck] = useState(blackCrewneck);
  const [longSleeve, setLongSleeve] = useState(blackLongSleeve);
  const [hoodie, setHoodie] = useState(blackHoodie);
  const [currentColor, setCurrentColor] = useState("Black");
  const [currentStyle, setCurrentStyle] = useState("Short Sleeve T-Shirt");

  useEffect(() => {
    retrieveProduct();
  }, []);

  function retrieveProduct() {
    fetch("/api/singleProduct.php")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data.product_id);
          setDesign({id: data.product_id, filename: data.filename, productName: data.product_name, price: data.price});
        }
      });
  }

  const navigate = useNavigate();
  const [productType, setProductType] = useState({type: tshirt, description: "Short Sleeve T-Shirt", addedCost: 0});
  const [size, setSize] = useState({description: "Adult Medium", addedCost: 0});
  const [quantity, setQuantity] = useState(1);
  const [failed, setFailed] = useState(false);
  const [design, setDesign] = useState({id: 1, filename: "designOne.png", productName: "Be Like Friends", price: "16.00"});
  const [userId, setUserId] = useState("");

  const changeColor = (e) => {
    if (e == gray) {
      setTshirt(grayTshirt);
      setCrewneck(grayCrewneck);
      setLongSleeve(grayLongSleeve);
      setHoodie(grayHoodie);
      setCurrentColor("Gray");
    }
    else if (e == black) {
      setTshirt(blackTshirt);
      setCrewneck(blackCrewneck);
      setLongSleeve(blackLongSleeve);
      setHoodie(blackHoodie);
      setCurrentColor("Black");
    }
    else if (e == white) {
      setTshirt(WhiteTshirt);
      setCrewneck(WhiteCrewneck);
      setLongSleeve(WhiteLongSleeve);
      setHoodie(WhiteHoodie);
      setCurrentColor("White");
    }
    else if (e == navy) {
      setTshirt(NavyTshirt);
      setLongSleeve(NavyLongSleeve);
      setHoodie(NavyHoodie);
      setCurrentColor("Navy");
    }
    else if (e == red) {
      setTshirt(RedTshirt);
      setLongSleeve(RedLongSleeve);
      setHoodie(RedHoodie);
      setCurrentColor("Red");
    }
    else if (e == royal) {
      setTshirt(RoyalTshirt);
      setLongSleeve(RoyalLongSleeve);
      setCurrentColor("Royal");
    }
    else if (e == yellow) {
      setTshirt(YellowTshirt);
      setCurrentColor("Yellow");
    }
    else if (e == pink) {
      setTshirt(PinkTshirt);
      setCurrentColor("Pink");
    }
    else if (e == green) {
      setTshirt(GreenTshirt);
      setCurrentColor("Green");
    }
    else if (e == maroon) {
      setTshirt(MaroonTshirt);
      setCurrentColor("Maroon");
    }
    else if (e == orange) {
      setTshirt(OrangeTshirt);
      setCurrentColor("Orange");
    }
    else if (e == purple) {
      setTshirt(PurpleTshirt);
      setCurrentColor("Purple");
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
        product_details: "No Custom Details"}),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data == 1) {
        navigate("/cart");;
      }
      else {
        setFailed(true);
      }
    })
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
      setProductType({type: tshirt, description: "Short Sleeve T-Shirt", addedCost: 0});
    }
    else if (currentStyle == "Crewneck Sweatshirt") {
      setProductType({type: crewneck, description: "Crewneck Sweatshirt", addedCost: 8});
    }
    else if (currentStyle == "Long Sleeve T-Shirt") {
      setProductType({type: longSleeve, description: "Long Sleeve T-Shirt", addedCost: 4});
    }
    else {
      setProductType({type: hoodie, description: "Hooded Sweatshirt", addedCost: 12})
    }
  }, [currentStyle, currentColor]);

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
            <p>Regular Fit</p>
            <p>Wash Inside Out if possible</p>
            <Link to='/returnpolicy'>Return Policy</Link>
            </div>
        </div>
        {userId ?
          <div className="orderMain">
            <h3>Style Your Product With The Options Below</h3>
            <h3>Click <Link to="/customOrder" className="customDesignButton">Here</Link> To Order a Custom Design</h3>
            <h1>Price: ${((design.price * 1) + productType.addedCost + size.addedCost) * quantity}</h1>
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
              <button 
                onClick={() => changeColor(black)}
                className="productTypes">
                <img
                  src={black}
                  alt="Black"
                  className="colorOptions"
                />
              </button>
              <button 
                onClick={() => changeColor(gray)}
                className="productTypes">
                <img
                  src={gray}
                  alt="Gray"
                  className="colorOptions"
                />
              </button>
              <button 
                onClick={() => changeColor(white)}
                className="productTypes">
                <img
                  src={white}
                  alt="White"
                  className="colorOptions"
                />
              </button>
              <button 
                onClick={() => changeColor(navy)}
                className="productTypes">
                <img
                  src={navy}
                  alt="Navy"
                  className="colorOptions"
                />
              </button>
              <button 
                onClick={() => changeColor(royal)}
                className="productTypes">
                <img
                  src={royal}
                  alt="Royal"
                  className="colorOptions"
                />
              </button>
              <button 
                onClick={() => changeColor(red)}
                className="productTypes">
                <img
                  src={red}
                  alt="Red"
                  className="colorOptions"
                />
              </button>
              <button 
                onClick={() => changeColor(maroon)}
                className="productTypes">
                <img
                  src={maroon}
                  alt="Maroon"
                  className="colorOptions"
                />
              </button>
              <button 
                onClick={() => changeColor(yellow)}
                className="productTypes">
                <img
                  src={yellow}
                  alt="Yellow"
                  className="colorOptions"
                />
              </button>
              <button 
                onClick={() => changeColor(pink)}
                className="productTypes">
                <img
                  src={pink}
                  alt="Pink"
                  className="colorOptions"
                />
              </button>
              <button 
                onClick={() => changeColor(green)}
                className="productTypes">
                <img
                  src={green}
                  alt="Green"
                  className="colorOptions"
                />
              </button>
              <button 
                onClick={() => changeColor(orange)}
                className="productTypes">
                <img
                  src={orange}
                  alt="Orange"
                  className="colorOptions"
                />
              </button>
              <button 
                onClick={() => changeColor(purple)}
                className="productTypes">
                <img
                  src={purple}
                  alt="Purple"
                  className="colorOptions"
                />
              </button>
              
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
export default Order;
