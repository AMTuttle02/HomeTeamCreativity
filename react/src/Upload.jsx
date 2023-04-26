import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Upload() {
  const [file, setFile] = useState(null);
  const [productName, setName] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('productName', productName);
    formData.append('price', price);
    formData.append('tags', tags);
  
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
            <label>Price (Do Not Include $)</label>
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
                <label>T-Shirt:</label>
                <br />
                <input type="checkbox" id="tBlack" name="tBlack" value="tBlack" />
                  <label for="black">&nbsp;Black</label>
                  <br />
                <input type="checkbox" id="tYellow" name="tYellow" value="tYellow" />
                  <label for="black">&nbsp;Yellow</label>
                  <br />
                <input type="checkbox" id="tPink" name="tPink" value="tPink" />
                  <label for="black">&nbsp;Pink</label>
                  <br />
                <input type="checkbox" id="tGray" name="tGray" value="tGray" />
                  <label for="black">&nbsp;Gray</label>
                  <br />
                <input type="checkbox" id="tMaroon" name="tMaroon" value="tMaroon" />
                  <label for="black">&nbsp;Maroon</label>
                  <br />
                <input type="checkbox" id="tOrange" name="tOrange" value="tOrange" />
                  <label for="black">&nbsp;Orange</label>
                  <br />
                <input type="checkbox" id="tPurple" name="tPurple" value="tPurple" />
                  <label for="black">&nbsp;Purple</label>
                  <br />
                <input type="checkbox" id="tRed" name="tRed" value="tRed" />
                  <label for="black">&nbsp;Red</label>
                  <br />
                <input type="checkbox" id="tRoyal" name="tRoyal" value="tRoyal" />
                  <label for="black">&nbsp;Royal</label>
                  <br />
                <input type="checkbox" id="tGreen" name="tGreen" value="tGreen" />
                  <label for="black">&nbsp;Green</label>
                  <br />
                <input type="checkbox" id="tWhite" name="tWhite" value="tWhite" />
                  <label for="black">&nbsp;White</label>
                  <br />
                <input type="checkbox" id="tNavy" name="tNavy" value="tNavy" />
                  <label for="black">&nbsp;Navy (Youth Only)</label>
                  <br />
              </div>
              <div className="uploadSplit">
                <label>Long Sleeve:</label>
                <br />
                <input type="checkbox" id="lBlack" name="lBlack" value="lBlack" />
                  <label for="black">&nbsp;Black</label>
                  <br />
                <input type="checkbox" id="lNavy" name="lNavy" value="lNavy" />
                  <label for="black">&nbsp;Navy</label>
                  <br />
                <input type="checkbox" id="lRed" name="lRed" value="lRed" />
                  <label for="black">&nbsp;Red</label>
                  <br />
                <input type="checkbox" id="lRoyal" name="lRoyal" value="lRoyal" />
                  <label for="black">&nbsp;Royal</label>
                  <br />
                <input type="checkbox" id="lGray" name="lGray" value="lGray" />
                  <label for="black">&nbsp;Gray</label>
                  <br />
                <input type="checkbox" id="lWhite" name="lWhite" value="lWhite" />
                  <label for="black">&nbsp;White</label>
                  <br />
              </div>
              <div className="uploadSplit">
                <label>Crewneck:</label>
                <br />
                <input type="checkbox" id="cBlack" name="cBlack" value="cBlack" />
                  <label for="black">&nbsp;Black</label>
                  <br />
                <input type="checkbox" id="cGray" name="cGray" value="cGray" />
                  <label for="black">&nbsp;Gray</label>
                  <br />
                <input type="checkbox" id="cWhite" name="cWhite" value="cWhite" />
                  <label for="black">&nbsp;White</label>
                  <br />
              </div>
              <div className="uploadSplit">
                <label>Hoodie:</label>
                <br />
                <input type="checkbox" id="hBlack" name="hBlack" value="hBlack" />
                  <label for="black">&nbsp;Black</label>
                  <br />
                <input type="checkbox" id="hGray" name="hGray" value="hGray" />
                  <label for="black">&nbsp;Gray</label>
                  <br />
                <input type="checkbox" id="hRed" name="hRed" value="hRed" />
                  <label for="black">&nbsp;Pink</label>
                  <br />
                <input type="checkbox" id="hNavy" name="hNavy" value="hNavy" />
                  <label for="black">&nbsp;Navy</label>
                  <br />
                <input type="checkbox" id="hWhite" name="hWhite" value="hWhite" />
                  <label for="black">&nbsp;White</label>
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
