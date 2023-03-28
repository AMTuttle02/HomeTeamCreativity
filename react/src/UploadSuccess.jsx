import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import tshirt from "./assets/blackTShirt.png";

function Upload() {
  const [admin, setAdmin] = useState("");
  useEffect(() => {
    fetch("/api/admin.php")
      .then((response) => response.json())
      .then((data) => {
        setAdmin(data.admin);
      });
  }, []);

  const [design, setDesign] = useState([]);

  useEffect(() => {
    fetch("/api/recentUpload.php")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDesign(data);
    });
  }, []);

  if (admin) {
    return (
      <div className='Upload'>
        <br />
        <div className="productsTable">
            <div className="productsTd">
                <h1>Upload Complete!</h1>
                <h2>Design Preview:</h2>
                {design.map((product) => (
                    <div key={product.filename}>
                        <div className="fullDesign">
                            <img
                            src={tshirt}
                            alt="Home Team Creativity Logo"
                            className="tshirt"
                            />
                            <img
                            src={"images/" + product.filename}
                            alt={product.filename}
                            className="design"
                            />
                            <center>
                            <p>{product.product_name}</p>
                            <p>{"$" + product.price}</p>
                            </center>
                        </div>
                    </div>
                ))}
            </div>
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
