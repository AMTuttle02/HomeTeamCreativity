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
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [currentSubcategories, setCurrentSubcategories] = useState("");

  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setAdmin(data.admin);
      });
    
    fetch("/api/getCats.php")
      .then((response) => response.json())
      .then((data) => {
        setAllSubcategories(data);
      });
    
    fetch("/api/getProductCats.php")
      .then((response) => response.json())
      .then((data) => {
        setCurrentSubcategories(data.categories);
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
  const addLColor = (color) => {
    setLColors(lColors + ' ' + color);
  }
  const removeLColor = (color) => {
    const removedColor = lColors.replace(color, "");
    setLColors(removedColor);
  }
  const addCColor = (color) => {
    setCColors(cColors + ' ' + color);
  }
  const removeCColor = (color) => {
    const removedColor = cColors.replace(color, "");
    setCColors(removedColor);
  }
  const addHColor = (color) => {
    setHColors(hColors + ' ' + color);
  }
  const removeHColor = (color) => {
    const removedColor = hColors.replace(color, "");
    setHColors(removedColor);
  }

  const addSubcategory = (category) => {
    setCurrentSubcategories(currentSubcategories + ' ' + category);
  }
  const removeSubCategory = (category) => {
    const removedCat = currentSubcategories.replace(category, "");
    setCurrentSubcategories(removedCat);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('price', price);
    formData.append('tags', tagList);
    formData.append('tColors', tColors);
    formData.append('lColors', lColors);
    formData.append('cColors', cColors);
    formData.append('hColors', hColors);
    formData.append('subcategories', currentSubcategories);
  
    fetch('/api/updateProductDetails.php', {
      method: 'POST',
      body: formData
    })
    .then((response) => response.json())
    .then((data) => {
      if(data) {
        window.location.href="/products";
      }
    });
  };

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
                    <p>Are you sure you want to delete "{product.product_name}" permanetly?</p>
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
            <div className="EditProductsContainer">
              <h1>Edit Product Details Below</h1>
              <br/>
              <form className="alignLeft" onSubmit={handleSubmit}>
                <label><b>Product Display Name</b></label>
                <input
                  type="text"
                  id="product_name"
                  name="product_name"
                  value={productName}
                  onChange={(event) => setProductName(event.target.value)}
                />
                <label><b>Price (Do Not Include $) (Pricing Default is for an Adult Medium T-Shirt)</b></label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
                <label><b>Tags</b></label>
                <input
                  type="text"
                  id="product_name"
                  name="product_name"
                  value={tagList}
                  onChange={(event) => setTagList(event.target.value)}
                />
                <div className="row">
                  <div className="uploadSplit">
                    <label><b>T-Shirt: </b>{tColors}</label>
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
                  </div>

                  <div className="uploadSplit">
                    <label><b>Long Sleeve: </b>{lColors}</label>
                    <br />
                    {lColors.includes("Black") ? 
                    <span>
                      <input type="checkbox" id="lBlack" name="lNavy" value="Black" checked={true} onChange={(event) => removeLColor(event.target.value)}/>
                        <label>&nbsp;Black</label>
                        <br />
                    </span>
                    :
                    <span>
                      <input type="checkbox" id="lBlack" name="lBlack" value="Black" checked={false} onChange={(event) => addLColor(event.target.value)}/>
                        <label>&nbsp;Black</label>
                        <br />
                    </span>
                    }
                    {lColors.includes("Navy") ? 
                    <span>
                      <input type="checkbox" id="lNavy" name="lNavy" value="Navy" checked={true} onChange={(event) => removeLColor(event.target.value)}/>
                        <label>&nbsp;Navy</label>
                        <br />
                    </span>
                    :
                    <span>
                      <input type="checkbox" id="lNavy" name="lNavy" value="Navy" checked={false} onChange={(event) => addLColor(event.target.value)}/>
                        <label>&nbsp;Navy</label>
                        <br />
                    </span>
                    }
                    {lColors.includes("Red") ? 
                    <span>
                      <input type="checkbox" id="lRed" name="lRed" value="Red" checked={true} onChange={(event) => removeLColor(event.target.value)}/>
                        <label>&nbsp;Red</label>
                        <br />
                    </span>
                    :
                    <span>
                      <input type="checkbox" id="lRed" name="lRed" value="Red" checked={false} onChange={(event) => addLColor(event.target.value)}/>
                        <label>&nbsp;Red</label>
                        <br />
                    </span>
                    }
                    {lColors.includes("Royal") ? 
                    <span>
                      <input type="checkbox" id="lRoyal" name="lRoyal" value="Royal" checked={true} onChange={(event) => removeLColor(event.target.value)}/>
                        <label>&nbsp;Royal</label>
                        <br />
                    </span>
                    :
                    <span>
                      <input type="checkbox" id="lRoyal" name="lRoyal" value="Royal" checked={false} onChange={(event) => addLColor(event.target.value)}/>
                        <label>&nbsp;Royal</label>
                        <br />
                    </span>
                    }
                    {lColors.includes("Gray") ? 
                    <span>
                      <input type="checkbox" id="lGray" name="lGray" value="Gray" checked={true} onChange={(event) => removeLColor(event.target.value)}/>
                        <label>&nbsp;Gray</label>
                        <br />
                    </span>
                    :
                    <span>
                      <input type="checkbox" id="lGray" name="lGray" value="Gray" checked={false} onChange={(event) => addLColor(event.target.value)}/>
                        <label>&nbsp;Gray</label>
                        <br />
                    </span>
                    }
                    {lColors.includes("White") ? 
                    <span>
                      <input type="checkbox" id="lWhite" name="lWhite" value="White" checked={true} onChange={(event) => removeLColor(event.target.value)}/>
                        <label>&nbsp;White</label>
                        <br />
                    </span>
                    :
                    <span>
                      <input type="checkbox" id="lWhite" name="lWhite" value="White" checked={false} onChange={(event) => addLColor(event.target.value)}/>
                        <label>&nbsp;White</label>
                        <br />
                    </span>
                    }
                  </div>

                  <div className="uploadSplit">
                    <label><b>Crewneck: </b>{cColors}</label>
                    <br />
                    {cColors.includes("Black") ? 
                    <span>
                      <input type="checkbox" id="cBlack" name="cBlack" value="Black" checked={true} onChange={(event) => removeCColor(event.target.value)}/>
                        <label>&nbsp;Black</label>
                        <br />
                    </span>
                    :
                    <span>
                      <input type="checkbox" id="cBlack" name="cBlack" value="Black" checked={false} onChange={(event) => addCColor(event.target.value)}/>
                        <label>&nbsp;Black</label>
                        <br />
                    </span>
                    }
                    {cColors.includes("Gray") ? 
                    <span>
                      <input type="checkbox" id="cGray" name="cGray" value="Gray" checked={true} onChange={(event) => removeCColor(event.target.value)}/>
                        <label>&nbsp;Gray</label>
                        <br />
                    </span>
                    :
                    <span>
                      <input type="checkbox" id="cGray" name="cGray" value="Gray" checked={false} onChange={(event) => addCColor(event.target.value)}/>
                        <label>&nbsp;Gray</label>
                        <br />
                    </span>
                    }
                    {cColors.includes("White") ? 
                    <span>
                      <input type="checkbox" id="cWhite" name="cWhite" value="White" checked={true} onChange={(event) => removeCColor(event.target.value)}/>
                        <label>&nbsp;White</label>
                        <br />
                    </span>
                    :
                    <span>
                      <input type="checkbox" id="cWhite" name="cWhite" value="White" checked={false} onChange={(event) => addCColor(event.target.value)}/>
                        <label>&nbsp;White</label>
                        <br />
                    </span>
                    }
                  </div>

                  <div className="uploadSplit">
                    <label><b>Hoodie: </b>{hColors}</label>
                    <br />
                    {hColors.includes("Black") ? 
                    <span>
                      <input type="checkbox" id="hBlack" name="hBlack" value="Black" checked={true} onChange={(event) => removeHColor(event.target.value)}/>
                        <label>&nbsp;Black</label>
                        <br />
                    </span>
                    :
                    <span>
                      <input type="checkbox" id="hBlack" name="hBlack" value="Black" checked={false} onChange={(event) => addHColor(event.target.value)}/>
                        <label>&nbsp;Black</label>
                        <br />
                    </span>
                    }
                    {hColors.includes("Gray") ? 
                    <span>
                      <input type="checkbox" id="hGray" name="hGray" value="Gray" checked={true} onChange={(event) => removeHColor(event.target.value)}/>
                        <label>&nbsp;Gray</label>
                        <br />
                    </span>
                    :
                    <span>
                      <input type="checkbox" id="hGray" name="hGray" value="Gray" checked={false} onChange={(event) => addHColor(event.target.value)}/>
                        <label>&nbsp;Gray</label>
                        <br />
                    </span>
                    }
                    {hColors.includes("Red") ? 
                    <span>
                      <input type="checkbox" id="hRed" name="hRed" value="Red" checked={true} onChange={(event) => removeHColor(event.target.value)}/>
                        <label>&nbsp;Red</label>
                        <br />
                    </span>
                    :
                    <span>
                      <input type="checkbox" id="hRed" name="hRed" value="Red" checked={false} onChange={(event) => addHColor(event.target.value)}/>
                        <label>&nbsp;Red</label>
                        <br />
                    </span>
                    }
                    {hColors.includes("Navy") ? 
                    <span>
                      <input type="checkbox" id="hNavy" name="hNavy" value="Navy" checked={true} onChange={(event) => removeHColor(event.target.value)}/>
                        <label>&nbsp;Navy</label>
                        <br />
                    </span>
                    :
                    <span>
                      <input type="checkbox" id="hNavy" name="hNavy" value="Navy" checked={false} onChange={(event) => addHColor(event.target.value)}/>
                        <label>&nbsp;Navy</label>
                        <br />
                    </span>
                    }
                    {hColors.includes("White") ? 
                    <span>
                      <input type="checkbox" id="hWhite" name="hWhite" value="White" checked={true} onChange={(event) => removeHColor(event.target.value)}/>
                        <label>&nbsp;White</label>
                        <br />
                    </span>
                    :
                    <span>
                      <input type="checkbox" id="hWhite" name="hWhite" value="White" checked={false} onChange={(event) => addHColor(event.target.value)}/>
                        <label>&nbsp;White</label>
                        <br />
                    </span>
                    }
                  </div>
                </div>
                <label><b>Categories</b></label>
                <div className="row">
                  {currentSubcategories.includes("Faith") ? 
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="Faith" name="cats" checked={true} onChange={(event) => removeSubCategory(event.target.value)}/>
                    <label>&nbsp;Faith*</label>
                  </div>
                  :
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="Faith" name="cats" checked={false} onChange={(event) => addSubcategory(event.target.value)}/>
                    <label>&nbsp;Faith*</label>
                  </div>
                  }
                  {currentSubcategories.includes("Family") ? 
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="Family" name="cats" checked={true} onChange={(event) => removeSubCategory(event.target.value)}/>
                    <label>&nbsp;Family*</label>
                  </div>
                  :
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="Family" name="cats" checked={false} onChange={(event) => addSubcategory(event.target.value)}/>
                    <label>&nbsp;Family*</label>
                  </div>
                  }
                  {currentSubcategories.includes("Health") ? 
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="Health" name="cats" checked={true} onChange={(event) => removeSubCategory(event.target.value)}/>
                    <label>&nbsp;Health</label>
                  </div>
                  :
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="Health" name="cats" checked={false} onChange={(event) => addSubcategory(event.target.value)}/>
                    <label>&nbsp;Health</label>
                  </div>
                  }
                  {currentSubcategories.includes("Holiday") ? 
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="Holiday" name="cats" checked={true} onChange={(event) => removeSubCategory(event.target.value)}/>
                    <label>&nbsp;Holiday</label>
                  </div>
                  :
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="Holiday" name="cats" checked={false} onChange={(event) => addSubcategory(event.target.value)}/>
                    <label>&nbsp;Holiday</label>
                  </div>
                  }
                  {currentSubcategories.includes("Ohio") ? 
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="Ohio" name="cats" checked={true} onChange={(event) => removeSubCategory(event.target.value)}/>
                    <label>&nbsp;Ohio*</label>
                  </div>
                  :
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="Ohio" name="cats" checked={false} onChange={(event) => addSubcategory(event.target.value)}/>
                    <label>&nbsp;Ohio*</label>
                  </div>
                  }
                  {currentSubcategories.includes("Other") ? 
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="Other" name="cats" checked={true} onChange={(event) => removeSubCategory(event.target.value)}/>
                    <label>&nbsp;Other</label>
                  </div>
                  :
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="Other" name="cats" checked={false} onChange={(event) => addSubcategory(event.target.value)}/>
                    <label>&nbsp;Other</label>
                  </div>
                  }
                  {currentSubcategories.includes("Patriotic") ? 
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="Patriotic" name="cats" checked={true} onChange={(event) => removeSubCategory(event.target.value)}/>
                    <label>&nbsp;Patriotic*</label>
                  </div>
                  :
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="Patriotic" name="cats" checked={false} onChange={(event) => addSubcategory(event.target.value)}/>
                    <label>&nbsp;Patriotic*</label>
                  </div>
                  }
                  {currentSubcategories.includes("School") ? 
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="School" name="cats" checked={true} onChange={(event) => removeSubCategory(event.target.value)}/>
                    <label>&nbsp;School</label>
                  </div>
                  :
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="School" name="cats" checked={false} onChange={(event) => addSubcategory(event.target.value)}/>
                    <label>&nbsp;School</label>
                  </div>
                  }
                  {currentSubcategories.includes("Seasons") ? 
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="Seasons" name="cats" checked={true} onChange={(event) => removeSubCategory(event.target.value)}/>
                    <label>&nbsp;Seasons</label>
                  </div>
                  :
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="Seasons" name="cats" checked={false} onChange={(event) => addSubcategory(event.target.value)}/>
                    <label>&nbsp;Seasons</label>
                  </div>
                  }
                  {currentSubcategories.includes("Sports") ? 
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="Sports" name="cats" checked={true} onChange={(event) => removeSubCategory(event.target.value)}/>
                    <label>&nbsp;Sports</label>
                  </div>
                  :
                  <div className="subCatCheckbox">
                    <input type="checkbox" value="Sports" name="cats" checked={false} onChange={(event) => addSubcategory(event.target.value)}/>
                    <label>&nbsp;Sports</label>
                  </div>
                  }
                </div>
                <label><b>Subcategories</b></label>
                <div className="row">
                  {allSubcategories.map((subcategory) => (
                    <div className="subCatCheckbox">
                      {currentSubcategories.includes(subcategory.name) ? 
                      <span>
                        <input type="checkbox" value={subcategory.name} name="subcats" checked={true} onChange={(event) => removeSubCategory(event.target.value)}/>
                        <label>&nbsp;{subcategory.name + " (" + subcategory.category + ") "}</label>
                      </span>
                      :
                      <span>
                        <input type="checkbox" value={subcategory.name} name="subcats" checked={false} onChange={(event) => addSubcategory(event.target.value)}/>
                        <label>&nbsp;{subcategory.name + " (" + subcategory.category + ") "}</label>
                      </span>
                      }
                    </div>
                  ))}
                </div>
                <br/>
                <br/>
                <button type="submit" className="defaultButton">Update Product</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EditProducts;
