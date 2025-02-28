import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Upload() {
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');
  const [tshirtColors, setTshirtColors] = useState('');
  const [longSleeveColors, setLongSleeveColors] = useState('');
  const [crewneckColors, setCrewneckColors] = useState('');
  const [hoodieColors, setHoodieColors] = useState('');
  const [tColorsPrimary, setTColorsPrimary] = useState("None");
  const [lColorsPrimary, setLColorsPrimary] = useState("None");
  const [cColorsPrimary, setCColorsPrimary] = useState("None");
  const [hColorsPrimary, setHColorsPrimary] = useState("None");
  const [category, setCategory] = useState("All ");
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [style, setStyle] = useState("");
  const [location, setLocation] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [customFieldRequired, setCustomFieldRequired] = useState(null);
  const [sizesAvailable, setSizesAvailable] = useState(1);
  const navigate = useNavigate();
  const [admin, setAdmin] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  // Api Calls
  useEffect(() => {
    fetch("/api/admin/admin.php")
      .then((response) => response.json())
      .then((data) => {
        setAdmin(data.admin);
      });
    
    fetch("/api/category/getSubCats.php")
      .then((response) => response.json())
      .then((data) => {
          setAllSubcategories(data);
      }
    );

    fetch("/api/category/getCategories.php")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllCategories(data);
      }
    );
  }, []);

  const handleFrontFileInputChange = (event) => {
    setFrontFile(event.target.files[0]);
  };

  const handleBackFileInputChange = (event) => {
    setBackFile(event.target.files[0]);
  };

  const handleTshirtColor = (event) => {
    if (tshirtColors.includes(event)) {
      const removedColor = tshirtColors.replace(event, "");
      setTshirtColors(removedColor);
    }
    else {
      setTshirtColors(tshirtColors + ' ' + event);
    }
  };

  const handleLongSleeveColor = (event) => {
    if (longSleeveColors.includes(event)) {
      const removedColor = longSleeveColors.replace(event, "");
      setLongSleeveColors(removedColor);
    }
    else {
      setLongSleeveColors(longSleeveColors + ' ' + event);
    }
  };

  const handleCrewneckColor = (event) => {
    if (crewneckColors.includes(event)) {
      const removedColor = crewneckColors.replace(event, "");
      setCrewneckColors(removedColor);
    }
    else {
      setCrewneckColors(crewneckColors + ' ' + event);
    }
  };

  const handleHoodieColor = (event) => {
    if (hoodieColors.includes(event)) {
      const removedColor = hoodieColors.replace(event, "");
      setHoodieColors(removedColor);
    }
    else {
      setHoodieColors(hoodieColors + ' ' + event);
    }
  };

  const handleCategory = (event) => {
    if (category.includes(event)) {
      const removeCat = category.replace(event, "");
      setCategory(removeCat);
    }
    else {
      setCategory(category + ' ' + event);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (!frontFile && location === 'front') {
      // Handle case when frontFile is required but not provided
      setShowConfirmation(true);
      return;
    } else if (frontFile) {
      formData.append('frontFile', frontFile);
    }
  
    if (!backFile && location === 'back') {
      // Handle case when backFile is required but not provided
      setShowConfirmation(true);
      return;
    } else if (backFile) {
      formData.append('backFile', backFile);
    }
    
    if (!productName || !price || !style || !location || customFieldRequired === null) {
      setShowConfirmation(true);
      return;
    }
    else {
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('tags', tags);
      formData.append('tColors', tshirtColors);
      formData.append('lColors', longSleeveColors);
      formData.append('cColors', crewneckColors);
      formData.append('hColors', hoodieColors);
      formData.append('subcategories', category);
      formData.append('default_style', style);
      formData.append('style_location', location);
      formData.append('customFieldRequired', customFieldRequired);
      formData.append('sizeAvailable', sizesAvailable);
    }
  
    try {
      const response = await axios.post('/api/product/upload.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload successful', response.data);
      navigate("/uploadcomplete");
    } catch (error) {
      console.error('Error uploading files', error);
    }
  }

  useEffect(() => {
    const tColors = tshirtColors.trim();
    const lColors = longSleeveColors.trim();
    const cColors = crewneckColors.trim();
    const hColors = hoodieColors.trim();

    if (tColors) {
      setTColorsPrimary(tColors.split(" ")[0]);
    }
    else {
      setTColorsPrimary("None");
    }

    if (lColors) {
      setLColorsPrimary(lColors.split(" ")[0]);
    }
    else {
      setLColorsPrimary("None");
    }

    if (cColors) {
      setCColorsPrimary(cColors.split(" ")[0]);
    }
    else {
      setCColorsPrimary("None");
    }

    if (hColors) {
      setHColorsPrimary(hColors.split(" ")[0]);
    }
    else {
      setHColorsPrimary("None");
    }
  }, [tshirtColors, longSleeveColors, crewneckColors, hoodieColors])

  if (admin) {
    return (
      <div className='Upload'>
        <br />
        <div className="container">
          <h1 className="center">Upload Designs Below</h1>
          <h3 className="center">Required Fields are marked with a <span className="red">*</span></h3>
          <br/>
          <form onSubmit={handleSubmit}>
            <label>Product Display Name<span className="red">*</span></label>
              <input
                type="text"
                id="product_name"
                name="product_name"
                placeholder="Product Name"
                className="default-input"
                onChange={(event) => setProductName(event.target.value)}
              />
            <label>Price<span className="red">*</span> (Do Not Include $) (Pricing Default is for an Adult Medium)</label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Price"
              className="default-input"
              onChange={(event) => setPrice(event.target.value)}
            />
            <label>Tags (Separate By A Space)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Tags"
              className="default-input"
              onChange={(event) => setTags(event.target.value)}
            />
            <br />
            <h3 className="center">Categories</h3>
            <div className="row">
              {allCategories.map((category) => (
                <div className="createCatCheckbox" key={category.category}>
                  <input type="checkbox" value={category.category} name="cats" onChange={(event) => handleCategory(event.target.value)}/>
                  <label>&nbsp;{category.category}</label>
                </div>
              ))}
            </div>
            <h3 className="center">Subcategories</h3>
            <div className="row">
              {allSubcategories.map((subcategory) => (
                <div className="createSubCatCheckbox" key={subcategory.name}>
                  <input type="checkbox" value={subcategory.name} name="subcats" onChange={(event) => handleCategory(event.target.value)}/>
                  <label>&nbsp;{subcategory.name + " (" + subcategory.category + ") "}</label>
                </div>
              ))}
            </div>
            <div className="mobileCenter">
              <h3 className="center">Default Style<span className="red">*</span></h3>
              <div className="row">
                <div className="mobileSplit20">
                  <span>
                    <input type="radio" id="style" name="style" value="tshirt" className="pointer" onChange={(event) => setStyle(event.target.value)}/>
                      <label>&nbsp;T-Shirt</label>
                      <br />
                  </span>
                </div>
                <div className="mobileSplit20">
                  <span>
                    <input type="radio" id="style" name="style" value="longsleeve" className="pointer" onChange={(event) => setStyle(event.target.value)}/>
                      <label>&nbsp;Long Sleeve</label>
                      <br />
                  </span>
                </div>
                <div className="mobileSplit20">
                  <span>
                    <input type="radio" id="style" name="style" value="crewneck" className="pointer" onChange={(event) => setStyle(event.target.value)}/>
                      <label>&nbsp;Crewneck</label>
                      <br />
                  </span>
                </div>
                <div className="mobileSplit20">
                  <span>
                    <input type="radio" id="style" name="style" value="hoodie" className="pointer" onChange={(event) => setStyle(event.target.value)}/>
                      <label>&nbsp;Hoodie</label>
                      <br />
                  </span>
                </div>
                <div className="mobileSplit20">
                  <span>
                    <input type="radio" id="style" name="style" value="other" className="pointer" onChange={(event) => setStyle(event.target.value)}/>
                      <label>&nbsp;Other</label>
                      <br />
                  </span>
                </div>
              </div>
              <center><h3>Default Style Location<span className="red">*</span></h3></center>
                <div className="row">
                  <div className="mobileSplit20" />
                  <div className="mobileSplit20">
                    <span>
                      <input type="radio" id="location" name="location" value="front" className="pointer" onChange={(event) => setLocation(event.target.value)}/>
                        <label>&nbsp;Front</label>
                        <br />
                    </span>
                  </div>
                  <div className="mobileSplit20"/>
                  <div className="mobileSplit20">
                    <span>
                      <input type="radio" id="location" name="location" value="back" className="pointer" onChange={(event) => setLocation(event.target.value)}/>
                        <label>&nbsp;Back</label>
                        <br />
                    </span>
                  </div>
                  <div className="mobileSplit20" />
                </div>
              <h3 className="center">Color Options</h3>
              <div className="topAlignRow">
                <div className="mobileSplit25">
                  <label>T-Shirt (Other): {tColorsPrimary}</label>
                  <br />
                  <input type="checkbox" id="tBlack" name="tBlack" value="Black" className="pointer" onChange={(event) => handleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Black</label>
                    <br />
                  <input type="checkbox" id="tYellow" name="tYellow" value="Yellow" className="pointer" onChange={(event) => handleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Yellow</label>
                    <br />
                  <input type="checkbox" id="tPink" name="tPink" value="Pink" className="pointer" onChange={(event) => handleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Pink</label>
                    <br />
                  <input type="checkbox" id="tGray" name="tGray" value="Gray" className="pointer" onChange={(event) => handleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Gray</label>
                    <br />
                  <input type="checkbox" id="tMaroon" name="tMaroon" value="Maroon" className="pointer" onChange={(event) => handleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Maroon</label>
                    <br />
                  <input type="checkbox" id="tOrange" name="tOrange" value="Orange" className="pointer" onChange={(event) => handleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Orange</label>
                    <br />
                  <input type="checkbox" id="tPurple" name="tPurple" value="Purple" className="pointer" onChange={(event) => handleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Purple</label>
                    <br />
                  <input type="checkbox" id="tRed" name="tRed" value="Red" className="pointer" onChange={(event) => handleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Red</label>
                    <br />
                  <input type="checkbox" id="tRoyal" name="tRoyal" value="Royal" className="pointer" onChange={(event) => handleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Royal</label>
                    <br />
                  <input type="checkbox" id="tGreen" name="tGreen" value="Green" className="pointer" onChange={(event) => handleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Green</label>
                    <br />
                  <input type="checkbox" id="tWhite" name="tWhite" value="White" className="pointer" onChange={(event) => handleTshirtColor(event.target.value)}/>
                    <label>&nbsp;White</label>
                    <br />
                  <input type="checkbox" id="tNavy" name="tNavy" value="Navy" className="pointer" onChange={(event) => handleTshirtColor(event.target.value)}/>
                    <label>&nbsp;Navy</label>
                    <br />
                </div>
                <div className="mobileSplit25">
                  <label>Long Sleeve: {lColorsPrimary}</label>
                  <br />
                  <input type="checkbox" id="lBlack" name="lBlack" value="Black" className="pointer" onChange={(event) => handleLongSleeveColor(event.target.value)}/>
                    <label>&nbsp;Black</label>
                    <br />
                  <input type="checkbox" id="lNavy" name="lNavy" value="Navy" className="pointer" onChange={(event) => handleLongSleeveColor(event.target.value)}/>
                    <label>&nbsp;Navy</label>
                    <br />
                  <input type="checkbox" id="lRed" name="lRed" value="Red" className="pointer" onChange={(event) => handleLongSleeveColor(event.target.value)}/>
                    <label>&nbsp;Red</label>
                    <br />
                  <input type="checkbox" id="lRoyal" name="lRoyal" value="Royal" className="pointer" onChange={(event) => handleLongSleeveColor(event.target.value)}/>
                    <label>&nbsp;Royal</label>
                    <br />
                  <input type="checkbox" id="lGray" name="lGray" value="Gray" className="pointer" onChange={(event) => handleLongSleeveColor(event.target.value)}/>
                    <label>&nbsp;Gray</label>
                    <br />
                  <input type="checkbox" id="lWhite" name="lWhite" value="White" className="pointer" onChange={(event) => handleLongSleeveColor(event.target.value)}/>
                    <label>&nbsp;White</label>
                    <br />
                </div>
                <div className="mobileSplit25">
                  <label>Crewneck: {cColorsPrimary}</label>
                  <br />
                  <input type="checkbox" id="cBlack" name="cBlack" value="Black" className="pointer" onChange={(event) => handleCrewneckColor(event.target.value)}/>
                    <label>&nbsp;Black</label>
                    <br />
                  <input type="checkbox" id="cGray" name="cGray" value="Gray" className="pointer" onChange={(event) => handleCrewneckColor(event.target.value)}/>
                    <label>&nbsp;Gray</label>
                    <br />
                  <input type="checkbox" id="cWhite" name="cWhite" value="White" className="pointer" onChange={(event) => handleCrewneckColor(event.target.value)}/>
                    <label>&nbsp;White</label>
                    <br />
                </div>
                <div className="mobileSplit25">
                  <label>Hoodie: {hColorsPrimary}</label>
                  <br />
                  <input type="checkbox" id="hBlack" name="hBlack" value="Black" className="pointer" onChange={(event) => handleHoodieColor(event.target.value)}/>
                    <label>&nbsp;Black</label>
                    <br />
                  <input type="checkbox" id="hGray" name="hGray" value="Gray" className="pointer" onChange={(event) => handleHoodieColor(event.target.value)}/>
                    <label>&nbsp;Gray</label>
                    <br />
                  <input type="checkbox" id="hRed" name="hRed" value="Red" className="pointer" onChange={(event) => handleHoodieColor(event.target.value)}/>
                    <label>&nbsp;Red</label>
                    <br />
                  <input type="checkbox" id="hNavy" name="hNavy" value="Navy" className="pointer" onChange={(event) => handleHoodieColor(event.target.value)}/>
                    <label>&nbsp;Navy</label>
                    <br />
                  <input type="checkbox" id="hWhite" name="hWhite" value="White" className="pointer" onChange={(event) => handleHoodieColor(event.target.value)}/>
                    <label>&nbsp;White</label>
                    <br />
                </div>
              </div>
              <center><h3>Custom Details Required<span className="red">*</span></h3></center>
              <div className="row">
                <div className="mobileSplit20"/>
                <div className="mobileSplit20">
                  <span>
                    <input type="radio" id="customBoxRequired" name="customBoxRequired" value={1} onChange={(event) => setCustomFieldRequired(event.target.value)}/>
                      <label>&nbsp;Yes</label>
                      <br />
                  </span>
                </div>
                <div className="mobileSplit20"/>
                <div className="mobileSplit20">
                  <span>
                    <input type="radio" id="customBoxRequired" name="customBoxRequired" value={0} onChange={(event) => setCustomFieldRequired(event.target.value)}/>
                      <label>&nbsp;No</label>
                      <br />
                  </span>
                </div>
                <div className="mobileSplit20"/>
              </div>
              <center><h3>Sizes Available</h3></center>
              <div className="row">
                <div className="mobileSplit20"/>
                <div className="mobileSplit20">
                  <span>
                    <input type="radio" id="sizesAvailable" name="sizesAvailable" value={1} onChange={(event) => setSizesAvailable(event.target.value)}/>
                      <label>&nbsp;Yes</label>
                      <br />
                  </span>
                </div>
                <div className="mobileSplit20"/>
                <div className="mobileSplit20">
                  <span>
                    <input type="radio" id="sizesAvailable" name="sizesAvailable" value={0} onChange={(event) => setSizesAvailable(event.target.value)}/>
                      <label>&nbsp;No</label>
                      <br />
                  </span>
                </div>
                <div className="mobileSplit20"/>
              </div>
            </div>
            <div className="center">
              <h3>Front Design{location === 'front' && <span className="red">*</span>}</h3>
              <input type="file" onChange={handleFrontFileInputChange} />
              <br/><br/>
              <h3>Back Design{location === 'back' && <span className="red">*</span>}</h3>
              <input type="file" onChange={handleBackFileInputChange} />
              <br/><br/>
            </div>
            <button className="default-button" type="submit">Upload</button>
          </form>
          {showConfirmation &&
            <div className="confirmation-modal">
              <div className="confirmation-dialog">
                <h3>Sorry, you've missed a required field.</h3>
                <p>Please review the form and try agin.</p>
                <button className="default-button" onClick={() => setShowConfirmation(false)}>Review</button>
              </div>
            </div>
          }
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
export default Upload;
