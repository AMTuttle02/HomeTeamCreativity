import React, { useState, useEffect } from 'react';
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
import "./displayProducts.css";

const DisplaycurrentProduct = ({ product }) => {
  const currentProduct = product;
  const [currentDesign, setCurrentDesign] = useState(window.location.origin + "/api/images/" + currentProduct.filename_front);
  const [currentColor, setCurrentColor] = useState(null);
  const [intervalId, setIntervalId] = useState(undefined);
  const [showingLocation, setShowingLocation] = useState('front');

  // T-Shirt Color Maps
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

  // Long Sleeve Color Maps
  const lShirtMap = {
    "Black": BlackLongSleeve,
    "Gray": GrayLongSleeve,
    "Red": RedLongSleeve,
    "Royal": RoyalLongSleeve,
    "White": WhiteLongSleeve,
    "Navy": NavyLongSleeve
  }
  const BacklShirtMap = {
    "Black": BackBlackLongSleeve,
    "Gray": BackGrayLongSleeve,
    "Red": BackRedLongSleeve,
    "Royal": BackRoyalLongSleeve,
    "White": BackWhiteLongSleeve,
    "Navy": BackNavyLongSleeve
  }

  // Crewneck Color Maps
  const crewMap = {
    "Black": BlackCrewneck,
    "Gray": GrayCrewneck,
    "White": WhiteCrewneck
  }
  const BackCrewMap = {
    "Black": BackBlackCrewneck,
    "Gray": BackGrayCrewneck,
    "White": BackWhiteCrewneck
  }

  // Hoodie Color Maps
  const hoodieMap = {
    "Black": BlackHoodie,
    "Gray": GrayHoodie,
    "Red": RedHoodie,
    "White": WhiteHoodie,
    "Navy": NavyHoodie
  }
  const BackHoodieMap = {
    "Black": BackBlackHoodie,
    "Gray": BackGrayHoodie,
    "Red": BackRedHoodie,
    "White": BackWhiteHoodie,
    "Navy": BackNavyHoodie
  }

  const restoreOriginal = () => {
    if (currentProduct.product_id === 0) {
      if (currentProduct.color == 'Yellow' || currentProduct.color == 'Gray' || currentProduct.color == 'White') {
        setCurrentDesign(window.location.origin + "/api/images/customDesignBlack.png");
        setCurrentColor(getColor('front'));
      }
      else {
        setCurrentDesign(window.location.origin + "/api/images/customDesign.png");
        setCurrentColor(getColor('front'));
      }
    }
    else {
      if (currentProduct.default_style_location === 'front') {
        setCurrentDesign(window.location.origin + "/api/images/" + currentProduct.filename_front);
        setCurrentColor(getColor('front'));
        setShowingLocation('front');
      }
      else if (currentProduct.default_style_location === 'back') {
        setCurrentDesign(window.location.origin + "/api/images/" + currentProduct.filename_back);
        setCurrentColor(getColor('back'));
        setShowingLocation('back');
      }
    }
  }

  useEffect(() => {
    restoreOriginal();
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup the interval on component unmount
      clearInterval(intervalId);
    };
  }, []);

  const getColor = (location) => {
    const regex = /\S+/;

    // Used for customer orders
    if (currentProduct.product_type) {
      if (currentProduct.product_type === 'Short Sleeve T-Shirt') {
        if (location === "front") {
          return(tShirtMap[currentProduct.color]);
        }
        else {
          return(BackTShirtMap[currentProduct.color]);
        }
      }
      else if (currentProduct.product_type === 'Long Sleeve T-Shirt') {
        if (location === "front") {
          return(lShirtMap[currentProduct.color]);
        }
        else {
          return(BacklShirtMap[currentProduct.color]);
        }
      }
      else if (currentProduct.product_type === 'Crewneck Sweatshirt') {
        if (location === "front") {
          return(crewMap[currentProduct.color]);
        }
        else {
          return(BackCrewMap[currentProduct.color]);
        }
      }
      else if (currentProduct.product_type === 'Hooded Sweatshirt') {
        if (location === "front") {
          return(hoodieMap[currentProduct.color]);
        }
        else {
          return(BackHoodieMap[currentProduct.color]);
        }
      }
    }
    // Used for default product display
    else {
      if (currentProduct.default_style === "tshirt") {
        if (location === "front") {
          return(tShirtMap[currentProduct.tColors.match(regex)[0]]);
        }
        else {
          return(BackTShirtMap[currentProduct.tColors.match(regex)[0]]);
        }
      }
      if (currentProduct.default_style === "longsleeve") {
        if (location === "front") {
          return(lShirtMap[currentProduct.lColors.match(regex)[0]]);
        }
        else {
          return(BacklShirtMap[currentProduct.lColors.match(regex)[0]]);
        }
      }
      if (currentProduct.default_style === "crewneck") {
        if (location === "front") {
          return(crewMap[currentProduct.cColors.match(regex)[0]]);
        }
        else {
          return(BackCrewMap[currentProduct.cColors.match(regex)[0]]);
        }
      }
      if (currentProduct.default_style === "hoodie") {
        if (location === "front") {
          return(hoodieMap[currentProduct.hColors.match(regex)[0]]);
        }
        else {
          return(BackHoodieMap[currentProduct.hColors.match(regex)[0]]);
        }
      }
    }
  }

  const startInterval = () => {
    setIntervalId(setInterval(() => {
      setCurrentDesign(prevDesign => {
        if (prevDesign  === window.location.origin + "/api/images/" + currentProduct.filename_front) {
          setCurrentColor(getColor('back'));
          setShowingLocation('back');
          return (window.location.origin + "/api/images/" + currentProduct.filename_back);
        }
        else {
          setCurrentColor(getColor('front'));
          setShowingLocation('front');
          return (window.location.origin + "/api/images/" + currentProduct.filename_front);
        }
      });
    }, 1500));
  };

  const stopInterval = () => {
    clearInterval(intervalId);
    setIntervalId(undefined);
  };

  const handleMouseEnter = () => {
    if (currentProduct.filename_front && currentProduct.filename_back) {
      setCurrentDesign(prevDesign => {
        if (prevDesign  === window.location.origin + "/api/images/" + currentProduct.filename_front) {
          setCurrentColor(getColor('back'));
          setShowingLocation('back');
          return (window.location.origin + "/api/images/" + currentProduct.filename_back);
        }
        else {
          setCurrentColor(getColor('front'));
          setShowingLocation('front');
          return (window.location.origin + "/api/images/" + currentProduct.filename_front);
        }
      });
      startInterval();
    }
  };

  const handleMouseLeave = () => {
    stopInterval();
    restoreOriginal();
  };

  if (product.default_style !== 'other') {
    const designClass = (showingLocation === 'front' && currentProduct.style_size === 'pocket') ? 'design-pocket' : 'design';

    return (
      <div 
        className="fullDesign"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <img
          src={currentColor}
          alt="Product Style"
          className="tshirt"
        />
        <img
          src={currentDesign}
          alt="Product Design"
          className={designClass}
        />
      </div>
    );
  }
  else {
    return (
      <div 
        className="fullDesign"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <img
          src={currentDesign}
          alt="Product Design"
          className="tshirt"
        />
      </div>
    );
  }
};

export default DisplaycurrentProduct;
