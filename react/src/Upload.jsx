import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Upload() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    const handleImageChange = e => {
        let reader = new FileReader() 
        reader.readAsDataURL(e.target.files[0])

        reader.onload = () => {      
            this.setState({        
            queryImage: reader.result      
            })    
        }

      fetch("/api/upload.php", {
        method: "POST",  
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.state.queryImage)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
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
          <form onSubmit={ handleImageChange }>
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
            <input
                type="file"
                id="myFile"
                name="filename"
                accept="image/*"
                onChange={(event) => setImage(event.target.value)}
            />
            <br /><br />
            <input type="submit" />
          </form>
          {image && <img src={image} alt="Uploaded Image" />}
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
