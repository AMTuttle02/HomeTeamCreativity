import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Upload() {
  const [file, setFile] = useState(null);
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

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('productName', productName);
    formData.append('price', price);
    formData.append('tags', tags);
    formData.append('tColors', tshirtColors);
    formData.append('lColors', longSleeveColors);
    formData.append('cColors', crewneckColors);
    formData.append('hColors', hoodieColors);
  
    fetch('/api/upload.php', {
      method: 'POST',
      body: formData
    })
    .then((response) => response.json())
    .then((data) => {
      if(data) {
        window.location.href="/uploadcomplete";
      }
    });
  };

  const [admin, setAdmin] = useState("");
  useEffect(() => {
    fetch("/api/admin.php")
      .then((response) => response.json())
      .then((data) => {
        setAdmin(data.admin);
      });
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
            <center>
              <h3>Color Options</h3>
            </center>
            <br/>
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
            <br/><br/>
            <input type="file" onChange={handleFileInputChange} />
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
