import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [size, setSize] = useState({description: "", addedCost: 0});
  const [invalidSize, setInvalidSize] = useState(false);
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  function handleOrderDetails(event) {
    setCustomDetails(event.target.value);
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    let oID = 0;
    if (userId) {
      oID = 0;
    }
    else if (localStorage.getItem("oID")) {
      oID = localStorage.getItem("oID");
    }
    else {
      oID = 1;
    }

    if (size.description === "") {
      setInvalidSize(true);
    }
    else {
      const formData = new FormData();
        if (file) {
          formData.append('image', file);
        }
        else {
          formData.append('image', "");
        }
        formData.append('order_id', oID); 
        formData.append('product_id', design.id);
        formData.append('quantity', quantity);
        formData.append('color', currentColor);
        formData.append('product_type', productType.description);
        formData.append('size', size.description);
        formData.append('price', ((design.price * 1) + productType.addedCost + size.addedCost) * quantity);
        formData.append('product_details', customDetails);

      fetch("/api/addToCart.php", {
        method: "POST",
        body: formData,
      })
      .then((response) => response.json())
      .then((data) => {
        if (data == 1) {
          navigate("/cart");;
        }
        else if (data > 1) {
          localStorage.setItem("oID", data);
          navigate("/cart");
        }
        else {
          console.log(data);
          setFailed(true);
        }
      })
    }
  };

  const changeColor = (e) => {
    if (e == gray) {
      if (design.tColors.includes("Gray")) {
        setTshirt(GrayTshirt);
        setTShirtColor("Gray");
        setDesign({
          id: 0, 
          filename: "customDesignBlack.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
      if (design.cColors.includes("Gray")) {
        setCrewneck(GrayCrewneck);
        setCrewneckColor("Gray");
        setDesign({
          id: 0, 
          filename: "customDesignBlack.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
      if (design.lColors.includes("Gray")) {
        setLongSleeve(GrayLongSleeve);
        setLongSleeveColor("Gray");
        setDesign({
          id: 0, 
          filename: "customDesignBlack.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
      if (design.hColors.includes("Gray")) {
        setHoodie(GrayHoodie);
        setHoodieColor("Gray");
        setDesign({
          id: 0, 
          filename: "customDesignBlack.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }  
    }
    else if (e == black) {
      if (design.tColors.includes("Black")) {
        setTshirt(BlackTshirt);
        setTShirtColor("Black");
        setDesign({
          id: 0, 
          filename: "customDesign.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
      if (design.cColors.includes("Black")) {
        setCrewneck(BlackCrewneck);
        setCrewneckColor("Black");
        setDesign({
          id: 0, 
          filename: "customDesign.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
      if (design.lColors.includes("Black")) {
        setLongSleeve(BlackLongSleeve);
        setLongSleeveColor("Black");
        setDesign({
          id: 0, 
          filename: "customDesign.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
      if (design.hColors.includes("Black")) {
        setHoodie(BlackHoodie);
        setHoodieColor("Black");
        setDesign({
          id: 0, 
          filename: "customDesign.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      } 
    }
    else if (e == white) {
      if (design.tColors.includes("White")) {
        setTshirt(WhiteTshirt);
        setTShirtColor("White");
        setDesign({
          id: 0, 
          filename: "customDesignBlack.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
      if (design.cColors.includes("White")) {
        setCrewneck(WhiteCrewneck);
        setCrewneckColor("White");
        setDesign({
          id: 0, 
          filename: "customDesignBlack.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
      if (design.lColors.includes("White")) {
        setLongSleeve(WhiteLongSleeve);
        setLongSleeveColor("White");
        setDesign({
          id: 0, 
          filename: "customDesignBlack.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
      if (design.hColors.includes("White")) {
        setHoodie(WhiteHoodie);
        setHoodieColor("White");
        setDesign({
          id: 0, 
          filename: "customDesignBlack.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      } 
    }
    else if (e == navy) {
      if (design.tColors.includes("Navy")) {
        setTshirt(NavyTshirt);
        setTShirtColor("Navy");
        setDesign({
          id: 0, 
          filename: "customDesign.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
      if (design.lColors.includes("Navy")) {
        setLongSleeve(NavyLongSleeve);
        setLongSleeveColor("Navy");
        setDesign({
          id: 0, 
          filename: "customDesign.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
      if (design.hColors.includes("Navy")) {
        setHoodie(NavyHoodie);
        setHoodieColor("Navy");
        setDesign({
          id: 0, 
          filename: "customDesign.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
    }
    else if (e == red) {
      if (design.tColors.includes("Red")) {
        setTshirt(RedTshirt);
        setTShirtColor("Red");
        setDesign({
          id: 0, 
          filename: "customDesign.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
      if (design.lColors.includes("Red")) {
        setLongSleeve(RedLongSleeve);
        setLongSleeveColor("Red");
        setDesign({
          id: 0, 
          filename: "customDesign.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
      if (design.hColors.includes("Red")) {
        setHoodie(RedHoodie);
        setHoodieColor("Red");
        setDesign({
          id: 0, 
          filename: "customDesign.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
    }
    else if (e == royal) {
      if (design.tColors.includes("Royal")) {
        setTshirt(RoyalTshirt);
        setTShirtColor("Royal");
        setDesign({
          id: 0, 
          filename: "customDesign.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
      if (design.lColors.includes("Royal")) {
        setLongSleeve(RoyalLongSleeve);
        setLongSleeveColor("Royal");
        setDesign({
          id: 0, 
          filename: "customDesign.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
    }
    else if (e == yellow) {
      if (design.tColors.includes("Yellow")) {
        setTshirt(YellowTshirt);
        setTShirtColor("Yellow");
        setDesign({
          id: 0, 
          filename: "customDesignBlack.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
    }
    else if (e == pink) {
      if (design.tColors.includes("Pink")) {
        setTshirt(PinkTshirt);
        setTShirtColor("Pink");
        setDesign({
          id: 0, 
          filename: "customDesign.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
    }
    else if (e == green) {
      if (design.tColors.includes("Green")) {
        setTshirt(GreenTshirt);
        setTShirtColor("Green");
        setDesign({
          id: 0, 
          filename: "customDesign.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
    }
    else if (e == maroon) {
      if (design.tColors.includes("Maroon")) {
        setTshirt(MaroonTshirt);
        setTShirtColor("Maroon");
        setDesign({
          id: 0, 
          filename: "customDesign.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
    }
    else if (e == orange) {
      if (design.tColors.includes("Orange")) {
        setTshirt(OrangeTshirt);
        setTShirtColor("Orange");
        setDesign({
          id: 0, 
          filename: "customDesign.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
      }
    }
    else if (e == purple) {
      if (design.tColors.includes("Purple")) {
        setTshirt(PurpleTshirt);
        setTShirtColor("Purple");
        setDesign({
          id: 0, 
          filename: "customDesign.png", 
          productName: "Custom Design", 
          price: "16.00",
          tColors: "Black Gray Yellow Pink Green Maroon Orange Purple Red Royal White Navy", 
          lColors: "Black Gray Red Royal White Navy", 
          cColors: "Black Gray White", 
          hColors: "Black Gray Red White Navy"
        });
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
      setProductType({type: tshirt, description: "Short Sleeve T-Shirt", addedCost: 0});
      setCurrentColor(tShirtColor);
    }
    else if (currentStyle == "Crewneck Sweatshirt") {
      setProductType({type: crewneck, description: "Crewneck Sweatshirt", addedCost: 8});
      setCurrentColor(crewneckColor);
      if (size.description == "Adult XXX-Large") {
        setSize({description: "", addedCost: 0});
      }
    }
    else if (currentStyle == "Long Sleeve T-Shirt") {
      setProductType({type: longSleeve, description: "Long Sleeve T-Shirt", addedCost: 4});
      setCurrentColor(longSleeveColor);
      if (size.description == "Adult XXX-Large") {
        setSize({description: "", addedCost: 0});
      }
    }
    else if (currentStyle == "Hooded Sweatshirt") {
      setProductType({type: hoodie, description: "Hooded Sweatshirt", addedCost: 12});
      setCurrentColor(hoodieColor);
      if (size.description == "Adult XXX-Large") {
        setSize({description: "", addedCost: 0});
      }
    }
  }, [currentStyle, tShirtColor, longSleeveColor, crewneckColor, hoodieColor, size]);

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.fullDesign')) {
      setShowConfirmation(false);
    }
  };

  return (
    <div className="Order">
      <br />
      <h1 className="orderHeader">Order Summary</h1>
      <div className="orderRow">
        <div className="orderSide">
          <div className="productDetails">
            <button 
                  className="magnify"
                  onClick={() => setShowConfirmation(true)}>
              <div className="fullDesign">
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
              </div>
            </button>
            <br /><br />
            <p>Click Design To Enlarge</p>
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
          {showConfirmation &&
          <div className="confirmation-modal" onClick={handleOutsideClick}>
            <div className="orderItem-dialog">
              <span className="close-button" onClick={() => setShowConfirmation(false)}>&times;</span>
              <div className="fullDesign">
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
              </div>
              </div>
          </div>
        }
        </div>
        <div className="orderMain">
          <h3>Style Your Product With The Options Below</h3>
          <h3>Click <Link to="/order" className="customDesignButton">Here</Link> To Order a Previously Created Design</h3>
          <h1>Price: ${((design.price * 1) + productType.addedCost + size.addedCost) * quantity} - ${((design.price * 1) + productType.addedCost + size.addedCost + 6) * quantity}</h1>
          <h1>Type Your Desired Design Description Below</h1>
          <h3>Please Be As Descriptive As Possible</h3>
          <div className="customOrderBox">
            <textarea 
              onChange={handleOrderDetails}
              value={customDetails}
            />
          </div>
          {userId &&
            <span>
              <h1>Have A Helpful Image?</h1>
              <h3>Upload Image Below</h3>
              <input type="file" onChange={handleFileInputChange} />
            </span>
          }
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
            {design.tColors.includes("Navy") && currentStyle == "Short Sleeve T-Shirt" ?
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
              <p className="size">2XL</p>
            </button>
            {currentStyle == "Short Sleeve T-Shirt" ?
              <button 
                onClick={() => setSize({description: "Adult XXX-Large", addedCost: 2})}
                className="productTypes">
                <p className="size">3XL</p>
              </button>
            :
            <div />
            }
          {invalidSize &&
            <div className="confirmation-modal">
              <div className="confirmation-dialog">
                <h3>Invalid Size</h3>
                <p>You must select a size to add this item to your cart.</p>
                <div className="confirmation-buttons">
                  <button className="delete-button" onClick={() => setInvalidSize(false)}>Return To Order</button>
                </div>
              </div>
            </div>
          }
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
            <h1>Price: ${((design.price * 1) + productType.addedCost + size.addedCost) * quantity} - ${((design.price * 1) + productType.addedCost + size.addedCost + 6) * quantity}</h1>
            { failed && <Failed /> }
          </center>
        </div>
      </div>
    </div>
  );
}
export default CustomOrder;
