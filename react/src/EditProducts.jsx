import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import BlackTshirt from "./assets/blackTShirt.png";
import GrayTshirt from "./assets/GreyTShirt.png";
import RedTshirt from "./assets/RedTShirt.png";
import YellowTshirt from "./assets/YellowTShirt.png";
import PinkTshirt from "./assets/PinkTShirt.png";
import GreenTshirt from "./assets/GreenTShirt.png";
import MaroonTshirt from "./assets/MaroonTShirt.png";
import OrangeTshirt from "./assets/OrangeTShirt.png";
import PurpleTshirt from "./assets/PurpleTShirt.png";
import RoyalTshirt from "./assets/RoyalTShirt.png";
import NavyTshirt from "./assets/NavyTShirt.png";
import WhiteTshirt from "./assets/WhiteTShirt.png";

function EditProducts() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(0);
  const [product, setProduct] = useState ([]);
  const [tshirt, setTshirt] = useState(BlackTshirt);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [tagList, setTagList] = useState("");
  const [tColors, setTColors] = useState("");
  const [lColors, setLColors] = useState("");
  const [cColors, setCColors] = useState("");
  const [hColors, setHColors] = useState("");
  const [categories, setCategories] = useState("");
  

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
        let firstWord = data.tColors.match(regex)[0];
        setTshirt(tShirtMap[firstWord]);
        setProductName(data.product_name);
        setPrice(data.price);
        setTagList(data.tag_list);
        setTColors(data.tColors);
        setLColors(data.lColors);
        setCColors(data.cColors);
        setHColors(data.hColors);
        setCategories(data.categories);
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

  const addTshirtColor = (color) => {
    setTColors(tColors + ' ' + color);
  }
  const removeTshirtColor = (color) => {
    const removedColor = tColors.replace(color, "");
    setTColors(removedColor);
  }
  

  if (admin) {
    return (
      <div className="EditProducts">
        <br />
        <h1 className="orderHeader">Edit Product Details</h1>
        <div className="orderRow">
          <div className="orderSide">
            <div className="productDetails">
              <div className="fullDesign">
                {<img
                src={tshirt}
                alt="Home Team Creativity Logo"
                className="tshirt"
                />}
                <img
                  src={"api/images/" + product.filename}
                  alt={product.product_name}
                  className="design"
                />
              </div>
              
              <br /><br />
              <p>Click Design To Enlarge</p>
              <h3>{product.product_name}</h3>
              <h2>
                <button onClick={() => setShowConfirmation(true)} className="CartRemoveProductButton">
                  Delete Product
                </button>
              </h2>
              {showConfirmation &&
                <div className="confirmation-modal">
                  <div className="confirmation-dialog">
                    <h3>Confirm Delete</h3>
                    <p>Are you sure you want to remove "{product.product_name}" from your cart?</p>
                    <div className="confirmation-buttons">
                      <button onClick={() => setShowConfirmation(false)}>Cancel</button>
                      <button onClick={() => removeProduct(product.product_id)} className="delete-button">Delete</button>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
          <div className="orderMain">
            <div className="container">
              <h1>Edit Product Details Below</h1>
              <br/>
              <form className="alignLeft">
                <label>Product Display Name</label>
                <input
                  type="text"
                  id="product_name"
                  name="product_name"
                  value={productName}
                  onChange={(event) => setProductName(event.target.value)}
                />
                <label>Price (Do Not Include $) (Pricing Default is for an Adult Medium T-Shirt)</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
                <label>Tags</label>
                <input
                  type="text"
                  id="product_name"
                  name="product_name"
                  value={tagList}
                  onChange={(event) => setTagList(event.target.value)}
                />
                <label>T-Shirt: {tColors}</label>
                <br />
                {tColors.includes("Black") ? 
                <span>
                  <input type="checkbox" id="tBlack" name="tBlack" value="Black" checked={true} onChange={(event) => removeTshirtColor(event.target.value)}/>
                    <label>&nbsp;Black</label>
                    <br />
                </span>
                :
                <span>
                  <input type="checkbox" id="tBlack" name="tBlack" value="Black" checked={false} onChange={(event) => addTshirtColor(event.target.value)}/>
                    <label>&nbsp;Black</label>
                    <br />
                </span>
                }
                {tColors.includes("Yellow") ? 
                <span>
                  <input type="checkbox" id="tYellow" name="tYellow" value="Yellow" checked={true} onChange={(event) => removeTshirtColor(event.target.value)}/>
                    <label>&nbsp;Yellow</label>
                    <br />
                </span>
                :
                <span>
                  <input type="checkbox" id="tYellow" name="tYellow" value="Yellow" checked={false} onChange={(event) => addTshirtColor(event.target.value)}/>
                    <label>&nbsp;Yellow</label>
                    <br />
                </span>
                }
                {tColors.includes("Pink") ? 
                <span>
                  <input type="checkbox" id="tPink" name="tPink" value="Pink" checked={true} onChange={(event) => removeTshirtColor(event.target.value)}/>
                    <label>&nbsp;Pink</label>
                    <br />
                </span>
                :
                <span>
                  <input type="checkbox" id="tPink" name="tPink" value="Pink" checked={false} onChange={(event) => addTshirtColor(event.target.value)}/>
                    <label>&nbsp;Pink</label>
                    <br />
                </span>
                }
                {tColors.includes("Gray") ? 
                <span>
                  <input type="checkbox" id="tGray" name="tGray" value="Gray" checked={true} onChange={(event) => removeTshirtColor(event.target.value)}/>
                    <label>&nbsp;Gray</label>
                    <br />
                </span>
                :
                <span>
                  <input type="checkbox" id="tGray" name="tGray" value="Gray" checked={false} onChange={(event) => addTshirtColor(event.target.value)}/>
                    <label>&nbsp;Gray</label>
                    <br />
                </span>
                }
                {tColors.includes("Maroon") ? 
                <span>
                  <input type="checkbox" id="tMaroon" name="tMaroon" value="Maroon" checked={true} onChange={(event) => removeTshirtColor(event.target.value)}/>
                    <label>&nbsp;Maroon</label>
                    <br />
                </span>
                :
                <span>
                  <input type="checkbox" id="tMaroon" name="tMaroon" value="Maroon" checked={false} onChange={(event) => addTshirtColor(event.target.value)}/>
                    <label>&nbsp;Maroon</label>
                    <br />
                </span>
                }
                {tColors.includes("Orange") ? 
                <span>
                  <input type="checkbox" id="tOrange" name="tOrange" value="Orange" checked={true} onChange={(event) => removeTshirtColor(event.target.value)}/>
                    <label>&nbsp;Orange</label>
                    <br />
                </span>
                :
                <span>
                  <input type="checkbox" id="tOrange" name="tOrange" value="Orange" checked={false} onChange={(event) => addTshirtColor(event.target.value)}/>
                    <label>&nbsp;Orange</label>
                    <br />
                </span>
                }
                {tColors.includes("Purple") ? 
                <span>
                  <input type="checkbox" id="tPurple" name="tPurple" value="Purple" checked={true} onChange={(event) => removeTshirtColor(event.target.value)}/>
                    <label>&nbsp;Purple</label>
                    <br />
                </span>
                :
                <span>
                  <input type="checkbox" id="tPurple" name="tPurple" value="Purple" checked={false} onChange={(event) => addTshirtColor(event.target.value)}/>
                    <label>&nbsp;Purple</label>
                    <br />
                </span>
                }
                {tColors.includes("Red") ? 
                <span>
                  <input type="checkbox" id="tRed" name="tRed" value="Red" checked={true} onChange={(event) => removeTshirtColor(event.target.value)}/>
                    <label>&nbsp;Red</label>
                    <br />
                </span>
                :
                <span>
                  <input type="checkbox" id="tRed" name="tRed" value="Red" checked={false} onChange={(event) => addTshirtColor(event.target.value)}/>
                    <label>&nbsp;Red</label>
                    <br />
                </span>
                }
                {tColors.includes("Royal") ? 
                <span>
                  <input type="checkbox" id="tRoyal" name="tRoyal" value="Royal" checked={true} onChange={(event) => removeTshirtColor(event.target.value)}/>
                    <label>&nbsp;Royal</label>
                    <br />
                </span>
                :
                <span>
                  <input type="checkbox" id="tRoyal" name="tRoyal" value="Royal" checked={false} onChange={(event) => addTshirtColor(event.target.value)}/>
                    <label>&nbsp;Royal</label>
                    <br />
                </span>
                }
                {tColors.includes("Green") ? 
                <span>
                  <input type="checkbox" id="tGreen" name="tGreen" value="Green" checked={true} onChange={(event) => removeTshirtColor(event.target.value)}/>
                    <label>&nbsp;Green</label>
                    <br />
                </span>
                :
                <span>
                  <input type="checkbox" id="tGreen" name="tGreen" value="Green" checked={false} onChange={(event) => addTshirtColor(event.target.value)}/>
                    <label>&nbsp;Green</label>
                    <br />
                </span>
                }
                {tColors.includes("White") ? 
                <span>
                  <input type="checkbox" id="tWhite" name="tWhite" value="White" checked={true} onChange={(event) => removeTshirtColor(event.target.value)}/>
                    <label>&nbsp;White</label>
                    <br />
                </span>
                :
                <span>
                  <input type="checkbox" id="tWhite" name="tWhite" value="White" checked={false} onChange={(event) => addTshirtColor(event.target.value)}/>
                    <label>&nbsp;White</label>
                    <br />
                </span>
                }
                {tColors.includes("Navy") ? 
                <span>
                  <input type="checkbox" id="tNavy" name="tNavy" value="Navy" checked={true} onChange={(event) => removeTshirtColor(event.target.value)}/>
                    <label>&nbsp;Navy</label>
                    <br />
                </span>
                :
                <span>
                  <input type="checkbox" id="tNavy" name="tNavy" value="Navy" checked={false} onChange={(event) => addTshirtColor(event.target.value)}/>
                    <label>&nbsp;Navy</label>
                    <br />
                </span>
                }
                
                <label>Long Sleeve: {lColors}</label>
                <br />
                <input type="checkbox" id="lBlack" name="lBlack" value="Black" onChange={(event) => addTshirtColor(event.target.value)}/>
                  <label>&nbsp;Black</label>
                  <br />
                <input type="checkbox" id="lNavy" name="lNavy" value="Navy" onChange={(event) => addTshirtColor(event.target.value)}/>
                  <label>&nbsp;Navy</label>
                  <br />
                <input type="checkbox" id="lRed" name="lRed" value="Red" onChange={(event) => addTshirtColor(event.target.value)}/>
                  <label>&nbsp;Red</label>
                  <br />
                <input type="checkbox" id="lRoyal" name="lRoyal" value="Royal" onChange={(event) => addTshirtColor(event.target.value)}/>
                  <label>&nbsp;Royal</label>
                  <br />
                <input type="checkbox" id="lGray" name="lGray" value="Gray" onChange={(event) => addTshirtColor(event.target.value)}/>
                  <label>&nbsp;Gray</label>
                  <br />
                <input type="checkbox" id="lWhite" name="lWhite" value="White" onChange={(event) => addTshirtColor(event.target.value)}/>
                  <label>&nbsp;White</label>
                  <br />

                <label>Crewneck: {cColors}</label>
                <br />
                <input type="checkbox" id="cBlack" name="cBlack" value="Black" onChange={(event) => addTshirtColor(event.target.value)}/>
                  <label>&nbsp;Black</label>
                  <br />
                <input type="checkbox" id="cGray" name="cGray" value="Gray" onChange={(event) => addTshirtColor(event.target.value)}/>
                  <label>&nbsp;Gray</label>
                  <br />
                <input type="checkbox" id="cWhite" name="cWhite" value="White" onChange={(event) => addTshirtColor(event.target.value)}/>
                  <label>&nbsp;White</label>
                  <br />

                <label>Hoodie: {hColors}</label>
                <br />
                <input type="checkbox" id="hBlack" name="hBlack" value="Black" onChange={(event) => addTshirtColor(event.target.value)}/>
                  <label>&nbsp;Black</label>
                  <br />
                <input type="checkbox" id="hGray" name="hGray" value="Gray" onChange={(event) => addTshirtColor(event.target.value)}/>
                  <label>&nbsp;Gray</label>
                  <br />
                <input type="checkbox" id="hRed" name="hRed" value="Red" onChange={(event) => addTshirtColor(event.target.value)}/>
                  <label>&nbsp;Red</label>
                  <br />
                <input type="checkbox" id="hNavy" name="hNavy" value="Navy" onChange={(event) => addTshirtColor(event.target.value)}/>
                  <label>&nbsp;Navy</label>
                  <br />
                <input type="checkbox" id="hWhite" name="hWhite" value="White" onChange={(event) => addTshirtColor(event.target.value)}/>
                  <label>&nbsp;White</label>
                  <br />
                <label>Categories</label>
                <input
                  type="text"
                  id="product_name"
                  name="product_name"
                  value={categories}
                  onChange={(event) => setCategories(event.target.value)}
                />
                <br/>
                <br/>
                <button type="submit">Upload</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EditProducts;
