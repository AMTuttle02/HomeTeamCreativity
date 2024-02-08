import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

function Upload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [productName, setName] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');
  const [tshirtColors, setTshirtColors] = useState('');
  const [longSleeveColors, setLongSleeveColors] = useState('');
  const [crewneckColors, setCrewneckColors] = useState('');
  const [hoodieColors, setHoodieColors] = useState('');
  const [tColorsPrimary, setTColorPrimary] = useState("None");
  const [lColorsPrimary, setLColorPrimary] = useState("None");
  const [cColorsPrimary, setCColorPrimary] = useState("None");
  const [hColorsPrimary, setHColorPrimary] = useState("None");
  const [category, setCategory] = useState("All ");
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [style, setStyle] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleFileInputChange = (e) => {
    setSelectedFiles(e.target.files);
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
    
    for (const file of selectedFiles) {
      formData.append('images[]', file);
    }
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
  
    try {
      const response = await axios.post('/api/upload.php', formData, {
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

  const [admin, setAdmin] = useState("");
  useEffect(() => {
    fetch("/api/admin.php")
      .then((response) => response.json())
      .then((data) => {
        setAdmin(data.admin);
      });
    
    fetch("/api/getCats.php")
      .then((response) => response.json())
      .then((data) => {
          setAllSubcategories(data);
          console.log(data);
      }
    );
  }, []);

  useEffect(() => {
    const tColors = tshirtColors.trim();
    const lColors = longSleeveColors.trim();
    const cColors = crewneckColors.trim();
    const hColors = hoodieColors.trim();

    if (tColors) {
      setTColorPrimary(tColors.split(" ")[0]);
    }
    else {
      setTColorPrimary("None");
    }

    if (lColors) {
      setLColorPrimary(lColors.split(" ")[0]);
    }
    else {
      setLColorPrimary("None");
    }

    if (cColors) {
      setCColorPrimary(cColors.split(" ")[0]);
    }
    else {
      setCColorPrimary("None");
    }

    if (hColors) {
      setHColorPrimary(hColors.split(" ")[0]);
    }
    else {
      setHColorPrimary("None");
    }

  }, [tshirtColors, longSleeveColors, crewneckColors, hoodieColors])

  if (admin) {
    return (
      <div className='Upload'>
        <br />
        <div className="container">
          <h1>Upload Designs Below</h1>
          <br />
          <h2>Remember: Design must be 500px by 500px</h2>
          <br/>
          <form onSubmit={handleSubmit}>
            <label>Product Display Name</label>
              <input
                type="text"
                id="product_name"
                name="product_name"
                placeholder="Product Name"
                onChange={(event) => setName(event.target.value)}
              />
            <label>Price (Do Not Include $) (Pricing Default is for an Adult Medium)</label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Price"
              onChange={(event) => setPrice(event.target.value)}
            />
            <label>Tags (Separate By A Space)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Tags"
              onChange={(event) => setTags(event.target.value)}
            />
            <br/>
            <center><h3>Style Location</h3></center>
            <div className="row">
              <div className="uploadSplit">
                <span>
                  <input type="radio" id="location" name="location" value="front" onChange={(event) => setLocation(event.target.value)}/>
                    <label>&nbsp;Front</label>
                    <br />
                </span>
              </div>
              <div className="uploadSplit">
                <span>
                  <input type="radio" id="location" name="location" value="back" onChange={(event) => setLocation(event.target.value)}/>
                    <label>&nbsp;Back</label>
                    <br />
                </span>
              </div>
            </div>
            <br />
            <center><h3>Default Style</h3></center>
            <div className="row">
              <div className="uploadSplit">
                <span>
                  <input type="radio" id="style" name="style" value="tshirt" onChange={(event) => setStyle(event.target.value)}/>
                    <label>&nbsp;T-Shirt</label>
                    <br />
                </span>
              </div>
              <div className="uploadSplit">
                <span>
                  <input type="radio" id="style" name="style" value="longsleeve" onChange={(event) => setStyle(event.target.value)}/>
                    <label>&nbsp;Long Sleeve</label>
                    <br />
                </span>
              </div>
              <div className="uploadSplit">
                <span>
                  <input type="radio" id="style" name="style" value="crewneck" onChange={(event) => setStyle(event.target.value)}/>
                    <label>&nbsp;Crewneck</label>
                    <br />
                </span>
              </div>
              <div className="uploadSplit">
                <span>
                  <input type="radio" id="style" name="style" value="hoodie" onChange={(event) => setStyle(event.target.value)}/>
                    <label>&nbsp;Hoodie</label>
                    <br />
                </span>
              </div>
            </div>
            <br />
            <center>
              <h3>Color Options</h3>
            </center>
            <div className="row">
              <div className="uploadSplit">
                <label>T-Shirt: {tColorsPrimary}</label>
                <br />
                <input type="checkbox" id="tBlack" name="tBlack" value="Black" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Black</label>
                  <br />
                <input type="checkbox" id="tYellow" name="tYellow" value="Yellow" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Yellow</label>
                  <br />
                <input type="checkbox" id="tPink" name="tPink" value="Pink" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Pink</label>
                  <br />
                <input type="checkbox" id="tGray" name="tGray" value="Gray" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Gray</label>
                  <br />
                <input type="checkbox" id="tMaroon" name="tMaroon" value="Maroon" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Maroon</label>
                  <br />
                <input type="checkbox" id="tOrange" name="tOrange" value="Orange" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Orange</label>
                  <br />
                <input type="checkbox" id="tPurple" name="tPurple" value="Purple" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Purple</label>
                  <br />
                <input type="checkbox" id="tRed" name="tRed" value="Red" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Red</label>
                  <br />
                <input type="checkbox" id="tRoyal" name="tRoyal" value="Royal" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Royal</label>
                  <br />
                <input type="checkbox" id="tGreen" name="tGreen" value="Green" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Green</label>
                  <br />
                <input type="checkbox" id="tWhite" name="tWhite" value="White" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;White</label>
                  <br />
                <input type="checkbox" id="tNavy" name="tNavy" value="Navy" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Navy</label>
                  <br />
              </div>
              <div className="uploadSplit">
                <label>Long Sleeve: {lColorsPrimary}</label>
                <br />
                <input type="checkbox" id="lBlack" name="lBlack" value="Black" onChange={(event) => handleLongSleeveColor(event.target.value)}/>
                  <label>&nbsp;Black</label>
                  <br />
                <input type="checkbox" id="lNavy" name="lNavy" value="Navy" onChange={(event) => handleLongSleeveColor(event.target.value)}/>
                  <label>&nbsp;Navy</label>
                  <br />
                <input type="checkbox" id="lRed" name="lRed" value="Red" onChange={(event) => handleLongSleeveColor(event.target.value)}/>
                  <label>&nbsp;Red</label>
                  <br />
                <input type="checkbox" id="lRoyal" name="lRoyal" value="Royal" onChange={(event) => handleLongSleeveColor(event.target.value)}/>
                  <label>&nbsp;Royal</label>
                  <br />
                <input type="checkbox" id="lGray" name="lGray" value="Gray" onChange={(event) => handleLongSleeveColor(event.target.value)}/>
                  <label>&nbsp;Gray</label>
                  <br />
                <input type="checkbox" id="lWhite" name="lWhite" value="White" onChange={(event) => handleLongSleeveColor(event.target.value)}/>
                  <label>&nbsp;White</label>
                  <br />
              </div>
              <div className="uploadSplit">
                <label>Crewneck: {cColorsPrimary}</label>
                <br />
                <input type="checkbox" id="cBlack" name="cBlack" value="Black" onChange={(event) => handleCrewneckColor(event.target.value)}/>
                  <label>&nbsp;Black</label>
                  <br />
                <input type="checkbox" id="cGray" name="cGray" value="Gray" onChange={(event) => handleCrewneckColor(event.target.value)}/>
                  <label>&nbsp;Gray</label>
                  <br />
                <input type="checkbox" id="cWhite" name="cWhite" value="White" onChange={(event) => handleCrewneckColor(event.target.value)}/>
                  <label>&nbsp;White</label>
                  <br />
              </div>
              <div className="uploadSplit">
                <label>Hoodie: {hColorsPrimary}</label>
                <br />
                <input type="checkbox" id="hBlack" name="hBlack" value="Black" onChange={(event) => handleHoodieColor(event.target.value)}/>
                  <label>&nbsp;Black</label>
                  <br />
                <input type="checkbox" id="hGray" name="hGray" value="Gray" onChange={(event) => handleHoodieColor(event.target.value)}/>
                  <label>&nbsp;Gray</label>
                  <br />
                <input type="checkbox" id="hRed" name="hRed" value="Red" onChange={(event) => handleHoodieColor(event.target.value)}/>
                  <label>&nbsp;Red</label>
                  <br />
                <input type="checkbox" id="hNavy" name="hNavy" value="Navy" onChange={(event) => handleHoodieColor(event.target.value)}/>
                  <label>&nbsp;Navy</label>
                  <br />
                <input type="checkbox" id="hWhite" name="hWhite" value="White" onChange={(event) => handleHoodieColor(event.target.value)}/>
                  <label>&nbsp;White</label>
                  <br />
              </div>
            </div>
            <br/>
            <center><h3>Categories</h3></center>
            <div className="row">
              <div className="createCatCheckbox">
                  <input type="checkbox" value="Faith" name="cats" onChange={(event) => handleCategory(event.target.value)}/>
                  <label>&nbsp;Faith*</label>
              </div>
              <div className="createCatCheckbox">
                  <input type="checkbox" value="Family" name="cats" onChange={(event) => handleCategory(event.target.value)}/>
                  <label>&nbsp;Family*</label>
              </div>
              <div className="createCatCheckbox">
                  <input type="checkbox" value="Health" name="cats" onChange={(event) => handleCategory(event.target.value)}/>
                  <label>&nbsp;Health</label>
              </div>
              <div className="createCatCheckbox">
                  <input type="checkbox" value="Holiday" name="cats" onChange={(event) => handleCategory(event.target.value)}/>
                  <label>&nbsp;Holiday</label>
              </div>
              <div className="createCatCheckbox">
                  <input type="checkbox" value="Ohio" name="cats" onChange={(event) => handleCategory(event.target.value)}/>
                  <label>&nbsp;Ohio*</label>
              </div>
              <div className="createCatCheckbox">
                  <input type="checkbox" value="Other" name="cats" onChange={(event) => handleCategory(event.target.value)}/>
                  <label>&nbsp;Other</label>
              </div>
              <div className="createCatCheckbox">
                  <input type="checkbox" value="Patriotic" name="cats" onChange={(event) => handleCategory(event.target.value)}/>
                  <label>&nbsp;Patriotic*</label>
              </div>
              <div className="createCatCheckbox">
                  <input type="checkbox" value="School" name="cats" onChange={(event) => handleCategory(event.target.value)}/>
                  <label>&nbsp;School</label>
              </div>
              <div className="createCatCheckbox">
                  <input type="checkbox" value="Seasons" name="cats" onChange={(event) => handleCategory(event.target.value)}/>
                  <label>&nbsp;Seasons</label>
              </div>
              <div className="createCatCheckbox">
                  <input type="checkbox" value="Sports" name="cats" onChange={(event) => handleCategory(event.target.value)}/>
                  <label>&nbsp;Sports</label>
              </div>
            </div>
            <br/>
            <center><h3>Subcategories</h3></center>
            <div className="row">
                {allSubcategories.map((subcategory) => (
                    <div className="createSubCatCheckbox">
                        <input type="checkbox" value={subcategory.name} name="subcats" onChange={(event) => handleCategory(event.target.value)}/>
                        <label>&nbsp;{subcategory.name + " (" + subcategory.category + ") "}</label>
                    </div>
                ))}
            </div>
            <br/><br/>
            <input type="file" multiple onChange={handleFileInputChange} />
            <br/>
            <br/>
            <button type="submit">Upload</button>
          </form>
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
