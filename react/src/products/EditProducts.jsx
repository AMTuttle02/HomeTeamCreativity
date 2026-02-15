import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DisplayProduct from "./DisplayProduct";
import "./editProducts.css";

function EditProducts() {
  const {productId} = useParams();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(0);
  const [product, setProduct] = useState ([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [tagList, setTagList] = useState("");
  const [tColors, setTColors] = useState("");
  const [lColors, setLColors] = useState("");
  const [cColors, setCColors] = useState("");
  const [hColors, setHColors] = useState("");
  const [frontFileName, setFrontFileName] = useState("");
  const [backFileName, setBackFileName] = useState("");
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [currentSubcategories, setCurrentSubcategories] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState([]);
  const [style, setStyle] = useState("tshirt");
  const [location, setLocation] = useState("front");
  const [productIsSet, setProductIsSet] = useState(false);
  const [customFieldRequired, setCustomFieldRequired] = useState(0);
  const [sizesAvailable, setSizesAvailable] = useState(1);
  const [failToUpdate, setFailToUpdate] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [removeFront, setRemoveFront] = useState(false);
  const [removeBack, setRemoveBack] = useState(false);

  // API Calls
  useEffect(() => {
    fetch("/api/admin/session.php")
      .then((response) => response.json())
      .then((data) => {
        setAdmin(data.admin);
      });
    
    fetch("/api/category/getSubCats.php")
      .then((response) => response.json())
      .then((data) => {
        setAllSubcategories(data);
      });
    
    fetch("/api/category/getProductCats.php")
      .then((response) => response.json())
      .then((data) => {
        if (data && typeof data === 'object') {
          // data.categories and data.subcategories expected as semicolon-separated id lists
          if (data.categories) setSelectedCategoryIds(String(data.categories).split(';').map(s => s.trim()).filter(Boolean));
          if (data.subcategories) setSelectedSubcategoryIds(String(data.subcategories).split(';').map(s => s.trim()).filter(Boolean));
        }
      });

    fetch("/api/category/getCategories.php")
      .then((response) => response.json())
      .then((data) => {
        setAllCategories(data || []);
      });
    
    console.log(productId);
    fetch("/api/product/getProductByID.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "product_id": productId }),
    })
    .then((response) => response.json())
    .then((data) => {
      setProduct(data);
      setProductName(data.product_name);
      setPrice(data.price);
      setTagList(data.tag_list);
      setTColors(data.tColors);
      setLColors(data.lColors);
      setCColors(data.cColors);
      setHColors(data.hColors);
      setStyle(data.default_style);
      setLocation(data.default_style_location);
      setFrontFileName(data.filename_front || "");
      setBackFileName(data.filename_back || "");
      setProductIsSet(true);
      setCustomFieldRequired(data.CustomDetailsRequired.toString());
      setSizesAvailable(data.sizesAvailable.toString());
    });
  }, []);

  // Delete product
  const removeProduct = (productId) => {
    const data = { id: productId };
    fetch("/api/product/deleteProduct.php", {
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

  const toggleTshirtColor = (color) => {
    if (tColors.includes(color)) {
      const removedColor = tColors.replace(color, "");
      setTColors(removedColor);
    } else {
      setTColors(tColors + ' ' + color);
    }
  }

  const toggleLColor = (color) => {
    if (lColors.includes(color)) {
      const removedColor = lColors.replace(color, "");
      setLColors(removedColor);
    } else {
      setLColors(lColors + ' ' + color);
    }
  }

  const toggleCColor = (color) => {
    if (cColors.includes(color)) {
      const removedColor = cColors.replace(color, "");
      setCColors(removedColor);
    } else {
      setCColors(cColors + ' ' + color);
    }
  }

  const toggleHColor = (color) => {
    if (hColors.includes(color)) {
      const removedColor = hColors.replace(color, "");
      setHColors(removedColor);
    } else {
      setHColors(hColors + ' ' + color);
    }
  }

  const toggleSubcategory = (category) => {
    // category is expected to be subcategory id
    const sid = String(category);
    setSelectedSubcategoryIds(prev => prev.includes(sid) ? prev.filter(x => x !== sid) : [...prev, sid]);
  }

  const toggleCategory = (id) => {
    const sid = String(id);
    setSelectedCategoryIds(prev => prev.includes(sid) ? prev.filter(x => x !== sid) : [...prev, sid]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (style === 'tshirt' && tColors.trim() === '') {
      setFailToUpdate(true);
    } else if (style === 'longsleeve' && lColors.trim() === '') {
      setFailToUpdate(true);
    } else if (style === 'crewneck' && cColors.trim() === '') {
      setFailToUpdate(true);
    } else if (style === 'hoodie' && hColors.trim() === '') {
      setFailToUpdate(true);
    } else {
    const formData = new FormData();
      formData.append('productName', productName);
    formData.append('product_id', productId);
      formData.append('price', price);
      formData.append('tags', tagList);
      formData.append('tColors', tColors);
      formData.append('lColors', lColors);
      formData.append('cColors', cColors);
      formData.append('hColors', hColors);
    if (frontFile) formData.append('frontFile', frontFile);
    if (backFile) formData.append('backFile', backFile);
    if (removeFront) formData.append('remove_front', '1');
    if (removeBack) formData.append('remove_back', '1');
      // send semicolon-separated id lists for categories and subcategories
      formData.append('categories', selectedCategoryIds.join(';'));
      formData.append('subcategories', selectedSubcategoryIds.join(';'));
      formData.append('default_style', style);
      formData.append('default_style_location', location);
      formData.append('customFieldRequired', customFieldRequired);
      formData.append('sizeAvailable', sizesAvailable);
    
      fetch('/api/product/updateProductDetails.php', {
        method: 'POST',
        body: formData
      })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.success) {
          window.location.href = "/products";
        } else {
          setUploadError((data && data.error) ? data.error : 'Update failed');
        }
      })
      .catch((err) => setUploadError('Update failed'));
    }
  };

  const uploadImage = async (side) => {
    // removed: uploadImage now handled on form submit
  }

  if (admin) {
    return (
      <div className="EditProducts">
        <br />
        <div className="topAlignRow">
          <div className="mobileSplit30">
            <div className="productDetails">
              {productIsSet != [] ?
                <DisplayProduct product={product} />
              : 
                <span />
              }
              <br /><br />
              <p>{product.product_name}</p>
              <div className="deleteProductWidth">
                <button onClick={() => setShowConfirmation(true)} className="delete-button">
                  Delete Product
                </button>
              </div>
              {showConfirmation &&
                <div className="confirmation-modal">
                  <div className="confirmation-dialog">
                    <h3>Confirm Delete</h3>
                    <p>Are you sure you want to delete "{product.product_name}" permanetly?</p>
                    <div className="confirmation-buttons">
                      <button onClick={() => setShowConfirmation(false)} className="default-button">Cancel</button>
                      <button onClick={() => removeProduct(product.product_id)} className="delete-button">Delete</button>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
          <div className="mobileSplit70">
            <div className="editProductsContainer">
              <h1 className="center">Edit Product Details</h1>
              <form className="alignLeft" onSubmit={handleSubmit}>
                <h3>Product Display Name</h3>
                <input
                  type="text"
                  id="product_name"
                  name="product_name"
                  className="default-input"
                  value={productName}
                  onChange={(event) => setProductName(event.target.value)}
                />
                <h3>Price (Do Not Include $) (Pricing Default is for an Adult Medium T-Shirt)</h3>
                <input
                  type="text"
                  id="price"
                  name="price"
                  className="default-input"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
                <h3>Tags</h3>
                <input
                  type="text"
                  id="product_name"
                  name="product_name"
                  className="default-input"
                  value={tagList}
                  onChange={(event) => setTagList(event.target.value)}
                />
                <h3>Style Location</h3>
                <div className="containerRow">
                  <div className="default-checkbox">
                    <input type="radio" id="location" name="front" value="front" className="default-checkbox" checked={location==="front"} onChange={(event) => setLocation(event.target.value)}/>
                      <label>&nbsp;Front</label>
                      <br />
                  </div>
                  <div className="default-checkbox">
                    <input type="radio" id="location" name="back" value="back" checked={location === "back"} onChange={(event) => setLocation(event.target.value)}/>
                      <label>&nbsp;Back</label>
                      <br />
                  </div>
                  <div className="default-checkbox"/>
                  <div className="default-checkbox"/>
                </div>
                <h3>Default Style</h3>
                <div className="containerRow">
                  <div className="default-checkbox">
                    <input type="radio" id="style" name="tshirt" value="tshirt" checked={style === "tshirt"} onChange={(event) => setStyle(event.target.value)}/>
                    <label>&nbsp;T-Shirt</label>
                    <br />
                  </div>
                  <div className="default-checkbox">
                    <input type="radio" id="style" name="longsleeve" value="longsleeve" checked={style === "longsleeve"} onChange={(event) => setStyle(event.target.value)}/>
                    <label>&nbsp;Long Sleeve</label>
                    <br />
                  </div>
                  <div className="default-checkbox">
                    <input type="radio" id="style" name="crewneck" value="crewneck" checked={style === "crewneck"} onChange={(event) => setStyle(event.target.value)}/>
                    <label>&nbsp;Crewneck</label>
                    <br />
                  </div>
                  <div className="default-checkbox">
                    <input type="radio" id="style" name="hoodie" value="hoodie" checked={style === "hoodie"} onChange={(event) => setStyle(event.target.value)}/>
                    <label>&nbsp;Hoodie</label>
                    <br />
                  </div>
                  <div className="default-checkbox">
                    <input type="radio" id="style" name="other" value="other" checked={style === "other"} onChange={(event) => setStyle(event.target.value)}/>
                    <label>&nbsp;Other</label>
                    <br />
                  </div>
                </div>
                <h3>Colors</h3>
                <div className="containerRow">
                  <div className="default-checkbox">
                    <label><b>T-Shirt: </b>{tColors}</label>
                    <br />
                    <input type="checkbox" id="tBlack" name="tBlack" value="Black" checked={tColors.includes("Black")} onChange={(event) => toggleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Black</label>
                    <br />
                    <input type="checkbox" id="tYellow" name="tYellow" value="Yellow" checked={tColors.includes("Yellow")} onChange={(event) => toggleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Yellow</label>
                    <br />
                    <input type="checkbox" id="tPink" name="tPink" value="Pink" checked={tColors.includes("Pink")} onChange={(event) => toggleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Pink</label>
                    <br />
                    <input type="checkbox" id="tGray" name="tGray" value="Gray" checked={tColors.includes("Gray")} onChange={(event) => toggleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Gray</label>
                    <br />
                    <input type="checkbox" id="tMaroon" name="tMaroon" value="Maroon" checked={tColors.includes("Maroon")} onChange={(event) => toggleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Maroon</label>
                    <br />
                    <input type="checkbox" id="tOrange" name="tOrange" value="Orange" checked={tColors.includes("Orange")} onChange={(event) => toggleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Orange</label>
                    <br />
                    <input type="checkbox" id="tPurple" name="tPurple" value="Purple" checked={tColors.includes("Purple")} onChange={(event) => toggleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Purple</label>
                    <br />
                    <input type="checkbox" id="tRed" name="tRed" value="Red" checked={tColors.includes("Red")} onChange={(event) => toggleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Red</label>
                    <br />
                    <input type="checkbox" id="tRoyal" name="tRoyal" value="Royal" checked={tColors.includes("Royal")} onChange={(event) => toggleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Royal</label>
                    <br />
                    <input type="checkbox" id="tGreen" name="tGreen" value="Green" checked={tColors.includes("Green")} onChange={(event) => toggleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Green</label>
                    <br />
                    <input type="checkbox" id="tWhite" name="tWhite" value="White" checked={tColors.includes("White")} onChange={(event) => toggleTshirtColor(event.target.value)}/>
                    <label>&nbsp;White</label>
                    <br />
                    <input type="checkbox" id="tNavy" name="tNavy" value="Navy" checked={tColors.includes("Navy")} onChange={(event) => toggleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Navy</label>
                    <br />
                  </div>
                  <div className="default-checkbox">
                    <label><b>Long Sleeve: </b>{lColors}</label>
                    <br />
                    <input type="checkbox" id="lBlack" name="lNavy" value="Black" checked={lColors.includes("Black")} onChange={(event) => toggleLColor(event.target.value)}/>
                    <label>&nbsp;Black</label>
                    <br />
                    <input type="checkbox" id="lNavy" name="lNavy" value="Navy" checked={lColors.includes("Navy")} onChange={(event) => toggleLColor(event.target.value)}/>
                    <label>&nbsp;Navy</label>
                    <br />
                    <input type="checkbox" id="lRed" name="lRed" value="Red" checked={lColors.includes("Red")} onChange={(event) => toggleLColor(event.target.value)}/>
                    <label>&nbsp;Red</label>
                    <br />
                    <input type="checkbox" id="lRoyal" name="lRoyal" value="Royal" checked={lColors.includes("Royal")} onChange={(event) => toggleLColor(event.target.value)}/>
                    <label>&nbsp;Royal</label>
                    <br />
                    <input type="checkbox" id="lGray" name="lGray" value="Gray" checked={lColors.includes("Gray")} onChange={(event) => toggleLColor(event.target.value)}/>
                    <label>&nbsp;Gray</label>
                    <br />
                    <input type="checkbox" id="lWhite" name="lWhite" value="White" checked={lColors.includes("White")} onChange={(event) => toggleLColor(event.target.value)}/>
                    <label>&nbsp;White</label>
                    <br />
                  </div>
                  <div className="default-checkbox">
                    <label><b>Crewneck: </b>{cColors}</label>
                    <br />
                    <input type="checkbox" id="cBlack" name="cBlack" value="Black" checked={cColors.includes("Black")} onChange={(event) => toggleCColor(event.target.value)}/>
                    <label>&nbsp;Black</label>
                    <br />
                    <input type="checkbox" id="cGray" name="cGray" value="Gray" checked={cColors.includes("Gray")} onChange={(event) => toggleCColor(event.target.value)}/>
                    <label>&nbsp;Gray</label>
                    <br />
                    <input type="checkbox" id="cWhite" name="cWhite" value="White" checked={cColors.includes("White")} onChange={(event) => toggleCColor(event.target.value)}/>
                    <label>&nbsp;White</label>
                    <br />
                  </div>
                  <div className="default-checkbox">
                    <label><b>Hoodie: </b>{hColors}</label>
                    <br />
                    <input type="checkbox" id="hBlack" name="hBlack" value="Black" checked={hColors.includes("Black")} onChange={(event) => toggleHColor(event.target.value)}/>
                    <label>&nbsp;Black</label>
                    <br />
                    <input type="checkbox" id="hGray" name="hGray" value="Gray" checked={hColors.includes("Gray")} onChange={(event) => toggleHColor(event.target.value)}/>
                    <label>&nbsp;Gray</label>
                    <br />
                    <input type="checkbox" id="hRed" name="hRed" value="Red" checked={hColors.includes("Red")} onChange={(event) => toggleHColor(event.target.value)}/>
                    <label>&nbsp;Red</label>
                    <br />
                    <input type="checkbox" id="hNavy" name="hNavy" value="Navy" checked={hColors.includes("Navy")} onChange={(event) => toggleHColor(event.target.value)}/>
                    <label>&nbsp;Navy</label>
                    <br />
                    <input type="checkbox" id="hWhite" name="hWhite" value="White" checked={hColors.includes("White")} onChange={(event) => toggleHColor(event.target.value)}/>
                    <label>&nbsp;White</label>
                    <br />
                  </div>
                </div>
                <h3><b>Categories</b></h3>
                <div className="containerRow">
                  {allCategories.map((cat) => (
                    <div className="default-checkbox" key={cat.id}>
                      <input type="checkbox" value={cat.id} name="cats" checked={selectedCategoryIds.includes(String(cat.id))} onChange={() => toggleCategory(cat.id)}/>
                      <label>&nbsp;{cat.category}</label>
                    </div>
                  ))}
                </div>
                <h3><b>Subcategories</b></h3>
                <div className="containerRow">
                  {allSubcategories.map((subcategory) => (
                    <div className="default-checkbox" key={subcategory.id}>
                      <input type="checkbox" value={subcategory.id} name="subcats" checked={selectedSubcategoryIds.includes(String(subcategory.id))} onChange={() => toggleSubcategory(subcategory.id)}/>
                      <label>&nbsp;{subcategory.name + " (" + subcategory.category + ") "}</label>
                    </div>
                  ))}
                </div>
                <h3><b>Custom Design Box Required</b></h3>
                <div className="containerRow">
                  <div className="default-checkbox">
                    <input type="radio" id="customBoxRequired" name="customBoxRequired" checked={customFieldRequired === '1'} value='1' onChange={(event) => setCustomFieldRequired(event.target.value)}/>
                    <label>&nbsp;Yes</label>
                    <br />
                  </div>
                  <div className="default-checkbox">
                    <input type="radio" id="customBoxRequired" name="customBoxRequired" checked={customFieldRequired === '0'} value='0' onChange={(event) => setCustomFieldRequired(event.target.value)}/>
                    <label>&nbsp;No</label>
                    <br />
                  </div>
                  <div className="default-checkbox"/>
                  <div className="default-checkbox"/>
                </div>
                <h3><b>Sizes Available</b></h3>
                <div className="containerRow">
                  <div className="default-checkbox">
                    <input type="radio" id="sizesAvailable" name="sizesAvailable" checked={sizesAvailable == '1'} value='1' onChange={(event) => setSizesAvailable(event.target.value)}/>
                    <label>&nbsp;Yes</label>
                    <br />
                  </div>
                  <div className="default-checkbox">
                    <input type="radio" id="sizesAvailable" name="sizesAvailable" checked={sizesAvailable == '0'} value='0' onChange={(event) => setSizesAvailable(event.target.value)}/>
                    <label>&nbsp;No</label>
                    <br />
                  </div>
                  <div className="default-checkbox"/>
                  <div className="default-checkbox"/>
                </div>
                <br/>
                <br/>
                <h3><b>Front Design</b> <small>Current: {frontFileName ? frontFileName : 'None'}</small></h3>
                <div className="containerRow">
                  <input type="file" accept="image/*" disabled={removeFront} onChange={(e) => setFrontFile(e.target.files[0])} />
                  {!removeFront ? (
                    location === 'front' ? (
                      <button type="button" className="delete-button" disabled title="Cannot delete the default-style image">Delete Front</button>
                    ) : (
                      <button type="button" className="delete-button" onClick={() => setRemoveFront(true)}>Delete Front</button>
                    )
                  ) : (
                    <button type="button" className="default-button" onClick={() => setRemoveFront(false)}>Undo Delete</button>
                  )}
                </div>
                <br/>
                <br/>
                <h3><b>Back Design</b> <small>Current: {backFileName ? backFileName : 'None'}</small></h3>
                <div className="containerRow">
                  <input type="file" accept="image/*" disabled={removeBack} onChange={(e) => setBackFile(e.target.files[0])} />
                  {!removeBack ? (
                    location === 'back' ? (
                      <button type="button" className="delete-button" disabled title="Cannot delete the default-style image">Delete Back</button>
                    ) : (
                      <button type="button" className="delete-button" onClick={() => setRemoveBack(true)}>Delete Back</button>
                    )
                  ) : (
                    <button type="button" className="default-button" onClick={() => setRemoveBack(false)}>Undo Delete</button>
                  )}
                </div>
                <br/>
                <br/>
                <button type="submit" className="default-button">Update Product</button>
              </form>
              {failToUpdate &&
                <div className="confirmation-modal">
                  <div className="confirmation-dialog">
                    <h3>Sorry, you've missed a required field.</h3>
                    <p>Please review the form and try agin.</p>
                    <div className="confirmation-buttons">
                      <button className="delete-button" onClick={() => setFailToUpdate(false)}>Review</button>
                    </div>
                  </div>
                </div>
              }
              {uploadError &&
                <div className="confirmation-modal">
                  <div className="confirmation-dialog">
                    <h3>Upload Error</h3>
                    <p>{uploadError}</p>
                    <div className="confirmation-buttons">
                      <button className="delete-button" onClick={() => setUploadError("")}>Close</button>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EditProducts;
