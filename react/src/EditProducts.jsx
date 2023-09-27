import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
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

function EditProducts() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(0);
  const [product, setProduct] = useState ([]);

  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setAdmin(data.admin);
      });
    
    fetch("/api/getProductByID.php")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
      });
  }, []);

  const removeProduct = (productId) => {
    const data = { id: productId };
    fetch("/api/deleteProduct.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data == 1) {
          navigate('/products');
        }
        else {
          console.log(data);
        }
      })
  }

  if (admin) {
    return (
      <div className="EditProducts">
        <br />
        <h1 className="orderHeader">Edit Product Details</h1>
        <div className="orderRow">
          <div className="orderSide">
            <div className="productDetails">
              {/*
              <button 
                    className="magnify"
                    onClick={() => setShowConfirmation(true)}>*/}
                <div className="fullDesign">
                  {<img
                  src={BlackTshirt}
                  alt="Home Team Creativity Logo"
                  className="tshirt"
                  />}
                  <img
                    src={"api/images/" + product.filename}
                    alt={product.product_name}
                    className="design"
                  />
                </div>
              {/*</button>*/}
              
              <br /><br />
              <p>Click Design To Enlarge</p>
              <h3>{product.product_name}</h3>
              <div className="center">
                <button onClick={() => removeProduct(product.product_id)}>Delete Product</button>
              </div>
            </div>
          </div>
          
          {/*showConfirmation &&
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
                    src={"api/images/" + currentDesign.filename}
                    alt={currentDesign.product_name}
                    className="design"
                  />
                </div>
              </div>
            </div>
          */}
          <div className="orderMain">
            <h3>Edit Product Details Below</h3>
            {/*<h3>Click <Link to="/customOrder" className="customDesignButton">Here</Link> To Order a Custom Design</h3>
            <h1>Price: ${((currentDesign.price * 1) + productType.addedCost + size.addedCost) * quantity}</h1>
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
              <h1>Price: ${((currentDesign.price * 1) + productType.addedCost + size.addedCost) * quantity}</h1>
              { failed && <Failed /> }
            </center>
          */}
          </div>
        </div>
      </div>
    );
  }
}
export default EditProducts;
