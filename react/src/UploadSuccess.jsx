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

function UploadSuccess() {
  const [admin, setAdmin] = useState("");

  // Set Admin State
  useEffect(() => {
    fetch("/api/admin.php")
      .then((response) => response.json())
      .then((data) => {
        setAdmin(data.admin);
      });
  }, []);

  const [designs, setDesigns] = useState([]);
  const [style, setStyle] = useState('');
  const [product, setProduct] = useState(null);

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


  useEffect(() => {
    fetch("/api/recentUpload.php")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data != "Recent design not set") {
          setProduct(data[0]);
          determineDesigns(data[0]);
          setStyle(data[0].default_style);
        }
    });
  }, []);

  function determineStyle(product, design) {
    let location = '';
    
    if (design === product.filename_front) {
      location = 'front'
    }
    else if (design === product.filename_back) {
      location = 'back';
    }
    else {
      console.log('Style location is not set.')
      return (5);
    }

    const regex = /\S+/;
    if (location === 'front') {
      if (product.default_style === 'tshirt') {
        let firstWord = product.tColors.match(regex)[0];
        return(frontTShirtMap[firstWord]);
      }
      else if (product.default_style === 'longsleeve') {
        let firstWord = product.lColors.match(regex)[0];
        return(frontLShirtMap[firstWord]);
      }
      else if (product.default_style === 'crewneck') {
        let firstWord = product.cColors.match(regex)[0];
        return(frontCrewMap[firstWord]);
      }
      else if (product.default_style === 'hoodie') {
        let firstWord = product.hColors.match(regex)[0];
        return(frontHoodieMap[firstWord]);
      }

    }
    else if (location === 'back'){
      if (product.default_style === 'tshirt') {
        let firstWord = product.tColors.match(regex)[0];
        return(backTShirtMap[firstWord]);
      }
      else if (product.default_style === 'longsleeve') {
        let firstWord = product.lColors.match(regex)[0];
        return(backLShirtMap[firstWord]);
      }
      else if (product.default_style === 'crewneck') {
        let firstWord = product.cColors.match(regex)[0];
        return(backCrewMap[firstWord]);
      }
      else if (product.default_style === 'hoodie') {
        let firstWord = product.hColors.match(regex)[0];
        return(backHoodieMap[firstWord]);
      }
    }
  }

  function determineDesigns(product) {
    if (product.default_style_location === 'front') {
      if (product.filename_back) {
        setDesigns([product.filename_front, product.filename_back]);
      }
      else {
        setDesigns([product.filename_front]);
      }
    }
    else {
      if (product.filename_front) {
        setDesigns([product.filename_back, product.filename_front]);
      }
      else {
        setDesigns([product.filename_back]);
      }
    }
  }

  if (admin) {
    return (
      <div className='Upload'>
        <br />
        <div className="productsTable">
          <div className="productsTd">
            <h1>Upload Complete!</h1>
            <h2>Design Preview:</h2>
            <div className="productsRow">
              {designs.map((design) => (
                  <div key={design} className="productsCell">
                      <div className="productDetails">
                        <div className="fullDesign">
                          <img
                          src={determineStyle(product, design)}
                          alt="Home Team Creativity Logo"
                          className="tshirt"
                          />
                          <img
                          src={"api/images/" + design}
                          alt={design}
                          className="design"
                          />
                        </div>
                        <center>
                        <p>{product.product_name}</p>
                        <p>{"$" + product.price}</p>
                        </center>
                      </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  else {
    return ( 
        <div className='Upload'>
          <br />
          <div className="container">
          <h1>Sorry, you must be logged in to access this page.</h1>
          <br />
          <h2>Click <Link to="/login">Here</Link> to Login</h2>
          <br/>
          </div>
        </div>
    );
  }
}
export default UploadSuccess;
