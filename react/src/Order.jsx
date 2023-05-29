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
      <h1>Check Your Cart</h1>
      <h1>Is this already in there?</h1>
    </div>
  );
}

function Order() {
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
  const [design, setDesign] = useState([]);
  const [currentDesign, setCurrentDesign] = useState("");
  const [tColors, setTColors] = useState("");
  const [lColors, setLColors] = useState("");
  const [cColors, setCColors] = useState("");
  const [hColors, setHColors] = useState("");

  useEffect(() => {
    retrieveProduct();
  }, []);

  function retrieveProduct() {
    fetch("/api/singleProduct.php")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data);
          setDesign(data);
          setCurrentDesign(data[0]);
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
          const regex = /\S+/;
          let firstWord = data[0].tColors.match(regex)[0];
          setTShirtColor(firstWord);
          setTshirt(tShirtMap[firstWord]);
          
          const lShirtMap = {
            "Black": BlackLongSleeve,
            "Gray": GrayLongSleeve,
            "Red": RedLongSleeve,
            "Royal": RoyalLongSleeve,
            "White": WhiteLongSleeve,
            "Navy": NavyLongSleeve
          }
          firstWord = data[0].lColors.match(regex)[0];
          setLongSleeveColor(firstWord);
          setLongSleeve(lShirtMap[firstWord]);

          const crewMap = {
            "Black": BlackCrewneck,
            "Gray": GrayCrewneck,
            "White": WhiteCrewneck
          }
          firstWord = data[0].cColors.match(regex)[0];
          setCrewneckColor(firstWord);
          setCrewneck(crewMap[firstWord]);

          const hoodieMap = {
            "Black": BlackHoodie,
            "Gray": GrayHoodie,
            "Red": RedHoodie,
            "White": WhiteHoodie,
            "Navy": NavyHoodie
          }
          firstWord = data[0].hColors.match(regex)[0];
          setHoodieColor(firstWord);
          setHoodie(hoodieMap[firstWord]);
 
          let colors = data.map(item => item.tColors).flat();
          setTColors(colors.join(' '));
          colors = data.map(item => item.lColors).flat();
          setLColors(colors.join(' '));
          colors = data.map(item => item.cColors).flat();
          setCColors(colors.join(' '));
          colors = data.map(item => item.hColors).flat();
          setHColors(colors.join(' '));
        }
      });
  }

  const navigate = useNavigate();
  const [productType, setProductType] = useState({type: tshirt, description: "Short Sleeve T-Shirt", addedCost: 0});
  const [size, setSize] = useState({description: "Adult Medium", addedCost: 0});
  const [quantity, setQuantity] = useState(1);
  const [failed, setFailed] = useState(false);
  const [userId, setUserId] = useState("");

  const changeColor = (e) => {
    if (e == gray) {
      if (currentDesign.tColors.includes("Gray")) {
        setTshirt(GrayTshirt);
        setTShirtColor("Gray");
      }
      else {
        if (currentStyle == "Short Sleeve T-Shirt") {
          const correctDesign = design.find((option) => option.tColors.includes("Gray"));
          setCurrentDesign(correctDesign);
          setTshirt(GrayTshirt);
          setTShirtColor("Gray");
        }
      }
      if (currentDesign.cColors.includes("Gray")) {
        setCrewneck(GrayCrewneck);
        setCrewneckColor("Gray");
      }
      else {
        if (currentStyle == "Crewneck Sweatshirt") {
          const correctDesign = design.find((option) => option.cColors.includes("Gray"));
          setCurrentDesign(correctDesign);
          setCrewneck(GrayCrewneck);
          setCrewneckColor("Gray");
        }
      }
      if (currentDesign.lColors.includes("Gray")) {
        setLongSleeve(GrayLongSleeve);
        setLongSleeveColor("Gray");
      }
      else {
        if (currentStyle == "Long Sleeve T-Shirt") {
          const correctDesign = design.find((option) => option.lColors.includes("Gray"));
          setCurrentDesign(correctDesign);
          setLongSleeve(GrayLongSleeve);
          setLongSleeveColor("Gray");
        }
      }
      if (currentDesign.hColors.includes("Gray")) {
        setHoodie(GrayHoodie);
        setHoodieColor("Gray");
      }  
      else {
        if (currentStyle == "Hooded Sweatshirt") {
          const correctDesign = design.find((option) => option.hColors.includes("Gray"));
          setCurrentDesign(correctDesign);
          setHoodie(GrayHoodie);
          setHoodieColor("Gray");
        }
      }
    }
    else if (e == black) {
      if (currentDesign.tColors.includes("Black")) {
        setTshirt(BlackTshirt);
        setTShirtColor("Black");
      }
      else {
        if (currentStyle == "Short Sleeve T-Shirt") {
          const correctDesign = design.find((option) => option.tColors.includes("Black"));
          setCurrentDesign(correctDesign);
          setTshirt(BlackTshirt);
          setTShirtColor("Black");
        }
      }
      if (currentDesign.cColors.includes("Black")) {
        setCrewneck(BlackCrewneck);
        setCrewneckColor("Black");
      }
      else {
        if (currentStyle == "Crewneck Sweatshirt") {
          const correctDesign = design.find((option) => option.cColors.includes("Black"));
          setCurrentDesign(correctDesign);
          setCrewneck(BlackCrewneck);
          setCrewneckColor("Black");
        }
      }
      if (currentDesign.lColors.includes("Black")) {
        setLongSleeve(BlackLongSleeve);
        setLongSleeveColor("Black");
      }
      else {
        if (currentStyle == "Long Sleeve T-Shirt") {
          const correctDesign = design.find((option) => option.lColors.includes("Black"));
          setCurrentDesign(correctDesign);
          setLongSleeve(BlackLongSleeve);
          setLongSleeveColor("Black");
        }
      }
      if (currentDesign.hColors.includes("Black")) {
        setHoodie(BlackHoodie);
        setHoodieColor("Black");
      }
      else {
        if (currentStyle == "Hooded Sweatshirt") {
          const correctDesign = design.find((option) => option.hColors.includes("Black"));
          setCurrentDesign(correctDesign);
          setHoodie(BlackHoodie);
          setHoodieColor("Black");
        }
      }
    }
    else if (e == white) {
      if (currentDesign.tColors.includes("White")) {
        setTshirt(WhiteTshirt);
        setTShirtColor("White");
      }
      else {
        if (currentStyle == "Short Sleeve T-Shirt") {
          const correctDesign = design.find((option) => option.tColors.includes("White"));
          setCurrentDesign(correctDesign);
          setTshirt(WhiteTshirt);
          setTShirtColor("White");
        }
      }
      if (currentDesign.cColors.includes("White")) {
        setCrewneck(WhiteCrewneck);
        setCrewneckColor("White");
      }
      else {
        if (currentStyle == "Crewneck Sweatshirt") {
          const correctDesign = design.find((option) => option.cColors.includes("White"));
          setCurrentDesign(correctDesign);
          setCrewneck(WhiteCrewneck);
          setCrewneckColor("White");
        }
      }
      if (currentDesign.lColors.includes("White")) {
        setLongSleeve(WhiteLongSleeve);
        setLongSleeveColor("White");
      }
      else {
        if (currentStyle == "Long Sleeve T-Shirt") {
          const correctDesign = design.find((option) => option.lColors.includes("White"));
          setCurrentDesign(correctDesign);
          setLongSleeve(WhiteLongSleeve);
          setLongSleeveColor("White");
        }
      }
      if (currentDesign.hColors.includes("White")) {
        setHoodie(WhiteHoodie);
        setHoodieColor("White");
      } 
      else {
        if (currentStyle == "Hooded Sweatshirt") {
          const correctDesign = design.find((option) => option.hColors.includes("White"));
          setCurrentDesign(correctDesign);
          setHoodie(WhiteHoodie);
          setHoodieColor("White");
        }
      }
    }
    else if (e == navy) {
      if (currentDesign.tColors.includes("Navy")) {
        setTshirt(NavyTshirt);
        setTShirtColor("Navy");
      }
      else {
        if (currentStyle == "Short Sleeve T-Shirt") {
          const correctDesign = design.find((option) => option.tColors.includes("Navy"));
          setCurrentDesign(correctDesign);
          setTshirt(NavyTshirt);
          setTShirtColor("Navy");
        }
      }
      if (currentDesign.lColors.includes("Navy")) {
        setLongSleeve(NavyLongSleeve);
        setLongSleeveColor("Navy");
      }
      else {
        if (currentStyle == "Long Sleeve T-Shirt") {
          const correctDesign = design.find((option) => option.lColors.includes("Navy"));
          setCurrentDesign(correctDesign);
          setLongSleeve(NavyLongSleeve);
          setLongSleeveColor("Navy");
        }
      }
      if (currentDesign.hColors.includes("Navy")) {
        setHoodie(NavyHoodie);
        setHoodieColor("Navy");
      }
      else {
        if (currentStyle == "Hooded Sweatshirt") {
          const correctDesign = design.find((option) => option.hColors.includes("Navy"));
          setCurrentDesign(correctDesign);
          setHoodie(NavyHoodie);
          setHoodieColor("Navy");
        }
      }
    }
    else if (e == red) {
      if (currentDesign.tColors.includes("Red")) {
        setTshirt(RedTshirt);
        setTShirtColor("Red");
      }
      else {
        if (currentStyle == "Short Sleeve T-Shirt") {
          const correctDesign = design.find((option) => option.tColors.includes("Red"));
          setCurrentDesign(correctDesign);
          setTshirt(RedTshirt);
          setTShirtColor("Red");
        }
      }
      if (currentDesign.lColors.includes("Red")) {
        setLongSleeve(RedLongSleeve);
        setLongSleeveColor("Red");
      }
      else {
        if (currentStyle == "Long Sleeve T-Shirt") {
          const correctDesign = design.find((option) => option.lColors.includes("Red"));
          setCurrentDesign(correctDesign);
          setLongSleeve(RedLongSleeve);
          setLongSleeveColor("Red");
        }
      }
      if (currentDesign.hColors.includes("Red")) {
        setHoodie(RedHoodie);
        setHoodieColor("Red");
      }
      else {
        if (currentStyle == "Hooded Sweatshirt") {
          const correctDesign = design.find((option) => option.hColors.includes("Red"));
          setCurrentDesign(correctDesign);
          setHoodie(RedHoodie);
          setHoodieColor("Red");
        }
      }
    }
    else if (e == royal) {
      if (currentDesign.tColors.includes("Royal")) {
        setTshirt(RoyalTshirt);
        setTShirtColor("Royal");
      }
      else {
        if (currentStyle == "Short Sleeve T-Shirt") {
          const correctDesign = design.find((option) => option.tColors.includes("Royal"));
          setCurrentDesign(correctDesign);
          setTshirt(RoyalTshirt);
          setTShirtColor("Royal");
        }
      }
      if (currentDesign.lColors.includes("Royal")) {
        setLongSleeve(RoyalLongSleeve);
        setLongSleeveColor("Royal");
      }
      else {
        if (currentStyle == "Long Sleeve T-Shirt") {
          const correctDesign = design.find((option) => option.lColors.includes("Royal"));
          setCurrentDesign(correctDesign);
          setLongSleeve(RoyalLongSleeve);
          setLongSleeveColor("Royal");
        }
      }
    }
    else if (e == yellow) {
      if (currentDesign.tColors.includes("Yellow")) {
        setTshirt(YellowTshirt);
        setTShirtColor("Yellow");
      }
      else {
        if (currentStyle == "Short Sleeve T-Shirt") {
          const correctDesign = design.find((option) => option.tColors.includes("Yellow"));
          setCurrentDesign(correctDesign);
          setTshirt(YellowTshirt);
          setTShirtColor("Yellow");
        }
      }
    }
    else if (e == pink) {
      if (currentDesign.tColors.includes("Pink")) {
        setTshirt(PinkTshirt);
        setTShirtColor("Pink");
      }
      else {
        if (currentStyle == "Short Sleeve T-Shirt") {
          const correctDesign = design.find((option) => option.tColors.includes("Pink"));
          setCurrentDesign(correctDesign);
          setTshirt(PinkTshirt);
          setTShirtColor("Pink");
        }
      }
    }
    else if (e == green) {
      if (currentDesign.tColors.includes("Green")) {
        setTshirt(GreenTshirt);
        setTShirtColor("Green");
      }
      else {
        if (currentStyle == "Short Sleeve T-Shirt") {
          const correctDesign = design.find((option) => option.tColors.includes("Green"));
          setCurrentDesign(correctDesign);
          setTshirt(GreenTshirt);
          setTShirtColor("Green");
        }
      }
    }
    else if (e == maroon) {
      if (currentDesign.tColors.includes("Maroon")) {
        setTshirt(MaroonTshirt);
        setTShirtColor("Maroon");
      }
      else {
        if (currentStyle == "Short Sleeve T-Shirt") {
          const correctDesign = design.find((option) => option.tColors.includes("Maroon"));
          setCurrentDesign(correctDesign);
          setTshirt(MaroonTshirt);
          setTShirtColor("Maroon");
        }
      }
    }
    else if (e == orange) {
      if (currentDesign.tColors.includes("Orange")) {
        setTshirt(OrangeTshirt);
        setTShirtColor("Orange");
      }
      else {
        if (currentStyle == "Short Sleeve T-Shirt") {
          const correctDesign = design.find((option) => option.tColors.includes("Orange"));
          setCurrentDesign(correctDesign);
          setTshirt(OrangeTshirt);
          setTShirtColor("Orange");
        }
      }
    }
    else if (e == purple) {
      if (currentDesign.tColors.includes("Purple")) {
        setTshirt(PurpleTshirt);
        setTShirtColor("Purple");
      }
      else {
        if (currentStyle == "Short Sleeve T-Shirt") {
          const correctDesign = design.find((option) => option.tColors.includes("Purple"));
          setCurrentDesign(correctDesign);
          setTshirt(PurpleTshirt);
          setTShirtColor("Purple");
        }
      }
    }
  };

  const addToCart = () => {
    console.log(currentDesign);
    fetch("/api/addToCart.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        order_id: 100, 
        product_id: currentDesign.product_id, 
        quantity: quantity, 
        color: currentColor,
        product_type: productType.description,
        size: size.description,
        price: ((currentDesign.price * 1) + productType.addedCost + size.addedCost) * quantity,
        product_details: "No Custom Details"}),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data == 1) {
        navigate("/cart");;
      }
      else {
        console.log(data);
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
    if (currentDesign) {
      const regex = /\S+/;
      if (currentStyle == "Short Sleeve T-Shirt") {
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
        };
        if (size.description.includes("Youth") && tShirtColor == "Navy") {
          setTShirtColor(design.tColors.split(" ")[0]);
          setTshirt(tShirtMap[design.tColors.split(" ")[0]]);
          setProductType({type: tshirt, description: "Short Sleeve T-Shirt", addedCost: 0});
          setCurrentColor(tShirtColor);
        }
        else {
          if (currentDesign.tColors.includes(tShirtColor)) {
            setProductType({type: tshirt, description: "Short Sleeve T-Shirt", addedCost: 0});
            setCurrentColor(tShirtColor);
          }
          else {
            const color = currentDesign.tColors.match(regex)[0];
            setTShirtColor(color);
            setTshirt(tShirtMap[color]);
            setCurrentColor(color);
            setProductType({type: tshirt, description: "Short Sleeve T-Shirt", addedCost: 0});
          }
        }
      }
      else if (currentStyle == "Crewneck Sweatshirt") {
        const crewMap = {
          "Black": BlackCrewneck,
          "Gray": GrayCrewneck,
          "White": WhiteCrewneck
        }
        if (currentDesign.cColors.includes(crewneckColor)) {
          setProductType({type: crewneck, description: "Crewneck Sweatshirt", addedCost: 8});
          setCurrentColor(crewneckColor);
        }
        else {
          const color = currentDesign.cColors.match(regex)[0];
          setCrewneckColor(color);
          setCrewneck(crewMap[color]);
          setCurrentColor(color);
          setProductType({type: crewneck, description: "Crewneck Sweatshirt", addedCost: 8});
        }
      }
      else if (currentStyle == "Long Sleeve T-Shirt") {
        const lShirtMap = {
          "Black": BlackLongSleeve,
          "Gray": GrayLongSleeve,
          "Red": RedLongSleeve,
          "Royal": RoyalLongSleeve,
          "White": WhiteLongSleeve,
          "Navy": NavyLongSleeve
        }
        if (currentDesign.lColors.includes(longSleeveColor)) {
          setProductType({type: longSleeve, description: "Long Sleeve T-Shirt", addedCost: 4});
          setCurrentColor(longSleeveColor);
        }
        else {
          const color = currentDesign.lColors.match(regex)[0];
          setLongSleeveColor(color);
          setLongSleeve(lShirtMap[color]);
          setCurrentColor(color);
          setProductType({type: longSleeve, description: "Long Sleeve T-Shirt", addedCost: 4});
        }
      }
      else if (currentStyle == "Hooded Sweatshirt") {
        const hoodieMap = {
          "Black": BlackHoodie,
          "Gray": GrayHoodie,
          "Red": RedHoodie,
          "White": WhiteHoodie,
          "Navy": NavyHoodie
        }
        if (currentDesign.hColors.includes(hoodieColor)) {
          setProductType({type: hoodie, description: "Hooded Sweatshirt", addedCost: 12});
          setCurrentColor(hoodieColor);
        }
        else {
          const color = currentDesign.hColors.match(regex)[0];
          setHoodieColor(color);
          setHoodie(hoodieMap[color]);
          setCurrentColor(color);
          setProductType({type: hoodie, description: "Hooded Sweatshirt", addedCost: 12});
        }
      }

      if (currentColor == "Navy" && size.description.includes("Youth") && currentStyle == "Short Sleeve T-Shirt") {
        setCurrentColor(currentDesign.tColors.split(" ")[0]);
        setProductType({type: BlackTshirt, description: "Short Sleeve T-Shirt", addedCost: 0});
      }
    }
  }, [currentStyle, tShirtColor, longSleeveColor, crewneckColor, hoodieColor, size, currentDesign]);

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
            <div>
              <img
                src={"api/images/" + currentDesign.filename}
                alt={currentDesign.product_name}
                className="design"
              />
              <br /><br />
              <h3>{currentDesign.product_name}</h3>
            </div>
            <br />
            <p>Details:</p>
            <p>100% Cotton</p>
            <p>True To Size</p>
            <p>Regular Fit</p>
            <p>Wash Inside Out If Possible</p>
            <Link to='/returnpolicy'>Return Policy</Link>
            </div>
        </div>
        {userId ?
          <div className="orderMain">
            <h3>Style Your Product With The Options Below</h3>
            <h3>Click <Link to="/customOrder" className="customDesignButton">Here</Link> To Order a Custom Design</h3>
            <h1>Price: ${((currentDesign.price * 1) + productType.addedCost + size.addedCost) * quantity}</h1>
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
              {tColors.includes("Black") && currentStyle == "Short Sleeve T-Shirt" ?
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
              {lColors.includes("Black") && currentStyle == "Long Sleeve T-Shirt" ?
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
              {cColors.includes("Black") && currentStyle == "Crewneck Sweatshirt" ?
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
              {hColors.includes("Black") && currentStyle == "Hooded Sweatshirt" ?
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
              {tColors.includes("Gray") && currentStyle == "Short Sleeve T-Shirt" ?
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
              {lColors.includes("Gray") && currentStyle == "Long Sleeve T-Shirt" ?
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
              {cColors.includes("Gray") && currentStyle == "Crewneck Sweatshirt" ?
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
              {hColors.includes("Gray") && currentStyle == "Hooded Sweatshirt" ?
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
              {tColors.includes("White") && currentStyle == "Short Sleeve T-Shirt" ?
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
              {lColors.includes("White") && currentStyle == "Long Sleeve T-Shirt" ?
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
              {cColors.includes("White") && currentStyle == "Crewneck Sweatshirt" ?
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
              {hColors.includes("White") && currentStyle == "Hooded Sweatshirt" ?
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
              {tColors.includes("Navy") && currentStyle == "Short Sleeve T-Shirt" && !size.description.includes("Youth")?
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
              {lColors.includes("Navy") && currentStyle == "Long Sleeve T-Shirt" ?
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
              {hColors.includes("Navy") && currentStyle == "Hooded Sweatshirt" ?
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
              {tColors.includes("Royal") && currentStyle == "Short Sleeve T-Shirt" ?
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
              {lColors.includes("Royal") && currentStyle == "Long Sleeve T-Shirt" ?
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
              {tColors.includes("Red") && currentStyle == "Short Sleeve T-Shirt" ?
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
              {lColors.includes("Red") && currentStyle == "Long Sleeve T-Shirt" ?
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
              {hColors.includes("Red") && currentStyle == "Hooded Sweatshirt" ?
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
              {tColors.includes("Maroon") && currentStyle == "Short Sleeve T-Shirt" ?
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
              {tColors.includes("Yellow") && currentStyle == "Short Sleeve T-Shirt" ?
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
              {tColors.includes("Pink") && currentStyle == "Short Sleeve T-Shirt" ?
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
              {tColors.includes("Green") && currentStyle == "Short Sleeve T-Shirt" ?
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
              {tColors.includes("Orange") && currentStyle == "Short Sleeve T-Shirt" ?
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
              {tColors.includes("Purple") && currentStyle == "Short Sleeve T-Shirt" ?
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
              <h1>Price: ${((currentDesign.price * 1) + productType.addedCost + size.addedCost) * quantity}</h1>
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
