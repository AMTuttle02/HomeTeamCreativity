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
  const [tDesign, setTDesign] = useState("");
  const [lDesign, setLDesign] = useState("");
  const [cDesign, setCDesign] = useState("");
  const [hDesign, setHDesign] = useState("");

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
          setTDesign(data[0]);
          setLDesign(data[0]);
          setCDesign(data[0]);
          setHDesign(data[0]);
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

  const changeColorTShirt = (e) => {
    if (e == gray) {
      if (tColors.includes("Gray")) {
        const correctDesign = design.find((option) => option.tColors.includes("Gray"));
        if (correctDesign && correctDesign !== tDesign) {
          setTDesign(correctDesign);
        }
        setTshirt(GrayTshirt);
        setTShirtColor("Gray");
        if (tDesign.cColors.includes("Gray")) {
          setCrewneck(GrayCrewneck);
          setCrewneckColor("Gray");
          setCDesign(tDesign);
        }
        if (tDesign.lColors.includes("Gray")) {
          setLongSleeve(GrayLongSleeve);
          setLongSleeveColor("Gray");
          setLDesign(tDesign);
        }
        if (tDesign.hColors.includes("Gray")) {
          setHoodie(GrayHoodie);
          setHoodieColor("Gray");
          setHDesign(tDesign);
        }
      }
    }
    else if (e == black) {
      if (tColors.includes("Black")) {
        const correctDesign = design.find((option) => option.tColors.includes("Black"));
        if (correctDesign && correctDesign !== tDesign) {
          setTDesign(correctDesign);
        }
        setTshirt(BlackTshirt);
        setTShirtColor("Black");
        if (tDesign.cColors.includes("Black")) {
          setCrewneck(BlackCrewneck);
          setCrewneckColor("Black");
          setCDesign(tDesign);
        }
        if (tDesign.lColors.includes("Black")) {
          setLongSleeve(BlackLongSleeve);
          setLongSleeveColor("Black");
          setLDesign(tDesign);
        }
        if (tDesign.hColors.includes("Black")) {
          setHoodie(BlackHoodie);
          setHoodieColor("Black");
          setHDesign(tDesign);
        } 
      }
    }
    else if (e == white) {
      if (tColors.includes("White")) {
        if (!tDesign.tColors.includes("White")) {
          const correctDesign = design.find((option) => option.tColors.includes("White"));
          setTDesign(correctDesign ? correctDesign : currentDesign);
        }
        setTshirt(WhiteTshirt);
        setTShirtColor("White");
        if (tDesign.cColors.includes("White")) {
          setCrewneck(WhiteCrewneck);
          setCrewneckColor("White");
          setCDesign(tDesign);
        }
        if (tDesign.lColors.includes("White")) {
          setLongSleeve(WhiteLongSleeve);
          setLongSleeveColor("White");
          setLDesign(tDesign);
        }
        if (tDesign.hColors.includes("White")) {
          setHoodie(WhiteHoodie);
          setHoodieColor("White");
          setHDesign(tDesign);
        } 
      }
    }
    else if (e == navy) {
      if (tColors.includes("Navy")) {
        if (!tDesign.tColors.includes("Navy")) {
          const correctDesign = design.find((option) => option.tColors.includes("Navy"));
          setTDesign(correctDesign ? correctDesign : tDesign);
        }
        setTshirt(NavyTshirt);
        setTShirtColor("Navy");
        if (tDesign.lColors.includes("Navy")) {
          setLongSleeve(NavyLongSleeve);
          setLongSleeveColor("Navy");
          setLDesign(tDesign);
        }
        if (tDesign.hColors.includes("Navy")) {
          setHoodie(NavyHoodie);
          setHoodieColor("Navy");
          setHDesign(tDesign);
        }
      }
    }
    else if (e == red) {
      if (tColors.includes("Red")) {
        if (!tDesign.tColors.includes("Red")) {
          const correctDesign = design.find((option) => option.tColors.includes("Red"));
          setTDesign(correctDesign ? correctDesign : tDesign);
        }
        setTshirt(RedTshirt);
        setTShirtColor("Red");
        if (tDesign.lColors.includes("Red")) {
          setLongSleeve(RedLongSleeve);
          setLongSleeveColor("Red");
          setLDesign(tDesign);
        }
        if (tDesign.hColors.includes("Red")) {
          setHoodie(RedHoodie);
          setHoodieColor("Red");
          setHDesign(tDesign);
        }
      }
    }
    else if (e == royal) {
      if (tColors.includes("Royal")) {
        if (!tDesign.tColors.includes("Royal")) {
          const correctDesign = design.find((option) => option.tColors.includes("Royal"));
          setTDesign(correctDesign ? correctDesign : tDesign);
        }
        setTshirt(RoyalTshirt);
        setTShirtColor("Royal");
        if (tDesign.lColors.includes("Royal")) {
          setLongSleeve(RoyalLongSleeve);
          setLongSleeveColor("Royal");
          setLDesign(tDesign);
        }
      }
    }
    else if (e == yellow) {
      if (tColors.includes("Yellow")) {
        if (!tDesign.tColors.includes("Yellow")) {
          const correctDesign = design.find((option) => option.tColors.includes("Yellow"));
          setTDesign(correctDesign ? correctDesign : tDesign);
        }
        setTshirt(YellowTshirt);
        setTShirtColor("Yellow");
      }
    }
    else if (e == pink) {
      if (tColors.includes("Pink")) {
        if (!tDesign.tColors.includes("Pink")) {
          const correctDesign = design.find((option) => option.tColors.includes("Pink"));
          setTDesign(correctDesign ? correctDesign : tDesign);
        }
        setTshirt(PinkTshirt);
        setTShirtColor("Pink");
      }
    }
    else if (e == green) {
      if (tColors.includes("Green")) {
        if (!tDesign.tColors.includes("Green")) {
          const correctDesign = design.find((option) => option.tColors.includes("Green"));
          setTDesign(correctDesign ? correctDesign : tDesign);
        }
        setTshirt(GreenTshirt);
        setTShirtColor("Green");
      }
    }
    else if (e == maroon) {
      if (tColors.includes("Maroon")) {
        if (!tDesign.tColors.includes("Maroon")) {
          const correctDesign = design.find((option) => option.tColors.includes("Maroon"));
          setTDesign(correctDesign ? correctDesign : tDesign);
        }
        setTshirt(MaroonTshirt);
        setTShirtColor("Maroon");
      }
    }
    else if (e == orange) {
      if (tColors.includes("Orange")) {
        if (!tDesign.tColors.includes("Orange")) {
          const correctDesign = design.find((option) => option.tColors.includes("Orange"));
          setTDesign(correctDesign ? correctDesign : tDesign);
        }
        setTshirt(OrangeTshirt);
        setTShirtColor("Orange");
      }
    }
    else if (e == purple) {
      if (tColors.includes("Purple")) {
        if (!tDesign.tColors.includes("Purple")) {
          const correctDesign = design.find((option) => option.tColors.includes("Purple"));
          setTDesign(correctDesign ? correctDesign : tDesign);
        }
        setTshirt(PurpleTshirt);
        setTShirtColor("Purple");
      }
    }
  };

  const changeColorLongSleeve = (e) => {
    if (e == gray) {
      if (lColors.includes("Gray")) {
        if (!lDesign.lColors.includes("Gray")) {
          const correctDesign = design.find((option) => option.lColors.includes("Gray"));
          setCurrentDesign(correctDesign ? correctDesign : lDesign);
        }
        setLongSleeve(GrayLongSleeve);
        setLongSleeveColor("Gray");
        if (lDesign.tColors.includes("Gray")) {
          setTshirt(GrayTshirt);
          setTShirtColor("Gray");
        }
        if (lDesign.cColors.includes("Gray")) {
          setCrewneck(GrayCrewneck);
          setCrewneckColor("Gray");
        }
        if (lDesign.hColors.includes("Gray")) {
          setHoodie(GrayHoodie);
          setHoodieColor("Gray");
        }  
      }
    }
    else if (e == black) {
      if (lColors.includes("Black")) {
        if (!currentDesign.lColors.includes("Black")) {
          const correctDesign = design.find((option) => option.lColors.includes("Black"));
          setCurrentDesign(correctDesign ? correctDesign : currentDesign);
        }
        setLongSleeve(BlackLongSleeve);
        setLongSleeveColor("Black");
        if (currentDesign.tColors.includes("Black")) {
          setTshirt(BlackTshirt);
          setTShirtColor("Black");
        }
        if (currentDesign.cColors.includes("Black")) {
          setCrewneck(BlackCrewneck);
          setCrewneckColor("Black");
        }
        if (currentDesign.hColors.includes("Black")) {
          setHoodie(BlackHoodie);
          setHoodieColor("Black");
        } 
      }
    }
    else if (e == white) {
      if (lColors.includes("White")) {
        if (!currentDesign.lColors.includes("White")) {
          const correctDesign = design.find((option) => option.lColors.includes("White"));
          setCurrentDesign(correctDesign ? correctDesign : currentDesign);
        }
        setLongSleeve(WhiteLongSleeve);
        setLongSleeveColor("White");
        if (currentDesign.tColors.includes("White")) {
          setTshirt(WhiteTshirt);
          setTShirtColor("White");
        }
        if (currentDesign.cColors.includes("White")) {
          setCrewneck(WhiteCrewneck);
          setCrewneckColor("White");
        }
        if (currentDesign.hColors.includes("White")) {
          setHoodie(WhiteHoodie);
          setHoodieColor("White");
        } 
      }
    }
    else if (e == navy) {
      if (lColors.includes("Navy")) {
        if (!currentDesign.lColors.includes("Navy")) {
          const correctDesign = design.find((option) => option.lColors.includes("Navy"));
          setCurrentDesign(correctDesign ? correctDesign : currentDesign);
        }
        setLongSleeve(NavyLongSleeve);
        setLongSleeveColor("Navy");
        if (currentDesign.tColors.includes("Navy")) {
          setTshirt(NavyTshirt);
          setTShirtColor("Navy");
        }
        if (currentDesign.hColors.includes("Navy")) {
          setHoodie(NavyHoodie);
          setHoodieColor("Navy");
        }
      }
    }
    else if (e == red) {
      if (lColors.includes("Red")) {
        if (!currentDesign.lColors.includes("Red")) {
          const correctDesign = design.find((option) => option.lColors.includes("Red"));
          setCurrentDesign(correctDesign ? correctDesign : currentDesign);
        }
        setLongSleeve(RedLongSleeve);
        setLongSleeveColor("Red");
        if (currentDesign.tColors.includes("Red")) {
          setTshirt(RedTshirt);
          setTShirtColor("Red");
        }
        if (currentDesign.hColors.includes("Red")) {
          setHoodie(RedHoodie);
          setHoodieColor("Red");
        }
      }
    }
    else if (e == royal) {
      if (lColors.includes("Royal")) {
        if (!currentDesign.lColors.includes("Royal")) {
          const correctDesign = design.find((option) => option.lColors.includes("Royal"));
          setCurrentDesign(correctDesign ? correctDesign : currentDesign);
        }
        setLongSleeve(RoyalLongSleeve);
        setLongSleeveColor("Royal");
        if (currentDesign.tColors.includes("Royal")) {
          setTshirt(RoyalTshirt);
          setTShirtColor("Royal");
        }
      }
    }
  };

  const changeColorCrewneck = (e) => {
    if (e == gray) {
      if (cColors.includes("Gray")) {
        if (!currentDesign.cColors.includes("Gray")) {
          const correctDesign = design.find((option) => option.cColors.includes("Gray"));
          setCurrentDesign(correctDesign ? correctDesign : currentDesign);
        }
        setCrewneck(GrayCrewneck);
        setCrewneckColor("Gray");
        if (currentDesign.tColors.includes("Gray")) {
          setTshirt(GrayTshirt);
          setTShirtColor("Gray");
        }
        if (currentDesign.lColors.includes("Gray")) {
          setLongSleeve(GrayLongSleeve);
          setLongSleeveColor("Gray");
        }
        if (currentDesign.hColors.includes("Gray")) {
          setHoodie(GrayHoodie);
          setHoodieColor("Gray");
        }  
      }
    }
    else if (e == black) {
      
      if (cColors.includes("Black")) {
        if (!currentDesign.cColors.includes("Black")) {
          const correctDesign = design.find((option) => option.cColors.includes("Black"));
          setCurrentDesign(correctDesign ? correctDesign : currentDesign);
        }
        setCrewneck(BlackCrewneck);
        setCrewneckColor("Black");
        if (currentDesign.tColors.includes("Black")) {
          setTshirt(BlackTshirt);
          setTShirtColor("Black");
        }
        if (currentDesign.lColors.includes("Black")) {
          setLongSleeve(BlackLongSleeve);
          setLongSleeveColor("Black");
        }
        if (currentDesign.hColors.includes("Black")) {
          setHoodie(BlackHoodie);
          setHoodieColor("Black");
        } 
      }
    }
    else if (e == white) {
      if (cColors.includes("White")) {
        if (!currentDesign.cColors.includes("White")) {
          const correctDesign = design.find((option) => option.cColors.includes("White"));
          setCurrentDesign(correctDesign ? correctDesign : currentDesign);
        }
        setCrewneck(WhiteCrewneck);
        setCrewneckColor("White");
        if (currentDesign.tColors.includes("White")) {
          setTshirt(WhiteTshirt);
          setTShirtColor("White");
        }
        if (currentDesign.lColors.includes("White")) {
          setLongSleeve(WhiteLongSleeve);
          setLongSleeveColor("White");
        }
        if (currentDesign.hColors.includes("White")) {
          setHoodie(WhiteHoodie);
          setHoodieColor("White");
        } 
      }
    }
  };

  const changeColorHoodie = (e) => {
    if (e == gray) {
      if (hColors.includes("Gray")) {
        if (!currentDesign.hColors.includes("Gray")) {
          const correctDesign = design.find((option) => option.hColors.includes("Gray"));
          setCurrentDesign(correctDesign ? correctDesign : currentDesign);
        }
        setHoodie(GrayHoodie);
        setHoodieColor("Gray");  
        if (currentDesign.tColors.includes("Gray")) {
          setTshirt(GrayTshirt);
          setTShirtColor("Gray");
        }
        if (currentDesign.cColors.includes("Gray")) {
          setCrewneck(GrayCrewneck);
          setCrewneckColor("Gray");
        }
        if (currentDesign.lColors.includes("Gray")) {
          setLongSleeve(GrayLongSleeve);
          setLongSleeveColor("Gray");
        }
      }
    }
    else if (e == black) {
      if (hColors.includes("Black")) {
        if (!currentDesign.hColors.includes("Black")) {
          const correctDesign = design.find((option) => option.hColors.includes("Black"));
          setCurrentDesign(correctDesign ? correctDesign : currentDesign);
        }
        setHoodie(BlackHoodie);
        setHoodieColor("Black");
        if (currentDesign.tColors.includes("Black")) {
          setTshirt(BlackTshirt);
          setTShirtColor("Black");
        }
        if (currentDesign.cColors.includes("Black")) {
          setCrewneck(BlackCrewneck);
          setCrewneckColor("Black");
        }
        if (currentDesign.lColors.includes("Black")) {
          setLongSleeve(BlackLongSleeve);
          setLongSleeveColor("Black");
        }
      }
    }
    else if (e == white) {
      if (hColors.includes("White")) {
        if (!currentDesign.hColors.includes("White")) {
          const correctDesign = design.find((option) => option.hColors.includes("White"));
          setCurrentDesign(correctDesign ? correctDesign : currentDesign);
        }
        setHoodie(WhiteHoodie);
        setHoodieColor("White");
        if (currentDesign.tColors.includes("White")) {
          setTshirt(WhiteTshirt);
          setTShirtColor("White");
        }
        if (currentDesign.cColors.includes("White")) {
          setCrewneck(WhiteCrewneck);
          setCrewneckColor("White");
        }
        if (currentDesign.lColors.includes("White")) {
          setLongSleeve(WhiteLongSleeve);
          setLongSleeveColor("White");
        }
      }
    }
    else if (e == navy) {
      if (hColors.includes("Navy")) {
        if (!currentDesign.hColors.includes("Navy")) {
          const correctDesign = design.find((option) => option.hColors.includes("Navy"));
          setCurrentDesign(correctDesign ? correctDesign : currentDesign);
        }
        setHoodie(NavyHoodie);
        setHoodieColor("Navy");
        if (currentDesign.tColors.includes("Navy")) {
          setTshirt(NavyTshirt);
          setTShirtColor("Navy");
        }
        if (currentDesign.lColors.includes("Navy")) {
          setLongSleeve(NavyLongSleeve);
          setLongSleeveColor("Navy");
        }
      }
    }
    else if (e == red) {
      if (hColors.includes("Red")) {
        if (!currentDesign.hColors.includes("Red")) {
          const correctDesign = design.find((option) => option.hColors.includes("Red"));
          setCurrentDesign(correctDesign ? correctDesign : currentDesign);
        }
        setHoodie(RedHoodie);
        setHoodieColor("Red");
        if (currentDesign.tColors.includes("Red")) {
          setTshirt(RedTshirt);
          setTShirtColor("Red");
        }
        if (currentDesign.lColors.includes("Red")) {
          setLongSleeve(RedLongSleeve);
          setLongSleeveColor("Red");
        }
      }
    }
  };

  const addToCart = () => {
    if (currentStyle == "Short Sleeve T-Shirt") {
      setCurrentDesign(tDesign);
    }
    else if (currentStyle == "Long Sleeve T-Shirt") {
      setCurrentDesign(lDesign);
    }
    else if (currentStyle == "Crewneck Sweatshirt") {
      setCurrentDesign(cDesign);
    }
    else {
      setcurrentDesign(hDesign);
    }

    fetch("/api/addToCart.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        order_id: 100, 
        product_id: currentDesign.id, 
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
  }, [currentStyle, tShirtColor, longSleeveColor, crewneckColor, hoodieColor, size, currentDesign]);

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
            {currentStyle == "Short Sleeve T-Shirt" &&
              <div>
                <img
                  src={"api/images/" + tDesign.filename}
                  alt={tDesign.product_name}
                  className="orderDesign"
                />
                <br /><br />
                <h3>{tDesign.product_name}</h3>
              </div>
            }
            {currentStyle == "Long Sleeve T-Shirt" &&
              <div>
                <img
                  src={"api/images/" + lDesign.filename}
                  alt={lDesign.product_name}
                  className="orderDesign"
                />
                <br /><br />
                <h3>{lDesign.product_name}</h3>
              </div>
            }
            {currentStyle == "Crewneck Sweatshirt" &&
              <div>
                <img
                  src={"api/images/" + cDesign.filename}
                  alt={cDesign.product_name}
                  className="orderDesign"
                />
                <br /><br />
                <h3>{cDesign.product_name}</h3>
              </div>
            }
            {currentStyle == "Hooded Sweatshirt" &&
              <div>
                <img
                  src={"api/images/" + hDesign.filename}
                  alt={hDesign.product_name}
                  className="orderDesign"
                />
                <br /><br />
                <h3>{hDesign.product_name}</h3>
              </div>
            }
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
                onClick={() => changeColorTShirt(black)}
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
                onClick={() => changeColorLongSleeve(black)}
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
                onClick={() => changeColorCrewneck(black)}
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
                onClick={() => changeColorHoodie(black)}
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
                onClick={() => changeColorTShirt(gray)}
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
                onClick={() => changeColorLongSleeve(gray)}
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
                onClick={() => changeColorCrewneck(gray)}
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
                onClick={() => changeColorHoodie(gray)}
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
                onClick={() => changeColorTShirt(white)}
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
                onClick={() => changeColorLongSleeve(white)}
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
                onClick={() => changeColorCrewneck(white)}
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
                onClick={() => changeColorHoodie(white)}
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
                onClick={() => changeColorTShirt(navy)}
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
                onClick={() => changeColorLongSleeve(navy)}
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
                onClick={() => changeColorHoodie(navy)}
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
                onClick={() => changeColorTShirt(royal)}
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
                onClick={() => changeColorLongSleeve(royal)}
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
                onClick={() => changeColorTShirt(red)}
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
                onClick={() => changeColorLongSleeve(red)}
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
                onClick={() => changeColorHoodie(red)}
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
                onClick={() => changeColorTShirt(maroon)}
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
                onClick={() => changeColorTShirt(yellow)}
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
                onClick={() => changeColorTShirt(pink)}
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
                onClick={() => changeColorTShirt(green)}
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
                onClick={() => changeColorTShirt(orange)}
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
                onClick={() => changeColorTShirt(purple)}
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
