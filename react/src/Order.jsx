import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DisplayUserProduct from "./DisplayUserProduct";
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
  const [currentColor, setCurrentColor] = useState("");
  const [tShirtColor, setTShirtColor] = useState("Black");
  const [longSleeveColor, setLongSleeveColor] = useState("Black");
  const [hoodieColor, setHoodieColor] = useState("Black");
  const [crewneckColor, setCrewneckColor] = useState("Black");
  const [currentStyle, setCurrentStyle] = useState("");
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
  const navigate = useNavigate();
  const [productType, setProductType] = useState({description: "Short Sleeve T-Shirt", addedCost: 0});
  const [size, setSize] = useState({description: "", addedCost: 0});
  const [invalidSize, setInvalidSize] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [failed, setFailed] = useState(false);
  const [userId, setUserId] = useState("");
  const [customDetails, setCustomDetails] = useState("");
  const [productIsSet, setProductIsSet] = useState(false);
  const [currentDesignState, setCurrentDesignState] = useState(0);
  const [multipleLocations, setMultipleLocations] = useState(0);

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
          if (data[0].filename_front && data[0].filename_back) {
            setMultipleLocations(1);
          }

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
          setProductIsSet(true);
          console.log(data[0]);

          // Set tshirt color and design location
          const regex = /\S+/;
          if (data[0].tColors) {
            let firstWord = data[0].tColors.match(regex)[0];
            setTShirtColor(firstWord);
          }
          else if (retrieveDefault){
            let firstWord = retrieveDefault.tColors.match(regex)[0];
            setTShirtColor(firstWord);
          }
          
          // Set long sleeve shirt color and design location
          if (data[0].lColors) {
            let firstWord = data[0].lColors.match(regex)[0];
            setLongSleeveColor(firstWord);
          }
          else {
            let firstWord = retrieveDefault.lColors.match(regex)[0];
            setLongSleeveColor(firstWord);
          }

          // Set crewneck color and design location
          if (data[0].cColors) {
            let firstWord = data[0].cColors.match(regex)[0];
            setCrewneckColor(firstWord);
          }
          else {
            let firstWord = retrieveDefault.cColors.match(regex)[0];
            setCrewneckColor(firstWord);
          }

          // Set hoodie color and design location
          if (data[0].hColors) {
            let firstWord = data[0].hColors.match(regex)[0];
            setHoodieColor(firstWord);
          }
          else {
            let firstWord = retrieveDefault.hColors.match(regex)[0];
            setHoodieColor(firstWord);
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
        console.log(error);
        const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
        // Append the current URL to the target path
        navigate('/404');
      });
  }

  const changeColor = (color) => {
    if (currentDesign.tColors.includes(color)) {
      setTShirtColor(color);
    }
    else {
      if (currentStyle == "Short Sleeve T-Shirt") {
        const correctDesign = design.find((option) => option.tColors.includes(color));
        setCurrentDesign(correctDesign);
        setTShirtColor(color);
      }
    }
    if (currentDesign.cColors.includes(color)) {
      setCrewneckColor(color);
    }
    else {
      if (currentStyle == "Crewneck Sweatshirt") {
        const correctDesign = design.find((option) => option.cColors.includes(color));
        setCurrentDesign(correctDesign);
        setCrewneckColor(color);
      }
    }
    if (currentDesign.lColors.includes(color)) {
      setLongSleeveColor(color);
    }
    else {
      if (currentStyle == "Long Sleeve T-Shirt") {
        const correctDesign = design.find((option) => option.lColors.includes(color));
        setCurrentDesign(correctDesign);
        setLongSleeveColor(color);
      }
    }
    if (currentDesign.hColors.includes(color)) {
      setHoodieColor(color);
    }  
    else {
      if (currentStyle == "Hooded Sweatshirt") {
        const correctDesign = design.find((option) => option.hColors.includes(color));
        setCurrentDesign(correctDesign);
        setHoodieColor(color);
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
          window.location.href = "/cart";
        }
        else if (data > 1) {
          localStorage.setItem("oID", data);
          window.location.href = "/cart";
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
        if (currentDesign.tColors.includes(tShirtColor)) {
          setProductType({description: "Short Sleeve T-Shirt", addedCost: 0});
          setCurrentColor(tShirtColor);
        }
        else if (currentDesign.tColors){
          const color = currentDesign.tColors.match(regex)[0];
          setTShirtColor(color);
          setCurrentColor(color);
          setProductType({description: "Short Sleeve T-Shirt", addedCost: 0});
        }
        else {
          const color = defaultDesign.tColors.match(regex)[0];
          setTShirtColor(color);
          setCurrentColor(color);
          setProductType({description: "Short Sleeve T-Shirt", addedCost: 0});
        }
      }
      else if (currentStyle == "Crewneck Sweatshirt") {
        if (currentDesign.cColors.includes(crewneckColor)) {
          setProductType({description: "Crewneck Sweatshirt", addedCost: 8});
          setCurrentColor(crewneckColor);
        }
        else if (currentDesign.cColors) {
          const color = currentDesign.cColors.match(regex)[0];
          setCrewneckColor(color);
          setCurrentColor(color);
          setProductType({description: "Crewneck Sweatshirt", addedCost: 8});
        }
        else {
          setCurrentDesign(defaultDesign);
          const color = defaultDesign.cColors.match(regex)[0];
          setCrewneckColor(color);
          setCurrentColor(color);
          setProductType({description: "Crewneck Sweatshirt", addedCost: 8});
        }
        if (size.description == "Adult XXX-Large") {
          setSize({description: "Adult XXX-Large", addedCost: 2});
        }
      }
      else if (currentStyle == "Long Sleeve T-Shirt") {
        if (currentDesign.lColors.includes(longSleeveColor)) {
          setProductType({description: "Long Sleeve T-Shirt", addedCost: 4});
          setCurrentColor(longSleeveColor);
        }
        else if (currentDesign.lColors) {
          const color = currentDesign.lColors.match(regex)[0];
          setLongSleeveColor(color);
          setCurrentColor(color);
          setProductType({description: "Long Sleeve T-Shirt", addedCost: 4});
        }
        else {
          setCurrentDesign(defaultDesign);
          const color = defaultDesign.lColors.match(regex)[0];
          setLongSleeveColor(color);
          setCurrentColor(color);
          setProductType({description: "Long Sleeve T-Shirt", addedCost: 4});
        }
        if (size.description == "Adult XXX-Large") {
          setSize({description: "Adult XXX-Large", addedCost: 2});
        }
      }
      else if (currentStyle == "Hooded Sweatshirt") {
        if (currentDesign.hColors.includes(hoodieColor)) {
          setProductType({description: "Hooded Sweatshirt", addedCost: 12});
          setCurrentColor(hoodieColor);
        }
        else if (currentDesign.hColors) {
          const color = currentDesign.hColors.match(regex)[0];
          setHoodieColor(color);
          setCurrentColor(color);
          setProductType({description: "Hooded Sweatshirt", addedCost: 12});
        }
        else {
          setCurrentDesign(defaultDesign);
          const color = defaultDesign.hColors.match(regex)[0];
          setHoodieColor(color);
          setCurrentColor(color);
          setProductType({description: "Hooded Sweatshirt", addedCost: 12});
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
          <div className="orderDesignProduct">
            <div className="orderDesignButton">
              {multipleLocations ?
                <span> 
                  <button onClick={() => setCurrentDesignState(0)}>{'<'}</button>
                </span>
              : <span />
              }
            </div>
            <div className="orderDesignOnly">
              <button 
                className="magnify"
                onClick={() => setShowConfirmation(true)}>
                <DisplayUserProduct currentProduct={currentDesign} color={currentColor} style={currentStyle} state={currentDesignState}/>
              </button>
            </div>
            <div className="orderDesignButton">
              {multipleLocations ? 
                <span>
                  <button onClick={() => setCurrentDesignState(1)}>{'>'}</button>
                </span>
              : <span />
              }
            </div>
          </div>
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
        {showConfirmation &&
          <div className="confirmation-modal" onClick={handleOutsideClick}>
            <div className="orderItem-dialog">
              <span className="close-button" onClick={() => setShowConfirmation(false)}>&times;</span>
              <DisplayUserProduct currentProduct={currentDesign} color={currentColor} style={currentStyle} state={currentDesignState}/>
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
              onClick={() => changeColor("Black")}
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
              onClick={() => changeColor("Black")}
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
              onClick={() => changeColor("Black")}
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
              onClick={() => changeColor("Black")}
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
              onClick={() => changeColor("Gray")}
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
              onClick={() => changeColor("Gray")}
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
              onClick={() => changeColor("Gray")}
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
              onClick={() => changeColor("Gray")}
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
              onClick={() => changeColor("White")}
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
              onClick={() => changeColor("White")}
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
              onClick={() => changeColor("White")}
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
              onClick={() => changeColor("White")}
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
              onClick={() => changeColor("Navy")}
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
              onClick={() => changeColor("Navy")}
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
              onClick={() => changeColor("Navy")}
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
              onClick={() => changeColor("Royal")}
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
              onClick={() => changeColor("Royal")}
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
              onClick={() => changeColor("Red")}
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
              onClick={() => changeColor("Red")}
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
              onClick={() => changeColor("Red")}
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
              onClick={() => changeColor("Maroon")}
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
              onClick={() => changeColor("Yellow")}
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
              onClick={() => changeColor("Pink")}
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
              onClick={() => changeColor("Green")}
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
              onClick={() => changeColor("Orange")}
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
              onClick={() => changeColor("Purple")}
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
