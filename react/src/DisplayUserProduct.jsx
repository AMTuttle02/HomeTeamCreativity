import React, { useState, useEffect } from 'react';
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

const DisplayUserProduct = (props) => {
  const {currentProduct, color, style} = props;
  const default_location = currentProduct.default_style_location;
  const [currentDesign, setCurrentDesign] = useState('');
  const [currentColor, setCurrentColor] = useState(null);
  const [state, setState] = useState(0);

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

  useEffect(() => {
    if (state === 0) {
      if (default_location === 'front') {
        setCurrentDesign(window.location.origin + "/api/images/" + currentProduct.filename_front);
        setCurrentColor(getColor('front'));
      }
      else if (default_location === 'back') {
        setCurrentDesign(window.location.origin + "/api/images/" + currentProduct.filename_back);
        setCurrentColor(getColor('back'));
      }
    } 
    else if (state === 1) {
      if (default_location === 'front') {
        setCurrentDesign(window.location.origin + "/api/images/" + currentProduct.filename_back);
        setCurrentColor(getColor('back'));
      }
      else if (default_location === 'back') {
        setCurrentDesign(window.location.origin + "/api/images/" + currentProduct.filename_front);
        setCurrentColor(getColor('front'));
      }
    }
  }, [currentProduct, color, style]);

  const getColor = (location) => {
    if (style === "Short Sleeve T-Shirt") {
      if (location === "front") {
        return(tShirtMap[color]);
      }
      else {
        return(BackTShirtMap[color]);
      }
    }
    if (style === "Long Sleeve T-Shirt") {
      if (location === "front") {
        return(lShirtMap[color]);
      }
      else {
        return(BacklShirtMap[color]);
      }
    }
    if (style === "Crewneck Sweatshirt") {
      if (location === "front") {
        return(crewMap[color]);
      }
      else {
        return(BackCrewMap[color]);
      }
    }
    if (style === "Hooded Sweatshirt") {
      if (location === "front") {
        return(hoodieMap[color]);
      }
      else {
        return(BackHoodieMap[color]);
      }
    }
  }

  return (
    <div 
      className="fullDesign">
      <img
        src={currentColor}
        alt="Product Style"
        className="tshirt"
      />
      <img
        src={currentDesign}
        alt="Product Design"
        className="design"
      />
    </div>
  );
};

export default DisplayUserProduct;
