import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import WhiteTshirt from "./assets/WhiteTShirt.png";

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
  const [color, setColor] = useState(BlackTshirt);

  useEffect(() => {
    fetch("/api/recentUpload.php")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDesign(data);
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
          "White": WhiteTshirt
        }
        const regex = /\S+/;
        let firstWord = data[0].tColors.match(regex)[0];
        setColor(tShirtMap[firstWord]); 
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
                            src={color}
                            alt="Home Team Creativity Logo"
                            className="tshirt"
                            />
                            <img
                            src={"api/images/" + product.filename}
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
