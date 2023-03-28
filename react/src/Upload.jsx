import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Upload() {
  const [file, setFile] = useState(null);
  const [productName, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('productName', productName);
    formData.append('price', price);
  
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
            <input type="file" onChange={handleFileInputChange} />
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
