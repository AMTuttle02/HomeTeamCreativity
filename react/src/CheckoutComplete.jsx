import React, { useEffect, useState } from "react";
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

function setType(type, color, locations) {
  // Tshirt maps
  const frontTShirtMap = {
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
  const backTShirtMap = {
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

  // Long Sleeve maps
  const frontLShirtMap = {
    "Black": BlackLongSleeve,
    "Gray": GrayLongSleeve,
    "Red": RedLongSleeve,
    "Royal": RoyalLongSleeve,
    "White": WhiteLongSleeve,
    "Navy": NavyLongSleeve
  }
  const backLShirtMap = {
    "Black": BackBlackLongSleeve,
    "Gray": BackGrayLongSleeve,
    "Red": BackRedLongSleeve,
    "Royal": BackRoyalLongSleeve,
    "White": BackWhiteLongSleeve,
    "Navy": BackNavyLongSleeve
  }

  // Crewneck maps
  const frontCrewMap = {
    "Black": BlackCrewneck,
    "Gray": GrayCrewneck,
    "White": WhiteCrewneck
  }
  const backCrewMap = {
    "Black": BackBlackCrewneck,
    "Gray": BackGrayCrewneck,
    "White": BackWhiteCrewneck
  }
  
  // Hoodie maps
  const frontHoodieMap = {
    "Black": BlackHoodie,
    "Gray": GrayHoodie,
    "Red": RedHoodie,
    "White": WhiteHoodie,
    "Navy": NavyHoodie
  }
  const backHoodieMap = {
    "Black": BackBlackHoodie,
    "Gray": BackGrayHoodie,
    "Red": BackRedHoodie,
    "White": BackWhiteHoodie,
    "Navy": BackNavyHoodie
  }

  if (type == "Crewneck Sweatshirt") {
    if (locations === "front") {
      return(frontCrewMap[color]);
    }
    else {
      return(backCrewMap[color]);
    }
  }
  else if (type == "Hooded Sweatshirt") {
    if (locations === "front") {
      return(frontHoodieMap[color]);
    }
    else {
      return(backHoodieMap[color]);
    }
  }
  else if (type == "Long Sleeve T-Shirt") {
    if (locations === "front") {
      return(frontLShirtMap[color]);
    }
    else {
      return(backLShirtMap[color]);
    }
  }
  else {
    if (locations === "front") {
      return(frontTShirtMap[color]);
    }
    else {
      return(backTShirtMap[color]);
    }
  }
}

function Checkout() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);
  const [customHighTotal, setCustomHighTotal] = useState(0);
  const [enlarge, setEnlarge] = useState(false);
  const [enlargeProduct, setEnlargeProduct] = useState(false);

  useEffect(() => {
    let oID = 0;
    if (localStorage.getItem("oID")) {
        oID = localStorage.getItem("oID");
        localStorage.clear();
    }
    else if (userId) {
        oID = 0;
    }
    fetch("/api/recentOrderDetails.php")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        for (let i = 0; i < data.length; ++i) {
          if (data[i].product_id == 0) {
            const temp = customHighTotal;
            setCustomHighTotal(temp + (6 * data[i].product_quantity));
          }
        }
      });
  }, []);

  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.userId);
        setName(data.first_name);
      });
  }, []);

  const setPrice = (price, type, size) => {
    price = price * 1;
    if (type == "Crewneck Sweatshirt") {
      price += 8;
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large" || size == "Adult XXX-Large") {
        price += 2;
      }
    }
    else if (type == "Hooded Sweatshirt") {
      price += 12;
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large" || size == "Adult XXX-Large") {
        price += 2;
      }
    }
    else if (type == "Long Sleeve T-Shirt") {
      price += 4;
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large" || size == "Adult XXX-Large") {
        price += 2;
      }
    }
    else {
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large" || size == "Adult XXX-Large") {
        price += 2;
      }
    }
    return price;
  }

  const determineDesign = (color) => {
    if (color == 'Yellow' || color == 'Gray' || color == 'White') {
      return ('customDesignBlack.png')
    }
    else {
      return ('customDesign.png')
    }
  }

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.fullDesign')) {
      setEnlarge(false);
    }
  };

  const confirmEnlarge = (product) => {
    setEnlargeProduct(product);
    setEnlarge(true);
  }

  return (
    <div className="Checkout">
        <div className="success">
          <h1>Thank you for placing an order!</h1>
          <br />
          <h1>We will reach out soon with an order confirmation and next steps.</h1>
          <br />
          <h1>Have a question? Feel Free To Reach Out <a href="https://linktr.ee/hometeamcreativity" target="_blank" className="white">Here</a></h1>
          <br/>
          <div className="CartPage" />
          <br />
          <div className="cartMain">
            <br />
            <h1>Order Details</h1>
          </div>
          <br />
          <div className="CartPage" />
            {products.map((product) => (
            <div key={product.product_id}>
              {product.product_id ?
                <div className="cartProductRow">
                  <div className="productsCell">
                    <button 
                          className="magnify"
                          onClick={() => confirmEnlarge(product)}>
                      <div className="fullDesign">
                        <img
                          src={setType(product.product_type, product.color, product.style_locations)}
                          alt="Home Team Creativity Logo"
                          className="tshirt"
                        />
                        <img
                          src={"api/images/" + product.filename}
                          alt={product.filename}
                          className="design"
                        />
                      </div>
                    </button>
                  </div>
                  <div className="productsCell">
                    <br />
                    <h2> <b> {product.product_name} </b></h2> 
                    <h2> Style: {product.product_type} </h2>
                    <h2> Size: {product.size} </h2>
                    <h2> Color: {product.color} </h2>
                  </div>
                  <br />
                  <div className="productsCell">
                    <br /><br />
                    <h2>${(setPrice(product.price, product.product_type, product.size) * product.product_quantity).toFixed(2)}</h2>
                    <br /><br />
                    <h2> 
                      Qty:{' '}
                      {product.product_quantity} 
                    </h2>
                  </div>
                  <div className="productsCell">
                    <br /><br /><br /><br /><br /><br />
                    <h2>${(setPrice(product.price, product.product_type, product.size) * product.product_quantity).toFixed(2)}</h2>
                  </div>
                </div>
              :
                <div className="cartProductRow">
                  <div className="productsCell">
                    <button 
                          className="magnify"
                          onClick={() => confirmEnlarge(product)}>
                      <div className="fullDesign">
                        <img
                          src={setType(product.product_type, product.color, product.style_locations)}
                          alt="Home Team Creativity Logo"
                          className="tshirt"
                        />
                        <img
                          src={"api/images/" + determineDesign(product.color)}
                          alt={product.filename}
                          className="design"
                        />
                      </div>
                    </button>
                  </div>
                  <div className="productsCell">
                    <br />
                    <h2> <b> {product.product_name} </b></h2> 
                    <h2> Style: {product.product_type} </h2>
                    <h2> Size: {product.size} </h2>
                    <h2> Color: {product.color} </h2>
                  </div>
                  <br />
                  <div className="productsCell">
                    <br /><br />
                    <h2>${setPrice(product.price, product.product_type, product.size).toFixed(2)} - ${(setPrice(product.price, product.product_type, product.size) * 1 +customHighTotal).toFixed(2)}</h2>
                    <br /><br />
                    <h2> 
                      Qty:{' '} 
                      {product.product_quantity} 
                    </h2>
                  </div>
                  <div className="productsCell">
                    <br /><br /><br /><br /><br /><br />
                    <h2>${(setPrice(product.price, product.product_type, product.size) * product.product_quantity).toFixed(2)} - ${(setPrice(product.price, product.product_type, product.size) * product.product_quantity * 1 +customHighTotal).toFixed(2)}</h2>
                  </div>
                </div>
              }
              {enlarge && enlargeProduct === product &&
                <div className="confirmation-modal" onClick={handleOutsideClick}>
                  <div className="orderItem-dialog">
                    <span className="close-button" onClick={() => setEnlarge(false)}>&times;</span>
                    <div className="fullDesign">
                      <img
                        src={setType(product.product_type, product.color, product.style_locations)}
                        alt="Home Team Creativity Logo"
                        className="tshirt"
                      />
                      <img
                        src={"api/images/" + product.filename}
                        alt={product.filename}
                        className="design"
                      />
                    </div>
                  </div>
                </div>
              }
              <div className="CartPage" />
            </div>
            ))}
          <br/>
        </div>
    </div>
  );
}
export default Checkout;