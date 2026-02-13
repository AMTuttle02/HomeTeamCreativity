import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DisplayUserProduct from "../products/DisplayUserProduct";
import transparentTshirt from "../assets/transparentTshirt.png";
import transparentLongSleeve from "../assets/transparentLongSleeve.png";
import transparentCrewneck from "../assets/transparentCrewneck.png";
import transparentHoodie from "../assets/transparentHoodie.png";
import black from "../assets/black.png";
import red from "../assets/red.png";
import yellow from "../assets/yellow.png";
import royal from "../assets/royal.png";
import gray from "../assets/gray.png";
import pink from "../assets/pink.png";
import green from "../assets/green.png";
import maroon from "../assets/maroon.png";
import orange from "../assets/orange.png";
import purple from "../assets/purple.png";
import white from "../assets/white.png";
import navy from "../assets/navy.png";
import "./order.css";

function Order() {
  const [currentColor, setCurrentColor] = useState("");
  const [tShirtColor, setTShirtColor] = useState("");
  const [longSleeveColor, setLongSleeveColor] = useState("");
  const [hoodieColor, setHoodieColor] = useState("");
  const [crewneckColor, setCrewneckColor] = useState("");
  const [currentStyle, setCurrentStyle] = useState("");
  const [design, setDesign] = useState([]);
  const [currentDesign, setCurrentDesign] = useState("");
  const [defaultDesign, setDefaultDesign] = useState("");
  const [tColors, setTColors] = useState([]);
  const [lColors, setLColors] = useState([]);
  const [cColors, setCColors] = useState([]);
  const [hColors, setHColors] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [nameOnBack, setNameOnBack] = useState(false);
  const [numberOnBack, setNumberOnBack] = useState(false);
  const {productKey} = useParams();
  const navigate = useNavigate();
  const [productType, setProductType] = useState({description: "Short Sleeve T-Shirt", addedCost: 0});
  const [size, setSize] = useState({description: "", addedCost: 0});
  const [quantity, setQuantity] = useState(1);
  const [failed, setFailed] = useState(false);
  const [userId, setUserId] = useState("");
  const [customDetails, setCustomDetails] = useState("");
  const [currentDesignState, setCurrentDesignState] = useState(0);
  const [multipleLocations, setMultipleLocations] = useState(0);
  const [customDetailsRequired, setCustomDetailsRequired] = useState(false);
  const [sizesAvailable, setSizesAvailable] = useState(1);
  const [nameOnBackDetails, setNameOnBackDetails] = useState("");
  const [numberOnBackDetails, setNumberOnBackDetails] = useState(0);
  const [custom, setCustom] = useState(0);

  const [similarProducts, setSimilarProducts] = useState([]);

  // Helper: normalize a semicolon/comma/space separated list to tokens
  const parseTokens = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val.map(v => String(v).trim().toLowerCase()).filter(Boolean);
    return String(val).split(/[;,\s]+/).map(s => s.trim().toLowerCase()).filter(Boolean);
  }

  // Compute similar products client-side: fetch all products and popularity, score by category/subcategory/tags and popularity
  const computeSimilarProducts = async (baseProduct) => {
    if (!baseProduct) return;
    try {
      const [allRes, popRes] = await Promise.all([
        fetch('/api/product/products.php'),
        fetch('/api/product/getProductPopularity.php')
      ]);
      const all = await allRes.json();
      const popularity = await popRes.json().catch(() => ({}));

      const baseCats = parseTokens(baseProduct.categories);
      const baseSubs = parseTokens(baseProduct.subcategories);
      const baseTags = parseTokens(baseProduct.tag_list || baseProduct.tags || baseProduct.taglist);

      const scored = (all || []).map(p => {
        if (!p) return null;
        if (String(p.product_id) === String(baseProduct.product_id)) return null;
        // exclude products with exactly the same name as the base product
        if (p.product_name && baseProduct.product_name && String(p.product_name).trim().toLowerCase() === String(baseProduct.product_name).trim().toLowerCase()) return null;
        let score = 0;
        const pCats = parseTokens(p.categories);
        const pSubs = parseTokens(p.subcategories);
        const pTags = parseTokens(p.tag_list || p.tags || p.taglist);

        // category overlap
        if (baseCats.length > 0 && pCats.some(pc => baseCats.includes(pc))) score += 5;
        // subcategory overlap
        if (baseSubs.length > 0 && pSubs.some(ps => baseSubs.includes(ps))) score += 4;
        // tag overlap
        if (baseTags.length > 0 && pTags.some(t => baseTags.includes(t))) score += 2;

        // popularity as tiebreaker (small contribution)
        const pop = Number(popularity[String(p.product_id)] || 0);
        score += pop * 0.01;

        return { product: p, score };
      }).filter(Boolean);

      scored.sort((a, b) => b.score - a.score || (Number(b.product.product_id) - Number(a.product.product_id)));
      // Deduplicate by product_id and by exact product_name (normalized)
      const seenIds = new Set();
      const seenNames = new Set();
      const top = [];
      for (const s of scored) {
        if (!s || !s.product) continue;
        const pid = String(s.product.product_id);
        const pname = s.product.product_name ? String(s.product.product_name).trim().toLowerCase() : '';
        if (seenIds.has(pid)) continue;
        if (pname && seenNames.has(pname)) continue;
        seenIds.add(pid);
        if (pname) seenNames.add(pname);
        top.push(s.product);
        if (top.length >= 4) break;
      }
      setSimilarProducts(top);
    } catch (e) {
      console.error('Failed to compute similar products', e);
    }
  }

  const styleDisplayName = (style) => {
    if (!style) return "Other";
    if (style === "tshirt") return "Short Sleeve T-Shirt";
    if (style === "longsleeve") return "Long Sleeve T-Shirt";
    if (style === "crewneck") return "Crewneck Sweatshirt";
    if (style === "hoodie") return "Hooded Sweatshirt";
    return "Other";
  }

  const pickFirstColor = (product) => {
    const regex = /\S+/;
    if (!product) return "Black";
    // prefer tColors, then lColors, then cColors, then hColors
    if (product.tColors && product.tColors.trim() !== "") {
      const m = product.tColors.match(regex);
      if (m) return m[0];
    }
    if (product.lColors && product.lColors.trim() !== "") {
      const m = product.lColors.match(regex);
      if (m) return m[0];
    }
    if (product.cColors && product.cColors.trim() !== "") {
      const m = product.cColors.match(regex);
      if (m) return m[0];
    }
    if (product.hColors && product.hColors.trim() !== "") {
      const m = product.hColors.match(regex);
      if (m) return m[0];
    }
    return "Black";
  }
  const colorMap = {
    "Black": black,
    "Gray": gray,
    "Yellow": yellow,
    "Pink": pink,
    "Green": green,
    "Maroon": maroon,
    "Orange": orange,
    "Purple": purple,
    "Red": red,
    "Royal": royal,
    "White": white,
    "Navy": navy
  }
  
  useEffect(() => {
    fetch("/api/admin/session.php")
    .then((response) => response.json())
    .then((data) => {
      setUserId(data.userId);
    });

    retrieveProduct();
  }, []);

  function retrieveProduct() {
    let data = { id: 0 };
    
    data = { id: productKey };

    fetch("/api/product/singleProduct.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (data[0].CustomDetailsRequired) {
            setCustomDetailsRequired(true);
          }
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
          else if (data[0].default_style === "other") {
            setCurrentStyle("Other");
          }
          setDesign(data);
          setNameOnBack(data[0].nameOnBack);
          setNumberOnBack(data[0].numberOnBack);
          setCustom(data[0].custom);
          let retrieveDefault = data[0];
          for (const element of data) {
            if (element.product_id < retrieveDefault.product_id) {
              retrieveDefault = element;
            }
          }
          setDefaultDesign(retrieveDefault);
          setCurrentDesign(data[0]);
          setSizesAvailable(data[0].sizesAvailable);
          if (data[0].sizesAvailable === 0) {
            setSize({description: "Other", addedCost: 0});
          }

          // Set tshirt color and design location
          const regex = /\S+/;
          if (data[0].tColors && data[0].tColors.trim() !== "") {
            let firstWord = data[0].tColors.match(regex)[0];
            setTShirtColor(firstWord);
          }
          else if (retrieveDefault.tColors && retrieveDefault.tColors.trim() !== ""){
            let firstWord = retrieveDefault.tColors.match(regex)[0];
            setTShirtColor(firstWord);
          }
            let colors = data.flatMap(item => item.tColors.split(/\s+/).filter(Boolean));
            setTColors(colors);
          
          if (data[0].default_style !== 'other') {
            // Set long sleeve shirt color and design location
            if (data[0].lColors && data[0].lColors.trim() !== "") {
              let firstWord = data[0].lColors.match(regex)[0];
              setLongSleeveColor(firstWord);
            }
            else if (retrieveDefault.lColors && retrieveDefault.lColors.trim() !== "") {
              let firstWord = retrieveDefault.lColors.match(regex)[0];
              setLongSleeveColor(firstWord);
            }

            // Set crewneck color and design location
            if (data[0].cColors && data[0].cColors.trim() !== "") {
              let firstWord = data[0].cColors.match(regex)[0];
              setCrewneckColor(firstWord);
            }
            else if (retrieveDefault.cColors && retrieveDefault.cColors.trim() !== "") {
              let firstWord = retrieveDefault.cColors.match(regex)[0];
              setCrewneckColor(firstWord);
            }

            // Set hoodie color and design location
            if (data[0].hColors && data[0].hColors.trim() !== "") {
              let firstWord = data[0].hColors.match(regex)[0];
              setHoodieColor(firstWord);
            }
            else if (retrieveDefault.hColors && retrieveDefault.hColors.trim() !== "") {
              let firstWord = retrieveDefault.hColors.match(regex)[0];
              setHoodieColor(firstWord);
            }
            colors = data.flatMap(item => item.lColors.split(/\s+/).filter(Boolean));
            setLColors(colors);
            colors = data.flatMap(item => item.cColors.split(/\s+/).filter(Boolean));
            setCColors(colors);
            colors = data.flatMap(item => item.hColors.split(/\s+/).filter(Boolean));
            setHColors(colors);
          }
        }
      // compute recommendations for "You May Also Like" for all product types (including 'other')
      try { computeSimilarProducts(data[0]); } catch (e) {}
      })
      .catch((error) => {
        console.log("Sorry, That Path is Invalid. Think this is a mistake? Email us!")
        console.log(error);
        // Append the current URL to the target path
        navigate('/404');
      });
  }

  const changeColor = (color) => {
    if (currentDesign.tColors.includes(color)) {
      setTShirtColor(color);
    }
    else {
      if (currentStyle == "Short Sleeve T-Shirt" || currentStyle == "Other") {
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

  async function validateAdditionToCart() {
    if (customDetails === "") {
      if (customDetailsRequired) {
        setFailed("Invalid Custom Details");
        return false;
      }
    }
  
    if (size.description === "") {
      setFailed("Invalid Size");
      return false;
    }
  
    var oID = 0;
    if (userId) {
      oID = 0;
    }
    else if (localStorage.getItem("oID")) {
      oID = localStorage.getItem("oID");
    }
    else {
      oID = 1;
    }
  
    try {
      const response = await fetch("/api/cart/getCart.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: oID
        }),
      });
  
      const data = await response.json();
  
      for (const product of data) {
        if (product.product_id === currentDesign.product_id &&
            product.color === currentColor &&
            product.product_type === productType.description &&
            product.size === size.description &&
            product.product_details === customDetails) {
          setFailed("Item Already In Cart");
          return false;
        }
      }
  
      return true;
    } catch (e) {
      console.log(e);
      setFailed("Failed To Add Item");
      return false;
    }
  }

  const addToCart = async () => {
    const valid = await validateAdditionToCart();
    if (valid) {
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
        oID = localStorage.getItem("oID");
      }
      else {
        oID = 1;
      }
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

      fetch("/api/cart/addToCart.php", {
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
          setFailed("Failed To Add Item");
        }
      })
    }
  };

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
      }
      else if (currentStyle == "Other") {
        if (currentDesign.tColors.includes(tShirtColor)) {
          setProductType({description: "Other", addedCost: 0});
          setCurrentColor(tShirtColor);
        }
        else if (currentDesign.tColors){
          const color = currentDesign.tColors.match(regex)[0];
          setTShirtColor(color);
          setCurrentColor(color);
          setProductType({description: "Other", addedCost: 0});
        }
        else {
          const color = defaultDesign.tColors.match(regex)[0];
          setTShirtColor(color);
          setCurrentColor(color);
          setProductType({description: "Other", addedCost: 0});
        }
      }
    }
  }, [currentStyle, tShirtColor, longSleeveColor, crewneckColor, hoodieColor, size, currentDesign]);

  const validStyle = (colors) => {
    return colors.length > 0;
  }

  const colorsForStyle = () => {
    if (!currentStyle) return [];
    if (currentStyle === "Short Sleeve T-Shirt" || currentStyle === "Other") return tColors || [];
    if (currentStyle === "Long Sleeve T-Shirt") return lColors || [];
    if (currentStyle === "Crewneck Sweatshirt") return cColors || [];
    if (currentStyle === "Hooded Sweatshirt") return hColors || [];
    return [];
  }

  const hasColorsForStyle = () => {
    const arr = colorsForStyle();
    return Array.isArray(arr) && arr.length > 0;
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

  
  function handleNameOnBackDetails(event) {
    setNameOnBackDetails(event.target.value);
  }
  
  function handleNumberOnBackDetails(event) {
    setNumberOnBackDetails(event.target.value);
  }

  const updateDesignState = () => {
    if (currentDesignState === 0) {
      setCurrentDesignState(1);
    }
    else {
      setCurrentDesignState(0);
    }
  }

  return (
    <div className="center">
      <br />
      <h1>Order Summary</h1>
      <div className="topAlignRow">
        <div className="mobileSplit40">
            <div className="containerRow">
              <div className="designSideNavButton">
                {multipleLocations ?
                  <span>
                    <button onClick={updateDesignState}>{'<'}</button>
                  </span>
                : <span />
                }
              </div>
              <div className="orderDesign">
                <button 
                  className="magnify"
                  onClick={() => setShowConfirmation(true)}>
                  <DisplayUserProduct currentProduct={currentDesign} color={currentColor} style={currentStyle} state={currentDesignState} enlarge={false}/>
                </button>
              </div>
              <div className="designSideNavButton">
                {multipleLocations ? 
                  <span>
                    <button onClick={updateDesignState}>{'>'}</button>
                  </span>
                : <span />
                }
              </div>
            </div>
            <p>Click Design To Enlarge</p>
            <h2>{currentDesign.product_name}</h2>
            {currentStyle !== "Other" && 
              <>
                <p>Details:</p>
                <p>100% Cotton</p>
                <p>True To Size</p>
                <p>Regular Fit</p>
                <p>Wash Inside Out If Possible</p>
              </>
            }
            <Link to='/returnpolicy'>Return Policy</Link>
        </div>
        {showConfirmation &&
          <div className="confirmation-modal" onClick={handleOutsideClick}>
            <div className="enlarge">
              <span className="close-button" onClick={() => setShowConfirmation(false)}>&times;</span>
              <DisplayUserProduct currentProduct={currentDesign} color={currentColor} style={currentStyle} state={currentDesignState} enlarge={true}/>
            </div>
          </div>
        }
        <div className="mobileSplit10" />
        <div className="mobileSplit50">
          <div className="orderDetails">
            <h1>Style Your Product With The Options Below</h1>
            {custom === 0 && <h3>Click <Link to="/customOrder">Here</Link> To Order a Custom Design</h3>}
            <h1>
              Price: ${(((currentDesign.price * 1) + productType.addedCost + size.addedCost) * quantity).toFixed(2)}
              {custom === 1 && <span> - ${(((currentDesign.price * 1) + productType.addedCost + size.addedCost + 6) * quantity).toFixed(2)}</span>}
            </h1>
            {currentStyle !== "Other" && 
              <h1>
                Style: {currentStyle}
              </h1>
            }
            {(validStyle(tColors) || validStyle(lColors) || validStyle(cColors) || validStyle(hColors)) &&
              <div className="wrapRow">
                {(validStyle(tColors) && currentStyle !== "Other") && 
                  <button
                    onClick={() => setCurrentStyle("Short Sleeve T-Shirt")}
                    className="transparent-button">
                    <img
                      src={transparentTshirt}
                      alt="T-Shirt"
                      className="shirtOptions"
                    />
                  </button>
                }
                {validStyle(lColors) &&
                  <button 
                    onClick={() => setCurrentStyle("Long Sleeve T-Shirt")}
                    className="transparent-button">
                    <img
                      src={transparentLongSleeve}
                      alt="Long Sleeve"
                      className="shirtOptions"
                    />
                  </button>
                }
                {validStyle(cColors) &&
                  <button 
                    onClick={() => setCurrentStyle("Crewneck Sweatshirt")}
                    className="transparent-button">
                    <img
                      src={transparentCrewneck}
                      alt="Crewneck"
                      className="shirtOptions"
                    />
                  </button>
                }
                {validStyle(hColors) &&
                  <button 
                    onClick={() => setCurrentStyle("Hooded Sweatshirt")}
                    className="transparent-button">
                    <img
                      src={transparentHoodie}
                      alt="Hoodie"
                      className="shirtOptions"
                    />
                  </button>
                }
              </div>
            }
            { hasColorsForStyle() && <h1>Color: {currentColor}</h1> }
            {(currentStyle === "Short Sleeve T-Shirt" || currentStyle === "Other") &&
              <div className="wrapRow">
                {tColors.map((color) => (
                  <div key={currentStyle + color}>
                    <button 
                      onClick={() => changeColor(color)}
                      className="transparent-button">
                      <img
                        src={colorMap[color]}
                        alt={color}
                        className="colorOptions"
                      />
                    </button>
                  </div>
                ))}
              </div>
            }
            {currentStyle === "Long Sleeve T-Shirt" &&
              <div className="wrapRow">
                {lColors.map((color) => (
                  <button 
                    onClick={() => changeColor(color)}
                    className="transparent-button">
                    <img
                      src={colorMap[color]}
                      alt={color}
                      className="colorOptions"
                    />
                  </button>
                ))}
              </div>
            }
            {currentStyle === "Crewneck Sweatshirt" &&
              <div className="wrapRow">
                {cColors.map((color) => (
                  <button 
                    onClick={() => changeColor(color)}
                    className="transparent-button">
                    <img
                      src={colorMap[color]}
                      alt={color}
                      className="colorOptions"
                    />
                  </button>
                ))}
              </div>
            }
            {currentStyle === "Hooded Sweatshirt" &&
              <div className="wrapRow">
                {hColors.map((color) => (
                  <button 
                    onClick={() => changeColor(color)}
                    className="transparent-button">
                    <img
                      src={colorMap[color]}
                      alt={color}
                      className="colorOptions"
                    />
                  </button>
                ))}
              </div>
            }
            {sizesAvailable === 1 &&
              <div>
                <h1>Size: {size.description}</h1>
                <div className="wrapRow">
                  <h1 className="noBold">Youth:&nbsp;</h1>
                  <button 
                    onClick={() => setSize({description: "Youth Small", addedCost: -2})}
                    className="transparent-button">
                    <h1 className="noBold">Small</h1>
                  </button>
                  <button 
                    onClick={() => setSize({description: "Youth Medium", addedCost: -2})}
                    className="transparent-button">
                    <h1 className="noBold">Medium</h1>
                  </button>
                  <button 
                    onClick={() => setSize({description: "Youth Large", addedCost: -2})}
                    className="transparent-button">
                    <h1 className="noBold">Large</h1>
                  </button>
                  <button 
                    onClick={() => setSize({description: "Youth X-Large", addedCost: -2})}
                    className="transparent-button">
                    <h1 className="noBold">X-Large</h1>
                  </button>
                </div>
                <div className="wrapRow">
                  <h1 className="noBold">Adult:&nbsp;</h1>
                  <button 
                    onClick={() => setSize({description: "Adult Small", addedCost: 0})}
                    className="transparent-button">
                    <h1 className="noBold">Small</h1>
                  </button>
                  <button 
                    onClick={() => setSize({description: "Adult Medium", addedCost: 0})}
                    className="transparent-button">
                    <h1 className="noBold">Medium</h1>
                  </button>
                  <button 
                    onClick={() => setSize({description: "Adult Large", addedCost: 0})}
                    className="transparent-button">
                    <h1 className="noBold">Large</h1>
                  </button>
                  <button 
                    onClick={() => setSize({description: "Adult X-Large", addedCost: 0})}
                    className="transparent-button">
                    <h1 className="noBold">X-Large</h1>
                  </button>
                  <button 
                    onClick={() => setSize({description: "Adult XX-Large", addedCost: 2})}
                    className="transparent-button">
                    <h1 className="noBold">2XL</h1>
                  </button>
                  <button 
                    onClick={() => setSize({description: "Adult XXX-Large", addedCost: 2})}
                    className="transparent-button">
                    <h1 className="noBold">3XL</h1>
                  </button>
                </div>
              </div>
            }
            <h1>Additional Request Details{customDetailsRequired && <span className="red">*</span>}</h1>
            <div className="customOrderBox">
              <textarea 
                onChange={handleOrderDetails}
                value={customDetails}
                placeholder="No Custom Details."
              />
            </div>
            {failed != false ?
                <div className="confirmation-modal">
                  <div className="confirmation-dialog">
                    <h3>{failed}</h3>
                    <p>Please review your order and try again.</p>
                    <div className="confirmation-buttons">
                      <button className="delete-button" onClick={() => setFailed(false)}>Return To Order</button>
                    </div>
                  </div>
                </div>
              :<></>}
            {nameOnBack && 
              <span>
                <h2>Name: {' '}
                  <input
                    type="text"
                    value={nameOnBackDetails}
                    onChange={handleNameOnBackDetails}
                    placeholder="Enter Name For Back Of Product Here"
                    className="lastNameOrderPage"
                  />
                </h2>
              </span>
            }
            {numberOnBack && 
              <span>
                <h2>Number:{' '}
                <input
                  type="number"
                  value={numberOnBackDetails}
                  onChange={handleNumberOnBackDetails}
                  min={0}
                  max={99}
                />
                </h2>
              </span>
            }
            <h1>Quantity:&nbsp;
              <button 
                className="pointer"
                onClick={() => decreaseQuantity()}>
                -
              </button>
              &nbsp;{quantity}&nbsp;
              <button
                className="pointer"
                onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </h1>
            <div className="row">
              <div className="split25" />
              <div className="split50">
                <button
                  className="default-button"
                  onClick={() => addToCart()}>
                  Add to Cart
                </button>
              </div>
              <div className="split25" />
            </div>
            <h1>
              Price: ${(((currentDesign.price * 1) + productType.addedCost + size.addedCost) * quantity).toFixed(2)}
              {custom === 1 && <span> - ${(((currentDesign.price * 1) + productType.addedCost + size.addedCost + 6) * quantity).toFixed(2)}</span>}
            </h1>
          </div>
        </div>
        {similarProducts && similarProducts.length > 0 &&
          <>
            <h2>You May Also Like</h2>
            <div className="productsRow">
              {similarProducts.map((p) => (
                <div key={p.product_id} className="productsCell">
                  <div className="productDetails">
                    <button onClick={() => { window.location.href = '/order/' + p.product_id; }} className="magnify">
                      <DisplayUserProduct currentProduct={p} color={pickFirstColor(p)} style={styleDisplayName(p.default_style)} state={0} enlarge={false} />
                      <p>{p.product_name}</p>
                      <p>{"$" + (Number(p.price || 0)).toFixed(2)}</p>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        }
      </div>
    </div>
  );
}
export default Order;
