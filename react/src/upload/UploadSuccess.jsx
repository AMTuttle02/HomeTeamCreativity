import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlackTshirt from "../assets/TshirtFront/blackTShirt.png";
import BlackLongSleeve from "../assets/LongSleeveFront/blackLongSleeve.png";
import BlackCrewneck from "../assets/CrewneckFront/blackCrewneck.png";
import BlackHoodie from "../assets/HoodieFront/blackhoodie.png";
import GrayTshirt from "../assets/TshirtFront/GreyTShirt.png";
import GrayLongSleeve from "../assets/LongSleeveFront/GreyLongSleeve.png";
import GrayCrewneck from "../assets/CrewneckFront/GreyCrewneckSS.png";
import GrayHoodie from "../assets/HoodieFront/greyhoodie.png";
import RedTshirt from "../assets/TshirtFront/RedTShirt.png";
import RedLongSleeve from "../assets/LongSleeveFront/RedLongSleeve.png";
import RedHoodie from "../assets/HoodieFront/redhoodie.png";
import YellowTshirt from "../assets/TshirtFront/YellowTShirtpng.png";
import PinkTshirt from "../assets/TshirtFront/PinkTShirt.png";
import GreenTshirt from "../assets/TshirtFront/GreenTShirt.png";
import MaroonTshirt from "../assets/TshirtFront/MaroonTShirt.png";
import OrangeTshirt from "../assets/TshirtFront/OrangeTShirt.png";
import PurpleTshirt from "../assets/TshirtFront/PurpleTShirt.png";
import RoyalTshirt from "../assets/TshirtFront/RoyalTShirt.png";
import RoyalLongSleeve from "../assets/LongSleeveFront/RoyalLongSleeve.png";
import NavyTshirt from "../assets/TshirtFront/NavyTShirt.png";
import NavyLongSleeve from "../assets/LongSleeveFront/NavyLongSleece.png";
import NavyHoodie from "../assets/HoodieFront/navyhoodie.png";
import WhiteTshirt from "../assets/TshirtFront/WhiteTShirt.png";
import WhiteLongSleeve from "../assets/LongSleeveFront/WhiteLongSleeve.png";
import WhiteCrewneck from "../assets/CrewneckFront/WhiteCrewneckSS.png";
import WhiteHoodie from "../assets/HoodieFront/whitehoodie.png";
import BackBlackTshirt from "../assets/TshirtBack/TSBbk.png";
import BackBlackLongSleeve from "../assets/LongSleeveBack/LSBbk.png";
import BackBlackCrewneck from "../assets/CrewneckBack/CSBbk.png";
import BackBlackHoodie from "../assets/HoodieBack/blackhoodieb.png";
import BackGrayTshirt from "../assets/TshirtBack/TSBg.png";
import BackGrayLongSleeve from "../assets/LongSleeveBack/LSBg.png";
import BackGrayCrewneck from "../assets/CrewneckBack/CSBg.png";
import BackGrayHoodie from "../assets/HoodieBack/greyhoodieb.png";
import BackRedTshirt from "../assets/TshirtBack/TSBr.png";
import BackRedLongSleeve from "../assets/LongSleeveBack/LSBR.png";
import BackRedHoodie from "../assets/HoodieBack/redhoodieb.png";
import BackYellowTshirt from "../assets/TshirtBack/TSBy.png";
import BackPinkTshirt from "../assets/TshirtBack/TSBpk.png";
import BackGreenTshirt from "../assets/TshirtBack/TSBgn.png";
import BackMaroonTshirt from "../assets/TshirtBack/TSBm.png";
import BackOrangeTshirt from "../assets/TshirtBack/TSBo.png";
import BackPurpleTshirt from "../assets/TshirtBack/TSBp.png";
import BackRoyalTshirt from "../assets/TshirtBack/TSBb.png";
import BackRoyalLongSleeve from "../assets/LongSleeveBack/LSBb.png";
import BackNavyTshirt from "../assets/TshirtBack/TSBn.png";
import BackNavyLongSleeve from "../assets/LongSleeveBack/LSBn.png";
import BackNavyHoodie from "../assets/HoodieBack/navyhoodieb.png";
import BackWhiteTshirt from "../assets/TshirtBack/TSBw.png";
import BackWhiteLongSleeve from "../assets/LongSleeveBack/LSBw.png";
import BackWhiteCrewneck from "../assets/CrewneckBack/CSBw.png";
import BackWhiteHoodie from "../assets/HoodieBack/whitehoodieb.png";

function UploadSuccess() {
  const [admin, setAdmin] = useState("");

  // Set Admin State
  useEffect(() => {
    fetch("/api/admin/admin.php")
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
    fetch("/api/product/recentUpload.php")
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
              {style !== 'other' ?
                <>
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
                </>
              :
                <>
                  {designs.map((design) => (
                    <div key={design} className="productsCell">
                      <div className="productDetails">
                        <div className="fullDesign">
                          <img
                          src={"api/images/" + design}
                          alt={design}
                          className="tshirt"
                          />
                        </div>
                        <center>
                        <p>{product.product_name}</p>
                        <p>{"$" + product.price}</p>
                        </center>
                      </div>
                    </div>
                  ))}
                </>
              }
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
