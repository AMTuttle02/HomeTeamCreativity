import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const [defaultDesign, setDefaultDesign] = useState("");
  const [tColors, setTColors] = useState("");
  const [lColors, setLColors] = useState("");
  const [cColors, setCColors] = useState("");
  const [hColors, setHColors] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [nameOnBack, setNameOnBack] = useState(false);
  const [numberOnBack, setNumberOnBack] = useState(false);
  const {productKey} = useParams();

  useEffect(() => {
    retrieveProduct();
  }, []);

  function retrieveProduct() {
    var data = { id: 0 };
    
    if (productKey) {
      data = { id: productKey };
    }

    fetch("/api/singleProduct.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (data[0].default_style === "tshirt") {
            setCurrentStyle("Short Sleeve T-Shirt");
          }
          else if (data[0].default_style === "longsleeve") {
            setCurrentStyle("Long Sleeve T-Shirt");
          }
          else if (data[0].default_style === "crewneck") {
            setCurrentStyle("Crewneck Sweatshirt");
          }
          else if (data[0].default_style === "hoodie") {
            setCurrentStyle("Hooded Sweatshirt");
          }
          setDesign(data);
          setNameOnBack(data[0].nameOnBack);
          setNumberOnBack(data[0].numberOnBack);
          let retrieveDefault = data[0];
          for (let i = 0; i < data.length; ++i) {
            if (data[i].product_id < retrieveDefault.product_id) {
              retrieveDefault = data[i];
            }
          }
          setDefaultDesign(retrieveDefault);
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
            "White": WhiteTshirt,
            "Navy": NavyTshirt
          }
          const regex = /\S+/;
          if (data[0].tColors) {
            let firstWord = data[0].tColors.match(regex)[0];
            setTShirtColor(firstWord);
            setTshirt(tShirtMap[firstWord]);
          }
          else {
            let firstWord = retrieveDefault.tColors.match(regex)[0];
            setTShirtColor(firstWord);
            setTshirt(tShirtMap[firstWord]);
          }
          
          const lShirtMap = {
            "Black": BlackLongSleeve,
            "Gray": GrayLongSleeve,
            "Red": RedLongSleeve,
            "Royal": RoyalLongSleeve,
            "White": WhiteLongSleeve,
            "Navy": NavyLongSleeve
          }
          if (data[0].lColors) {
            let firstWord = data[0].lColors.match(regex)[0];
            setLongSleeveColor(firstWord);
            setLongSleeve(lShirtMap[firstWord]);
          }
          else {
            let firstWord = retrieveDefault.lColors.match(regex)[0];
            setLongSleeveColor(firstWord);
            setLongSleeve(lShirtMap[firstWord]);
          }

          const crewMap = {
            "Black": BlackCrewneck,
            "Gray": GrayCrewneck,
            "White": WhiteCrewneck
          }
          if (data[0].cColors) {
            let firstWord = data[0].cColors.match(regex)[0];
            setCrewneckColor(firstWord);
            setCrewneck(crewMap[firstWord]);
          }
          else {
            let firstWord = retrieveDefault.cColors.match(regex)[0];
            setCrewneckColor(firstWord);
            setCrewneck(crewMap[firstWord]);
          }

          const hoodieMap = {
            "Black": BlackHoodie,
            "Gray": GrayHoodie,
            "Red": RedHoodie,
            "White": WhiteHoodie,
            "Navy": NavyHoodie
          }
          if (data[0].hColors) {
            let firstWord = data[0].hColors.match(regex)[0];
            setHoodieColor(firstWord);
            setHoodie(hoodieMap[firstWord]);
          }
          else {
            let firstWord = retrieveDefault.hColors.match(regex)[0];
            setHoodieColor(firstWord);
            setHoodie(hoodieMap[firstWord]);
          }
 
          let colors = data.map(item => item.tColors).flat();
          setTColors(colors.join(' '));
          colors = data.map(item => item.lColors).flat();
          setLColors(colors.join(' '));
          colors = data.map(item => item.cColors).flat();
          setCColors(colors.join(' '));
          colors = data.map(item => item.hColors).flat();
          setHColors(colors.join(' '));
        }
      })
      .catch((error) => {
        console.log("Sorry, That Path is Invalid. Think this is a mistake? Email us!")
        navigate("/products");
      });
  }

  const navigate = useNavigate();
  const [productType, setProductType] = useState({type: tshirt, description: "Short Sleeve T-Shirt", addedCost: 0});
  const [size, setSize] = useState({description: "", addedCost: 0});
  const [invalidSize, setInvalidSize] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [failed, setFailed] = useState(false);
  const [userId, setUserId] = useState("");
  const [customDetails, setCustomDetails] = useState("");

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

  function handleOrderDetails(event) {
    setCustomDetails(event.target.value);
  }

  const addToCart = () => {
    if (customDetails === "") {
      setCustomDetails("No custom details");
    }
    let oID = 0;
    if (nameOnBack && numberOnBack) {
      details = "Name: " + nameOnBackDetails + " Number: " + numberOnBackDetails;
    }
    else if (nameOnBack) {
      details = "Name: " + nameOnBackDetails;
    }
    else if (numberOnBack) {
      details = "Number: " + numberOnBackDetails;
    }
    console.log(currentDesign);
    if (userId) {
      oID = 0;
    }
    else if (localStorage.getItem("oID")) {
      oID = localStorage.getItem("oID")
    }
    else {
      oID = 1;
    }

    if (size.description === "") {
      setInvalidSize(true);
    }
    else {
      const formData = new FormData();
        formData.append('image', "");
        formData.append('order_id', oID); 
        formData.append('product_id', currentDesign.product_id);
        formData.append('quantity', quantity);
        formData.append('color', currentColor);
        formData.append('product_type', productType.description);
        formData.append('size', size.description);
        formData.append('price', (((currentDesign.price * 1) + productType.addedCost + size.addedCost) * quantity).toFixed(2));
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
        if (currentDesign.tColors.includes(tShirtColor)) {
          setProductType({type: tshirt, description: "Short Sleeve T-Shirt", addedCost: 0});
          setCurrentColor(tShirtColor);
        }
        else if (currentDesign.tColors){
          const color = currentDesign.tColors.match(regex)[0];
          setTShirtColor(color);
          setTshirt(tShirtMap[color]);
          setCurrentColor(color);
          setProductType({type: tshirt, description: "Short Sleeve T-Shirt", addedCost: 0});
        }
        else {
          const color = defaultDesign.tColors.match(regex)[0];
          setTShirtColor(color);
          setTshirt(tShirtMap[color]);
          setCurrentColor(color);
          setProductType({type: tshirt, description: "Short Sleeve T-Shirt", addedCost: 0});
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
        else if (currentDesign.cColors) {
          const color = currentDesign.cColors.match(regex)[0];
          setCrewneckColor(color);
          setCrewneck(crewMap[color]);
          setCurrentColor(color);
          setProductType({type: crewneck, description: "Crewneck Sweatshirt", addedCost: 8});
        }
        else {
          setCurrentDesign(defaultDesign);
          const color = defaultDesign.cColors.match(regex)[0];
          setCrewneckColor(color);
          setCrewneck(crewMap[color]);
          setCurrentColor(color);
          setProductType({type: crewneck, description: "Crewneck Sweatshirt", addedCost: 8});
        }
        if (size.description == "Adult XXX-Large") {
          setSize({description: "Adult XXX-Large", addedCost: 2});
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
        else if (currentDesign.lColors) {
          const color = currentDesign.lColors.match(regex)[0];
          setLongSleeveColor(color);
          setLongSleeve(lShirtMap[color]);
          setCurrentColor(color);
          setProductType({type: longSleeve, description: "Long Sleeve T-Shirt", addedCost: 4});
        }
        else {
          setCurrentDesign(defaultDesign);
          const color = defaultDesign.lColors.match(regex)[0];
          setLongSleeveColor(color);
          setLongSleeve(lShirtMap[color]);
          setCurrentColor(color);
          setProductType({type: longSleeve, description: "Long Sleeve T-Shirt", addedCost: 4});
        }
        if (size.description == "Adult XXX-Large") {
          setSize({description: "Adult XXX-Large", addedCost: 2});
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
        else if (currentDesign.hColors) {
          const color = currentDesign.hColors.match(regex)[0];
          setHoodieColor(color);
          setHoodie(hoodieMap[color]);
          setCurrentColor(color);
          setProductType({type: hoodie, description: "Hooded Sweatshirt", addedCost: 12});
        }
        else {
          setCurrentDesign(defaultDesign);
          const color = defaultDesign.hColors.match(regex)[0];
          setHoodieColor(color);
          setHoodie(hoodieMap[color]);
          setCurrentColor(color);
          setProductType({type: hoodie, description: "Hooded Sweatshirt", addedCost: 12});
        }
        if (size.description == "Adult XXX-Large") {
          setSize({description: "Adult XXX-Large", addedCost: 2});
        }
      }
    }
  }, [currentStyle, tShirtColor, longSleeveColor, crewneckColor, hoodieColor, size, currentDesign]);

  const validStyle = (colors) => {
    if (colors == 'None') {
      return false;
    }
    else {
      return true;
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.fullDesign')) {
      setShowConfirmation(false);
    }
  };

  const [nameOnBackDetails, setNameOnBackDetails] = useState("");
  function handleNameOnBackDetails(event) {
    setNameOnBackDetails(event.target.value);
  }

  const [numberOnBackDetails, setNumberOnBackDetails] = useState(0);
  function handleNumberOnBackDetails(event) {
    setNumberOnBackDetails(event.target.value);
  }

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
                  src={window.location.origin + "/api/images/" + currentDesign.filename}
                  alt={currentDesign.product_name}
                  className="design"
                />
              </div>
            </button>
            <br /><br />
            <p>Click Design To Enlarge</p>
            <h3>{currentDesign.product_name}</h3>
            <br />
            <p>Details:</p>
            <p>100% Cotton</p>
            <p>True To Size</p>
            <p>Regular Fit</p>
            <p>Wash Inside Out If Possible</p>
            <Link to='/returnpolicy'>Return Policy</Link>
          </div>
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
                  src={window.location.origin + "/api/images/" + currentDesign.filename}
                  alt={currentDesign.product_name}
                  className="design"
                />
              </div>
            </div>
          </div>
        }
        <div className="orderMain">
          <h3>Style Your Product With The Options Below</h3>
          <h3>Click <Link to="/customOrder" className="customDesignButton">Here</Link> To Order a Custom Design</h3>
          <h1>Price: ${(((currentDesign.price * 1) + productType.addedCost + size.addedCost) * quantity).toFixed(2)}</h1>
          <h1>Style: {currentStyle}</h1>
          <div className="typeOptionRow">
            {validStyle(tColors) ? <>
              <button 
                onClick={() => setCurrentStyle("Short Sleeve T-Shirt")}
                className="productTypes">
              <img
                src={transparentTshirt}
                alt="Home Team Creativity Logo"
                className="shirtOptions"
              />
              </button>
            </> : <></>}
            {validStyle(lColors) ? <>
              <button 
                onClick={() => setCurrentStyle("Long Sleeve T-Shirt")}
                className="productTypes">
              <img
                src={transparentLongSleeve}
                alt="Home Team Creativity Logo"
                className="shirtOptions"
              />
              </button>
            </> : <></>}
            {validStyle(cColors) ? <>
              <button 
                onClick={() => setCurrentStyle("Crewneck Sweatshirt")}
                className="productTypes">
              <img
                src={transparentCrewneck}
                alt="Home Team Creativity Logo"
                className="shirtOptions"
              />
              </button>
            </> : <></>}
            {validStyle(hColors) ? <>
              <button 
                onClick={() => setCurrentStyle("Hooded Sweatshirt")}
                className="productTypes">
              <img
                src={transparentHoodie}
                alt="Home Team Creativity Logo"
                className="shirtOptions"
              />
              </button>
            </> : <></>}
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
            {tColors.includes("Navy") && currentStyle == "Short Sleeve T-Shirt" ?
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
          <h1>Additional Request Details</h1>
          <h3>This may increase the price. Any additional cost will be informed to you via email.</h3>
          <div className="customOrderBox">
            <textarea 
              onChange={handleOrderDetails}
              value={customDetails}
              placeholder="No Custom Details."
            />
          </div>
          {nameOnBack && 
            <>
              <h2>Name: {' '}
                <input
                  type="text"
                  value={nameOnBackDetails}
                  onChange={handleNameOnBackDetails}
                  placeholder="Enter Name For Back Of Product Here"
                  className="lastNameOrderPage"
                />
              </h2>
            </>
          }
          {numberOnBack && 
            <>
              <h2>Number:{' '}
              <input
                type="number"
                value={numberOnBackDetails}
                onChange={handleNumberOnBackDetails}
                min={0}
                max={99}
              />
              </h2>
            </>
          }
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
            <h1>Price: ${(((currentDesign.price * 1) + productType.addedCost + size.addedCost) * quantity).toFixed(2)}</h1>
            { failed && <Failed /> }
          </center>
        </div>
      </div>
    </div>
  );
}
export default Order;
