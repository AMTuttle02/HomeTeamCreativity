import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import BackBlackTshirt from "./assets/TshirtBackView/TSBbk.png";
import BackBlackLongSleeve from "./assets/LongSleeveBackView/LSBbk.png";
import BackBlackCrewneck from "./assets/CrewBackView/CSBbk.png";
import BackBlackHoodie from "./assets/HoodieBackView/HBb.png";
import BackGrayTshirt from "./assets/TshirtBackView/TSBg.png";
import BackGrayLongSleeve from "./assets/LongSleeveBackView/LSBg.png";
import BackGrayCrewneck from "./assets/CrewBackView/CSBg.png";
import BackGrayHoodie from "./assets/HoodieBackView/HBg.png";
import BackRedTshirt from "./assets/TshirtBackView/TSBr.png";
import BackRedLongSleeve from "./assets/LongSleeveBackView/LSBR.png";
import BackRedHoodie from "./assets/HoodieBackView/HBr.png";
import BackYellowTshirt from "./assets/TshirtBackView/TSBy.png";
import BackPinkTshirt from "./assets/TshirtBackView/TSBpk.png";
import BackGreenTshirt from "./assets/TshirtBackView/TSBgn.png";
import BackMaroonTshirt from "./assets/TshirtBackView/TSBm.png";
import BackOrangeTshirt from "./assets/TshirtBackView/TSBo.png";
import BackPurpleTshirt from "./assets/TshirtBackView/TSBp.png";
import BackRoyalTshirt from "./assets/TshirtBackView/TSBb.png";
import BackRoyalLongSleeve from "./assets/LongSleeveBackView/LSBb.png";
import BackNavyTshirt from "./assets/TshirtBackView/TSBn.png";
import BackNavyLongSleeve from "./assets/LongSleeveBackView/LSBn.png";
import BackNavyHoodie from "./assets/HoodieBackView/HBn.png";
import BackWhiteTshirt from "./assets/TshirtBackView/TSBw.png";
import BackWhiteLongSleeve from "./assets/LongSleeveBackView/LSBw.png";
import BackWhiteCrewneck from "./assets/CrewBackView/CSBw.png";
import BackWhiteHoodie from "./assets/HoodieBackView/HBw.png";
import { Outlet, Link } from "react-router-dom";

function HomeContents() {
  const [firstName, setFirstName] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const orderProduct = (productId) => {
    if (productId != 0) {
      navigate("/order/" + productId);
    }
    else {
      navigate("/customOrder");
    }
  };

  const currentColor = (product) => {
    if (product.default_style === "tshirt") {
      if (product.style_locations === "front") {
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
        let firstWord = product.tColors.match(regex)[0];
        return(tShirtMap[firstWord]);
      }
      else {
        const BackTShirtMap = {
          "Black": BackBlackTshirt,
          "Gray": BackGrayTshirt,
          "Yellow": BackYellowTshirt,
          "Pink": BackPinkTshirt,
          "Green": BackGreenTshirt,
          "Maroon": BackMaroonTshirt,
          "Orange": BackOrangeTshirt,
          "Purple": BackPurpleTshirt,
          "Red": BackRedTshirt,
          "Royal": BackRoyalTshirt,
          "White": BackWhiteTshirt,
          "Navy": BackNavyTshirt
        }
        const regex = /\S+/;
        let firstWord = product.tColors.match(regex)[0];
        return(BackTShirtMap[firstWord]);
      }
    }
    if (product.default_style === "longsleeve") {
      if (product.style_locations === "front") {
        const lShirtMap = {
          "Black": BlackLongSleeve,
          "Gray": GrayLongSleeve,
          "Red": RedLongSleeve,
          "Royal": RoyalLongSleeve,
          "White": WhiteLongSleeve,
          "Navy": NavyLongSleeve
        }
        const regex = /\S+/;
        let firstWord = product.lColors.match(regex)[0];
        return(lShirtMap[firstWord]);
      }
      else {
        const BacklShirtMap = {
          "Black": BackBlackLongSleeve,
          "Gray": BackGrayLongSleeve,
          "Red": BackRedLongSleeve,
          "Royal": BackRoyalLongSleeve,
          "White": BackWhiteLongSleeve,
          "Navy": BackNavyLongSleeve
        }
        const regex = /\S+/;
        let firstWord = product.tColors.match(regex)[0];
        return(BacklShirtMap[firstWord]);
      }
    }
    if (product.default_style === "crewneck") {
      if (product.style_locations === "front") {
        const crewMap = {
          "Black": BlackCrewneck,
          "Gray": GrayCrewneck,
          "White": WhiteCrewneck
        }
        const regex = /\S+/;
        let firstWord = product.cColors.match(regex)[0];
        return(crewMap[firstWord]);
      }
      else {
        const crewMap = {
          "Black": BackBlackCrewneck,
          "Gray": BackGrayCrewneck,
          "White": BackWhiteCrewneck
        }
        const regex = /\S+/;
        let firstWord = product.cColors.match(regex)[0];
        return(crewMap[firstWord]);
      }
    }
    if (product.default_style === "hoodie") {
      if (product.style_locations === "front") {
        const hoodieMap = {
          "Black": BlackHoodie,
          "Gray": GrayHoodie,
          "Red": RedHoodie,
          "White": WhiteHoodie,
          "Navy": NavyHoodie
        }
        const regex = /\S+/;
        let firstWord = product.hColors.match(regex)[0];
        return(hoodieMap[firstWord]);
      }
      else {
        const hoodieMap = {
          "Black": BackBlackHoodie,
          "Gray": BackGrayHoodie,
          "Red": BackRedHoodie,
          "White": BackWhiteHoodie,
          "Navy": BackNavyHoodie
        }
        const regex = /\S+/;
        let firstWord = product.hColors.match(regex)[0];
        return(hoodieMap[firstWord]);
      }
    }
  }

  const getPrice = (price, style) => {
    if (style === "tshirt") {
      return ((price * 1 + 0));
    }
    else if (style === "longsleeve") {
      return ((price * 1 + 4));
    }
    else if (style === "crewneck") {
      return ((price * 1 + 8));
    }
    else if (style === "hoodie") {
      return ((price * 1 + 12)); 
    }
  }

  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.first_name);
      });
    fetch("/api/featuredProducts.php")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="index">
      {firstName ? <h1>Welcome Back {firstName}!</h1> : <h1><b>Welcome to Home Team Creativity!</b></h1>}
      <div className="HomeRow">
        <div className="homeSide">
          <div className="orderLinks">
            <br /><br /><br />
            <Link to='/order' className="OrderButton">ORDER NOW</Link>
            <br /><br /><br /><br /><br />
            <Link to='/about' className="OrderButton">ABOUT US</Link>
            <br /><br /><br /><br /><br />
            <Link to="https://linktr.ee/hometeamcreativity" target="_blank" className="OrderButton">CONTACT US</Link>
          </div>
        </div>
        <div className="homeMain">
          <h2>Featured Products</h2>
          <br />
          <div className="productsRow">
            {products.map((product) => (
              <div key={product.filename} className="homeProductsCell">
                <div className="productDetails">
                    <button onClick={() => orderProduct(product.product_id)} className="magnify">
                    <div className="fullDesign">
                    <img
                      src={currentColor(product)}
                      alt="Home Team Creativity Logo"
                      className="tshirt"
                    />
                    <img
                      src={"api/images/" + product.filename}
                      alt={product.filename}
                      className="design"
                    />
                  </div>
                  <p>{product.product_name}</p>
                  <p>{"$" + (getPrice(product.price, product.default_style)).toFixed(2)}</p>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default HomeContents;
